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
  const [activeStep, setActiveStep] = useState(1);
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

  // Moving environmental layer parallax
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
    <SmoothScrollProvider options={{ lerp: 0.2 }}>
      <PublicLayout headerTheme="light-content" withFooter={false} className="pa-auth-signup">
        {/* Moving Environmental Image Layer in Background / Right Plane */}
        <div ref={environmentalImageRef} className="pa-auth-signup__env-layer" aria-hidden="true">
          <picture>
            <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
            <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
            <img
              src={asset.source}
              alt=""
              className="pa-auth-signup__env-img"
              loading="eager"
            />
          </picture>
        </div>

        <div className="pa-v7-grid pa-auth-signup__grid" data-tone="light">
          {/* Foreground Form (Left / Center) */}
          <div className="pa-auth-signup__form-col">
            <h1 className="pa-display-hero pa-auth-signup__h1">
              Start a record that can change with new evidence.
            </h1>
            <p className="pa-auth-signup__lead">
              Create an inspectable account to preserve your assessments, explore career conditions, and revisit your evidence over time.
            </p>

            {formError && (
              <div role="alert" aria-live="assertive" className="pa-auth-banner-error">
                {formError}
              </div>
            )}

            {successMessage && (
              <div role="status" aria-live="polite" className="pa-auth-banner-success">
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
                  onFocus={() => setActiveStep(1)}
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
                  onFocus={() => setActiveStep(2)}
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
                    onFocus={() => setActiveStep(3)}
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
                  {signupMutation.isPending ? 'Creating account…' : 'Create account'}
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

          {/* Open Typographic Step Indicators (BACKGROUND, CONTEXT, FIRST ASSESSMENT) */}
          <div className="pa-auth-signup__evidence-preview-col" aria-hidden="true">
            <div className="pa-auth-signup__step-labels">
              <div className={`pa-auth-step-label ${activeStep >= 1 ? 'pa-auth-step-label--active' : ''}`}>
                <span className="pa-auth-step-label__num">01</span>
                <span className="pa-auth-step-label__text">BACKGROUND</span>
              </div>
              <div className={`pa-auth-step-label ${activeStep >= 2 ? 'pa-auth-step-label--active' : ''}`}>
                <span className="pa-auth-step-label__num">02</span>
                <span className="pa-auth-step-label__text">CONTEXT</span>
              </div>
              <div className={`pa-auth-step-label ${activeStep >= 3 ? 'pa-auth-step-label--active' : ''}`}>
                <span className="pa-auth-step-label__num">03</span>
                <span className="pa-auth-step-label__text">FIRST ASSESSMENT</span>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default SignupPage;
