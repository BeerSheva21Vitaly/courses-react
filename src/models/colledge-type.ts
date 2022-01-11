import { Course } from "./course-type";


export type Colledge = {
    courses: Course[];
    addCourse?: (course: Course) => void;
    removeCourse?: (courseId: number) => void;
}