import { createContext } from "react";
import { Course } from "../models/course-type";
import {Colledge} from "../models/colledge-type";
import { getDefaultCourses } from "../util/courses-util";

const N_RANDOM_COURSES = 10;
export const initialColledge: Colledge = getDefaultColledge();

export const ColledgeContext = createContext<Colledge>(initialColledge);

function getDefaultColledge(): Colledge {
    const courses: Course[] = getDefaultCourses(N_RANDOM_COURSES);
    const colledge: Colledge = {courses};
    return colledge;
}




