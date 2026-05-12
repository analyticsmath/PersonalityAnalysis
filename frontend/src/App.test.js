import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

/** Mirrors App.js AssessmentRootRedirect behavior (query preservation). */
const AssessmentRootRedirect = () => {
  const location = useLocation();
  return <Navigate to={`/assessment/start${location.search || ''}`} replace />;
};

function PathProbe() {
  const location = useLocation();
  return (
    <span data-testid="loc">
      {location.pathname}
      {location.search}
    </span>
  );
}

describe('assessment root redirect', () => {
  it('redirects /assessment to /assessment/start preserving query string', async () => {
    render(
      <MemoryRouter initialEntries={['/assessment?mode=resume&session=abc']}>
        <Routes>
          <Route path="/assessment" element={<AssessmentRootRedirect />} />
          <Route path="/assessment/start" element={<PathProbe />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const text = screen.getByTestId('loc').textContent;
      expect(text.startsWith('/assessment/start')).toBe(true);
      expect(text).toContain('mode=resume');
      expect(text).toContain('session=abc');
    });
  });
});
