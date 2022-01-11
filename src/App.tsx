import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React, {FC, ReactNode, useContext, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import {PATH_COURSES, routes} from './config/routes-сonfig';
import { Colledge } from './models/colledge-type';
import { ColledgeContext, defaultColledge, addRandomCourse } from './store/context';

// настройка кастомных стилей элементов matreial ui делается через theme
// 1. создаем объекты "тема по умолчанию"
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
  
  //хук, который будет обрабатывать изменения ресурса типа StoreValue, который хранит глобальный контекст
  const [storeCoursesState, setStore] = React.useState<Colledge>(defaultColledge);

  storeCoursesState.addCourse = addCourse;
  storeCoursesState.removeCourse = removeCourse
  
  function addCourse() {
    addRandomCourse(storeCoursesState.courses);
    setStore({...storeCoursesState});
  }

  function removeCourse(courseId: number) {
    const courseIndex = storeCoursesState.courses.findIndex(c => c.id === courseId);
    if(courseIndex >= 0) {
      storeCoursesState.courses.splice(courseIndex, 1);
      setStore({...storeCoursesState});
    } else {
      throw `Course with id ${courseId} can't be removed from Colledge because there is no course with this id`
    }
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
