import { Link } from 'react-router-dom';
import { asset } from '../lib/asset';
import './FloralBanner.css';

const STRIPS = [
  { src: 'floral-strip-c', side: 'left', offset: 0, flip: true },
  { src: 'floral-strip-a', side: 'left', offset: 65.6, flip: true },
  { src: 'floral-strip-b', side: 'right', offset: 65.6 },
  { src: 'floral-strip-d', side: 'right', offset: 0 },
];

/** Maroon banner framed by floral strips (Figma "Banner" with Group 294–297). */
export default function FloralBanner({ title, cta, to }) {
  return (
    <section className="container">
      <div className="maroon-panel floral-banner">
        {STRIPS.map((s) => (
          <span key={s.src} className="floral-slot" style={{ [s.side]: s.offset }} aria-hidden="true">
            <img src={asset(`common/${s.src}.svg`)} alt="" className={s.flip ? 'flip' : ''} />
          </span>
        ))}
        <p className="h3 floral-banner-title">{title}</p>
        {to ? (
          <Link to={to} className="btn btn-gold">
            {cta}
          </Link>
        ) : (
          <button type="button" className="btn btn-gold">
            {cta}
          </button>
        )}
      </div>
    </section>
  );
}
