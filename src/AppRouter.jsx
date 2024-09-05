import { useRoutes } from 'react-router-dom';
import Hello from './Hello.jsx';

function AppRouter() {
  return useRoutes(
    [
      {
        element: <Hello />,
        path: '/',
      },
    ],
  )
}

export default AppRouter;
