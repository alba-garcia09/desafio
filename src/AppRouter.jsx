import { useRoutes } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx'
import Tickets from '../src/pages/Tickets/Tickets';
import Program from '../src/pages/Program/Program.jsx';
import Prizes from '../src/pages/Prizes/Prizes.jsx';
import Agenda from '../src/pages/Agenda/Agenda.jsx';
import Booking from '../src/pages/Booking/Booking.jsx';
import Stripe from '../src/pages/Stripe/Stripe.jsx';



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
      {
        element: <Agenda/>,
        path: '/agenda',
      },
      {
        element: <Booking/>,
        path: '/booking',
      },
      {
        element: <Stripe/>,
        path: '/stripe',
      },
    ],
  )
}

export default AppRouter;
