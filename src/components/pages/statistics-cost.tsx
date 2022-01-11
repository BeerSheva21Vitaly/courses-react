import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { Course } from "../../models/course-type";
import { ColledgeContext } from "../../store/context";
import _ from "lodash";

const DEFAULT_INTERVAL: number = 5000;

const StatisticsCost: React.FC = () => {
    const storeValue = useContext(ColledgeContext);
    const statisticsCost = getStatisticsCost();
    
function getStatisticsCost() {
    const key: string = 'cost';
    const interval: number = DEFAULT_INTERVAL;
    const statisticsCost = getStatisticsByKey(storeValue.courses, key, interval);
}
    return <Typography>Cost statistics works.</Typography>
}

export default StatisticsCost;

export function getStatisticsByKey(courses: Course[], key: string, interval: number) {
    let objStat =  _.countBy(courses, e => {   
        const courseCost: number = e[key];
        return Math.floor(courseCost / interval) * interval;
     });
     return getInterval(objStat, interval);
}

function getInterval(objStat, interval){
    let res = [];
    for (let key in objStat) {
        let minInterval = key;
        let maxInterval = +key + +interval - 1;
        let amount = objStat[key];
        res.push({minInterval:minInterval, maxInterval:maxInterval, amount:amount});
      }
    return res;
}

