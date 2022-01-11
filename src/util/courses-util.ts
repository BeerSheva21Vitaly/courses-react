import { Course } from "../models/course-type";
import { getRandomInteger, getRandomElement, getRandomDate } from "./common/random";
import courseData from "../config/courseData.json"
import _ from "lodash";

export function getDefaultCourses(nRandomCourses: number): Course[] {
    let courses: Course[] = [];
    while (courses.length < nRandomCourses) {
       addRandomCourse(courses);
    }
    return courses;
}

export function addRandomCourse(courses: Course[]) {
    let course = getRandomCourse();
    if (courses.findIndex(c => c.id === course.id) === -1) {
        courses.push(course);
    } else {
        throw `Course with id ${course.id} already exists`
    }
}

function getRandomCourse(): Course {
    const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseNames, lecturers, types, timing } = { ...courseData };
    const course = createCourse(courseNames, lecturers, minHours, maxHours, minCost, maxCost, types, timing, minYear, maxYear);
    return course;
}

function createCourse(courseNames: string[], lecturers: string[], minHours: number, maxHours: number,
        minCost: number, maxCost: number, types: string[], timing: string[], minYear: number,
            maxYear: number): Course {
    const id = getRandomInteger(0, Number.MAX_VALUE);
    const courseName = courseNames[getRandomInteger(0, courseNames.length - 1)];
    const lecturerName = lecturers[getRandomInteger(0, lecturers.length - 1)];
    const hours = getRandomInteger(minHours, maxHours);
    const cost = getRandomInteger(minCost, maxCost);
    const type = getRandomElement(types);
    const dayEveningId = getRandomInteger(0, 2);
    const dayEvening = dayEveningId < 2 ? [timing[dayEveningId]] : timing;
    const openDate = getRandomDate(minYear, maxYear);
    const course: Course = {id, courseName, lecturerName, hours, cost, type, dayEvening, openDate};
    return course;
}

export function getStatisticsByKey(courses: Course[], key: string, interval: number) {
    let objStat =  _.countBy(courses, e => {   
        const courseCost: any = e[key as keyof Course];
        if(typeof  courseCost === "number"){
            return Math.floor(courseCost / interval) * interval;
        } 
        throw `${key} is not a number field of Course`
        });
     return getInterval(objStat, interval);
}

function getInterval(objStat: _.Dictionary<number>, interval: number){
    let res = [];
    for (let key in objStat) {
        let minInterval = key;
        let maxInterval = +key + +interval - 1;
        let amount = objStat[key];
        res.push({minInterval:minInterval, maxInterval:maxInterval, amount:amount});
      }
    return res;
}