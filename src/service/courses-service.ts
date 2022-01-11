import { Course } from "../models/course-type";

export default interface CoursesService {
    add(course: Course): Course;
    remove(id: number): Course;
    exists(id: number): boolean;
    get(id?: number): Promise<Course[]> | Promise<Course>;
    update(id: number, newCourse: Course): Course;
}