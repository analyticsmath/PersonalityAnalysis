import React, { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { login as loginApi, googleLogin as googleLoginApi } from '../../api/authApi';
import { GOOGLE_CLIENT_ID } from '../../config/env';
import { useAuth } from '../../hooks/useAuth';
import { ResponsiveImage } from '../../components/public/PublicChrome';
import { publicMedia } from '../../content/personalityMarketingDemo';
import '../PublicSite.css';

const LoginPage = () => {
  const navigate = useNavigate(); const auth = useAuth(); const [form, setForm] = useState({ email: '', password: '' }); const [showPassword, setShowPassword] = useState(false); const [formError, setFormError] = useState('');
  const loginMutation = useMutation({ mutationFn: loginApi, onSuccess: (payload) => { auth.login(payload); navigate('/dashboard'); } });
  const googleMutation = useMutation({ mutationFn: googleLoginApi, onSuccess: (payload) => { auth.login(payload); navigate('/dashboard'); }, onError: (error) => { const message = error?.message || 'Google sign-in failed. Please try again.'; setFormError(message); toast.error(message); } });
  const errorMessage = useMemo(() => formError || loginMutation.error?.message || googleMutation.error?.message || '', [formError, loginMutation.error?.message, googleMutation.error?.message]);
  if (auth.isAuthenticated) return <Navigate to="/dashboard" replace />;
  const submit = (event) => { event.preventDefault(); setFormError(''); if (!form.email || !form.password) { setFormError('Enter your email and password.'); return; } loginMutation.mutate(form); };
  return <main className="pa-auth" data-avatar-section="login-main"><section className="pa-auth__image"><ResponsiveImage media={publicMedia.auth.login} alt="Person working quietly at a desk" priority sizes="100vw" /></section><div className="pa-auth__heading"><Link className="public-brand" to="/">Personality Assessor</Link><h1>Return to your profile</h1><p>Your assessments, career comparisons and development record are waiting where you left them.</p></div><section className="pa-auth__form-wrap" data-avatar-target="login-form"><form onSubmit={submit} className="pa-auth__form" noValidate><h2>Sign in</h2><p>Continue with your account credentials.</p><div role="alert" aria-live="assertive">{errorMessage && <span className="pa-auth__message">{errorMessage}</span>}</div><label htmlFor="login-email">Email<input id="login-email" type="email" name="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" autoComplete="email" required /></label><label htmlFor="login-password">Password<span className="pa-auth__password"><input id="login-password" type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></span></label><button className="pa-auth__submit" type="submit" disabled={loginMutation.isPending || googleMutation.isPending}>{loginMutation.isPending || googleMutation.isPending ? 'Signing in…' : 'Sign in'}</button></form>{GOOGLE_CLIENT_ID && <div className="pa-auth__google"><p>or continue with</p><GoogleLoginButton onCredential={(token) => googleMutation.mutate(token)} onError={(message) => { const next = message || 'Google sign-in failed. Please retry.'; setFormError(next); toast.error(next); }} /></div>}<p className="pa-auth__footer">New to Personality Assessor? <Link to="/signup">Build your profile</Link></p></section></main>;
};
export default LoginPage;
