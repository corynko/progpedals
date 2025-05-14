import React from 'react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
