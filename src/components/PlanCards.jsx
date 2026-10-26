import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import './PlanCards.css';

const CARDS = [
  {
    title: 'View Our Packages',
    text: 'Explore thoughtfully curated packages designed to suit different visions, scales, and celebrations.',
    cta: 'View Packages',
    to: ROUTES.services,
  },
  {
    title: 'View Our Gallery',
    text: 'Explore moments we’ve brought to life, each designed with care, culture, and timeless beauty.',
    cta: 'View Gallery',
    to: ROUTES.gallery,
  },
  {
    title: 'Contact Kalārika',
    text: 'Let’s craft something beautiful together.Contact Kalārika to start planning a wedding that truly reflects your story.',
    cta: 'Contact Us',
    to: ROUTES.contact,
  },
];

/** "Let’s Plan Your Wedding" — three description-with-CTA cards. */
export default function PlanCards({ title = 'Let’s Plan Your Wedding', cards = CARDS, titleClass = '' }) {
  return (
    <section className="container plan-cards">
      {title && <h2 className={`section-title ${titleClass}`}>{title}</h2>}
      <div className="plan-cards-grid">
        {cards.map((c) => (
          <article key={c.title} className="card plan-card">
            <h3 className="card-title">{c.title}</h3>
            <p className="body">{c.text}</p>
            {c.to ? (
              <Link to={c.to} className="btn btn-gold plan-card-cta">
                {c.cta}
              </Link>
            ) : (
              <button type="button" className="btn btn-gold plan-card-cta">
                {c.cta}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
