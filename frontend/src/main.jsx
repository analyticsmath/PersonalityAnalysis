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

let refreshingBundle = false;
function refreshBundleOnce() {
  if (refreshingBundle) return true;
  try {
    const key = 'pa:last-bundle-refresh';
    const previous = Number(sessionStorage.getItem(key) || 0);
    if (Date.now() - previous < 15000) return false;
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    return false;
  }
  refreshingBundle = true;
  window.location.reload();
  return true;
}

window.addEventListener('vite:preloadError', (event) => {
  if (refreshBundleOnce()) event.preventDefault();
});

class ApplicationBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) {
    if (/dynamically imported module|loading chunk|importing a module script/i.test(String(error))) refreshBundleOnce();
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return <main style={{ minHeight: '100svh', display: 'grid', alignContent: 'center', padding: '8vw', background: '#f1f4f1', color: '#15221e', fontFamily: 'Instrument Sans, Arial, sans-serif' }}>
      <h1 style={{ fontSize: 'clamp(40px,6vw,90px)', fontWeight: 450, lineHeight: 1.05, letterSpacing: '-.05em' }}>This page couldn’t load.</h1>
      <p style={{ fontSize: 18, lineHeight: 1.5, margin: '24px 0' }}>Try loading it again to continue.</p>
      <button type="button" onClick={() => window.location.reload()} style={{ justifySelf: 'start', padding: '16px 24px', border: 0, background: '#15221e', color: 'white', fontSize: 16, cursor: 'pointer' }}>Reload page</button>
    </main>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ApplicationBoundary><App /></ApplicationBoundary>);

reportWebVitals();
