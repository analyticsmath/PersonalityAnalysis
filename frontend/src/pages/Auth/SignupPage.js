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
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';

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

  const asset = MEDIA_ASSETS_V7.signupWorkshop;

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
      }, 800);
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
    const errors = {};
    if (!form.name.trim()) {
      errors.name = 'Enter your name.';
    }

    if (!form.email.trim()) {
      errors.email = 'Enter your email.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      errors.password = 'Enter a password.';
    } else if (form.password.length < 6) {
      errors.password = 'Use at least 6 characters.';
    }

    if (!form.terms) {
      errors.terms = 'Agree to the Privacy Policy & Terms to continue.';
    }

    setFieldErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      if (errors.name && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (errors.email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (errors.password && passwordInputRef.current) {
        passwordInputRef.current.focus();
      } else if (errors.terms && consentInputRef.current) {
        consentInputRef.current.focus();
      }
      return;
    }

    signupMutation.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
  };

  const isPending = signupMutation.isPending || googleMutation.isPending;

  return (
    <PublicLayout headerTheme="light-content" withFooter={false} className="pa-auth-signup">
      <div className="pa-auth-signup__grid">
        {/* Form Container */}
        <div className="pa-auth-signup__form-wrap">
          <h1 className="pa-auth-title">Create the first record.</h1>
          <p className="pa-auth-lead">
            Start with your background, then add evidence through the assessment.
          </p>

          {formError && (
            <div role="alert" aria-live="assertive" className="pa-auth-banner-error" style={{ marginBottom: '1.25rem' }}>
              {formError}
            </div>
          )}

          {successMessage && (
            <div role="status" aria-live="polite" className="pa-auth-banner-success" style={{ marginBottom: '1.25rem' }}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="pa-auth-form" noValidate>
            <div className="pa-auth-field">
              <label htmlFor="signup-name" className="pa-auth-label">
                Full name
              </label>
              <input
                ref={nameInputRef}
                id="signup-name"
                type="text"
                name="name"
                className="pa-auth-input"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                }}
                autoComplete="name"
                required
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'signup-name-error' : undefined}
                placeholder="Alex Mercer"
              />
              {fieldErrors.name && (
                <span id="signup-name-error" role="alert" className="pa-auth-field-error">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div className="pa-auth-field">
              <label htmlFor="signup-email" className="pa-auth-label">
                Email address
              </label>
              <input
                ref={emailInputRef}
                id="signup-email"
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
                aria-describedby={fieldErrors.email ? 'signup-email-error' : undefined}
                placeholder="name@example.com"
              />
              {fieldErrors.email && (
                <span id="signup-email-error" role="alert" className="pa-auth-field-error">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div className="pa-auth-field">
              <label htmlFor="signup-password" className="pa-auth-label">
                Password
              </label>
              <div className="pa-auth-password-wrap">
                <input
                  ref={passwordInputRef}
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="pa-auth-input"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                  }}
                  autoComplete="new-password"
                  required
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? 'signup-password-error' : 'signup-password-helper'}
                  placeholder="Create a password"
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
              <span id="signup-password-helper" className="pa-auth-helper">
                Minimum 6 characters.
              </span>
              {fieldErrors.password && (
                <span id="signup-password-error" role="alert" className="pa-auth-field-error">
                  {fieldErrors.password}
                </span>
              )}
            </div>

            <div className="pa-auth-field" style={{ marginTop: '0.25rem' }}>
              <label className="pa-auth-consent">
                <input
                  ref={consentInputRef}
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={(e) => {
                    setForm({ ...form, terms: e.target.checked });
                    if (fieldErrors.terms) setFieldErrors({ ...fieldErrors, terms: '' });
                  }}
                  aria-invalid={Boolean(fieldErrors.terms)}
                  aria-describedby={fieldErrors.terms ? 'signup-terms-error' : undefined}
                />
                <span>
                  I agree to the{' '}
                  <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    Privacy Policy & Terms
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.terms && (
                <span id="signup-terms-error" role="alert" className="pa-auth-field-error">
                  {fieldErrors.terms}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="pa-btn-primary"
              style={{ width: '100%', minHeight: '48px', marginTop: '0.5rem' }}
            >
              {signupMutation.isPending ? 'Creating account…' : 'Create account'}
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
                  const err = message || 'Google sign-up failed. Please retry.';
                  setFormError(err);
                  toast.error(err);
                }}
              />
            </div>
          )}

          <div>
            <Link
              to={`/login?next=${encodeURIComponent(safeNext)}`}
              className="pa-auth-secondary-link"
            >
              Already have a record? Sign in &rarr;
            </Link>
          </div>
        </div>

        {/* Media Portrait Plane */}
        <div className="pa-auth-signup__media-wrap pa-media-plane">
          <picture>
            <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 30vw, 100vw" />
            <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 30vw, 100vw" />
            <img
              src={asset.source}
              alt={asset.alt}
              width={asset.intrinsicDimensions.width}
              height={asset.intrinsicDimensions.height}
              className="pa-auth-signup__media"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SignupPage;
