import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { getSafeNextUrl } from '../../utils/personality-v4/navigation';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import MagneticTarget from '../../components/personality-v7/motion/MagneticTarget';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EVIDENCE_FRAGMENTS = [
  { id: 'f1', text: '“Prefers clear ownership and system contracts.”', x: -360, y: -240 },
  { id: 'f2', text: '“High Investigative & Conventional alignment.”', x: 360, y: -220 },
  { id: 'f3', text: '“Values autonomy, craft, and tangible output.”', x: -380, y: 240 },
  { id: 'f4', text: '“Demonstrated resilience in ambiguous releases.”', x: 380, y: 260 },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { navigateWithTransition } = useRouteTransition();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const fragmentsRef = useRef([]);

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const safeNext = useMemo(() => {
    const params =
      typeof window !== 'undefined' && window.URLSearchParams
        ? new window.URLSearchParams(location.search)
        : { get: () => null };
    return getSafeNextUrl(params.get('next'), '/dashboard');
  }, [location.search]);

  // Fragments reassemble toward the form on route entry
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      fragmentsRef.current,
      (i) => ({
        x: EVIDENCE_FRAGMENTS[i]?.x * 1.6 || 0,
        y: EVIDENCE_FRAGMENTS[i]?.y * 1.6 || 0,
        opacity: 0,
      }),
      (i) => ({
        x: EVIDENCE_FRAGMENTS[i]?.x || 0,
        y: EVIDENCE_FRAGMENTS[i]?.y || 0,
        opacity: 0.45,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      })
    );
  }, []);

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
    const errors = {};
    if (!form.email.trim()) {
      errors.email = 'Enter your email.';
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      errors.password = 'Enter your password.';
    }

    setFieldErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      if (errors.email && emailInputRef.current) {
        emailInputRef.current.focus();
      } else if (errors.password && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
      return;
    }

    loginMutation.mutate({
      email: form.email.trim(),
      password: form.password,
    });
  };

  const isPending = loginMutation.isPending || googleMutation.isPending;

  return (
    <SmoothScrollProvider options={{ lerp: 0.2 }}>
      <PublicLayout headerTheme="dark-content" withFooter={false} className="pa-auth-login">
        <div className="pa-auth-login__carbon-viewport" data-tone="dark">
          {/* Sparse floating field of earlier evidence fragments reassembling toward the form */}
          <div className="pa-auth-login__fragment-field" aria-hidden="true">
            {EVIDENCE_FRAGMENTS.map((frag, idx) => (
              <span
                key={frag.id}
                ref={(node) => (fragmentsRef.current[idx] = node)}
                className="pa-auth-login__fragment"
              >
                {frag.text}
              </span>
            ))}
          </div>

          <div className="pa-auth-login__form-container">
            <h1 className="pa-display-hero pa-auth-login__h1">
              Return to the record you've already built.
            </h1>
            <p className="pa-auth-login__lead">
              Reopen past assessment stages, longitudinal trend views, and multi-layer career comparisons tied to your profile.
            </p>

            {formError && (
              <div role="alert" aria-live="assertive" className="pa-auth-banner-error">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="pa-auth-form" noValidate>
              <div className="pa-auth-field">
                <label htmlFor="login-email" className="pa-auth-label">
                  Email address
                </label>
                <input
                  ref={emailInputRef}
                  id="login-email"
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
                  aria-describedby={fieldErrors.email ? 'login-email-error' : undefined}
                  placeholder="name@example.com"
                />
                {fieldErrors.email && (
                  <span id="login-email-error" role="alert" className="pa-auth-field-error">
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              <div className="pa-auth-field">
                <label htmlFor="login-password" className="pa-auth-label">
                  Password
                </label>
                <div className="pa-auth-password-wrap">
                  <input
                    ref={passwordInputRef}
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="pa-auth-input"
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                    }}
                    autoComplete="current-password"
                    required
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? 'login-password-error' : undefined}
                    placeholder="Enter your password"
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
                {fieldErrors.password && (
                  <span id="login-password-error" role="alert" className="pa-auth-field-error">
                    {fieldErrors.password}
                  </span>
                )}
              </div>

              <MagneticTarget>
                <button
                  type="submit"
                  disabled={isPending}
                  className="pa-btn-primary-dark"
                  style={{ width: '100%', minHeight: '50px', marginTop: '0.75rem' }}
                >
                  {loginMutation.isPending ? 'Signing in…' : 'Sign in to record'}
                </button>
              </MagneticTarget>
            </form>

            {GOOGLE_CLIENT_ID && (
              <div className="pa-auth-google-wrap">
                <span className="pa-auth-or-label">or continue with</span>
                <GoogleLoginButton
                  onCredential={(token) => googleMutation.mutate(token)}
                  onError={(message) => {
                    const err = message || 'Google sign-in failed. Please retry.';
                    setFormError(err);
                    toast.error(err);
                  }}
                />
              </div>
            )}

            <div className="pa-auth-switch-link">
              <a
                href={`/signup?next=${encodeURIComponent(safeNext)}`}
                className="pa-link-text"
                style={{ color: 'var(--pa-mineral)' }}
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(`/signup?next=${encodeURIComponent(safeNext)}`);
                }}
              >
                Do not have a record yet? Create an account &rarr;
              </a>
            </div>
          </div>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default LoginPage;
