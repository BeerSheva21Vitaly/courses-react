import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React, {FC, ReactNode, useContext, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import NavigatorResponsive from './components/common/navigator-responsive';
import {PATH_COURSES, routes} from './config/routes-сonfig';
import { StoreType } from './models/store-type';
import CoursesContext, {defaultValue} from './store/context';

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
  const [storeValueState, setStore] = React.useState<StoreType>(defaultValue);
 
  //определяем способы изменения состояния ресурса и сохраняем их в поля ресурса
  storeValueState.increase = increaseCount;
  storeValueState.decrease = decreaseCount;
  
  function increaseCount() {
    storeValueState.count++;
    //с помощью деструктуризации создаем новый объект с новой ссылкой - копию старого объекта. Иначе рендеринга не будет
    setStore({...storeValueState});
  }

  function decreaseCount() {
    storeValueState.count--;
    //с помощью деструктуризации создаем новый объект с новой ссылкой - копию старого объекта. Иначе рендеринга не будет
    setStore({...storeValueState});
  }

  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route path={r.path} element={r.element} key={r.path}/>)
  }
  return <CoursesContext.Provider value={storeValueState}>
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
    </CoursesContext.Provider> 
}

export default App;
