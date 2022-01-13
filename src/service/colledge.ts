import { Course } from "../models/course-type";
import { getRandomInteger } from "../util/common/random";
import CoursesService from "./courses-service";
import courseData from "../config/courseData.json"

export default class Colledge {
    constructor(private coursesService: CoursesService) {}

    async addCourse(course: Course): Promise<Course> {
        if (!this.validate(course)) {
            throw "Validation failed"
        }
        const id = await this.getId();
        course.id = id;
        return await this.coursesService.add(course)
    }
    removeCourse(id: number): Promise<Course> {
        return this.coursesService.remove(id);
    }
    updateCourse(id: number, newCourse: Course): Promise<Course>{
        return this.coursesService.update(id, newCourse);
    }
    getAllCourses(): Promise<Course[]> {
        return this.coursesService.get() as Promise<Course[]>;
    }
    getCourse(id: number): Promise<Course> {
        return this.coursesService.get(id) as Promise<Course>;
    }
    async getId() {
        let randomId;
        do {
            randomId = getRandomInteger(courseData.minId, courseData.maxId);
        } while (await this.coursesService.exists(randomId))
        return randomId;
    }

    validate(course: Course) {
        const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseNames, lecturers, types, timing } = { ...courseData };
        let { courseName, lecturerName, hours, cost, type, dayEvening, openDate } = { ...course };
        const year = openDate.getFullYear();
        const checkName = courseNames.includes(courseName);
        const checkLecturer = lecturers.includes(lecturerName);
        const checkHours = (hours >= minHours && hours <= maxHours);
        const checkCost = (cost >= minCost && cost <= maxCost);
        const checkType = types.includes(type);
        dayEvening = dayEvening.filter(e => timing.includes(e));
        const checkDayEvening = (dayEvening.length > 0 && dayEvening.length <= timing.length);
        const checkStartDate = (year >= minYear && year <= maxYear);

        let strError = '';
        strError += !checkName ? `Incorrect course name, please select one option from the list. ` : '';
        strError += !checkLecturer ? `Incorrect lecture name, please select one option from the list. ` : '';
        strError += !checkHours ? `Incorrect hours, need a number in the range ${minHours} - ${maxHours}. ` : '';
        strError += !checkCost ? `Incorrect cost, need a number in the range ${minCost} - ${maxCost}. ` : '';
        strError += !checkStartDate ? `Incorrect open date, need a date in the range ${minYear} - ${maxYear}. ` : '';
        strError += !checkType ? `Incorrect type, need to choose one of the options. ` : '';
        strError += !checkDayEvening ? `Incorrect timing, please select options from the suggested ones. ` : '';
        if (strError.length > 0) {
            throw strError;
        }
        return true;
    }
}