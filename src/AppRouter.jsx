import { useRoutes } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx'
import Tickets from '../src/pages/Tickets/Tickets';
import Program from '../src/pages/Program/Program.jsx';
import Prizes from '../src/pages/Prizes/Prizes.jsx';
import Agenda from '../src/pages/Agenda/Agenda.jsx';
import CalendarComponent from './components/Calendar.jsx';
import Accommodation from '../src/pages/Accommodation/Accommodation.jsx';
import Booking from '../src/pages/Booking/Booking.jsx';
import Stripe from '../src/pages/Stripe/Stripe.jsx';
import Success from '../src/pages/Prizes/PrizesSucces.jsx';
import MyProfile from '../src/pages/MyProfile/MyProfile.jsx';
import Login from '../src/pages/Login/Login.jsx';
import Register from '../src/pages/Register/Register.jsx';

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
        element: <CalendarComponent/>,
        path: '/calendar',
      },
      {
        element: <Accommodation/>,
        path: '/accommodation',
      },
      {
        element: <Booking/>,
        path: '/booking',
      },
      {
        element: <Stripe/>,
        path: '/stripe',
      },
      {
        element: <Success/>,
        path: '/successPrizes',
      },
      {
        element: <MyProfile/>,
        path: '/myProfile',
      },
      {
        element: <Login/>,
        path: '/login',
      },
      {
        element: <Register/>,
        path: '/register',
      },
    ],
  )
}

export default AppRouter;
