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
                    `${this.url}/login`,
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
        try {
            const course = await this.get(id);
            const r = await fetch(url,
                {
                    method: "DELETE",
                    headers: getHeaders(),
                });
            if(r.status === 401 || r.status === 403) {
                throw ServerErrorType.userIsNotAuth;
            }
        } catch (err) {
            serverExceptionHandler(ServerErrorType.serverIsNotAvailable);
        }
        throw "Can't get there";
    }

    async exists(id: number): Promise<boolean> {
        try {
            const response = await fetch(this.getUrlId(id), {
                headers: getHeaders(),
            });
            if(response.status === 401 || response.status === 403) {
                throw ServerErrorType.userIsNotAuth;
            }
            return response.ok;
        } catch (err) {
            serverExceptionHandler(ServerErrorType.serverIsNotAvailable);
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
                            fetchGet(this.url)
                                .then(courses => {
                                    if (!this.cache.isEquals(courses)) {
                                        this.cache.setCache(courses);
                                        observer.next(courses);
                                    }
                                })
                                .catch(err => {
                                    this.cache.setCache([]);
                                    observer.error(err);
                                    clearInterval(interval);
                                });
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
    switch (+ServerErrorType) {
        case ServerErrorType.userIsNotAuth : localStorage.removeItem(AUTH_TOKEN); break;
        case ServerErrorType.serverIsNotAvailable:
    }
    localStorage.removeItem(AUTH_TOKEN);
    // throw "Server unavailable. Try later";
}