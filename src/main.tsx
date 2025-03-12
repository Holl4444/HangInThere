import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import * as Sentry from '@sentry/react';

//Error / Exception tracking - Here at start of app to run before everything and catch earliest possible errors.
Sentry.init({
  dsn: 'https://e8ba4e88268083bc735f8da372cc5fba@o4508800319160320.ingest.de.sentry.io/4508801752694864',
  integrations: [
    Sentry.browserTracingIntegration(), // Tracks how fast the app loads and runs
    Sentry.replayIntegration(), //Records user actions to replay in event of an error
  ],
  // Tracing
  tracesSampleRate: 1.0, // How much Sentry watches (here everything - 100%)
  tracePropagationTargets: [
    // Where it watches
    'localhost',
    /^https:\/\/hang-in-there-black\.vercel\.app/, // Watching live server
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // Records 10% of normal user sessions
  replaysOnErrorSampleRate: 1.0, // Records 100% of sessions with errors (Rolling buffer saved.)
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<App />}> {/* In case of error gets fresh instance of App */}
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
);
