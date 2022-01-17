import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React, {FC, ReactNode, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { Subscription } from 'rxjs';
import NavigatorResponsive from './components/common/navigator-responsive';
import {PATH_COURSES, routes} from './config/routes-сonfig';
import { authService, colledge } from './config/servicesConfig';
import { CoursesType } from './models/colledge-type';
import { Course } from './models/course-type';

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
  useEffect(() => {
    console.log("effect");
    function getData(): Subscription {
        return colledge.getAllCourses().subscribe({
          next(arr) {
            storeCoursesState.courses = arr;
            setStore({...storeCoursesState});
          },
          error(err: any) {
            console.log(err);
          }
      })
    } 
    function getUserData(): Subscription {
        return authService.getUserData().subscribe({
          next(ud) {
            storeCoursesState.userData = ud;
            setStore({...storeCoursesState});
          },
          error(err: any) {
            console.log(err);
          }
      })
    }
    storeCoursesState.addCourse = addCourse;
    storeCoursesState.removeCourse = removeCourse;
    const subscriptionUserData = getUserData();
    const subscription = getData();
    return () => {
      subscription.unsubscribe();
      subscriptionUserData.unsubscribe();
    }
 }, [])

 const [storeCoursesState, setStore] = React.useState<CoursesType>(initialColledge);

  
  
  async function addCourse(course: Course) {
    await colledge.addCourse(course);
  }

  async function removeCourse(courseId: number) {
    await colledge.removeCourse(courseId);
  }
  
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route path={r.path} element={r.element} key={r.path}/>)
  }
  return <ColledgeContext.Provider value={storeCoursesState}>
    {/* Контекст провайдер - компонент, который обеспечивает объект глобального контекста */}
      <ThemeProvider theme={theme} >
    {/* Конфигурация раутинга  */}
        <BrowserRouter>
          <NavigatorResponsive items={routes} />
          <Routes>
            {getRoutes()}
            {/* Редирект с главной страницы приложения на страницу курсов */}
            <Route path="/" element={<Navigate to={PATH_COURSES}></Navigate>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColledgeContext.Provider> 
}

export default App;




