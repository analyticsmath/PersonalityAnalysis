import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { googleLogin as googleLoginApi, signup as signupApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import { getSafeNextUrl, DEFAULT_ACQUISITION_TARGET } from '../../utils/personality-v4/navigation';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import MagneticTarget from '../../components/personality-v7/motion/MagneticTarget';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';

gsap.registerPlugin(ScrollTrigger);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const timerRef = useRef(null);
  const { navigateWithTransition } = useRouteTransition();

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const consentInputRef = useRef(null);
  const environmentalImageRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', password: '', terms: false });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const asset = MEDIA_ASSETS_V7.signupFirstRecord;

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

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    if (prefersReduced || isMobile) return;

    gsap.fromTo(
      environmentalImageRef.current,
      { y: -20, opacity: 0.8 },
      {
        y: 40,
        opacity: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: '.pa-auth-signup',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      }
    );
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
      const message = error?.message || 'Google sign-up failed. Please retry.';
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
      errors.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      errors.email = 'Please enter your email.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      errors.password = 'Please enter a password.';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (!form.terms) {
      errors.terms = 'Please accept the privacy policy to continue.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      if (errors.name && nameInputRef.current) nameInputRef.current.focus();
      else if (errors.email && emailInputRef.current) emailInputRef.current.focus();
      else if (errors.password && passwordInputRef.current) passwordInputRef.current.focus();
      else if (errors.terms && consentInputRef.current) consentInputRef.current.focus();
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
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={false}>
        <div className="pa-auth-signup" aria-label="Create Account: First Living Record" data-tone="light">
          {/* Asymmetric Environmental Crossing Layer (Crosses centerline at 36vw) */}
          <div
            ref={environmentalImageRef}
            className="pa-auth-signup__environmental-plane"
            aria-hidden="true"
          >
            <picture>
              <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(max-width: 768px) 100vw, 70vw" />
              <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(max-width: 768px) 100vw, 70vw" />
              <img
                src={asset.source}
                alt={asset.alt}
                width={asset.intrinsicDimensions.width}
                height={asset.intrinsicDimensions.height}
                className="pa-auth-signup__img"
                loading="eager"
                decoding="async"
              />
            </picture>

            {/* Desktop Specimen Strip embedded in Environmental Plane */}
            <div className="pa-auth-signup__embedded-strip">
              <EvidenceStrip
                variant="new-record"
                theme="mineral"
                eyebrow="INITIAL RECORD SPECIMEN"
                sourceLabel="FIRST RECORD / CLEAN SLATE"
              />
            </div>
          </div>

          {/* Form Container direct on ground */}
          <div className="pa-auth-signup__form-container">
            <div className="pa-auth-signup__header">
              <h1 className="pa-auth-signup__h1">Create your Living Record.</h1>
              <p className="pa-auth-signup__lead">
                Establish an inspectable account to preserve your assessments, explore career conditions, and revisit your evidence over time.
              </p>
            </div>

            {formError && (
              <div role="alert" aria-live="assertive" className="pa-auth-alert pa-auth-alert--error">
                {formError}
              </div>
            )}

            {successMessage && (
              <div role="status" aria-live="polite" className="pa-auth-alert pa-auth-alert--success">
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

              {/* Mobile mid-form compact new-record strip */}
              <div className="pa-auth-signup__mobile-strip-wrap" aria-hidden="true">
                <EvidenceStrip
                  variant="new-record"
                  theme="mineral"
                  eyebrow="INITIAL SPECIMEN"
                  sourceLabel="FIRST RECORD / CLEAN SLATE"
                />
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

              <div className="pa-auth-field">
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

              <MagneticTarget>
                <button
                  type="submit"
                  disabled={isPending}
                  className="pa-btn-primary"
                  style={{ width: '100%', minHeight: '50px', marginTop: '0.5rem' }}
                >
                  {signupMutation.isPending ? 'Creating record…' : 'Create Living Record'}
                </button>
              </MagneticTarget>
            </form>

            {GOOGLE_CLIENT_ID && (
              <div className="pa-auth-google-wrap">
                <span className="pa-auth-or-label">or continue with</span>
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

            <div className="pa-auth-switch-link">
              <a
                href={`/login?next=${encodeURIComponent(safeNext)}`}
                className="pa-link-text"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(`/login?next=${encodeURIComponent(safeNext)}`);
                }}
              >
                Already have a record? Sign in &rarr;
              </a>
            </div>
          </div>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default SignupPage;
