import { createContext } from "react";
import { Course } from "../models/course-type";
import {CoursesType} from "../models/colledge-type";
import { getDefaultCourses } from "../util/courses-util";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import {colledge} from "../config/servicesConfig";

const N_RANDOM_COURSES = 10;

export const initialColledge: CoursesType = getDefaultColledge();

export const ColledgeContext = createContext<CoursesType>(initialColledge);

function getDefaultColledge(): CoursesType {
    const courses: Course[] = [];
    const userData: UserData = nonAuthorizedUser;
    const res: CoursesType = {courses, userData,
        addCourse: (course) => colledge.addCourse(course),
        removeCourse: (course) => colledge.removeCourse(course),
        updateCourse: (id, course) => colledge.updateCourse(id, course),
    };
    return res;
}




