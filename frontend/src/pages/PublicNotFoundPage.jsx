import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/public/PublicChrome';

export default function PublicNotFoundPage() { return <PublicLayout page="not-found"><main id="main-content" className="pa-not-found"><h1>404</h1><p>THIS PATH DOESN’T LEAD ANYWHERE.</p><div><Link className="pa-button pa-button--dark" to="/">Go home</Link><Link className="pa-button" to="/signup">Start assessment</Link></div></main></PublicLayout>; }
