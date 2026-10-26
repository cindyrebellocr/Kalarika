import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <h1 className="h2">Page not found</h1>
      <p className="intro" style={{ margin: '16px 0 32px' }}>The page you are looking for does not exist.</p>
      <Link to={ROUTES.home} className="btn btn-primary">
        Back to Home
      </Link>
    </main>
  );
}
