import { Box, List, ListItem, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React, {FC, ReactNode, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import {PATH_COURSES, routes} from './config/routes-сonfig';
import { colledge, pollingInterval } from './config/servicesConfig';
import { CoursesType } from './models/colledge-type';
import { Course } from './models/course-type';
import PublisherNumbers from './publisher-numbers';

import { ColledgeContext, initialColledge} from './store/context';
import { addRandomCourse } from './util/courses-util';


const theme = createTheme();
// theme.typography.body1 = {
//   fontSize: "1.2rem",
//   "@media (min-width): 568px": {
//     fontSize: "1.5rem"
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "3rem"
//   }
// }

const App: FC = () => {
  const publisher = new PublisherNumbers();
  const [numbers, setNumbers] = useState<number[]>([]);
  
  
  useEffect(() => {
      const subscription = publisher.getNumbers().subscribe({
        next(arr: number[]) {
          setNumbers(arr);
        },
        // по вызову метода error() у subscriber'а подписка отключается
        error(err: any) {
          console.log(err);
        },
      })
      return () => subscription.unsubscribe();
    },
  [])

  function getItems(): React.ReactNode[] {
    return numbers.map((number, index) => {
      return <ListItem key={number}>
        <ListItemText primary= {`${index+1}. ${number}`} />
      </ListItem>
    });
}
  return <Box>
      <List>
          {getItems()}
      </List>
  </Box>
}

export default App;




