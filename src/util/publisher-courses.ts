import { Observable } from "rxjs";
import { Course } from "../models/course-type";

export default class PublisherCourses {
    constructor(public courses: Course[], public isNext: boolean = true) {}
    getCourses(): Observable<Course[]> {
        return new Observable<Course[]>(subscriber => {
            const interval = setInterval(() => {
                try {
                    if(!this.isNext) {
                        //do nothing
                    } else {
                        subscriber.next([...this.courses]);
                        this.isNext = false;
                        console.log(`Published new courses array (number of courses is ${this.courses.length})`);
                    }
                } catch (err) {
                    //метод error() publisher'а закрывается publisher и вызывает метд error у subscriber'а
                    subscriber.error(err);
                    clearInterval(interval);
                }               
            }, 2000)
            //возвращается функция, которая будет вызвана по факту отписки от этого паблишера
            return () => clearInterval(interval);
        })
    }
}