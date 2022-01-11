import { ListItem, ListItemText, List } from '@mui/material';
import React from 'react';

type Statistics = {
    statistics: any[];
}

const StatisticsList: React.FC<Statistics> = (props) => {
function getListItems(): React.ReactNode[] {
    let items: React.ReactNode[] = [];
    props.statistics.map(line => {          
                items.push(
                    <ListItem sx={{display:"flex"}}>
                        <ListItemText
                            primary= {JSON.stringify(line)}
                        />
                    </ListItem>
                )
        })
        return items;
}

    return <List>
    {getListItems()}
    </List>
};

export default StatisticsList;