import { useRoutes } from 'react-router-dom';
import Hello from './Hello.jsx';
import Home from '../src/pages/Home/Home.jsx'

function AppRouter() {
  return useRoutes(
    [
      {
        element: <Home />,
        path: '/',
      },
    ],
  )
}

export default AppRouter;
