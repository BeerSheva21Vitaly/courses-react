import { Tabs, Tab } from '@mui/material';
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteType } from '../../models/common/route-type';

function getInitialTabIndex(path: string, items: RouteType[]): number {
        let res = items.findIndex(item => path === item.path);
        return res < 0 ? 0 : res;
    }

const NavigatorWeb: React.FC<{items: RouteType[]}> = (props) => {
    //useLocation() возвразщает локацию, в которой сейчас находится пользователь приложения
    const location = useLocation();
    
   const [activeTabIndex, setActiveTab] = React.useState(getInitialTabIndex(location.pathname,
        props.items));
    function getTabs(): React.ReactNode[] {
        return props.items.map(item => 
        <Tab key={item.label} component={Link} to={item.path} label={item.label} />)
   }
   function onChangeHandler(event: any, newValueNumber: number) {
        setActiveTab(newValueNumber);
   }
   return <Tabs value={activeTabIndex} onChange={onChangeHandler}>
        {getTabs()}
    </Tabs>
};

export default NavigatorWeb;


