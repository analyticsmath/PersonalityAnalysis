import React from 'react';
import { render, screen } from '@testing-library/react';
import AiStatusBadges from './AiStatusBadges';

describe('AiStatusBadges', () => {
  it('renders schema validated badge', () => {
    render(
      <AiStatusBadges
        aiStatus={{
          status: 'ready',
          provider: 'openai',
          promptVersion: '2',
          schemaValidated: true,
          safetyChecked: true,
          fallbackUsed: false,
          errorCode: null,
        }}
      />
    );
    expect(screen.getByText('Schema validated')).toBeInTheDocument();
  });

  it('renders safety checked badge when safetyChecked is true', () => {
    render(
      <AiStatusBadges
        aiStatus={{
          status: 'ready',
          provider: 'openai',
          promptVersion: '2',
          schemaValidated: true,
          safetyChecked: true,
          fallbackUsed: false,
          errorCode: null,
          latencyMs: 120,
          model: 'gpt-test',
        }}
      />
    );
    expect(screen.getByText('Safety checked')).toBeInTheDocument();
  });

  it('renders fallback badge when fallbackUsed', () => {
    render(
      <AiStatusBadges
        aiStatus={{
          status: 'fallback',
          provider: 'local_fallback',
          promptVersion: '1',
          schemaValidated: true,
          safetyChecked: true,
          fallbackUsed: true,
          errorCode: 'x',
        }}
      />
    );
    expect(screen.getByText('Fallback used')).toBeInTheDocument();
  });
});
