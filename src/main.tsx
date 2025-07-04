import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as Sentry from '@sentry/react';

//Error / Exception tracking - Here at start of app to run before everything and catch earliest possible errors.
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(), // Tracks how fast the app loads and runs
    Sentry.replayIntegration({
      blockAllMedia: false, // Allow game visuals to be recorded but not user choices
    }), //Records user actions to replay in event of an error
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

// The '!' after root tells TS to ignore the possibility of null as we should have a root element in our HTML. Not totally safe as we haven't checked but most common way of handling TS error here.
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Sentry.ErrorBoundary fallback={<App />}>
    {' '}
    {/* In case of error gets fresh instance of App */}
    <App />
  </Sentry.ErrorBoundary>
  // </StrictMode>
);
