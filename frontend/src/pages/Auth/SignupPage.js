import React, { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import ScaleIn from '../../components/motion/ScaleIn';
import { googleLogin as googleLoginApi, signup as signupApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      setSuccessMessage('Account created. Sign in to start your first assessment.');
      setTimeout(() => navigate('/login'), 500);
    },
  });

  const googleMutation = useMutation({
    mutationFn: googleLoginApi,
    onSuccess: (payload) => {
      auth.login(payload);
      navigate('/dashboard');
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

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setFormError('');
    setSuccessMessage('');

    const { name, value, checked, type } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('');
    setSuccessMessage('');

    if (!form.name || !form.email || !form.password) {
      setFormError('Complete all required fields.');
      return;
    }

    if (form.password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    if (!form.terms) {
      setFormError('Accept terms and conditions to continue.');
      return;
    }

    signupMutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  const handleGoogleSuccess = (idToken) => {
    googleMutation.mutate(idToken);
  };

  const handleGoogleError = (message) => {
    const nextMessage = message || 'Google sign-up failed. Please retry.';
    setFormError(nextMessage);
    toast.error(nextMessage);
  };

  return (
    <main className="auth-page" data-avatar-section="signup-main">
      <div className="auth-page__content">
        <ScaleIn as="section" className="hero-panel" from={0.97} data-avatar-section="signup-hero">
          <p className="hero-panel__eyebrow">Personality Assessor</p>
          <h1 className="hero-panel__title">Start building your professional profile.</h1>
          <p className="hero-panel__subtitle">
            Create an account, bring your professional context and begin the adaptive assessment.
          </p>
        </ScaleIn>

        <div data-avatar-target="signup-form" data-avatar-section="signup-form">
          <Card className="auth-card" title="Create account" subtitle="Begin with your professional context">
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="auth-form__announce" role="alert" aria-live="assertive">
                {errorMessage ? <p className="ui-message ui-message--error">{errorMessage}</p> : null}
              </div>
              <div className="auth-form__announce" role="status" aria-live="polite">
                {successMessage ? <p className="ui-message ui-message--success">{successMessage}</p> : null}
              </div>
            <label className="auth-form__field" htmlFor="signup-name">
              <span>Full Name</span>
              <input
                id="signup-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Alex Johnson"
                autoComplete="name"
                required
              />
            </label>

            <label className="auth-form__field" htmlFor="signup-email">
              <span>Email</span>
              <input
                id="signup-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-form__field" htmlFor="signup-password">
              <span>Password</span>
              <input
                id="signup-password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                required
              />
            </label>

            <label className="auth-form__check" htmlFor="signup-terms">
              <input
                id="signup-terms"
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
              <span>I agree to the terms and conditions</span>
            </label>

            <Button
              type="submit"
              loading={signupMutation.isPending || googleMutation.isPending}
              loadingLabel="Creating account…"
              block
              data-avatar-action="signup-submit"
              data-avatar-target="signup-form"
              data-avatar-hint="Create your account to unlock the assessment flow."
            >
              Create Account
            </Button>
            </form>

          {GOOGLE_CLIENT_ID && (
            <div className="auth-google">
              <p className="auth-google__divider">or continue with</p>
              <GoogleLoginButton
                onCredential={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
          )}

            <p className="auth-footer-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
