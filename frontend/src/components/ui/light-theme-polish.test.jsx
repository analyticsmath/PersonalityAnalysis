import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetricCard from './MetricCard';
import StepCV from '../assessment-start/steps/StepCV';

describe('MetricCard — semantic tinted variants', () => {
  it('renders default variant without dark classes', () => {
    const { container } = render(<MetricCard label="Score" value="72%" />);
    const card = container.querySelector('.metric-card');
    expect(card).toBeTruthy();
    expect(card.className).not.toContain('dark');
    expect(card.className).not.toContain('glass-dark');
  });

  it('renders indigo variant with metric-card--indigo class', () => {
    const { container } = render(<MetricCard label="AI narrative" value="Ready" variant="indigo" />);
    const card = container.querySelector('.metric-card--indigo');
    expect(card).toBeTruthy();
  });

  it('renders sky variant with metric-card--sky class', () => {
    const { container } = render(<MetricCard label="Career readiness" value="Engineer" variant="sky" />);
    const card = container.querySelector('.metric-card--sky');
    expect(card).toBeTruthy();
  });

  it('renders green variant with metric-card--green class', () => {
    const { container } = render(<MetricCard label="Evidence cues" value="4" variant="green" />);
    const card = container.querySelector('.metric-card--green');
    expect(card).toBeTruthy();
  });

  it('renders amber variant with metric-card--amber class', () => {
    const { container } = render(<MetricCard label="Personality confidence" value="68%" variant="amber" />);
    const card = container.querySelector('.metric-card--amber');
    expect(card).toBeTruthy();
  });

  it('renders label and value in all variants', () => {
    for (const variant of ['indigo', 'sky', 'green', 'amber']) {
      const { unmount } = render(<MetricCard label={`Label ${variant}`} value="99%" hint="hint text" variant={variant} />);
      expect(screen.getByText(`Label ${variant}`)).toBeTruthy();
      expect(screen.getByText('99%')).toBeTruthy();
      unmount();
    }
  });
});

describe('StepCV upload section — light theme', () => {
  const noop = () => {};

  it('renders wizard-upload-box without dark class names', () => {
    const { container } = render(
      <StepCV
        cvFile={null}
        onCvFileChange={noop}
        onBack={noop}
        onAnalyze={noop}
        isAnalyzeDisabled={false}
        isAnalyzing={false}
        consentAccepted={false}
        onConsentChange={noop}
      />
    );
    const uploadBox = container.querySelector('.wizard-upload-box');
    expect(uploadBox).toBeTruthy();
    // Must not have dark-theme utility class names
    expect(uploadBox.className).not.toContain('dark');
    expect(uploadBox.className).not.toContain('glass-dark');
    expect(uploadBox.className).not.toContain('bg-slate-9');
  });

  it('renders file pill in light state when file selected', () => {
    const mockFile = new File(['content'], 'resume.pdf', { type: 'application/pdf' });
    const { container } = render(
      <StepCV
        cvFile={mockFile}
        onCvFileChange={noop}
        onBack={noop}
        onAnalyze={noop}
        isAnalyzeDisabled={false}
        isAnalyzing={false}
        consentAccepted={false}
        onConsentChange={noop}
      />
    );
    const pill = container.querySelector('.wizard-file-pill');
    expect(pill).toBeTruthy();
    expect(screen.getByText('resume.pdf')).toBeTruthy();
  });

  it('renders Upload CV title and subtitle', () => {
    render(
      <StepCV
        cvFile={null}
        onCvFileChange={noop}
        onBack={noop}
        onAnalyze={noop}
        isAnalyzeDisabled={false}
        isAnalyzing={false}
        consentAccepted={false}
        onConsentChange={noop}
      />
    );
    expect(screen.getAllByText('Upload CV').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/PDF or DOCX/).length).toBeGreaterThanOrEqual(1);
  });
});
