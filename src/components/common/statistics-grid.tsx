import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { StatisticsLine } from '../../models/statistics-line-type';

type Statistics = {
    statistics: StatisticsLine[];
}
   

const StatisticsGrid: React.FC<Statistics> = (props) => {
    
    function getColumns(): GridColDef[] {       
        return Object.keys(props.statistics[0]).map(key => {
            const columnName: GridColDef = {field: key, headerName: key, width: 100};
            return columnName;
        })
    }

    function getRows(): any[] {
        let items: any[] = [];
        props.statistics.map((line, index) => {          
                    items.push(
                        {
                            id: index,
                            minInterval: line.minInterval,
                            maxInterval: line.maxInterval,
                            amount: line.amount,
                        },
                    )
            })
        return items;
    }
    
    return <div style={{ height: 400, width: "30%" }}>
    <DataGrid
        autoHeight
        hideFooter
        rows={getRows()}
        columns={getColumns()}
    />
    </div>
};
    
    export default StatisticsGrid;