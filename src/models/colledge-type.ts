import { Course } from "./course-type";


export type Colledge = {
    courses: Course[];
    addCourse?: () => void;
    removeCourse?: (courseId: number) => void;
}