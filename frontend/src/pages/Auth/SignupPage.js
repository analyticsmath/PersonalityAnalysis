import React, { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { googleLogin as googleLoginApi, signup as signupApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { ResponsiveImage } from '../../components/public/PublicChrome';
import { publicMedia } from '../../content/personalityMarketingDemo';
import '../PublicSite.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', terms: false });
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

  if (auth.isAuthenticated) return <Navigate to="/dashboard" replace />;

  const change = (event) => {
    const { name, value, checked, type } = event.target;
    setFormError('');
    setSuccessMessage('');
    setForm((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (event) => {
    event.preventDefault();
    setFormError('');
    if (!form.name || !form.email || !form.password) return setFormError('Complete all required fields.');
    if (form.password.length < 6) return setFormError('Password must be at least 6 characters.');
    if (!form.terms) return setFormError('Accept terms and conditions to continue.');
    signupMutation.mutate({ name: form.name, email: form.email, password: form.password });
  };

  const signupMedia = publicMedia?.auth?.signup || publicMedia?.hero?.process || null;

  return (
    <main className="pa-auth" data-page="signup">
      <div className="pa-auth__editorial">
        <div className="pa-auth__heading">
          <Link className="public-brand" to="/" aria-label="Personality Assessor home">
            <span className="public-brand__name">Personality Assessor</span>
          </Link>
          <h1>Start with the work you already know.</h1>
          <p>
            Create an account, add professional context, and begin a profile you can return to as your work changes.
          </p>
        </div>
        {signupMedia && (
          <figure className="pa-auth__fragment-frame">
            <ResponsiveImage
              media={signupMedia}
              alt="Visual thinking board with structured sticky notes"
              sizes="380px"
            />
          </figure>
        )}
      </div>

      <section className="pa-auth__form-wrap">
        <form onSubmit={submit} className="pa-auth__form" noValidate>
          <h2>Create account</h2>
          <p>Begin a professional profile you can return to.</p>

          <div role="alert" aria-live="assertive">
            {errorMessage && <span className="pa-auth__message">{errorMessage}</span>}
          </div>
          <div role="status" aria-live="polite">
            {successMessage && <span className="pa-auth__success">{successMessage}</span>}
          </div>

          <label htmlFor="signup-name">
            Full name
            <input
              id="signup-name"
              type="text"
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Alex Johnson"
              autoComplete="name"
              required
            />
          </label>

          <label htmlFor="signup-email">
            Email
            <input
              id="signup-email"
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label htmlFor="signup-password">
            Password
            <input
              id="signup-password"
              type="password"
              name="password"
              value={form.password}
              onChange={change}
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              required
            />
          </label>

          <label className="pa-auth__check" htmlFor="signup-terms">
            <input
              id="signup-terms"
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={change}
            />
            <span>I agree to the terms and conditions</span>
          </label>

          <button
            className="pa-auth__submit"
            type="submit"
            disabled={signupMutation.isPending || googleMutation.isPending}
          >
            {signupMutation.isPending || googleMutation.isPending ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        {GOOGLE_CLIENT_ID && (
          <div className="pa-auth__google">
            <p>or continue with</p>
            <GoogleLoginButton
              onCredential={(token) => googleMutation.mutate(token)}
              onError={(message) => {
                const next = message || 'Google sign-up failed. Please retry.';
                setFormError(next);
                toast.error(next);
              }}
            />
          </div>
        )}

        <p className="pa-auth__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
};

export default SignupPage;
