import { Link } from 'react-router-dom';
import { asset } from '../lib/asset';
import './CtaBanner.css';

/** Maroon call-to-action panel with the "K" border motif on both sides. */
export default function CtaBanner({ title, subtitle, text, cta, to, className = '' }) {
  return (
    <section className={`container ${className}`}>
      <div className="maroon-panel cta-banner">
        <span className="cta-motif left" style={{ backgroundImage: `url(${asset('common/k-pattern-left-tile.png')})` }} aria-hidden="true" />
        <span className="cta-motif right" style={{ backgroundImage: `url(${asset('common/k-pattern-right-tile.png')})` }} aria-hidden="true" />
        <h2 className="h2 text-gold text-center">{title}</h2>
        {subtitle && <p className="h3 text-center cta-subtitle">{subtitle}</p>}
        {text && <p className="intro text-center cta-text">{text}</p>}
        {cta &&
          (to ? (
            <Link to={to} className="btn btn-gold">
              {cta}
            </Link>
          ) : (
            <button type="button" className="btn btn-gold">
              {cta}
            </button>
          ))}
      </div>
    </section>
  );
}
