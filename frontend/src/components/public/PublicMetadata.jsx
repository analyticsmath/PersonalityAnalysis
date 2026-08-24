import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const metadata = {
  '/': [
    'Personality Assessor | Context Atlas',
    'Context Atlas architecture: See how the same professional evidence reads across personality, interests, work values, career conditions, and time.',
  ],
  '/how-it-works': [
    'How It Works | Personality Assessor',
    'See one response extract, branch, weight, and store without numbered steppers or opaque scoring.',
  ],
  '/career-intelligence': [
    'Career Intelligence | Personality Assessor',
    'Explore 5 workworld environments and 17 canonical role requirements in a navigable spatial atlas.',
  ],
  '/progress': [
    'Progress | Personality Assessor',
    'Longitudinal context accumulation where later evidence sits beside earlier readings without erasing stable patterns.',
  ],
  '/methodology': [
    'Methodology | Personality Assessor',
    'Inspect continuous Big Five dimensions, RIASEC interests, work values, behavioral signals, and deterministic career calibration.',
  ],
  '/trust': [
    'Trust & Chain of Custody | Personality Assessor',
    'Follow a reading back to its source: what you supplied, what the system calculated, and what remains under your direct control.',
  ],
  '/privacy': [
    'Privacy Terms | Personality Assessor',
    'Read how Personality Assessor handles assessment data, account security, and explicit data export and deletion controls.',
  ],
  '/login': [
    'Sign In | Personality Assessor',
    'Return to your record. Reopen assessments, review results, and revisit your career context.',
  ],
  '/signup': [
    'Create Account | Personality Assessor',
    'Start with one honest record. Create an account to keep assessments and compare later changes over time.',
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
      'Personality Assessor | Context Atlas',
      'Adaptive personality and career intelligence keeping evidence attached to the conditions where it occurred.',
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
