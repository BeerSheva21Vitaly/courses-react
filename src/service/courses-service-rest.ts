import { Course } from "../models/course-type";
import CoursesService from "./courses-service";
import { Observable } from "rxjs";
import { pollingInterval } from "../config/servicesConfig";
import {ServerErrorType} from "../models/common/server-error-type"
import {fetchFromRestServer} from "./fetch-rest-handler";

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
            const response =
                await fetchFromRestServer(
                    this.url,
                    {
                        method: 'POST',
                        headers: getHeaders(),
                        body: JSON.stringify(course),
                    }
                )
            return await response.json();
        }
    }

    async remove(id: number): Promise<Course> {
        const url = this.getUrlId(id);
        const course = await this.get(id) as Course;
        const response = await fetchFromRestServer(url,
            {
                method: "DELETE",
                headers: getHeaders(),
            });
        return course;
    }

    async exists(id: number): Promise<boolean> {
        const response = await fetchFromRestServer(
            this.getUrlId(id),
            {headers: getHeaders()}
        );
        return response.ok;
    }

    get(id?: number): Promise<Course> | Observable<Course[]> {
        if(id) {
            return fetchFromRestServer(
                        this.getUrlId(id),
                    {
                            headers: getHeaders()
                        });
        } else {
            return new Observable<Course[]>(observer => {
                const interval = setInterval(async () => {
                        if (!!localStorage.getItem(AUTH_TOKEN)) {
                            try {
                                const response = await fetchFromRestServer(
                                    this.url,
                                    {
                                        headers: getHeaders()
                                    }
                                )
                                const courses = await response.json();
                                if (!this.cache.isEquals(courses)) {
                                    this.cache.setCache(courses);
                                    observer.next(courses);
                                }
                            } catch (err) {
                                if(err == ServerErrorType.serverIsNotAvailable) {
                                    this.cache.setCache([]);
                                    observer.error(err);
                                    clearInterval(interval);
                                } else {
                                    localStorage.removeItem(AUTH_TOKEN);
                                }
                            }
                        }                 
                }, pollingInterval);
                return () => {
                    console.log('clearing interval')
                    clearInterval(interval)
                };
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

// @ts-ignore
async function fetchGet(url: string): Promise<any> {
    const response = await fetch(url, {
        headers: getHeaders()
    });
    console.log(response);
    if(response.status === 401 ||response.status === 403) {
        serverExceptionHandler(ServerErrorType.userIsNotAuth);
    }
    return await response.json();
}

function serverExceptionHandler(err: ServerErrorType) {
    console.log(err);
    localStorage.removeItem(AUTH_TOKEN);
}