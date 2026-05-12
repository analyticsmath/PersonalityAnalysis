import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileSourceSelector from './components/manual-profile/ProfileSourceSelector';
import ManualProfileForm from './components/manual-profile/ManualProfileForm';
import GrowthRecommendationsPanel from './components/analytics/GrowthRecommendationsPanel';

describe('Phase 8 UI pieces', () => {
  it('renders profile source selector', () => {
    const onChange = vi.fn();
    render(<ProfileSourceSelector value="cv" onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: /Enter profile manually/i }));
    expect(onChange).toHaveBeenCalledWith('manual');
  });

  it('manual form requires consent before submit enabled', () => {
    const onSubmit = vi.fn();
    render(
      <ManualProfileForm
        value={{
          currentStatus: 'Student',
          educationLevel: 'BSc',
          fieldOfStudy: 'CS',
          skillsText: 'js, ts',
          projectsText: 'p',
          experienceText: 'e',
          certificationsText: '',
          careerGoalsText: 'g',
          preferredDomainsText: 'd',
          workStyleText: 'w',
          profileSummary: 'x'.repeat(80),
        }}
        onChange={() => {}}
        consentAccepted={false}
        onConsentChange={() => {}}
        onSubmit={onSubmit}
        isSubmitting={false}
        disabled={false}
      />
    );
    const submit = screen.getByRole('button', { name: /Save manual profile/i });
    expect(submit).toBeDisabled();
  });

  it('growth recommendations panel empty state', () => {
    const query = { isPending: false, isError: false, error: null };
    render(<GrowthRecommendationsPanel query={query} items={[]} />);
    expect(screen.getByText(/No growth recommendations yet/i)).toBeInTheDocument();
  });
});
