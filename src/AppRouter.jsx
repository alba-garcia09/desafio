// src/AppRouter.jsx
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tickets from './pages/Tickets/Tickets';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

function AppRouter() {
  return useRoutes(
    [
      {
        element: <Home />,
        path: '/',
      },
      {
        element: <Tickets />,
        path: '/tickets',
      },
      {
        element: <LoginPage />,
        path: '/login',
      },
      {
        element: <RegisterPage />,
        path: '/register',
      },
    ],
  );
}

export default AppRouter;
