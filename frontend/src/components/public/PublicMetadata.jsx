import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const metadata = {
  '/': [
    'Personality Assessor | The Human Trace',
    'Explore professional patterns through their supporting evidence, working conditions, career possibilities and change over time.',
  ],
  '/how-it-works': [
    'How It Works | Personality Assessor',
    'See how evidence is collected, interpreted and evaluated before it contributes to professional insights.',
  ],
  '/career-intelligence': [
    'Career Intelligence | Personality Assessor',
    'Explore 17 occupational profiles, their skills, and the working conditions that shape career possibilities.',
  ],
  '/progress': [
    'Progress | Personality Assessor',
    'Understand how professional insights may change when later observations add context to an earlier assessment.',
  ],
  '/methodology': [
    'Methodology | Personality Assessor',
    'Inspect continuous Big Five dimensions, RIASEC interests, work values, behavioral signals, and deterministic career calibration.',
  ],
  '/trust': [
    'Trust & Provenance | Personality Assessor',
    'Follow every reading back to its source: what you supplied, what the system calculated, and what remains under your direct control.',
  ],
  '/privacy': [
    'Privacy Governance | Personality Assessor',
    'Read about data handling, privacy policies, and available account controls for your assessment information.',
  ],
  '/login': [
    'Sign In | Personality Assessor',
    'Continue where you left off. Sign in to continue an assessment or revisit your results.',
  ],
  '/signup': [
    'Start Assessment | Personality Assessor',
    'Start with one assessment. Create an account to keep your results, compare later changes and control your data.',
  ],
};

const indexable = new Set([
  '/',
  '/how-it-works',
  '/career-intelligence',
  '/progress',
  '/methodology',
  '/trust',
  '/privacy',
]);

function setMeta(selector, attribute, content) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    const [key, value] = attribute.split('=');
    node.setAttribute(key, value);
    document.head.append(node);
  }
  node.content = content;
}

export default function PublicMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const origin =
      typeof window !== 'undefined'
        ? import.meta.env.VITE_SITE_ORIGIN || window.location.origin
        : '';
    const [title, description] = metadata[pathname] || [
      'Personality Assessor | Under Different Conditions',
      'Personality Assessor reads professional patterns with the work attached.',
    ];
    const url = `${origin}${pathname}`;
    document.title = title;
    setMeta('meta[name="description"]', 'name=description', description);
    setMeta(
      'meta[name="robots"]',
      'name=robots',
      indexable.has(pathname) ? 'index,follow' : 'noindex,nofollow'
    );
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[property="og:type"]', 'property=og:type', 'website');
    setMeta('meta[property="og:url"]', 'property=og:url', url);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    const canonicalNode = canonical || document.createElement('link');
    if (!canonical) {
      canonicalNode.rel = 'canonical';
      document.head.append(canonicalNode);
    }
    canonicalNode.href = url;
  }, [pathname]);

  return null;
}
