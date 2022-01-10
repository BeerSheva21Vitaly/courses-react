import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React, {FC, ReactNode} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import NavigatorMobile from './components/common/navigator-mobile';
import NavigatorWeb from './components/common/navigator-web';
import {PATH_COURSES, routes} from './config/routes-сonfig';

// настройка кастомных стилей элементов matreial ui делается через theme
// 1. создаем объекты "тема по умолчанию"
const theme = createTheme();
theme.typography.body1 = {
  fontSize: "1.2rem",
  "@media (min-width): 568px": {
    fontSize: "1.5rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem"
  }
}

const App: FC = () => {
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route path={r.path} element={r.element} key={r.path}/>)
  }
  return  <ThemeProvider theme={theme} >
   {/* Конфигурация раутинга  */}
      <BrowserRouter>
        {/* <NavigatorWeb > */}
        <NavigatorMobile items={routes} />
        <Routes>
          {getRoutes()}
          {/* Редирект с главной страницы приложения на страницу курсов */}
          <Route path="/" element={<Navigate to={PATH_COURSES}></Navigate>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
}

export default App;
