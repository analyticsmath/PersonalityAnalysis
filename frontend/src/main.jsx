import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './styles/fonts.css';
import './styles/foundation.css';

/* ── Shared / fallback public experience styles ── */
import './styles/public-experience/fonts.css';
import './styles/public-experience/tokens.css';
import './styles/public-experience/base.css';
import './styles/public-experience/chrome.css';
import './styles/public-experience/auth.css';
import './styles/public-experience/responsive.css';
import './styles/public-experience/reduced-motion.css';

/* Canonical marketing routes load their authored cinematic CSS with their route shell.
 * Product providers and protected-product CSS are code-split behind ProductRuntimeProviders.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
