import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { Course } from "../../models/course-type";
import { ColledgeContext } from "../../store/context";
import { getRandomCourse } from "../../util/courses-util";
import AddCourseForm from "../add-course-form";
import courseData from "../../config/courseData.json"

const AddCourse: React.FC = () => {
    //хук useContext() позволяет делать рендеринг компоненты по изменению глобального ресурсы
    const storeValue = useContext(ColledgeContext);
    const { courseNames, lecturers, types, timing } = courseData;
    return (
        <AddCourseForm 
            addCourseFn={async function (course: Course) {
                await storeValue.addCourse!(course);
            } }
            courseConfig={{
                courseNames,
                lecturers,
                types,
                timing,
            }} validateHoursFn={function (hours: number): string {
                if(hours >= courseData.minHours && hours <= courseData.maxHours) {
                    return "";
                } else {
                    return `Course duration must be within ${courseData.minHours} - ${courseData.maxHours}`
                }
            } } validateCostFn={function (cost: number): string {
                if(cost >= courseData.minCost && cost <= courseData.maxCost) {
                    return "";
                } else {
                    return `Course cost must be within ${courseData.minCost} - ${courseData.maxCost}`
                }
            } } validateDateFn={function (date: Date): string {
                const year = date.getFullYear();
                if(year >= courseData.minYear && year <= courseData.maxYear) {
                    return "";
                } else {
                    return `Incorrect open date, need a date in the range ${courseData.minYear} - ${courseData.maxYear}. `
                }
            } } validateDayEveningFn={function (dayEvening: string[]): string {
                if(dayEvening.length > 0) {
                    return "";
                } else {
                    return `Incorrect timing, please select options from the suggested ones. `
                }
            } } />
    )
    
    
    // <Box sx={{display: "flex", flexDirection: "column"}}>
    //         <Typography variant="h2">Add Course works </Typography>
    //         <Button  variant="contained" sx={{width: "250px"}}
    //         // проверяем на undefined. Если не undefined, то вызываем функцию
    //             onClick={() =>  storeValue.addCourse!(getRandomCourse())}>
    //                 Add random course</Button>
    //     </Box>
}

export default AddCourse;