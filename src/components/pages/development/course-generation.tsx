import { Box, TextField, Button, Typography } from '@mui/material';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Course } from '../../../models/course-type';
import { ColledgeContext } from '../../../store/context';
import { getDefaultCourses } from '../../../util/courses-util';

const MAX_COURSES_NUMBER: number = 100;

const Generation: FC = () => {
    const storeValue = useContext(ColledgeContext);
    const [coursesNumber, setCoursesNumber] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isValid, setIsValid] = useState(false);
    useEffect(
        () => setIsValid(coursesNumber > 0 && coursesNumber <= 100),
        [coursesNumber])

    function  handleChange(event: any) {
        const enteredNumber = event.target.value;
        if(isValidFn(enteredNumber)) {
            setCoursesNumber(enteredNumber);
        }
    }
    function isValidFn(enteredNumber: number): boolean {
        if(enteredNumber > 0 && enteredNumber <= MAX_COURSES_NUMBER) {
            setErrorMessage('');
            setCoursesNumber(enteredNumber);
            return true;
        } else {
            setErrorMessage(`Number must be within a range 0 - ${MAX_COURSES_NUMBER}`);
            setCoursesNumber(0);
            return false;
        }
    }
    async function onSubmit(event: any) {
        event.preventDefault();
        const randomCourses = getDefaultCourses(coursesNumber);
        // randomCourses.forEach(async (randomCourse) => await storeValue.addCourse!(randomCourse));
        for(let randomCourse of randomCourses) {
            await addRandomCourse(randomCourse);
        }
        event.target.reset();
        setCoursesNumber(0);
    }
    async function addRandomCourse(course: Course) {
        await storeValue.addCourse!(course);
    }

    return (
        <Box 
            component ="form"
            id="form"
            onSubmit={onSubmit}
            sx={{display: "flex", flexDirection: "column", margin: 2}}>
            <Box component="div">
                <Typography>{`Courses: ${storeValue.courses.length}`}</Typography>
            </Box>
            <Box>
                <TextField
                     id="course-qty"
                     label="Quantity"
                     placeholder="For example, 10"
                     variant="outlined"
                     type="number"
                     error={!!errorMessage}
                     helperText={errorMessage}
                     onChange={handleChange} />
            </Box>
            <Box
                sx={{marginTop: 2}}>
                <Button type="submit" disabled ={!isValid} variant="contained">Add course</Button>
            </Box>           
        </Box>
    );
};

export default Generation;