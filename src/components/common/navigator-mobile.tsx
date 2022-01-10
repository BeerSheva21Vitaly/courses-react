import {AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import React from 'react';
import { RouteType } from '../../models/common/route-type';
import { Link, useLocation } from 'react-router-dom';
const drawerWidth = 240;
const NavigatorMobile: React.FC<{items: RouteType[]}> = (props) => {
    const location = useLocation();
    let activeItem = props.items.find(item => location.pathname == item.path);
    
    const [open, setState] = React.useState(false);
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
        
            setState(open);
        };

    function getListItems(): React.ReactNode[] {
        return props.items.map((item) => (
            <ListItem key={item.label} button component={Link} to={item.path}  onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText disableTypography sx={{fontSize: '1rem'}} primary={item.label} />
            </ListItem>
          ))
    }
    return <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                {activeItem ? activeItem.label : props.items[0].label}
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
        >
        <List>
          {getListItems()}
        </List>
      </Drawer>
      </Box>
};

export default NavigatorMobile;


