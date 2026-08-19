import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { googleLogin as googleLoginApi, signup as signupApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import { getSafeNextUrl, DEFAULT_ACQUISITION_TARGET } from '../../utils/personality-v4/navigation';
import AuthSplitLayout from '../../components/personality-v7/auth/AuthSplitLayout';

export const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const timerRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', password: '', terms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const safeNext = useMemo(() => {
    const params = typeof window !== 'undefined' && window.URLSearchParams ? new window.URLSearchParams(location.search) : { get: () => null };
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
      setSuccessMessage('Account created successfully. Navigating to sign-in…');
      // Intentional readable dwell plateau (1400ms) before navigating to login with preserved next path
      timerRef.current = setTimeout(() => {
        navigate(`/login?next=${encodeURIComponent(safeNext)}`, { replace: true });
      }, 1400);
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

  const errorMessage = useMemo(
    () => formError || signupMutation.error?.message || googleMutation.error?.message || '',
    [formError, signupMutation.error?.message, googleMutation.error?.message]
  );

  const passwordRules = useMemo(() => {
    const p = form.password;
    return {
      hasLength: p.length >= 8,
      hasUpper: /[A-Z]/.test(p),
      hasNumber: /[0-9]/.test(p),
      hasSpecial: /[^A-Za-z0-9]/.test(p),
    };
  }, [form.password]);

  if (auth.isAuthenticated) {
    return <Navigate to={safeNext} replace />;
  }

  const change = (event) => {
    const { name, value, checked, type } = event.target;
    setFormError('');
    setSuccessMessage('');
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (event) => {
    event.preventDefault();
    setFormError('');
    if (!form.name.trim()) return setFormError('Please enter your full name.');
    if (!form.email.trim()) return setFormError('Please enter a valid email address.');
    if (form.password.length < 6) return setFormError('Password must be at least 6 characters long.');
    if (!form.terms) return setFormError('Please accept the terms and privacy policy to continue.');

    signupMutation.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  };

  return (
    <AuthSplitLayout
      asset={MEDIA_ASSETS_V7.a10}
      title="Start with the work you already know."
      subtitle="Create your account, then begin with a role, project or professional context."
      caption="Structured inquiry adapts to your real decisions and working tensions."
      objectPosition="51% 45%"
    >
      <form onSubmit={submit} className="pa-auth-form" noValidate>
        {errorMessage && (
          <div role="alert" aria-live="assertive" className="pa-v7-auth-error-banner">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div role="status" aria-live="polite" className="pa-v7-auth-success-banner">
            <p style={{ margin: '0 0 8px 0' }}>{successMessage}</p>
            <Link
              to={`/login?next=${encodeURIComponent(safeNext)}`}
              className="pa-v7-btn pa-v7-btn--ink"
              style={{ minHeight: '36px', fontSize: '13px', padding: '0 16px' }}
            >
              Continue to sign in →
            </Link>
          </div>
        )}

        <div className="pa-v7-auth-field">
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            type="text"
            name="name"
            className="pa-v7-auth-input"
            value={form.name}
            onChange={change}
            placeholder="Alex Mercer"
            autoComplete="name"
            required
          />
        </div>

        <div className="pa-v7-auth-field">
          <label htmlFor="signup-email">Email address</label>
          <input
            id="signup-email"
            type="email"
            name="email"
            className="pa-v7-auth-input"
            value={form.email}
            onChange={change}
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="pa-v7-auth-field">
          <label htmlFor="signup-password">Password</label>
          <div className="pa-v7-auth-password-wrap">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="pa-v7-auth-input"
              value={form.password}
              onChange={change}
              placeholder="Create a secure password"
              autoComplete="new-password"
              aria-describedby="password-requirements"
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
          <div id="password-requirements" className="pa-auth-password-rules" style={{ marginTop: '0.5rem' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '11px', color: 'var(--pa-stone)' }}>
              <li style={{ color: passwordRules.hasLength ? '#137333' : 'inherit' }}>
                {passwordRules.hasLength ? '✓' : '•'} At least 8 characters
              </li>
              <li style={{ color: passwordRules.hasUpper ? '#137333' : 'inherit' }}>
                {passwordRules.hasUpper ? '✓' : '•'} One uppercase letter
              </li>
              <li style={{ color: passwordRules.hasNumber ? '#137333' : 'inherit' }}>
                {passwordRules.hasNumber ? '✓' : '•'} One number
              </li>
              <li style={{ color: passwordRules.hasSpecial ? '#137333' : 'inherit' }}>
                {passwordRules.hasSpecial ? '✓' : '•'} One special character
              </li>
            </ul>
          </div>
        </div>

        <label className="pa-auth-checkbox-field" htmlFor="signup-terms" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8125rem', color: 'var(--pa-ink)', cursor: 'pointer' }}>
          <input
            id="signup-terms"
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={change}
            style={{ accentColor: 'var(--pa-ink)' }}
          />
          <span>
            I agree to the <Link to="/privacy" style={{ textDecoration: 'underline', color: 'inherit' }}>Privacy Policy & Terms</Link>
          </span>
        </label>

        <button
          className="pa-v7-btn pa-v7-btn--ink"
          type="submit"
          disabled={signupMutation.isPending || googleMutation.isPending}
          style={{ width: '100%', height: '46px', fontSize: '0.9375rem' }}
        >
          {signupMutation.isPending ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      {GOOGLE_CLIENT_ID && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ textAlign: 'center', margin: '1rem 0', position: 'relative' }}>
            <span style={{ background: 'var(--pa-paper)', padding: '0 0.75rem', fontSize: '0.75rem', color: 'var(--pa-stone)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              or continue with
            </span>
          </div>
          <GoogleLoginButton
            onCredential={(token) => googleMutation.mutate(token)}
            onError={(message) => {
              const nextErr = message || 'Google sign-up failed. Please retry.';
              setFormError(nextErr);
              toast.error(nextErr);
            }}
          />
        </div>
      )}

      <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--pa-stone)', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to={`/login?next=${encodeURIComponent(safeNext)}`} style={{ color: 'var(--pa-ink)', fontWeight: 600, textDecoration: 'underline' }}>
          Sign in
        </Link>
      </p>
    </AuthSplitLayout>
  );
};

export default SignupPage;
