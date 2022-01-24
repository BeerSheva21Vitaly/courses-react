import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { FC, ReactNode } from 'react';

const Details: FC<{data: {key: string, value: string}[]}> = (props) => {
    function getItems(): ReactNode[] {
        return props.data.map(obj => {
            return <ListItem disablePadding>
              <ListItemText
                primary={obj.key}
                secondary={obj.value} />
          </ListItem>
        })
    }
    
    return (
        <List>
          {getItems()}
        </List>
    );
};

export default Details;