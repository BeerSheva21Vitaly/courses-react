import React, {FC, ReactNode} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {routes} from './config/routes-сonfig';

const App: FC = () => {
  function getRoutes(): ReactNode[] {
    return routes.map(r => <Route path={r.path} element={r.element} key={r.path}/>)
  }
  return <div>
   {/* Конфигурация раутинга  */}
    <BrowserRouter>
      <Routes>
        {getRoutes()}
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
