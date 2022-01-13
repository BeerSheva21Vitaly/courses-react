import { Course } from "../models/course-type";
import CoursesService from "./courses-service";


export default class CoursesServiceRest implements CoursesService {
    constructor(private url: string) {
        if(!url) {
            throw "URL is not provided"
        }
    }
    
    async add(course: Course): Promise<Course> {
        return fetch(this.url, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course),          
            }).then(r=>r.json()) as Promise<Course>
        
    }

    async remove(id: number): Promise<Course> {
        const url = this.getUrlId(id);
        const course = this.get(id) as Promise<Course> ;
       await fetch(url,
            {
                method: "DELETE",
            });
        return course;
    }

    async exists(id: number): Promise<boolean> {
        try {
            const response = await fetch(this.getUrlId(id));
            return response.ok;
        } catch (err) {
            this.serverExceptionHandler();
        }
        return false;
    }

    get(id?: number): Promise<Course> | Promise<Course[]> {
        return id == undefined ? (fetch(this.url).then(r=>r.json()) as Promise<Course[]>):
            (fetch(this.getUrlId(id)).then(r=>r.json()) as Promise<Course>);

    }
    
    async update(id: number, newCourse: Course): Promise<Course> {
        const response = await fetch(this.getUrlId(id), {
            method: "PUT",
            headers: {
                "Content-Type": "appication/json"
            },
            body: JSON.stringify(newCourse)
        });
        return await response.json();
    }
    
    serverExceptionHandler() {
        throw "Server unavailable. Try later";
    }
    getUrlId(id: number): string{
        return `${this.url}/${encodeURIComponent(id)}`;
    }
}