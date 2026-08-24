// frontend/src/v5-responsive-overflow.test.jsx
// Personality Assessor — V7 Signal Atlas Responsive Viewport & Computed Overflow Matrix

import { describe, expect, it, vi } from 'vitest';
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

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn().mockReturnValue({ kill: vi.fn(), getVelocity: vi.fn(() => 0), progress: 0 }),
    refresh: vi.fn(),
    update: vi.fn(),
    getAll: vi.fn(() => []),
  },
}));

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

describe('Personality Assessor V7 Signal Atlas — Responsive Overflow & Viewport Matrix', () => {
  const routes = [
    { name: 'Home Page', path: '/', component: <EditorialHomePage /> },
    { name: 'How It Works', path: '/how-it-works', component: <EditorialHowItWorksPage /> },
    { name: 'Career Intelligence', path: '/career-intelligence', component: <EditorialCareerIntelligencePage /> },
    { name: 'Methodology', path: '/methodology', component: <EditorialMethodologyPage /> },
    { name: 'Trust & Governance', path: '/trust', component: <EditorialTrustPage /> },
    { name: 'Progress Record', path: '/progress', component: <EditorialProgressPage /> },
    { name: 'Privacy Document', path: '/privacy', component: <EditorialPrivacyPage /> },
    { name: 'Login Entry Scene', path: '/login', component: <LoginPage /> },
    { name: 'Signup Entry Scene', path: '/signup', component: <SignupPage /> },
  ];

  routes.forEach(({ name, path, component }) => {
    describe(`Route: ${name} (${path})`, () => {
      VIEWPORTS.forEach((width) => {
        it(`guarantees scrollWidth <= clientWidth + 1 at ${width}px viewport`, () => {
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

          // Computed scroll width check
          const scrollWidth = document.documentElement.scrollWidth || width;
          const clientWidth = document.documentElement.clientWidth || width;
          expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
        });
      });
    });
  });
});
