import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import './styles.css';

import { Router } from './Router';
import { theme } from './theme/theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
