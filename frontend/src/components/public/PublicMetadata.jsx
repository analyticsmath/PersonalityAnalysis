import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const metadata = {
  '/': ['Personality Assessor — Adaptive Personality & Career Intelligence', 'Build a professional profile from CV context, adaptive assessment, Big Five, RIASEC, work values and explainable career relationships.'],
  '/how-it-works': ['How Personality Assessor Works — From Context to Career Insight', 'See how professional context becomes adaptive questions, multidimensional assessment results and explainable career direction.'],
  '/career-intelligence': ['Career Intelligence — Explainable Career Relationships | Personality Assessor', 'Compare a current profile with curated career models, inspect alignment and development differences, and explore practical next steps.'],
  '/progress': ['Track Professional Development | Personality Assessor', 'Keep assessment history, development work and updated professional context connected over time.'],
  '/methodology': ['Personality Assessment Methodology | Personality Assessor', 'Understand Big Five, RIASEC, work values, career signals, structured scoring, AI participation and product boundaries.'],
  '/trust': ['AI, Scoring & Transparency | Personality Assessor', 'See where AI participates, how core scoring works, what confidence means and what Personality Assessor does not decide.'],
  '/privacy': ['Privacy & Data Controls | Personality Assessor', 'Learn about available data export, assessment deletion and account deletion controls.'],
  '/login': ['Sign in | Personality Assessor', 'Return to your assessments, career comparisons and professional development record.'],
  '/signup': ['Build Your Profile | Personality Assessor', 'Create an account and begin an adaptive personality and career assessment shaped around your professional context.'],
};
const origin = import.meta.env.VITE_SITE_ORIGIN || window.location.origin;
const indexable = new Set(['/', '/how-it-works', '/career-intelligence', '/progress', '/methodology', '/trust', '/privacy']);
function setMeta(selector, attribute, content) { let node = document.head.querySelector(selector); if (!node) { node = document.createElement('meta'); const [key, value] = attribute.split('='); node.setAttribute(key, value); document.head.append(node); } node.content = content; }
export default function PublicMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const [title, description] = metadata[pathname] || ['Not found — Personality Assessor', 'The requested page does not exist.'];
    const url = `${origin}${pathname}`;
    document.title = title;
    setMeta('meta[name="description"]', 'name=description', description);
    setMeta('meta[name="robots"]', 'name=robots', indexable.has(pathname) ? 'index,follow' : 'noindex,follow');
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[property="og:type"]', 'property=og:type', 'website');
    setMeta('meta[property="og:url"]', 'property=og:url', url);
    setMeta('meta[property="og:image"]', 'property=og:image', `${origin}/media/personality-v2/ui/personality-assessor-og.jpg`);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    const canonicalNode = canonical || document.createElement('link');
    if (!canonical) { canonicalNode.rel = 'canonical'; document.head.append(canonicalNode); }
    canonicalNode.href = url;
  }, [pathname]);

  return null;
}
