import { Box, Paper} from "@mui/material";
import React, { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {ColledgeContext} from "../../store/context";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridActionsCellItem, GridCellEditCommitParams, GridRowId, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import { UserData } from "../../models/common/user-data";
import { Course } from "../../models/course-type";
import DialogConfirmation from "../common/dialog-confirmation";
import Details from "../common/details";
import DialogInfo from "../common/dialog-info";
import { useMediaQuery } from "react-responsive";
import dashboardConfig from "../../config/dashboardConfig.json";
import courseData from "../../config/courseData.json"


function getRows(courses: Course[]): GridRowsProp {
    return courses.map(course => (course));
}
const Courses: React.FC = () => {
    const storeValue = useContext(ColledgeContext);
    const isMobileLandscape = useMediaQuery({ query: '(min-width: 600px)' });
    const isLaptop = useMediaQuery({ query: '(min-width: 900px)' });
    
    const [columns, setColumns] = useState(getColumns(storeValue.userData));
    const [isRemoveDialogVisible, setIsRemoveDialogVisible] = React.useState(false);
    const [isDetailedDialogVisible, setIsDetailedDialogVisible] = React.useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(0);
    const rows = useMemo(() => getRows(storeValue.courses), [storeValue.courses]);

    useEffect(() => {
         setColumns(getColumns(storeValue.userData));
         return () => {};
    }, [storeValue.userData, isMobileLandscape, isLaptop]);

    const handleRemoveClickOpen = (id: GridRowId) => () => {
                setSelectedCourseId(+id.valueOf());
                setIsRemoveDialogVisible(true);
            };
    const handleDetailsClickOpen = (row: any) => () => {
        setSelectedCourseId((row as Course).id);
        setIsDetailedDialogVisible(true);
    };
    function getAvailableActions(userData: UserData, params: GridRowParams) {
        const actions: any[] = [];
        actions.push(
            <GridActionsCellItem
                icon={<InfoIcon />}
                label="Details"
                onClick={handleDetailsClickOpen(params.row)}
            />
        )
        if(!!userData.isAdmin) {
            actions.push(
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleRemoveClickOpen(+params.id.valueOf())}
            />)
        }
        return actions;
    }  
    function getColumns(userData: UserData): any[] {
        const allColumns = [
            {field: 'courseName', headerName: 'Course Name', flex: 150, align: 'center', headerAlign: 'center'},
            {field: 'lecturerName', type: 'singleSelect', valueOptions: courseData.lecturers, headerName: 'Lecturer', editable: !!userData.isAdmin, flex: 100, align: 'center', headerAlign: 'center'},
            {field: 'hours', headerName: 'Hours', type: 'number', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center',
            preProcessEditCellProps: (params: any) => {
                const hours = +params.props.value;
                const hasError = hours < courseData.minHours || hours > courseData.maxHours;
                return { ...params.props, error: hasError };
              },},
            {field: 'cost', headerName: 'Cost', type: 'number', editable: !!userData.isAdmin, align: 'center', headerAlign: 'center'},
            {field: 'openDate', headerName: 'Start date', type: 'date', editable: !!userData.isAdmin, flex: 150, align: 'center', headerAlign: 'center'},
            {field: 'actions', headerName: 'Actions', type: 'actions', flex: 100, align: 'center', headerAlign: 'center', 
                getActions: (params: GridRowParams) => {
                    return getAvailableActions(userData, params);
                }}
        ];
        if(isLaptop) {
            return allColumns;       
        } else {
            const availableColumnNames: string[] = getAvailableColumnNames();
            return allColumns.filter(column =>  availableColumnNames.includes(column.field))
        }        
    }
    function getAvailableColumnNames(): string[] {
        let res: string [];
        if(isMobileLandscape) {
            res = dashboardConfig.mobileLandscape;
        } else {
            res = dashboardConfig.mobilePortrait;
        }
        return res;
    }
    function getDialogData(): ReactNode {
        return (
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
    function onEdit(params: GridCellEditCommitParams) {
        console.log(params);
        //TODO launch confirmation dialog and handle dialog result
    }

    return <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    '& .Mui-error': {
                        bgcolor: (theme) =>
                          `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
                        color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
                      },
                    }}>
                <Paper
                    sx={{
                        width: '80vw',
                        height: '80vh'
                    }}> 
                    <DataGrid columns={columns} rows={rows} onCellEditCommit={onEdit} />
                </Paper>
                <DialogConfirmation
                    isVisible={isRemoveDialogVisible}
                    dialogTitle={'Remove course'}
                    dialogContentText={`Would you like to remove course with ID ${selectedCourseId}?`}
                    handleCloseFn={async function (isOk: boolean) {
                       if(isOk) {
                           await storeValue.removeCourse!(selectedCourseId);
                       }
                       setIsRemoveDialogVisible(false);
                    } }
                />
                <DialogInfo
                    isVisible={isDetailedDialogVisible}
                    dialogTitle={'Course details'}
                    dialogData = {getDialogData()}
                    handleCloseFn={function () {
                       setIsDetailedDialogVisible(false);
                    } }
                />
        </Box>
}

export default Courses;


