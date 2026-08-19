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
import './index.css';
import './styles/fonts.css';
import './styles/foundation.css';
import './styles/personality-v4/tokens.css';
import './styles/personality-v4/foundation.css';
import './styles/personality-v4/chrome.css';
import './styles/personality-v4/home.css';
import './styles/personality-v4/routes.css';
import './styles/personality-v4/auth.css';
import './styles/personality-v4/motion.css';
import './styles/personality-v6/cinematic-v6.css';
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
