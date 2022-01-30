import CoursesService from "./courses-service";
import firebase, {collection, doc, getDoc, setDoc, deleteDoc} from "firebase/firestore";
import appFire from "../config/fire-config"
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore";
import {Course} from "../models/course-type";
import {getRandomInteger} from "../util/common/random";

export default class CoursesServicesFirestore implements CoursesService {
    // ссылка на коллекцию - базу данных в FB, в которых хранятся курсы
    db: firebase.Firestore;
    fireCollection: firebase.CollectionReference;
    constructor(private collectionName: string, private minId: number, private maxId: number) {
        this.db = firebase.getFirestore(appFire);
        this.fireCollection = collection(this.db, this.collectionName);
    }
    private async getRandomId(): Promise<number> {
        let id: number;
        do {
            id = getRandomInteger(this.minId, this.maxId);
        } while (await this.exists(id))
        return id;
    }
    async add(course: Course): Promise<Course> {
        const id: number = await this.getRandomId();
        const newCourse = {...course, id};
        const docRef = doc(this.fireCollection, id.toString());
        await setDoc(docRef, newCourse);
        return newCourse;
    }
    async exists(id: number): Promise<boolean> {
        const docRef = doc(this.db, this.collectionName, id.toString());
        const docSnap = await getDoc((docRef));
        return docSnap.exists();
    }
    get(id?: number): Promise<Course> | Observable<Course[]> {
        if(id) {
            const docRef = doc(this.db, this.collectionName, id.toString());
            return getDoc((docRef)).then(docSnap => docSnap.data() as Course);
        }
        return collectionData(this.fireCollection) as Observable<Course[]>;
    }
    async remove(id: number): Promise<Course> {
        const oldCourse = await this.get(id) as Course;
        const docRef = doc(this.fireCollection, id.toString());
        await deleteDoc(docRef);
        return oldCourse;
    }
    async update(id: number, newCourse: Course): Promise<Course> {
        const docRef = doc(this.fireCollection, id.toString());
        const docSnap = await getDoc((docRef));
        const oldCourse = docSnap.data() as Course;
        await setDoc(docRef, newCourse);
        return oldCourse;
    }

}
























