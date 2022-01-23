import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { StatisticsLine } from '../../models/statistics-line-type';
import { Title } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';

type Statistics = {
    statistics: StatisticsLine[];
}
   

const StatisticsChart: React.FC<Statistics> = (props) => {
    const theme = useTheme();

    function getData() {
        return props.statistics.map((line, index) => {
            return {
                x: `${line.minInterval} - ${line.maxInterval}`,
                y: line.amount,
            }
        })
    }
    
    return <div style={{ height: 400, width: "50%" }}>
        <React.Fragment>
        {/* <Title>Statistics</Title> */}
        <ResponsiveContainer>
            <LineChart
            data={getData()}
            margin={{
                top: 2,
                right: 0,
                bottom: 0,
                left: 12,
            }}
            >
            <XAxis
                dataKey="x"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
            />
            <YAxis
                dataKey="y"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
            >
                <Label
                angle={270}
                position="left"
                style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                }}
                >
                Number of courses
                </Label>
            </YAxis>
            <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="y"
                stroke={theme.palette.primary.main}
                dot={true}
            />
            </LineChart>
        </ResponsiveContainer>
        </React.Fragment>
    </div>
};
    
    export default StatisticsChart;