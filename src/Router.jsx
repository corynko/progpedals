import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { AboutPage } from './pages/About.page';
import { ContactPage } from './pages/Contact.page';
import { HomePage } from './pages/Home.page';
import { ProductDetail } from './pages/ProductDetail.page';
import { ProductsPage } from './pages/Products.page';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/contact', element: <ContactPage /> },
      {
        path: '/products/:slug',
        element: <ProductDetail />,
      },
    ],
  },
]);
