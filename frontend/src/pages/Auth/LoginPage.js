import React, { useMemo, useState, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { getSafeNextUrl } from '../../utils/personality-v4/navigation';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import MagneticTarget from '../../components/personality-v7/motion/MagneticTarget';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { navigateWithTransition } = useRouteTransition();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      email: form.email.trim(),
      password: form.password,
    });
  };

  const isPending = loginMutation.isPending || googleMutation.isPending;

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={false}>
        <div className="pa-auth-login" role="main" id="main-content">
          <div className="pa-auth-login__carbon-viewport">
            {/* Distant Low-Ownership Evidence Strip Protagonist */}
            <div className="pa-auth-login__strip-anchor" aria-hidden="true">
              <EvidenceStrip
                quote="“I clarify responsibilities before committing work.”"
                eyebrow="REOPEN RECORD"
                sourceLabel="EXISTING RECORD SPECIMEN"
                theme="carbon"
                variant="dated"
                dateLabel="RECORD PRESERVED"
              />
            </div>

            {/* Primary Form Container direct on Carbon ground */}
            <div className="pa-auth-login__form-container">
              <div className="pa-auth-login__header">
                <span className="pa-auth-login__meta-tag">AUTHENTICATION</span>
                <h1 className="pa-auth-login__h1">Reopen your record.</h1>
                <p className="pa-auth-login__lead">
                  Sign in to inspect your longitudinal evidence baselines, career fit matrices, and stored reports.
                </p>
              </div>

              {formError && (
                <div role="alert" className="pa-auth-alert pa-auth-alert--error">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="pa-auth-form">
                <div className="pa-auth-field">
                  <label htmlFor="login-email" className="pa-auth-label">
                    Email address
                  </label>
                  <input
                    ref={emailInputRef}
                    id="login-email"
                    type="email"
                    name="email"
                    className="pa-auth-input"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                    }}
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
                    placeholder="name@example.com"
                  />
                  {fieldErrors.email && (
                    <span id="login-email-error" role="alert" className="pa-auth-field-error">
                      {fieldErrors.email}
                    </span>
                  )}
                </div>

                <div className="pa-auth-field">
                  <label htmlFor="login-password" className="pa-auth-label">
                    Password
                  </label>
                  <div className="pa-auth-password-wrap">
                    <input
                      ref={passwordInputRef}
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="pa-auth-input"
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                        if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                      }}
                      autoComplete="current-password"
                      required
                      aria-invalid={Boolean(fieldErrors.password)}
                      aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="pa-auth-password-toggle"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <span id="login-password-error" role="alert" className="pa-auth-field-error">
                      {fieldErrors.password}
                    </span>
                  )}
                </div>

                <MagneticTarget>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="pa-btn-primary"
                    style={{ width: '100%', minHeight: '50px', marginTop: '0.5rem' }}
                  >
                    {loginMutation.isPending ? 'Accessing record…' : 'Sign in'}
                  </button>
                </MagneticTarget>
              </form>

              {GOOGLE_CLIENT_ID && (
                <div className="pa-auth-google-wrap">
                  <span className="pa-auth-or-label">or continue with</span>
                  <GoogleLoginButton
                    onCredential={(token) => googleMutation.mutate(token)}
                    onError={(message) => {
                      const err = message || 'Google sign-in failed. Please retry.';
                      setFormError(err);
                      toast.error(err);
                    }}
                  />
                </div>
              )}

              <div className="pa-auth-switch-link">
                <a
                  href={`/signup?next=${encodeURIComponent(safeNext)}`}
                  className="pa-link-text"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition(`/signup?next=${encodeURIComponent(safeNext)}`);
                  }}
                >
                  New here? Create your first record &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default LoginPage;
