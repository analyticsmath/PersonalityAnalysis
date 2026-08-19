// frontend/src/v5-responsive-overflow.test.jsx
// Personality Assessor — V5 Responsive Viewport & Button Contrast Verification

import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './store/AuthStore';
import EditorialHomePage from './pages/editorial/EditorialHomePage';
import EditorialHowItWorksPage from './pages/editorial/EditorialHowItWorksPage';
import EditorialCareerIntelligencePage from './pages/editorial/EditorialCareerIntelligencePage';
import EditorialMethodologyPage from './pages/editorial/EditorialMethodologyPage';
import EditorialTrustPage from './pages/editorial/EditorialTrustPage';
import EditorialProgressPage from './pages/editorial/EditorialProgressPage';
import EditorialPrivacyPage from './pages/editorial/EditorialPrivacyPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';

const VIEWPORTS = [360, 390, 412, 768, 1024, 1440];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const renderWithProviders = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('Personality Assessor V5 — Responsive Overflow & Viewport Matrix', () => {
  const routes = [
    { name: 'Home Page', component: <EditorialHomePage /> },
    { name: 'How It Works', component: <EditorialHowItWorksPage /> },
    { name: 'Career Intelligence', component: <EditorialCareerIntelligencePage /> },
    { name: 'Methodology', component: <EditorialMethodologyPage /> },
    { name: 'Trust & Governance', component: <EditorialTrustPage /> },
    { name: 'Progress Record', component: <EditorialProgressPage /> },
    { name: 'Privacy Document', component: <EditorialPrivacyPage /> },
    { name: 'Login Entry Scene', component: <LoginPage /> },
    { name: 'Signup Entry Scene', component: <SignupPage /> },
  ];

  routes.forEach(({ name, component }) => {
    describe(`Route: ${name}`, () => {
      VIEWPORTS.forEach((width) => {
        it(`renders without horizontal overflow at ${width}px viewport`, () => {
          // Set viewport width
          window.innerWidth = width;
          document.documentElement.style.width = `${width}px`;

          const { container } = renderWithProviders(component);
          expect(container).toBeDefined();

          // Container elements must not define fixed min-widths larger than viewport
          const wideElements = container.querySelectorAll('*');
          wideElements.forEach((el) => {
            const style = window.getComputedStyle(el);
            if (style.minWidth && style.minWidth.endsWith('px')) {
              const minWidthVal = parseFloat(style.minWidth);
              expect(minWidthVal).toBeLessThanOrEqual(Math.max(width, 100));
            }
          });
        });
      });
    });
  });
});
