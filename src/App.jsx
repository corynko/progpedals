import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { BackgroundProvider } from './contexts/backgroundContext';

import './styles.css';

import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { theme } from './theme/theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BackgroundProvider>
        <RouterProvider router={Router} />
      </BackgroundProvider>
    </MantineProvider>
  );
}
