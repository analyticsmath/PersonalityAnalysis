import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { googleLogin as googleLoginApi, signup as signupApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { getSafeNextUrl, DEFAULT_ACQUISITION_TARGET } from '../../content/public-experience/navigation';
import { PublicExperienceRoot } from '../../components/public-experience/chrome/PublicExperienceRoot';
import { PublicPicture } from '../../components/public-experience/media/PublicPicture';
import { PUBLIC_CONTENT } from '../../content/public-experience/publicContent';

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
      nextErrors.terms = 'You must agree to the Terms of Service to continue.';
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

  const isSubmitting = signupMutation.isPending || googleMutation.isPending;

  return (
    <PublicExperienceRoot withFooter={false}>
      <div className="pa-px-auth-root">
        {/* Full Environmental Ground (Desktop) / Header Crop (Mobile) */}
        <div className="pa-px-auth-bg-media">
          <PublicPicture assetKey="authSignup" alt="Workshop baseline environment" priority={true} />
        </div>

        {/* Direct Negative Space Form (No Floating Glass Card) */}
        <div className="pa-px-auth-negative-space-form">
          <header className="pa-px-auth-form-header">
            <h1>{content.headline}</h1>
            <p>{content.support}</p>
          </header>

          {formError && (
            <div className="pa-px-auth-error" role="alert">
              {formError}
            </div>
          )}

          {successMessage && (
            <div className="pa-px-auth-success" role="status">
              {successMessage}
            </div>
          )}

          {GOOGLE_CLIENT_ID && (
            <div className="pa-px-auth-social-wrap">
              <GoogleLoginButton
                onSuccess={handleGoogleSuccess}
                onError={() => setFormError('Google sign-up was interrupted.')}
                text="signup_with"
                disabled={isSubmitting}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="pa-px-auth-form" noValidate>
            <div className="pa-px-auth-field">
              <label htmlFor="signup-name">Full Name</label>
              <input
                ref={nameInputRef}
                id="signup-name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={form.name}
                disabled={isSubmitting}
                onChange={(e) => {
                  setForm((f) => ({ ...f, name: e.target.value }));
                  if (fieldErrors.name) setFieldErrors((fe) => ({ ...fe, name: undefined }));
                }}
              />
              {fieldErrors.name && (
                <span className="pa-px-field-error">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div className="pa-px-auth-field">
              <label htmlFor="signup-email">Email Address</label>
              <input
                ref={emailInputRef}
                id="signup-email"
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
                <label htmlFor="signup-password">Password</label>
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
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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

            <label className="pa-px-auth-checkbox">
              <input
                ref={consentInputRef}
                type="checkbox"
                checked={form.terms}
                disabled={isSubmitting}
                onChange={(e) => {
                  setForm((f) => ({ ...f, terms: e.target.checked }));
                  if (fieldErrors.terms) setFieldErrors((fe) => ({ ...fe, terms: undefined }));
                }}
              />
              <span>
                I agree to the <Link to="/privacy">Privacy Policy</Link> and data governance terms.
              </span>
            </label>
            {fieldErrors.terms && (
              <span className="pa-px-field-error">
                {fieldErrors.terms}
              </span>
            )}

            <button type="submit" className="pa-px-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="pa-px-auth-switch">
            Already have an account?{' '}
            <Link to={`/login?next=${encodeURIComponent(safeNext)}`}>
              Sign in to your record
            </Link>
          </div>
        </div>
      </div>
    </PublicExperienceRoot>
  );
};

export default SignupPage;
