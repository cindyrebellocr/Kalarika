import { Link } from 'react-router-dom';

/** Rounded maroon strip with a title on the left and a CTA on the right. */
export default function JoinBanner({ title, cta = 'Join us', to, ctaWidth }) {
  return (
    <div className="join-banner">
      <p className="h3">{title}</p>
      {to ? (
        <Link to={to} className="btn btn-gold join-banner-cta" style={ctaWidth ? { width: ctaWidth } : undefined}>
          {cta}
        </Link>
      ) : (
        <button type="button" className="btn btn-gold join-banner-cta" style={ctaWidth ? { width: ctaWidth } : undefined}>
          {cta}
        </button>
      )}
    </div>
  );
}
