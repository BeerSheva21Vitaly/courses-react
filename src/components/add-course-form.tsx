import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Select, Typography, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox, FormGroup, FormHelperText } from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import { CourseConfigType } from '../models/course-config-type';
import { Course } from '../models/course-type';
import { getEmptyCourse } from '../util/courses-util';
import SelectItems from './common/select-items';

type AddCoursFormType = {
    addCourseFn: (course: Course) => void;
    validateHoursFn: (hours: number) => string;
    validateCostFn: (cost: number) => string;
    validateDateFn: (date: Date) => string;
    validateDayEveningFn: (dayEvening: string[]) => string;
    courseConfig: CourseConfigType;
}

const AddCourseForm: FC<AddCoursFormType> = (props) => {
    const { addCourseFn, validateHoursFn, validateCostFn, validateDateFn,
        validateDayEveningFn, courseConfig } = props;
    const [courseState, setCourse] = React.useState<Course>(getEmptyCourse());
    const [errorHoursMessage, setHoursErrorMessage] = React.useState<string>("");
    const [errorCostMessage, setCostErrorMessage] = React.useState<string>("");
    const [errorDateMessage, setDateErrorMessage] = React.useState<string>("");
    const [checkboxesErrorMessage, setDayEveningErrorMessage] = React.useState<string>("");
    const [flValid, setFlValid] = useState<boolean>(false);

    useEffect(() => {
        setFlValid(validateAll());
        return () => {}
    }, [courseState])

    function getSelectItems(values: string[]): React.ReactNode[] {
        let items: React.ReactNode[] = [];
        values.map((value, index) => {          
                    items.push(
                        <MenuItem key={index} value={value}>{value}</MenuItem>
                    )
            })
        return items;
    }
    function getRadioButtons(values: string[]): React.ReactNode[] {
        let items: React.ReactNode[] = [];
        values.map((value, index) => {          
                    items.push(
                        <FormControlLabel key={index} value={value} control={<Radio />} label={value} />
                    )
            })
        return items;
    }
    function getCheckboxes(values: string[]): React.ReactNode[] {
        let items: React.ReactNode[] = [];
        values.map((value, index) => {          
                    items.push(
                        <FormControlLabel
                            key={index}
                            control={
                            <Checkbox checked={isChecked(value)} onChange={handleCheckboxesChange} name="dayEvening" value={value} />
                            }
                            label={value} 
                        />
                    )
            })
        return items;
    }
    function isChecked(value: string): boolean {
        return courseState.dayEvening.indexOf(value) >= 0;
    }
    function handleChangeCourseName(event: any) {
        courseState.courseName = event.target.value;
        setCourse({...courseState});
    }
    function handleChangeLecturer(event: any) {
        courseState.lecturerName = event.target.value;
        setCourse({...courseState});
    }
    function handleChangeHours(event: any) {
        const enteredHours = event.target.value as number;
        const message = validateHoursFn(enteredHours);
        setHoursErrorMessage(message);
        courseState.hours = enteredHours;
        setCourse({...courseState});
    }
    function handleChangeCost(event: any) {
        const enteredCost = event.target.value as number;
        const message = validateCostFn(enteredCost);
        setCostErrorMessage(message);
        courseState.cost = enteredCost;
        setCourse({...courseState});
    }
    function handleChangeDate(event: any) {
        const enteredDate = new Date(event.target.value);
        const message = validateDateFn(enteredDate);
        setDateErrorMessage(message);
        courseState.openDate = enteredDate;
        setCourse({...courseState});
    }
    function handleChangeType(event: any) {
        courseState.type = event.target.value;
        setCourse({...courseState});
    }
    function handleCheckboxesChange(event: any) {
        const enteredDayEvening = courseState.dayEvening;
        if(event.target.checked) {
            enteredDayEvening.push(event.target.value);
        } else {
            const elementIndex: number = enteredDayEvening.findIndex(event.target.value);
            enteredDayEvening.splice(elementIndex, 1);
        } 
        const message = validateDayEveningFn(enteredDayEvening);
        setDayEveningErrorMessage(message);
        courseState.dayEvening = enteredDayEvening;
        setCourse({...courseState});
    }
    function validateAll(): boolean {
        return !validateHoursFn(courseState.hours)
            && !validateCostFn(courseState.cost)
            && !validateDateFn(courseState.openDate)
            && !validateDayEveningFn(courseState.dayEvening);
    }
    function resetFn() {
        setCourse(getEmptyCourse());
    }

    async function onSubmit(event: any) {
        event.preventDefault();
        try {
            await addCourseFn(courseState);
            resetFn();
        } catch (err) {
            alert("Course is not added because of an error");
        }
    }
    return (
        <Box 
            component ="form"
            onSubmit={onSubmit}
            sx={{display: "flex", flexDirection: "column", margin: 2}}>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="course-name-label">Course name</InputLabel>
                    <Select
                        required
                        labelId="course-name-label"
                        id="course-name-select"
                        value={courseState.courseName}
                        label="Course name"
                        onChange={handleChangeCourseName}
                    >                        
                         {getSelectItems(courseConfig.courseNames)}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="lecturer-label">Lecturer</InputLabel>
                    <Select
                        required
                        labelId="lecturer-label"
                        id="lecturer-select"
                        value={courseState.lecturerName}
                        label="Lecturer"
                        onChange={handleChangeLecturer}
                    >
                        {getSelectItems(courseConfig.lecturers)}
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <TextField
                     id="course-hours"
                     label="Hours"
                     variant="outlined"
                     type="number"
                     error={!!errorHoursMessage}
                     helperText={errorHoursMessage}
                     onChange={handleChangeHours} />
                <TextField
                     id="course-cost"
                     label="Cost"
                     variant="outlined"
                     type="number"
                     error={!!errorCostMessage}
                     helperText={errorCostMessage}
                     onChange={handleChangeCost} />                  
                <TextField
                     id="course-date"
                     variant="outlined"
                     type="date"
                     error={!!errorDateMessage}
                     helperText={errorDateMessage}
                     onChange={handleChangeDate} />                                
            </Box>
            <Box>
                <FormControl
                    required>
                    <FormLabel id="course-type-radio-buttons-group">Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="course-type-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={courseState.type}
                        onChange={handleChangeType}
                    >
                        {getRadioButtons(courseConfig.types)}
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <FormControl sx={{ m: 0 }} component="fieldset" variant="standard" error={!!checkboxesErrorMessage}>
                    <FormLabel component="legend">Timing</FormLabel>
                    <FormGroup>
                        {getCheckboxes(courseConfig.timing)}
                    </FormGroup>
                    {!checkboxesErrorMessage && <FormHelperText>{checkboxesErrorMessage}</FormHelperText>}
                </FormControl>
            </Box>
            <Box
                sx={{marginTop: 2}}>
                <Button type="submit" disabled ={!flValid} variant="contained">Add course</Button>
                <Button type="reset" onClick={resetFn}> Reset</Button>
            </Box>
            
        </Box>
    );
};

export default AddCourseForm;