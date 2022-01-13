import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ColledgeContext } from "../../store/context";
import { getStatisticsByKey } from "../../util/courses-util";
import StatisticsList from "../common/statistics-list";

const DEFAULT_INTERVAL = 100;

const StatisticsHours: React.FC = () => {
    const storeValue = useContext(ColledgeContext);
    const statisticsHours = getStatisticsHours();

    function getStatisticsHours() {
        const key = 'hours';
        const interval = DEFAULT_INTERVAL;
        const statisticsHours = getStatisticsByKey(storeValue.courses, key, interval);
        return statisticsHours;
    }

    return <Box>
            <StatisticsList statistics={statisticsHours} />
        </Box>
    
}

export default StatisticsHours;




