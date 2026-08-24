import React, { useMemo, useState, useRef } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { getSafeNextUrl } from '../../utils/personality-v4/navigation';
import AtlasLayout from '../../components/personality-atlas/chrome/AtlasLayout';
import AtlasScrollProvider from '../../components/personality-atlas/motion/AtlasScrollProvider';
import AtlasResponsiveImage from '../../components/personality-atlas/media/AtlasResponsiveImage';
import ResponseFragment from '../../components/personality-atlas/fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from '../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../content/personality-atlas/publicContent';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const content = PUBLIC_CONTENT.auth.login;

  const safeNext = useMemo(() => {
    const params =
      typeof window !== 'undefined' && window.URLSearchParams
        ? new window.URLSearchParams(location.search)
        : { get: () => null };
    return getSafeNextUrl(params.get('next'), '/dashboard');
  }, [location.search]);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (payload) => {
      auth.login(payload);
      navigate(safeNext, { replace: true });
    },
    onError: (error) => {
      let message = 'Email or password is incorrect.';
      if (error?.status === 0 || error?.message?.includes('Network')) {
        message = 'We could not reach the service. Try again.';
      } else if (error?.message) {
        message = error.message;
      }
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
      const message = error?.message || 'Google sign-in failed. Please try again.';
      setFormError(message);
      toast.error(message);
    },
  });

  if (auth.isAuthenticated) {
    return <Navigate to={safeNext} replace />;
  }

  const validate = () => {
    const nextErrors = {};
    if (!form.email) {
      nextErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.';
    }

    setFieldErrors(nextErrors);

    if (nextErrors.email && emailInputRef.current) {
      emailInputRef.current.focus();
    } else if (nextErrors.password && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    loginMutation.mutate({
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
            minHeight: '100svh',
            padding: 'calc(var(--atlas-header-height-desktop) + 40px) var(--atlas-outer-gutter) 80px',
            backgroundColor: 'var(--atlas-field)',
            color: 'var(--atlas-paper)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          aria-label="Sign In"
        >
          {/* Lower Field Environmental Anchor (Not a 50/50 partition) */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '65vw',
              height: '48vh',
              overflow: 'hidden',
              opacity: 0.22,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <AtlasResponsiveImage
              asset={MEDIA_ASSETS_ATLAS.loginEnvironment}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Form Task Column */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '460px',
              width: '100%',
              margin: '20px 0',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.76rem', display: 'block', marginBottom: '8px' }}>
              AUTHENTICATED ACCESS
            </span>
            <h1 className="pa-atlas-heading-xl" style={{ marginBottom: '12px' }}>
              {content.headline}
            </h1>
            <p className="pa-atlas-body" style={{ opacity: 0.88, marginBottom: '32px' }}>
              {content.support}
            </p>

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

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label
                  htmlFor="login-email"
                  className="pa-atlas-mono"
                  style={{ display: 'block', fontSize: '0.78rem', marginBottom: '6px' }}
                >
                  {content.emailLabel}
                </label>
                <input
                  id="login-email"
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
                  <label htmlFor="login-password" className="pa-atlas-mono" style={{ fontSize: '0.78rem' }}>
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
                  id="login-password"
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
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

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="pa-atlas-btn-primary"
                style={{ width: '100%', marginTop: '8px' }}
              >
                {loginMutation.isPending ? 'Signing in...' : content.submitBtn}
              </button>
            </form>

            {GOOGLE_CLIENT_ID && (
              <div style={{ marginTop: '24px' }}>
                <GoogleLoginButton
                  onSuccess={(credential) => googleMutation.mutate(credential)}
                  onError={() => setFormError('Google authentication failed.')}
                  disabled={googleMutation.isPending}
                />
              </div>
            )}

            <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(239, 245, 242, 0.12)' }}>
              <span className="pa-atlas-body" style={{ opacity: 0.8, fontSize: '0.94rem' }}>
                {content.signupPrompt}{' '}
                <Link
                  to={`/signup?next=${encodeURIComponent(safeNext)}`}
                  style={{ color: 'var(--atlas-signal)', fontWeight: 520, marginLeft: '6px' }}
                >
                  {content.signupLinkText}
                </Link>
              </span>
            </div>
          </div>

          {/* Lower Anchored Response Fragment */}
          <div style={{ position: 'relative', zIndex: 2, margin: '20px 0 0' }}>
            <ResponseFragment
              variant="response"
              text="“I establish clear interface contracts before execution.”"
              sourceId="0x8F4A"
              date="2026-08"
            />
          </div>
        </section>
      </AtlasLayout>
    </AtlasScrollProvider>
  );
};

export default LoginPage;
