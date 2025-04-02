import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <HomePage />,
  },
  {
    path: '/products',
    element: <HomePage />,
  },
  {
    path: '/contact',
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
