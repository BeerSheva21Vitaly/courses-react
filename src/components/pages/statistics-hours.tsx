import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { ColledgeContext } from "../../store/context";
import { getStatisticsByKey } from "../../util/courses-util";
import StatisticsForm from "../common/statistics-form";
import StatisticsChart from "../common/statistics-graph";
import StatisticsGrid from "../common/statistics-grid";
import StatisticsList from "../common/statistics-list";
import courseData from "../../config/courseData.json"
import { StatisticsLine } from "../../models/statistics-line-type";

const DEFAULT_INTERVAL = 100;

const StatisticsHours: React.FC = () => {
    const storeValue = useContext(ColledgeContext);
    const [statistics, setStatistics] = useState<StatisticsLine[]>([]);

    function getStatisticsHours(interval?: number): StatisticsLine[] {
        const key = 'hours';
        const selectedInterval: number = !!interval ? interval : DEFAULT_INTERVAL;
        const statisticsHours = getStatisticsByKey(storeValue.courses, key, selectedInterval);
        return statisticsHours;
    }

    return <Box>
           <StatisticsForm 
            setStatisticsFn={function (interval: number) {
                setStatistics(getStatisticsHours(interval));
        } } intervals={courseData.hoursDivider} />
        {statistics.length > 0 && 
        <Box
            sx={{display: 'flex', flexDirection: "row"}}>
            <StatisticsGrid statistics= {statistics}/>
            <StatisticsChart statistics= {statistics} />
        </Box>}
        </Box>
    
}

export default StatisticsHours;




