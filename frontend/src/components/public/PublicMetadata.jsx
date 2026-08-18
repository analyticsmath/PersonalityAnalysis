import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const metadata = {
  '/': [
    'Personality Assessor — Adaptive Personality & Career Intelligence',
    'See the professional patterns behind your decisions. An adaptive assessment that keeps personality, vocational interests and work values separate—then shows how they relate.',
  ],
  '/how-it-works': [
    'How It Works — Personality Assessor',
    'From professional context to a profile you can inspect. Four continuous stages transform real career experience into a multi-dimensional assessment.',
  ],
  '/career-intelligence': [
    'Career Intelligence — Personality Assessor',
    'Explore the conditions where your patterns can work. Compare your profile against curated professional environments to understand fit, stretch points, and growth.',
  ],
  '/progress': [
    'Progress Record — Personality Assessor',
    'Your profile is a record, not a label. Track how changes in role, team, and responsibility reshape your working patterns over time.',
  ],
  '/methodology': [
    'Methodology — Personality Assessor',
    'Four models kept deliberately separate: Big Five dimensions, Holland RIASEC interests, O*NET work values, and deterministic scoring.',
  ],
  '/trust': [
    'Trust & Transparency — Personality Assessor',
    'Every result should show its work. Inspect data intake, structured scoring, separated outputs, and user export/deletion governance.',
  ],
  '/privacy': [
    'Privacy Policy — Personality Assessor',
    'Your data remains yours. Learn about our collection, storage, and explicit data export and deletion controls.',
  ],
  '/login': [
    'Sign In — Personality Assessor',
    'Return to the profile you are building. Continue your assessment, review previous evidence or update your profile.',
  ],
  '/signup': [
    'Build Your Profile — Personality Assessor',
    'Start with the work you already know. Create your account and begin an adaptive personality and career assessment.',
  ],
};

const origin = import.meta.env.VITE_SITE_ORIGIN || window.location.origin;
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
    const [title, description] = metadata[pathname] || [
      'Personality Assessor — Adaptive Personality & Career Intelligence',
      'Adaptive personality and career intelligence based on validated dimensional psychometrics.',
    ];
    const url = `${origin}${pathname}`;
    document.title = title;
    setMeta('meta[name="description"]', 'name=description', description);
    setMeta('meta[name="robots"]', 'name=robots', indexable.has(pathname) ? 'index,follow' : 'noindex,follow');
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[property="og:type"]', 'property=og:type', 'website');
    setMeta('meta[property="og:url"]', 'property=og:url', url);
    setMeta(
      'meta[property="og:image"]',
      'property=og:image',
      `${origin}/media/personality-v4/optimized/personality-assessor-og.jpg`
    );
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
