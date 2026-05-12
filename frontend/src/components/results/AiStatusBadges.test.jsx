import React from 'react';
import { render, screen } from '@testing-library/react';
import AiStatusBadges from './AiStatusBadges';

describe('AiStatusBadges', () => {
  it('renders AI-assisted and AI checked when ready with safety', () => {
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
    expect(screen.getByText('AI-assisted')).toBeInTheDocument();
    expect(screen.getByText('AI checked')).toBeInTheDocument();
    expect(screen.getAllByTitle(/Schema validated/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders AI checked when safetyChecked is true', () => {
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
    expect(screen.getByText('AI checked')).toBeInTheDocument();
  });

  it('renders fallback summary when fallbackUsed', () => {
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
    expect(screen.getByText('Fallback summary')).toBeInTheDocument();
  });
});
