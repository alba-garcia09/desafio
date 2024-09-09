// src/AppRouter.jsx
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Tickets from './pages/Tickets/Tickets';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

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
