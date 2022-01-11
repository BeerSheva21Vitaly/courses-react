import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { ColledgeContext } from "../../store/context";
import { getRandomCourse } from "../../util/courses-util";

const AddCourse: React.FC = () => {
    //хук useContext() позволяет делать рендеринг компоненты по изменению глобального ресурсы
    const storeValue = useContext(ColledgeContext);
    return <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography variant="h2">Add Course works </Typography>
            <Button  variant="contained" sx={{width: "250px"}}
            // проверяем на undefined. Если не undefined, то вызываем функцию
                onClick={() =>  storeValue.addCourse!(getRandomCourse())}>
                    Add random course</Button>
        </Box>
}

export default AddCourse;