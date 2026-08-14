import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import App from './App';
import reportWebVitals from './reportWebVitals';
import queryClient from './store/queryClient';
import { AuthProvider } from './store/AuthStore';
import { GOOGLE_CLIENT_ID } from './config/env';
import '@fontsource-variable/instrument-sans/wdth.css';
import './index.css';
import './styles/foundation.css';
import './styles/product-shell.css';
import './styles/assessment-product.css';
import './styles/results-product.css';
import './styles/analytics-product.css';
import './styles/settings-product.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </QueryClientProvider>
);

root.render(
  GOOGLE_CLIENT_ID ? (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{app}</GoogleOAuthProvider>
  ) : (
    app
  )
);

reportWebVitals();
