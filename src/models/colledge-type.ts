import { Course } from "./course-type";


export type CoursesType = {
    courses: Course[];
    addCourse?: (course: Course) => void;
    removeCourse?: (courseId: number) => void;
}