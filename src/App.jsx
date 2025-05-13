import '@mantine/core/styles.css';

import { MantineProvider, Modal } from '@mantine/core';
import { Navbar } from './components/NavBar/navBar';
import { BackgroundProvider } from './contexts/backgroundContext';
import { CartProvider } from './contexts/cartContext';
import { CartModalProvider } from './contexts/cartModalContext';

import './styles.css';

import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { theme } from './theme/theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BackgroundProvider>
        <CartModalProvider>
          <CartProvider>
            <Navbar />
            <RouterProvider router={Router} />
          </CartProvider>
        </CartModalProvider>
      </BackgroundProvider>
    </MantineProvider>
  );
}
