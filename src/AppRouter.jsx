import { useRoutes } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx'
import Tickets from '../src/pages/Tickets/Tickets';
import Program from '../src/pages/Program/Program.jsx';
import Prizes from '../src/pages/Prizes/Prizes.jsx';

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
        element: <Program />,
        path: '/program',
      },
      {
        element: <Prizes />,
        path: '/prizes',
      },
    ],
  )
}

export default AppRouter;
