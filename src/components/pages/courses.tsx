import { Typography, Box, Button } from "@mui/material";
import React, { useContext } from "react";
import CoursesContext from "../../store/context";

const Courses: React.FC = () => {
    const storeValue = useContext(CoursesContext);

    return <Box>
            <Typography variant="h2">Courses works {storeValue.count}</Typography>
            <Button variant="outlined" onClick={storeValue.decrease}>Decrease count</Button>
        </Box>
}

export default Courses;