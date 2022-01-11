import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { ColledgeContext } from "../../store/context";

const StatisticsCost: React.FC = () => {
    const storeValue = useContext(ColledgeContext);

    

    return <Typography>Cost statistics works.</Typography>
}

export default StatisticsCost;