import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ColledgeContext } from "../../store/context";
import { getStatisticsByKey } from "../../util/courses-util";
import StatisticsList from "../common/statistics-list";

const DEFAULT_INTERVAL: number = 5000;

const StatisticsCost: React.FC = () => {
    const storeValue = useContext(ColledgeContext);
    const statistics = getStatisticsCost();
    
    function getStatisticsCost() {
        const key: string = 'cost';
        const interval: number = DEFAULT_INTERVAL;
        const statisticsCost = getStatisticsByKey(storeValue.courses, key, interval);
        return statisticsCost;
    }


    return <Typography>
        <StatisticsList statistics= {statistics}/>
    </Typography>
}

export default StatisticsCost;



