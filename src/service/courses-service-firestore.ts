import CoursesService from "./courses-service";
import {collection, doc, getDoc, setDoc, deleteDoc, getFirestore, CollectionReference} from "firebase/firestore";
import appFire from "../config/fire-config"
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore";
import {Course} from "../models/course-type";
import {getRandomInteger} from "../util/common/random";

export default class CoursesServicesFirestore implements CoursesService {
    // ссылка на коллекцию БД, в которой хранятся курсы
    fireCollection: CollectionReference;
    constructor(private collectionName: string, private minId: number, private maxId: number) {
        this.fireCollection = collection(getFirestore(appFire), this.collectionName);
    }
    private async getRandomId(): Promise<number> {
        let id: number;
        do {
            id = getRandomInteger(this.minId, this.maxId);
        } while (await this.exists(id))
        return id;
    };
    private getCourseDocument(course: Course) {
        const dateString = course.openDate.toISOString().substring(0,10);
        const newCourse = {...course, openDate: dateString};
        return newCourse;
    }
    async add(course: Course): Promise<Course> {
        const id: number = await this.getRandomId();
        course = {...course, id};
        const courseDocument = this.getCourseDocument(course);
        const docRef = doc(this.fireCollection, id.toString());
        await setDoc(docRef, courseDocument);
        return course;
    }
    async exists(id: number): Promise<boolean> {
        const docRef = doc(this.fireCollection, id.toString());
        const docSnap = await getDoc((docRef));
        return docSnap.exists();
    }
    get(id?: number): Promise<Course> | Observable<Course[]> {
        if(id) {
            const docRef = doc(this.fireCollection, id.toString());
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
        await setDoc(docRef, this.getCourseDocument(newCourse));
        return oldCourse;
    }

}
























