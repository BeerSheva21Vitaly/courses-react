import { UserData } from "./common/user-data";
import { Course } from "./course-type";


export type CoursesType = {
    courses: Course[];
    userData: UserData;
    addCourse?: (course: Course) => void;
    removeCourse?: (courseId: number) => void;
}