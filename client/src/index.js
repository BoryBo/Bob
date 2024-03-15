import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import ErrorComponent from './components/ErrorComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary fallback={<ErrorComponent />}>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);