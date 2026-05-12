import React from 'react';
import EmptyState from '../ui/EmptyState';

export default function ManualProfileSummary({ manualProfile, injection }) {
  if (!manualProfile) {
    return (
      <EmptyState title="No manual profile yet" description="Submit the manual profile form to see a summary." />
    );
  }

  return (
    <section className="manual-profile-summary" aria-labelledby="mps-title">
      <h3 id="mps-title" className="section-header__title">
        Manual profile summary
      </h3>
      <p className="ui-message ui-message--neutral" role="status">
        Source: manual profile · confidence {Math.round(Number(manualProfile.confidence || 0) * 100)}%
      </p>
      {injection?.suspicious ? (
        <p className="ui-message ui-message--warn" role="status">
          Some phrases matched heuristic prompt-injection patterns; they were not executed as instructions.
        </p>
      ) : null}
      {Array.isArray(manualProfile.warnings) && manualProfile.warnings.length ? (
        <ul className="manual-profile-summary__warnings">
          {manualProfile.warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      ) : null}
      <ul className="manual-profile-summary__chips">
        {(manualProfile.skills || []).slice(0, 12).map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
