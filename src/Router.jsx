import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AboutPage } from './pages/About.page';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
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
