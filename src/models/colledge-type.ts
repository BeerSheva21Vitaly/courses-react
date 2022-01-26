import { UserData } from "./common/user-data";
import { Course } from "./course-type";


export type CoursesType = {
    courses: Course[];
    userData: UserData;
    addCourse: (course: Course) => Promise<Course>;
    removeCourse: (courseId: number) => Promise<Course>;
    updateCourse: (courseId: number, newCourse: Course) => Promise<Course>;
}