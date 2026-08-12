import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const metadata = {
  '/': ['Personality Assessor — Career Intelligence Built from Evidence', 'Career intelligence built from professional context, adaptive assessment and explainable career alignment.'],
  '/how-it-works': ['How Personality Assessor Works', 'See how professional context, adaptive evidence and a structured profile shape career exploration.'],
  '/career-intelligence': ['Career Intelligence — Personality Assessor', 'Explore explainable career alignment, curated profiles, development gaps and roadmaps.'],
  '/progress': ['Track Career Development — Personality Assessor', 'Track assessment history, roadmaps and career development over time.'],
  '/methodology': ['Assessment Methodology — Personality Assessor', 'Learn what Personality Assessor measures, how confidence and matching work, and their limits.'],
  '/trust': ['Trust & Transparency — Personality Assessor', 'Understand product boundaries, AI use, confidence and career-match interpretation.'],
  '/privacy': ['Privacy & Data Control — Personality Assessor', 'Learn how to export and control your Personality Assessor information.'],
  '/login': ['Sign in — Personality Assessor', 'Return to your assessments, career exploration, roadmaps and progress.'],
  '/signup': ['Start your profile — Personality Assessor', 'Create an account and begin building your professional profile.'],
};
const origin = import.meta.env.VITE_SITE_ORIGIN || window.location.origin;
const indexable = new Set(['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy']);
function setMeta(selector, attribute, content) { let node = document.head.querySelector(selector); if (!node) { node = document.createElement('meta'); const [key, value] = attribute.split('='); node.setAttribute(key, value); document.head.append(node); } node.content = content; }
export default function PublicMetadata() { const { pathname } = useLocation(); useEffect(() => { const [title, description] = metadata[pathname] || ['Not found — Personality Assessor', 'The requested page does not exist.']; const url = `${origin}${pathname}`; document.title = title; setMeta('meta[name="description"]', 'name=description', description); setMeta('meta[name="robots"]', 'name=robots', indexable.has(pathname) ? 'index,follow' : 'noindex,follow'); setMeta('meta[property="og:title"]', 'property=og:title', title); setMeta('meta[property="og:description"]', 'property=og:description', description); setMeta('meta[property="og:type"]', 'property=og:type', 'website'); setMeta('meta[property="og:url"]', 'property=og:url', url); setMeta('meta[property="og:image"]', 'property=og:image', `${origin}/media/personality/generated/personality-assessor-og.jpg`); let canonical = document.head.querySelector('link[rel="canonical"]'); if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); } canonical.href = url; }, [pathname]); return null; }
