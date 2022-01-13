import { Course } from "../models/course-type";

export default interface CoursesService {
    add(course: Course): Promise<Course>;
    remove(id: number): Promise<Course>;
    exists(id: number): Promise<boolean>;
    get(id?: number): Promise<Course[]> | Promise<Course>;
    update(id: number, newCourse: Course): Promise<Course>; //return the old version of the course
}