import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { googleLogin as googleLoginApi, signup as signupApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { getSafeNextUrl, DEFAULT_ACQUISITION_TARGET } from '../../utils/personality-v4/navigation';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import AtlasResponsiveImage from '../../components/personality-atlas/media/AtlasResponsiveImage';
import ResponseFragment from '../../components/personality-atlas/fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from '../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../content/personality-atlas/publicContent';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const timerRef = useRef(null);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const consentInputRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', password: '', terms: false });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const content = PUBLIC_CONTENT.auth.signup;

  const safeNext = useMemo(() => {
    const params =
      typeof window !== 'undefined' && window.URLSearchParams
        ? new window.URLSearchParams(location.search)
        : { get: () => null };
    return getSafeNextUrl(params.get('next'), DEFAULT_ACQUISITION_TARGET);
  }, [location.search]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      setSuccessMessage('Account created. Taking you to sign in.');
      timerRef.current = setTimeout(() => {
        navigate(`/login?next=${encodeURIComponent(safeNext)}`, { replace: true });
      }, 700);
    },
    onError: (error) => {
      const message = error?.message || 'Could not create account. Please check your details.';
      setFormError(message);
      toast.error(message);
    },
  });

  const googleMutation = useMutation({
    mutationFn: googleLoginApi,
    onSuccess: (payload) => {
      auth.login(payload);
      navigate(safeNext, { replace: true });
    },
    onError: (error) => {
      const message = error?.message || 'Google sign-up failed. Please try again.';
      setFormError(message);
      toast.error(message);
    },
  });

  if (auth.isAuthenticated) {
    return <Navigate to={safeNext} replace />;
  }

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Full name is required.';
    }

    if (!form.email) {
      nextErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!form.terms) {
      nextErrors.terms = 'You must accept the terms to continue.';
    }

    setFieldErrors(nextErrors);

    if (nextErrors.name && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (nextErrors.email && emailInputRef.current) {
      emailInputRef.current.focus();
    } else if (nextErrors.password && passwordInputRef.current) {
      passwordInputRef.current.focus();
    } else if (nextErrors.terms && consentInputRef.current) {
      consentInputRef.current.focus();
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    signupMutation.mutate({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });
  };

  return (
    <AtlasScrollProvider>
      <AtlasLayout>
        <section
          className="pa-atlas-auth-page pa-atlas-grid"
          style={{
            minHeight: '110svh',
            padding: 'calc(var(--atlas-header-height-desktop) + 40px) var(--atlas-outer-gutter) 80px',
            backgroundColor: 'var(--atlas-field)',
            color: 'var(--atlas-paper)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          aria-label="Create Record Account"
        >
          {/* Upper/Middle Environmental Plane (Spans 72vw, non-split) */}
          <div
            style={{
              position: 'absolute',
              top: '12vh',
              right: 0,
              width: '70vw',
              height: '65vh',
              overflow: 'hidden',
              opacity: 0.2,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <AtlasResponsiveImage
              asset={MEDIA_ASSETS_ATLAS.signupFirstRecord}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Form Task Column */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '480px',
              width: '100%',
              margin: '20px 0',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.76rem', display: 'block', marginBottom: '8px' }}>
              INITIAL RECORD CREATION
            </span>
            <h1 className="pa-atlas-heading-xl" style={{ marginBottom: '12px' }}>
              {content.headline}
            </h1>
            <p className="pa-atlas-body" style={{ opacity: 0.88, marginBottom: '32px' }}>
              {content.lead}
            </p>

            {successMessage && (
              <div
                role="status"
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'rgba(205, 216, 106, 0.2)',
                  border: '1px solid var(--atlas-signal)',
                  borderRadius: 'var(--atlas-radius-xs)',
                  color: 'var(--atlas-signal)',
                  fontSize: '0.94rem',
                  marginBottom: '20px',
                }}
              >
                {successMessage}
              </div>
            )}

            {formError && (
              <div
                role="alert"
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'rgba(100, 40, 50, 0.4)',
                  border: '1px solid rgba(214, 125, 140, 0.5)',
                  borderRadius: 'var(--atlas-radius-xs)',
                  color: '#FFD6DC',
                  fontSize: '0.92rem',
                  marginBottom: '20px',
                }}
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label htmlFor="signup-name" className="pa-atlas-mono" style={{ display: 'block', fontSize: '0.78rem', marginBottom: '6px' }}>
                  {content.nameLabel}
                </label>
                <input
                  id="signup-name"
                  ref={nameInputRef}
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'rgba(239, 245, 242, 0.08)',
                    border: fieldErrors.name ? '1px solid #FF8090' : '1px solid rgba(239, 245, 242, 0.2)',
                    borderRadius: 'var(--atlas-radius-xs)',
                    color: 'var(--atlas-paper)',
                    fontSize: '1rem',
                    fontFamily: 'var(--atlas-font-sans)',
                  }}
                  aria-invalid={fieldErrors.name ? 'true' : 'false'}
                />
                {fieldErrors.name && (
                  <span style={{ color: '#FFB0BC', fontSize: '0.82rem', marginTop: '4px', display: 'block' }}>
                    {fieldErrors.name}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="signup-email" className="pa-atlas-mono" style={{ display: 'block', fontSize: '0.78rem', marginBottom: '6px' }}>
                  {content.emailLabel}
                </label>
                <input
                  id="signup-email"
                  ref={emailInputRef}
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'rgba(239, 245, 242, 0.08)',
                    border: fieldErrors.email ? '1px solid #FF8090' : '1px solid rgba(239, 245, 242, 0.2)',
                    borderRadius: 'var(--atlas-radius-xs)',
                    color: 'var(--atlas-paper)',
                    fontSize: '1rem',
                    fontFamily: 'var(--atlas-font-sans)',
                  }}
                  aria-invalid={fieldErrors.email ? 'true' : 'false'}
                />
                {fieldErrors.email && (
                  <span style={{ color: '#FFB0BC', fontSize: '0.82rem', marginTop: '4px', display: 'block' }}>
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label htmlFor="signup-password" className="pa-atlas-mono" style={{ fontSize: '0.78rem' }}>
                    {content.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="pa-atlas-mono"
                    style={{ fontSize: '0.74rem', color: 'var(--atlas-signal)', opacity: 0.9 }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  id="signup-password"
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'rgba(239, 245, 242, 0.08)',
                    border: fieldErrors.password ? '1px solid #FF8090' : '1px solid rgba(239, 245, 242, 0.2)',
                    borderRadius: 'var(--atlas-radius-xs)',
                    color: 'var(--atlas-paper)',
                    fontSize: '1rem',
                    fontFamily: 'var(--atlas-font-sans)',
                  }}
                  aria-invalid={fieldErrors.password ? 'true' : 'false'}
                />
                {fieldErrors.password && (
                  <span style={{ color: '#FFB0BC', fontSize: '0.82rem', marginTop: '4px', display: 'block' }}>
                    {fieldErrors.password}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                <input
                  id="signup-terms"
                  ref={consentInputRef}
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => setForm((prev) => ({ ...prev, terms: e.target.checked }))}
                  style={{ marginTop: '4px' }}
                />
                <label htmlFor="signup-terms" className="pa-atlas-body" style={{ fontSize: '0.88rem', opacity: 0.9 }}>
                  {content.termsAgreement}
                </label>
              </div>
              {fieldErrors.terms && (
                <span style={{ color: '#FFB0BC', fontSize: '0.82rem', marginTop: '-10px', display: 'block' }}>
                  {fieldErrors.terms}
                </span>
              )}

              <button
                type="submit"
                disabled={signupMutation.isPending}
                className="pa-atlas-btn-primary"
                style={{ width: '100%', marginTop: '10px' }}
              >
                {signupMutation.isPending ? 'Creating record...' : content.submitBtn}
              </button>
            </form>

            {GOOGLE_CLIENT_ID && (
              <div style={{ marginTop: '24px' }}>
                <GoogleLoginButton
                  onSuccess={(credential) => googleMutation.mutate(credential)}
                  onError={() => setFormError('Google sign-up failed.')}
                  disabled={googleMutation.isPending}
                />
              </div>
            )}

            <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(239, 245, 242, 0.12)' }}>
              <span className="pa-atlas-body" style={{ opacity: 0.8, fontSize: '0.94rem' }}>
                {content.loginPrompt}{' '}
                <Link
                  to={`/login?next=${encodeURIComponent(safeNext)}`}
                  style={{ color: 'var(--atlas-signal)', fontWeight: 520, marginLeft: '6px' }}
                >
                  {content.loginLinkText}
                </Link>
              </span>
            </div>
          </div>

          {/* Lower Field Response Fragment */}
          <div style={{ position: 'relative', zIndex: 2, margin: '20px 0 0' }}>
            <ResponseFragment
              variant="response"
              text="“I clarify responsibilities before committing work.”"
              sourceId="0x8F4A"
              date="2026-08"
            />
          </div>
        </section>
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default SignupPage;
