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

/* ── Public Experience Styles ── */
import './styles/public-experience/fonts.css';
import './styles/public-experience/tokens.css';
import './styles/public-experience/base.css';
import './styles/public-experience/chrome.css';
import './styles/public-experience/home.css';
import './styles/public-experience/career.css';
import './styles/public-experience/how.css';
import './styles/public-experience/progress.css';
import './styles/public-experience/trust.css';
import './styles/public-experience/methodology.css';
import './styles/public-experience/privacy.css';
import './styles/public-experience/auth.css';
import './styles/public-experience/responsive.css';
import './styles/public-experience/reduced-motion.css';

/* ── Protected Product Styles ── */
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
