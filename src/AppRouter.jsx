import { useRoutes } from 'react-router-dom';
import Tickets from '../src/pages/Tickets/Tickets';


function AppRouter() {
  return useRoutes(
    [
      {
        element: <Tickets />,
        path: '/tickets',
      },
    ],
  )
}

export default AppRouter;
