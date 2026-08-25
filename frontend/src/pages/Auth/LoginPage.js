import React, { useMemo, useState, useRef } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { getSafeNextUrl } from '../../content/public-experience/navigation';
import { PUBLIC_CONTENT } from '../../content/public-experience/publicContent';
import { AuthFrame } from '../../components/auth/AuthFrame';

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
      email: form.email.trim(),
      password: form.password,
    });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    setFormError('');
    if (!credentialResponse?.credential) {
      setFormError('No credential received from Google.');
      return;
    }
    googleMutation.mutate({ idToken: credentialResponse.credential });
  };

  const isSubmitting = loginMutation.isPending || googleMutation.isPending;

  return (
    <AuthFrame mode="login">
      <header className="pa-px-auth-form-header">
        <h1>{content.headline}</h1>
        <p>{content.support}</p>
      </header>

      {formError && (
        <div className="pa-px-auth-error" role="alert">
          {formError}
        </div>
      )}

      {GOOGLE_CLIENT_ID && (
        <div className="pa-px-auth-social-wrap">
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onError={() => setFormError('Google sign-in was interrupted.')}
            text="signin_with"
            disabled={isSubmitting}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="pa-px-auth-form" noValidate>
        <div className="pa-px-auth-field">
          <label htmlFor="login-email">Email Address</label>
          <input
            ref={emailInputRef}
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            value={form.email}
            disabled={isSubmitting}
            onChange={(e) => {
              setForm((f) => ({ ...f, email: e.target.value }));
              if (fieldErrors.email) setFieldErrors((fe) => ({ ...fe, email: undefined }));
            }}
          />
          {fieldErrors.email && (
            <span className="pa-px-field-error">
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div className="pa-px-auth-field">
          <div className="pa-px-auth-field__row">
            <label htmlFor="login-password">Password</label>
            <button
              type="button"
              className="pa-px-auth-toggle-pwd"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            ref={passwordInputRef}
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            disabled={isSubmitting}
            onChange={(e) => {
              setForm((f) => ({ ...f, password: e.target.value }));
              if (fieldErrors.password) setFieldErrors((fe) => ({ ...fe, password: undefined }));
            }}
          />
          {fieldErrors.password && (
            <span className="pa-px-field-error">
              {fieldErrors.password}
            </span>
          )}
        </div>

        <button type="submit" className="pa-px-btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="pa-px-auth-switch">
        Don't have an account?{' '}
        <Link to={`/signup?next=${encodeURIComponent(safeNext)}`}>
          Start with one record
        </Link>
      </div>
    </AuthFrame>
  );
};

export default LoginPage;
