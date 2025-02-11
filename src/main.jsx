import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://4aa2e32806280bc0eb338d38117b1f4f@o4508800319160320.ingest.de.sentry.io/4508801465647184',
  integrations: [],
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
