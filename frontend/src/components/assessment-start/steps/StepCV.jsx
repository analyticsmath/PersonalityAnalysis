import React, { useRef } from 'react';
import { FiCheckCircle, FiCircle, FiFileText, FiLoader, FiUploadCloud } from 'react-icons/fi';
import Button from '../../ui/Button';

const formatBytes = (bytes = 0) => {
  const value = Number(bytes || 0);
  if (!Number.isFinite(value) || value <= 0) return '0 KB';
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
};

const StepCV = ({
  cvFile = null,
  onCvFileChange,
  onBack,
  onAnalyze,
  isAnalyzeDisabled,
  isAnalyzing,
  analysisStatus = 'idle',
  analysisMessages = [],
  analysisIndex = 0,
  errorMessage,
  consentAccepted = false,
  onConsentChange,
}) => {
  const fileRef = useRef(null);

  return (
    <div className="wizard-cv-pane">
      <div className="wizard-upload-box">
        <p className="wizard-upload-box__title">Upload CV / Resume</p>
        <p className="wizard-upload-box__subtitle">PDF or DOCX (max 6 MB)</p>

        <input
          ref={fileRef}
          type="file"
          className="wizard-upload-box__input"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) => onCvFileChange?.(event.target.files?.[0] || null)}
        />

        <Button
          variant="primary"
          onClick={() => fileRef.current?.click()}
          disabled={isAnalyzing}
        >
          <FiUploadCloud /> {cvFile ? 'Change CV' : 'Upload CV'}
        </Button>

        {cvFile && (
          <div className="wizard-file-pill" role="status" aria-live="polite">
            <FiFileText aria-hidden="true" />
            <div>
              <strong>{cvFile.name}</strong>
              <small>{formatBytes(cvFile.size)}</small>
            </div>
          </div>
        )}
      </div>

      {(analysisStatus === 'running' || analysisStatus === 'success') && (
        <div className="wizard-generate-shell">
          <div className="wizard-generate-shell__spinner" aria-hidden="true">
            {analysisStatus === 'success' ? <FiCheckCircle /> : <FiLoader />}
          </div>

          <div className="wizard-generate-shell__timeline" role="status" aria-live="polite">
            {analysisMessages.map((label, index) => {
              const isCompleted = analysisStatus === 'success' || index < analysisIndex;
              const isActive = analysisStatus === 'running' && index === analysisIndex;

              return (
                <div
                  key={label}
                  className={`wizard-generate-shell__line ${
                    isCompleted ? 'is-complete' : isActive ? 'is-active' : ''
                  }`}
                >
                  <span className="wizard-generate-shell__line-icon" aria-hidden="true">
                    {isCompleted ? <FiCheckCircle /> : isActive ? <FiLoader /> : <FiCircle />}
                  </span>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <label className="manual-profile-form__consent">
        <input
          type="checkbox"
          checked={Boolean(consentAccepted)}
          onChange={(e) => onConsentChange?.(e.target.checked)}
          disabled={isAnalyzing}
        />
        <span>
          I agree to use my CV/profile details to personalize my assessment and career insights.
        </span>
      </label>

      {errorMessage && <p className="ui-message ui-message--error">{errorMessage}</p>}

      <footer className="assessment-setup-state__actions">
        <Button variant="ghost" onClick={onBack} disabled={isAnalyzing}>
          Back
        </Button>
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzeDisabled || isAnalyzing}
          loading={isAnalyzing}
        >
          Analyze CV
        </Button>
      </footer>
    </div>
  );
};

export default StepCV;
