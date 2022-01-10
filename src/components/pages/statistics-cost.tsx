import { Typography } from "@mui/material";
import React, { useContext } from "react";
import CoursesContext from "../../store/context";

const StatisticsCost: React.FC = () => {
    const storeValue = useContext(CoursesContext);
    return <Typography>Cost statistics works.
        Numer of digits in counter is {storeValue.count.toString().length}</Typography>
}

export default StatisticsCost;