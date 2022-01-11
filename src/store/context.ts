import { StoreType } from "../models/store-type";
import { createContext } from "react";
import { Course } from "../models/course-type";
import courseData from "../config/courseData.json"
import { getRandomDate, getRandomElement, getRandomInteger } from "../util/random";
import {Colledge} from "../models/colledge-type";

const N_RANDOM_COURSES = 10;
export const defaultColledge: Colledge = getDefaultColledge();

export const ColledgeContext = createContext<Colledge>(defaultColledge);

function getDefaultColledge(): Colledge {
    const courses: Course[] = getDefaultCourses();
    const colledge: Colledge = {courses};
    return colledge;
}
function getDefaultCourses(): Course[] {
    let courses: Course[] = [];
    let course: Course;  
    while (courses.length < N_RANDOM_COURSES) {
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




