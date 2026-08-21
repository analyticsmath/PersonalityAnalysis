import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const metadata = {
  '/': [
    'Personality Assessor | Inspectable professional evidence',
    'Build an inspectable professional record from personality, vocational interests, work values and the context around your responses.',
  ],
  '/how-it-works': [
    'How It Works | Personality Assessor',
    'An assessment that separates different kinds of evidence so they can be inspected before they are used together for career exploration.',
  ],
  '/career-intelligence': [
    'Career Intelligence | Personality Assessor',
    'Explore the conditions that can create alignment, tension and room to develop across curated professional role profiles.',
  ],
  '/progress': [
    'Progress | Personality Assessor',
    'Assessment history and longitudinal trend views let later evidence sit beside earlier readings without erasing stable patterns.',
  ],
  '/methodology': [
    'Methodology | Personality Assessor',
    'Inspect continuous Big Five dimensions, RIASEC interests, work values, contextual career signals, and deterministic career comparison.',
  ],
  '/trust': [
    'Trust & Provenance | Personality Assessor',
    'Distinguish what you supplied, what the system calculated, what was compared, and what remains under your direct control.',
  ],
  '/privacy': [
    'Privacy | Personality Assessor',
    'Read how Personality Assessor handles assessment data, account security, and explicit data export and deletion controls.',
  ],
  '/login': [
    'Sign In | Personality Assessor',
    'Return to your record. Reopen assessments, career exploration and progress already tied to your account.',
  ],
  '/signup': [
    'Create Account | Personality Assessor',
    'Create the first record. Start with your background, then add evidence through staged inquiry.',
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
      'Personality Assessor | Inspectable professional evidence',
      'Inspectable professional evidence for personality, vocational interests, and career intelligence.',
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
