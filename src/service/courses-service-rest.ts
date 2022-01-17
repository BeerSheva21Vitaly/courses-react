import { Course } from "../models/course-type";
import CoursesService from "./courses-service";
import { from, Observable } from "rxjs";
import PublisherCourses from "../util/publisher-courses";

export const AUTH_TOKEN = "auth_token"

export default class CoursesServiceRest implements CoursesService {
    private currentCourses: Course[] = [];
    public publisherCourses: PublisherCourses;
    constructor(private url: string, private pollingInterval: number) {
        this.poller();
        this.publisherCourses = new PublisherCourses(this.currentCourses);
        setInterval(this.poller.bind(this), this.pollingInterval);
    }
    
    async add(course: Course): Promise<Course> {
        (course as any).userId = 1;
        if(await this.exists(course.id)) {
            throw `Course with id ${course.id} already exists`
        } else {
            return fetch(this.url, 
                {
                    method: "POST",
                    headers: getHeaders(),
                    body: JSON.stringify(course),          
                }).then(r=>r.json()) as Promise<Course>  }         
    }

    async remove(id: number): Promise<Course> {
        const url = this.getUrlId(id);
        const course = await this.get(id);
        await fetch(url,
            {
                method: "DELETE",
                headers: getHeaders(),
            });
        return course as Course ;
    }

    async exists(id: number): Promise<boolean> {
        try {
            const response = await fetch(this.getUrlId(id), {
                headers: getHeaders(),
            });
            return response.ok;
        } catch (err) {
            this.serverExceptionHandler();
        }
        return false;
    }

    get(id?: number): Promise<Course> | Observable<Course[]> {
            return id == undefined ? this.publisherCourses.getCourses() :
            fetchGet(this.getUrlId(id)) as Promise<Course>;
    }
    
    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(newCourse)
        });
        return oldCourse as Course;
    }
    
    serverExceptionHandler() {
        throw "Server unavailable. Try later";
    }
    getUrlId(id: number): string{
        return `${this.url}/${id}`;
    }

    async poller() {
        console.log("poller");
        const courses: Course[] = await fetchGet(this.url);
        if( JSON.stringify(courses) != JSON.stringify(this.currentCourses)) {
            this.currentCourses = courses;
            this.publisherCourses.courses = courses;
            this.publisherCourses.isNext = true;
        }
    }

}

function getHeaders(): { Authorization: string, "Content-Type": string } {
    return {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
        "Content-Type": "application/json"
    };
}

async function fetchGet(url: string): Promise<any> {
    return await fetch(url, {
        headers: getHeaders(),
    }).then(response => response.json());
}