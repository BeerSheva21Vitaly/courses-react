import { createContext } from "react";
import { Course } from "../models/course-type";
import {CoursesType} from "../models/colledge-type";
import { getDefaultCourses } from "../util/courses-util";

const N_RANDOM_COURSES = 10;
export const initialColledge: CoursesType = getDefaultColledge();

export const ColledgeContext = createContext<CoursesType>(initialColledge);

function getDefaultColledge(): CoursesType {
    const courses: Course[] = getDefaultCourses(N_RANDOM_COURSES);
    const colledge: CoursesType = {courses};
    return colledge;
}




