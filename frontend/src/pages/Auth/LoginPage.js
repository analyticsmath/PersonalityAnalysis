import React, { useMemo, useState, useRef } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { getSafeNextUrl } from '../../utils/personality-v4/navigation';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';

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
    const errors = {};
    if (!form.email.trim()) {
      errors.email = 'Enter your email.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      errors.password = 'Enter your password.';
    }

    setFieldErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      if (errors.email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (errors.password && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
      return;
    }

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  const isPending = loginMutation.isPending || googleMutation.isPending;

  return (
    <PublicLayout headerTheme="dark-content" withFooter={false} className="pa-auth-login">
      <div className="pa-auth-login__grid">
        {/* Form Container */}
        <div className="pa-auth-login__form-wrap">
          <h1 className="pa-auth-title">Return to your record.</h1>
          <p className="pa-auth-lead">
            Reopen assessments, career exploration and progress already tied to your account.
          </p>

          {formError && (
            <div role="alert" aria-live="assertive" className="pa-auth-banner-error" style={{ marginBottom: '1.25rem' }}>
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="pa-auth-form" noValidate>
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
                  style={{ paddingRight: '4rem' }}
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

            <button
              type="submit"
              disabled={isPending}
              className="pa-btn-primary-dark"
              style={{ width: '100%', minHeight: '48px', marginTop: '0.5rem' }}
            >
              {loginMutation.isPending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {GOOGLE_CLIENT_ID && (
            <div style={{ marginTop: '1rem' }}>
              <div className="pa-auth-divider">
                <span>or continue with</span>
              </div>
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

          <div>
            <Link
              to={`/signup?next=${encodeURIComponent(safeNext)}`}
              className="pa-auth-secondary-link"
            >
              Do not have a record yet? Create an account &rarr;
            </Link>
          </div>
        </div>

        {/* Existing Record Trace on Right */}
        <div className="pa-auth-login__trace-wrap">
          <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
            Existing Record
          </span>
          <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.375rem', lineHeight: 1.35, color: 'var(--pa-mineral)', margin: 0 }}>
            "Evidence can change. The record keeps the history."
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--pa-pewter)', lineHeight: 1.5, margin: 0 }}>
            Sign in to access your previous assessment stages, inspect psychometric decomposition layers, and compare against curated career profiles.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
