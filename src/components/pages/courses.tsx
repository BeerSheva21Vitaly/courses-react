import { Typography, Box, Button, List, ListItem, IconButton, ListItemText, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { FC, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {ColledgeContext} from "../../store/context";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import { UserData } from "../../models/common/user-data";
import { Course } from "../../models/course-type";
import DialogConfirmation from "../common/dialog-confirmation";
import Details from "../common/details";


function getRows(courses: Course[]): GridRowsProp {
    return courses.map(course => (course));
}
const Courses: React.FC = () => {
    const storeValue = useContext(ColledgeContext);
    const [columns, setColumns] = useState(getColumns(storeValue.userData));
    const [isRemoveDialogVisible, setIsRemoveDialogVisible] = React.useState(false);
    const [isDetailedDialogVisible, setIsDetailedDialogVisible] = React.useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(0);
    const rows = useMemo(() => getRows(storeValue.courses), [storeValue.courses])
    useEffect(() => {
         setColumns(getColumns(storeValue.userData));
         return () => {};
    }, [storeValue.userData]);

    const handleRemoveClickOpen = (id: GridRowId) => () => {
                setSelectedCourseId(+id.valueOf());
                setIsRemoveDialogVisible(true);
            };
    const handleDetailsClickOpen = (id: GridRowId) => () => {
        setSelectedCourseId(+id.valueOf());
        setIsDetailedDialogVisible(true);
    };

    function getAvailableActions(userData: UserData, id: number) {
        const actions: any[] = [];
        actions.push(
            <GridActionsCellItem
                icon={<InfoIcon />}
                label="Details"
                onClick={handleDetailsClickOpen(id)}
            />
        )
        if(!!userData.isAdmin) {
            actions.push(
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleRemoveClickOpen(id)}
            />)
        }
        return actions;
    }
    
    function getColumns(userData: UserData): any[] {
        return [
            {field: 'courseName', headerName: 'Course Name', flex: 150, align: 'center', headerAlign: 'center'},
            {field: 'lecturerName', headerName: 'Lecturer', editable: !!userData.isAdmin, flex: 100, align: 'center', headerAlign: 'center'},
            {field: 'hours', headerName: 'Hours', type: 'number', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center'},
            {field: 'cost', headerName: 'Cost', type: 'number', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center'},
            {field: 'openDate', headerName: 'Start date', type: 'date', editable: !!userData.isAdmin, flex: 150, align: 'center', headerAlign: 'center'},
            {field: 'actions', headerName: 'Actions', type: 'actions', flex: 100, align: 'center', headerAlign: 'center', 
                getActions: (params: GridRowParams) => {
                    return getAvailableActions(userData, +params.id.valueOf());
                }}
            // {field: 'actions', headerName: 'Actions', type: 'actions'},
            //TODO actions (remove, details, accept updates)
        ]
    }
    function getDialogData(): ReactNode {
        return (
        // <Box>
        //     {JSON.stringify(storeValue.courses.find(course => course.id === selectedCourseId))}
        // </Box>
            <Details 
                data={getCourseData(storeValue.courses.find(course => course.id === selectedCourseId))} />
        )
    }

    function getCourseData(course?: Course): {key: string, value: string}[] {
        let res = [];
        if(!!course) {
            for(let key in course) {
                res.push({key:key, value: (course as any)[key].toString()});
            }
        }
        return res;
    }

    return <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    }}>
                <Paper
                    sx={{
                        width: '80vw',
                        height: '80vh'
                    }}> 
                    <DataGrid columns={columns} rows={rows} />
                </Paper>
                <DialogConfirmation
                    isVisible={isRemoveDialogVisible}
                    isCancelAvailable={true}
                    dialogTitle={'Remove course'}
                    dialogContentText={`Would you like to remove course with ID ${selectedCourseId}?`}
                    handleAgreeFn={async function () {
                       await storeValue.removeCourse!(selectedCourseId);
                       setIsRemoveDialogVisible(false);
                    } }
                />
                <DialogConfirmation
                    isVisible={isDetailedDialogVisible}
                    isCancelAvailable={false}
                    dialogTitle={'Course details'}
                    dialogData = {getDialogData()}
                    handleAgreeFn={async function () {
                       setIsDetailedDialogVisible(false);
                    } }
                />
        </Box>
}

export default Courses;


