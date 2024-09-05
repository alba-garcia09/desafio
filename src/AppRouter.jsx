import { useRoutes } from 'react-router-dom';
import Home from '../src/pages/Home/Home';


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
