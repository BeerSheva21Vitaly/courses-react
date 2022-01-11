import courseData from "../config/courseData.json";

export type Course = {
    id: number;
    courseName: string;
    lecturerName: string;
    hours: number;
    cost: number;
    type: string;
    dayEvening: string[];
    openDate: Date;
}