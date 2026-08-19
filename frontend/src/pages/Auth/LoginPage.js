import React, { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { MEDIA_ASSETS } from '../../content/personality-v4/mediaManifest';
import { getSafeNextUrl } from '../../utils/personality-v4/navigation';
import EntrySceneLayout from '../../components/personality-v5/auth/EntrySceneLayout';

const LoginPage = () => {
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
    <EntrySceneLayout
      asset={MEDIA_ASSETS.a09}
      title="Return to the profile you are building."
      subtitle="Sign in to continue your assessment, review previous evidence or update your profile."
      objectPosition="50% 39%"
    >
      <form onSubmit={submit} className="pa-auth-form" noValidate>
        {errorMessage && (
          <div role="alert" aria-live="assertive" className="pa-auth-error-banner">
            {errorMessage}
          </div>
        )}

        <div className="pa-auth-field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            name="email"
            className="pa-auth-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="pa-auth-field">
          <label htmlFor="login-password">Password</label>
          <div className="pa-auth-password-wrap">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="pa-auth-input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
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
        </div>

        <button
          className="pa-btn pa-btn--primary pa-auth-submit-btn"
          type="submit"
          disabled={loginMutation.isPending || googleMutation.isPending}
        >
          {loginMutation.isPending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {GOOGLE_CLIENT_ID && (
        <div style={{ marginTop: '16px' }}>
          <div className="pa-auth-divider">
            <span>or continue with</span>
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

      <p className="pa-auth-footer-text">
        New to Personality Assessor?{' '}
        <Link to={`/signup?next=${encodeURIComponent(safeNext)}`}>Build your profile</Link>
      </p>
    </EntrySceneLayout>
  );
};

export default LoginPage;
