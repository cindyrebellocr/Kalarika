import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import PlanCards from '../../components/PlanCards';
import StoryCards from '../../components/StoryCards';
import './Plan.css';

const STEPS = [
  { step: 'Step 1', title: 'Share Your Preferences', text: 'Tell us about your aesthetic, venue, scale, and the kind of atmosphere you want your guests to experience.' },
  {
    step: 'Step 2',
    title: 'Receive Your Curated Direction',
    text: 'Get a personalised concept outline featuring mood cues, recommended art forms, and signature craft integrations suited to your wedding.',
  },
  {
    step: 'Step 3',
    title: 'Refine with Our Studio',
    text: 'Connect with our design team to transform your outline into a fully customised wedding experience — designed and produced in-house with our artisan collective.',
  },
];

const DIRECTION_CARDS = [
  {
    title: 'Explore Our Packages',
    text: 'Structured offerings built around distinct cultural aesthetics and craft-led installations.',
    cta: 'View Packages',
    to: ROUTES.services,
  },
  {
    title: 'Browse Our Gallery',
    text: 'See how Zardosi embroidery, Meenakari craft, Warli and Rogan paintings come alive within immersive wedding spaces.',
    cta: 'View Gallery',
    to: ROUTES.gallery,
  },
  {
    title: 'Consult Our Team',
    text: 'Have a venue finalised or a strong idea in mind? Let us refine and elevate it.',
    cta: 'Contact Us',
    to: ROUTES.contact,
  },
];

const CONCEPTS = [
  { image: asset('plan/concept-1.jpg'), title: 'Earth and Gold', text: 'Design direction featuring Zardosi detailing, white metal accents, and Warli-inspired installations' },
  {
    image: asset('plan/concept-2.jpg'),
    title: 'Heritage Radiance',
    text: 'A personalised wedding concept shaped around warm metallic tones, intricate Zardosi accents, and hand-painted Warli elements.',
  },
];

export default function PlanWedding() {
  return (
    <main className="page-main plan">
      <section className="hero hero-plain">
        <img className="hero-bg" src={asset('plan/hero.jpg')} alt="" style={{ objectPosition: 'center 50%' }} />
        <div className="container hero-content" style={{ gap: 16 }}>
          <div className="hero-text" style={{ gap: 16 }}>
            <h1 className="h1" style={{ maxWidth: 507 }}>
              Shaping Your Wedding Vision
            </h1>
            <p className="tagline">
              Answer a few thoughtful questions and we’ll translate your preferences into a culturally grounded design direction, complete with art
              forms, mood cues, and experience ideas tailored to you.
            </p>
          </div>
          <Link to={ROUTES.questionnaire} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            Take Questionnaire
          </Link>
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">How it Works</h2>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <article key={s.step} className="step-card">
              <p className="step-label">{s.step}</p>
              <h3 className="card-title">{s.title}</h3>
              <p className="body">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <PlanCards title="If You Already Have a Direction" titleClass="ink" cards={DIRECTION_CARDS} />

      <section className="container stack gap-48">
        <h2 className="section-title ink">Continue Your Concept</h2>
        <div className="concept-cards">
          <StoryCards items={CONCEPTS} more="View Result →" />
        </div>
      </section>
    </main>
  );
}
