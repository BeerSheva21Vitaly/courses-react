import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import CoursesContext from "../../store/context";

const AddCourse: React.FC = () => {
    //хук useContext() позволяет делать рендеринг компоненты по изменению глобального ресурсы
    const storeValue = useContext(CoursesContext);
    return <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography variant="h2">Add Course works {storeValue.count}</Typography>
            <Button  variant="contained" sx={{width: "150px"}}
            // проверяем на undefined. Если не undefined, то вызываем функцию
                onClick={() => !!storeValue.increase && storeValue.increase()}>
                    Add count</Button>
        </Box>
}

export default AddCourse;