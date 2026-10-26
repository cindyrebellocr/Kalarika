import { Link } from 'react-router-dom';

/**
 * Full-bleed hero with a darkened photo.
 * actions: [{ label, to?, variant: 'gold' | 'gold-outline' }] — an action without `to` is inert, matching the prototype.
 */
export default function Hero({ image, imageStyle, title, subtitle, actions = [], children, className = '', contentStyle }) {
  return (
    <section className={`hero ${className}`}>
      <img className="hero-bg" src={image} alt="" style={imageStyle} />
      <div className="container hero-content" style={contentStyle}>
        <div className="hero-text">
          <h1 className="h1">{title}</h1>
          {subtitle && <p className="tagline">{subtitle}</p>}
        </div>
        {actions.length > 0 && (
          <div className="hero-actions">
            {actions.map((a) =>
              a.to ? (
                <Link key={a.label} to={a.to} className={`btn btn-${a.variant || 'gold'}`}>
                  {a.label}
                </Link>
              ) : (
                <button key={a.label} type="button" className={`btn btn-${a.variant || 'gold'}`}>
                  {a.label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
