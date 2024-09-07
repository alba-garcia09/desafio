import { useRoutes } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx'
import Tickets from '../src/pages/Tickets/Tickets';


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
    ],
  )
}

export default AppRouter;
