import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React, {FC, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { Subscription } from 'rxjs';
import NavigatorResponsive from './components/common/navigator-responsive';
import {developmentRoutes, PATH_COURSES, PATH_LOGIN, routes} from './config/routes-сonfig';
import { authService, colledge } from './config/servicesConfig';
import { CoursesType } from './models/colledge-type';
import { RouteType } from './models/common/route-type';
import { UserData } from './models/common/user-data';
import { Course } from './models/course-type';

import { ColledgeContext, initialColledge} from './store/context';
import process from "process";


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
  let resRoutes = routes;
  if(process.env.NODE_ENV === 'development') {
    resRoutes = resRoutes.concat(developmentRoutes);
  }
  return resRoutes.filter(r => 
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
        next(ud: UserData) {
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
            //TODO
            // проверять на то, что нет алерта недоступности сервера, а затем получать новые курсы
            // если все ок, то скидывать флажок алерта в false через setFlagAlert(false)

            storeCoursesState.courses = arr;
            setStore({...storeCoursesState});
          },
          error(err: any) {
            console.log(err);
            
            //TODO
            //вывести флаг алерт (через useState) и не делать рендеринг Routes
            //периодически делать getData() через poling доступности сервера
            // setTimeout(getData, 2000);
            //если поток данных пошел, то надо убрать алерт
          }
      })
    } 
    const subscription = getData();
    return () => {
      subscription.unsubscribe();
    }
 }, [storeCoursesState.userData])
  
  function getRoutes(): ReactNode[] {
    return getRelevantRoutes(storeCoursesState.userData).map(r => <Route path={r.path} element={r.element} key={r.path}/>)
  }
  return <ColledgeContext.Provider value={storeCoursesState}>
    {/* Контекст провайдер - компонент, который обеспечивает объект глобального контекста */}
      <ThemeProvider theme={theme} >
    {/* Конфигурация раутинга  */}
        <BrowserRouter>
          <NavigatorResponsive items={getRelevantRoutes(storeCoursesState.userData)} />
          {/* TODO условный рендеринг алерта Server unavailable, если нет потока данных  */}
          {/* TODO условный рендеринг routes, если есть поток данных  */}
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




