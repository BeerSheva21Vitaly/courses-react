import { MenuItem, Typography } from '@mui/material';
import React, {FC} from 'react';

const SelectItems: FC<{items: string[]}> = (props) => {
    function getSelectItems(): React.ReactNode[] {
        let items: React.ReactNode[] = [];
        props.items.map((item, index) => {          
                    items.push(
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    )
            })
            return items;
    }
    return <Typography>
        {getSelectItems()}
    </Typography>
};

export default SelectItems;