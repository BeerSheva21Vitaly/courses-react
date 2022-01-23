import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { StatisticsLine } from "../../models/statistics-line-type";
import { ColledgeContext } from "../../store/context";
import { getStatisticsByKey } from "../../util/courses-util";
import StatisticsForm from "../common/statistics-form";
import StatisticsList from "../common/statistics-list";
import courseData from "../../config/courseData.json"
import StatisticsGrid from "../common/statistics-grid";
import StatisticsChart from "../common/statistics-graph";

const DEFAULT_INTERVAL: number = 5000;

const StatisticsCost: React.FC = () => {
    const storeValue = useContext(ColledgeContext);
    const [statistics, setStatistics] = useState<StatisticsLine[]>([]);
    
    function getStatisticsCost(interval?: number): StatisticsLine[] {
        const key: string = 'cost';
        const selectedInterval: number = !!interval ? interval : DEFAULT_INTERVAL;
        const statisticsCost = getStatisticsByKey(storeValue.courses, key, selectedInterval);
        return statisticsCost;
    }

    return <Box>
        <StatisticsForm 
            setStatisticsFn={function (interval: number) {
                setStatistics(getStatisticsCost(interval));
            }} intervals={courseData.costDivider} />
        {statistics.length > 0 && 
        <Box
            sx={{display: 'flex', flexDirection: "row"}}>
            <StatisticsGrid statistics= {statistics}/>
            <StatisticsChart statistics= {statistics} />
        </Box>}
    </Box>
}

export default StatisticsCost;



