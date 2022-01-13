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
        const course = await this.get(id);
        await fetch(url,
            {
                method: "DELETE",
            });
        return course as Course ;
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
        return id == undefined ? fetchGet(this.url) as Promise<Course[]>:
            fetchGet(this.getUrlId(id)) as Promise<Course>;
    }
    
    async update(id: number, newCourse: Course): Promise<Course> {
        const oldCourse = await this.get(id);
        await fetch(this.getUrlId(id), {
            method: "PUT",
            headers: {
                "Content-Type": "appication/json"
            },
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

}

async function fetchGet(url: string): Promise<any> {
    return await fetch(url).then(response => response.json());
}