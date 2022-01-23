import { Box, FormControl, InputLabel, Select, Button, MenuItem } from '@mui/material';
import React, { FC, useState } from 'react';
import { LoginData } from '../../models/common/login-data';
import { StatisticsLine } from '../../models/statistics-line-type';

type StatisticsFormType = {
    setStatisticsFn: (interval: number) => void;
    intervals: number[]
}

const StatisticsForm: FC<StatisticsFormType> = (props) => {
        const {setStatisticsFn, intervals} = props;

        const [selectedInterval, setInterval] = useState<number>(intervals[0]);

        function getSelectItems(): React.ReactNode[] {
            let items: React.ReactNode[] = [];
            intervals.map((value, index) => {          
                        items.push(
                            <MenuItem key={index} value={value}>{value}</MenuItem>
                        )
                })
            return items;
        }

        function handleChangeInterval(event: any) {
            setInterval(event.target.value);
        }

        function onSubmit(event: any) {
            event.preventDefault();
            try {
                setStatisticsFn(selectedInterval as number);
                resetFn();
            } catch (err) {
                alert("Statistics cant be shown because of an error");
            }
        }
        function resetFn() {
            setInterval(intervals[0]);
        }

    return (
        <Box 
            component ="form"
            onSubmit={onSubmit}
            sx={{display: "flex", flexDirection: "column", margin: 2}}>
            <Box>
                <FormControl>
                    <InputLabel id="select-interval-label">Select interval</InputLabel>
                    <Select
                        required
                        labelId="select-interval-label"
                        id="interval-select"
                        value={selectedInterval}
                        label="Interval"
                        onChange={handleChangeInterval}
                        sx={{minWidth: 200}}
                    >                        
                         {getSelectItems()}
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{marginTop: 2}}>
                <Button type="submit" disabled ={!selectedInterval} variant="contained">Show statistics</Button>
                <Button type="reset"> Reset</Button>
            </Box>           
        </Box>
    );
};

export default StatisticsForm;