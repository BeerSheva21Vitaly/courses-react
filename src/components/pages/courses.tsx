import { Typography, Box, Button, List, ListItem, IconButton, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import {ColledgeContext} from "../../store/context";
import DeleteIcon from '@mui/icons-material/Delete';

const Courses: React.FC = () => {
    const storeValue = useContext(ColledgeContext);

    function getListItems(): React.ReactNode[] {
        const items: React.ReactNode[] = [];
         storeValue.courses.map(course => {          
                items.push(
                    <ListItem key={course.id}
                     secondaryAction={
                        storeValue.userData.isAdmin &&
                            <IconButton 
                                edge="end"
                                aria-label="delete" 
                                // onClick={() => !!storeValue.removeCourse && storeValue.removeCourse(course.id)}>
                                onClick={storeValue.removeCourse?.bind(course, course.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                    <ListItemText
                        primary= {JSON.stringify(course)}
                    />
                    </ListItem>
                )
        })
        return items;
    }

    return <Box component="div" >
            <Box component="div">
                <Typography>{`Courses: ${storeValue.courses.length}`}</Typography>
            </Box>
            <List>
                {getListItems()}
            </List>
        </Box>
}

export default Courses;


