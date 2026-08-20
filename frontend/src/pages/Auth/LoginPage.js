import React, { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import { getSafeNextUrl } from '../../utils/personality-v4/navigation';
import AuthSplitLayout from '../../components/personality-v7/auth/AuthSplitLayout';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const safeNext = useMemo(() => {
    const params = typeof window !== 'undefined' && window.URLSearchParams ? new window.URLSearchParams(location.search) : { get: () => null };
    return getSafeNextUrl(params.get('next'), '/dashboard');
  }, [location.search]);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (payload) => {
      auth.login(payload);
      navigate(safeNext, { replace: true });
    },
    onError: (error) => {
      const message = error?.message || 'Invalid email or password. Please try again.';
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

  const errorMessage = useMemo(
    () => formError || loginMutation.error?.message || googleMutation.error?.message || '',
    [formError, loginMutation.error?.message, googleMutation.error?.message]
  );

  if (auth.isAuthenticated) {
    return <Navigate to={safeNext} replace />;
  }

  const submit = (event) => {
    event.preventDefault();
    setFormError('');
    if (!form.email || !form.password) {
      setFormError('Please enter both your email and password.');
      return;
    }
    loginMutation.mutate(form);
  };

  return (
    <AuthSplitLayout
      asset={MEDIA_ASSETS_V7.a09}
      title="Return to the profile you are building."
      subtitle="Sign in to continue your assessment, review previous evidence or update your profile."
      caption="Evidence-grounded profiles remain inspectable across career transitions."
      objectPosition="50% 39%"
    >
      <form onSubmit={submit} className="pa-auth-form" noValidate>
        {errorMessage && (
          <div role="alert" aria-live="assertive" className="pa-v7-auth-error-banner">
            {errorMessage}
          </div>
        )}

        <div className="pa-v7-auth-field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            name="email"
            className="pa-v7-auth-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="pa-v7-auth-field" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="login-password">Password</label>
          <div className="pa-v7-auth-password-wrap">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="pa-v7-auth-input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              style={{ paddingRight: '3.5rem' }}
            />
            <button
              type="button"
              className="pa-v7-auth-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          className="pa-v7-btn pa-v7-btn--ink"
          type="submit"
          disabled={loginMutation.isPending || googleMutation.isPending}
          style={{ width: '100%', height: '46px', fontSize: '0.9375rem' }}
        >
          {loginMutation.isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {GOOGLE_CLIENT_ID && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ textAlign: 'center', margin: '1rem 0', position: 'relative' }}>
            <span style={{ background: 'var(--pa-paper)', padding: '0 0.75rem', fontSize: '0.75rem', color: 'var(--pa-stone)' }}>
              or continue with
            </span>
          </div>
          <GoogleLoginButton
            onCredential={(token) => googleMutation.mutate(token)}
            onError={(message) => {
              const nextErr = message || 'Google sign-in failed. Please retry.';
              setFormError(nextErr);
              toast.error(nextErr);
            }}
          />
        </div>
      )}

      <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--pa-stone)', textAlign: 'center' }}>
        New to Personality Assessor?{' '}
        <Link to={`/signup?next=${encodeURIComponent(safeNext)}`} style={{ color: 'var(--pa-ink)', fontWeight: 600, textDecoration: 'underline' }}>
          Build your profile
        </Link>
      </p>
    </AuthSplitLayout>
  );
};

export default LoginPage;
