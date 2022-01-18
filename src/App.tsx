import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React, {FC, ReactNode, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { Subscription } from 'rxjs';
import NavigatorResponsive from './components/common/navigator-responsive';
import {PATH_COURSES, PATH_LOGIN, routes} from './config/routes-сonfig';
import { authService, colledge } from './config/servicesConfig';
import { CoursesType } from './models/colledge-type';
import { RouteType } from './models/common/route-type';
import { UserData } from './models/common/user-data';
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
function getRelevantRoutes(userData: UserData): RouteType[] {
  return routes.filter(r => 
    (!!userData.username && r.authenticated) //попадают route'ы, которые должны быть у авторизованных
    || (userData.isAdmin && r.adminOnly) // попадают route'ы, которые должны быть у админа
    || (!userData.username && !r.authenticated && !r.adminOnly)) //попадают route'ы для неавторизованных
}
const App: FC = () => {
  // получение состояния данных авторизации пользователя
  useEffect(() => {
  console.log("effectUserData");
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
  const subscriptionUserData = getUserData();
  return () => {
    subscriptionUserData.unsubscribe();
  }
}, [])

const [storeCoursesState, setStore] = React.useState<CoursesType>(initialColledge);

 // получение состояния данных курсов
  useEffect(() => {
    console.log("effectCoursesData");
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
    storeCoursesState.addCourse = addCourse;
    storeCoursesState.removeCourse = removeCourse;
    const subscription = getData();
    return () => {
      subscription.unsubscribe();
    }
 }, [storeCoursesState.userData])


  
  async function addCourse(course: Course) {
    await colledge.addCourse(course);
  }

  async function removeCourse(courseId: number) {
    await colledge.removeCourse(courseId);
  }
  
  function getRoutes(): ReactNode[] {
    return getRelevantRoutes(storeCoursesState.userData).map(r => <Route path={r.path} element={r.element} key={r.path}/>)
  }
  return <ColledgeContext.Provider value={storeCoursesState}>
    {/* Контекст провайдер - компонент, который обеспечивает объект глобального контекста */}
      <ThemeProvider theme={theme} >
    {/* Конфигурация раутинга  */}
        <BrowserRouter>
          <NavigatorResponsive items={getRelevantRoutes(storeCoursesState.userData)} />
          <Routes>
            {getRoutes()}
            {/* Редирект с главной страницы приложения на страницу курсов */}
            <Route path="/" 
            element={<Navigate 
              to={!!storeCoursesState.userData.username ? PATH_COURSES : PATH_LOGIN} />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColledgeContext.Provider> 
}

export default App;




