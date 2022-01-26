import { Course } from "../models/course-type";
import CoursesService from "./courses-service";
import { from, Observable } from "rxjs";
import PublisherCourses from "../util/publisher-courses";
import { pollingInterval } from "../config/servicesConfig";

export const AUTH_TOKEN = "auth_token"

class CoursesCache {
    private cacheString: string = '';

    setCache(courses: Course[]): void {
        this.cacheString = JSON.stringify(courses);
    }

    isEquals(other: Course[]): boolean {
        return JSON.stringify(other) === this.cacheString;
    }
}

export default class CoursesServiceRest implements CoursesService {
    cache: CoursesCache = new CoursesCache();
    constructor(private url: string) {}
    
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
        if(id) {
            return fetchGet(this.getUrlId(id));
        } else {
            return new Observable<Course[]>(observer => {
                const interval = setInterval(() => {              
                        if (!!localStorage.getItem(AUTH_TOKEN)) {
                            fetchGet(this.url).then(courses => {
                                if (!this.cache.isEquals(courses)) {
                                    this.cache.setCache(courses);
                                    observer.next(courses);
                                }
                        }).catch(err => observer.error(err));
                        }                 
                }, pollingInterval);
                return () => clearInterval(interval);
            });
        }
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
}

function getHeaders(): { Authorization: string, "Content-Type": string } {
    return {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
        "Content-Type": "application/json"
    };
}

async function fetchGet(url: string): Promise<any> {
    const response = await fetch(url, {
        headers: getHeaders()
    });
    return await response.json();
}