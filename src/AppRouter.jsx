
import { useRoutes } from 'react-router-dom';

// Importaciones de ambos conjuntos de cambios
import Home from './pages/Home/Home';
import Tickets from './pages/Tickets/Tickets';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Program from '../src/pages/Program/Program.jsx';
import Prizes from '../src/pages/Prizes/Prizes.jsx';
import Agenda from '../src/pages/Agenda/Agenda.jsx';
import Accommodation from '../src/pages/Accommodation/Accommodation.jsx';
import Booking from '../src/pages/Booking/Booking.jsx';
import Stripe from '../src/pages/Stripe/Stripe.jsx';
import Success from '../src/pages/Prizes/PrizesSucces.jsx';

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
      {
        element: <Program />,
        path: '/program',
      },
      {
        element: <Prizes />,
        path: '/prizes',
      },
      {
        element: <Agenda />,
        path: '/agenda',
      },
      {
        element: <Accommodation />,
        path: '/accommodation',
      },
      {
        element: <Booking />,
        path: '/booking',
      },
      {
        element: <Stripe />,
        path: '/stripe',
      },
      {
        element: <Success />,
        path: '/successPrizes',
      },
    ],
  );
}

export default AppRouter;
