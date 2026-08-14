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

  const handleDrop = (e) => {
    e.preventDefault();
    if (isAnalyzing) return;
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) {
      onCvFileChange?.(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wizard-cv-pane" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        className="wizard-upload-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isAnalyzing && fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileRef.current?.click();
          }
        }}
        aria-label="Upload CV file"
      >
        <p className="wizard-upload-box__title">Upload CV / Resume</p>
        <p className="wizard-upload-box__subtitle">PDF or DOCX (max 6 MB)</p>

        <input
          ref={fileRef}
          type="file"
          className="visually-hidden"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) => onCvFileChange?.(event.target.files?.[0] || null)}
          aria-label="CV file input"
        />

        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            fileRef.current?.click();
          }}
          disabled={isAnalyzing}
        >
          <FiUploadCloud /> {cvFile ? 'Change CV' : 'Upload CV'}
        </Button>

        {cvFile && (
          <div
            className="wizard-file-pill"
            role="status"
            aria-live="polite"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 14px',
              background: '#F0F4F2',
              borderRadius: 'var(--radius-sm)',
              marginTop: '8px',
            }}
          >
            <FiFileText aria-hidden="true" />
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.875rem' }}>{cvFile.name}</strong>
              <small style={{ color: 'var(--secondary)' }}>{formatBytes(cvFile.size)}</small>
            </div>
          </div>
        )}
      </div>

      {(analysisStatus === 'running' || analysisStatus === 'success') && (
        <div className="ui-message ui-message--info" role="status" aria-live="polite">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {analysisStatus === 'success' ? <FiCheckCircle /> : <span className="ui-loader-ring" style={{ width: 16, height: 16 }} />}
            <span>{analysisStatus === 'success' ? 'CV context parsed successfully.' : (analysisMessages[analysisIndex] || 'Parsing CV context…')}</span>
          </div>
        </div>
      )}

      <label
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          fontSize: '0.875rem',
          color: 'var(--secondary)',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={Boolean(consentAccepted)}
          onChange={(e) => onConsentChange?.(e.target.checked)}
          disabled={isAnalyzing}
          style={{ marginTop: '3px' }}
        />
        <span>
          I agree to use my CV/profile details to personalize my assessment and career insights.
        </span>
      </label>

      {errorMessage && <p className="ui-message ui-message--error">{errorMessage}</p>}

      <footer className="assessment-question-actions">
        <Button variant="ghost" onClick={onBack} disabled={isAnalyzing}>
          Back
        </Button>
        <Button
          onClick={onAnalyze}
          disabled={isAnalyzeDisabled || isAnalyzing}
          loading={isAnalyzing}
          loadingLabel="Parsing context…"
        >
          Analyze CV
        </Button>
      </footer>
    </div>
  );
};

export default StepCV;
