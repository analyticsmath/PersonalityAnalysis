import { Link } from 'react-router-dom';
import { PublicLayout, Trace } from '../components/public/PublicChrome';

export default function PublicNotFoundPage() {
  return <PublicLayout page="not-found"><main id="main-content" className="not-found"><Trace labels={['ROUTE', 'RETURN']} /><p className="eyebrow">404 / NOT FOUND</p><h1>That direction does not exist.</h1><p>Return to the career-intelligence story or begin an assessment.</p><div><Link className="public-button public-button--signal" to="/">Return home</Link><Link className="public-button public-button--dark" to="/signup">Start assessment</Link></div></main></PublicLayout>;
}
