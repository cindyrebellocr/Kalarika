import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Crop from '../../components/Crop';
import VisualCollage from '../../components/VisualCollage';
import ContactSection from '../../components/ContactSection';
import './Plan.css';

const a = (f) => asset(`result/${f}`);

// [file, left, top, width, height, crop] on a 1207.7 × 415.3 stage
const ART = [
  {
    label: 'Primary Craft',
    img: 'art-primary.jpg',
    title: 'Zardosi Embroidery Installations',
    text: 'Design direction featuring Zardosi detailing, white metal accents, and Warli-inspired installations',
  },
  {
    label: 'Supporting Craft',
    img: 'art-supporting.jpg',
    crop: [0.27, -31.62, 99.62, 143.89],
    title: 'White Metal & Meenakari Accents',
    text: 'Decorative stage elements, table installations, and entrance features.',
  },
];

const LIFE = [
  {
    img: 'life-1.jpg',
    title: 'Statement Mandap Design',
    text: 'A layered mandap structure featuring intricate Zardosi textiles and rich fabric draping. Designed to become the visual anchor of your ceremony while reflecting your selected craft direction.',
  },
  {
    img: 'life-2.jpg',
    title: 'Metal Accent Framing',
    text: 'White metal and Meenakari-inspired pillars subtly frame key areas of your venue, adding structure, balance, and cultural richness without overwhelming the space.',
  },
  {
    img: 'life-3.jpg',
    title: 'Interactive Entrance Installation',
    text: 'A handcrafted welcome feature that introduces guests to your wedding story — combining texture, art, and immersive design from the moment they arrive.',
  },
];

const SIGNATURE = [
  {
    img: 'sig-1.jpg',
    crop: [-0.08, -32.49, 100, 144.44],
    title: 'Suspended Zardosi Canopy',
    text: 'A dramatic overhead installation layered with handcrafted Zardosi embroidery and subtle metallic detailing. Designed to create a luxurious focal point above the ceremony space.',
  },
  {
    img: 'sig-2.jpg',
    title: 'Meenakari framed backdrop',
    text: 'An ornate stage backdrop featuring white metal framing with Meenakari-inspired accents. Elegant, detailed, and structured to highlight the couple beautifully.',
  },
  {
    img: 'sig-3.jpg',
    crop: [-0.07, -0.17, 100, 144.44],
    title: 'Rogan Story Wall',
    text: 'A handcrafted illustrated installation that tells your story through traditional painting techniques. Ideal for entrance spaces or interactive photo areas.',
  },
];

function MaroonCards({ items }) {
  return (
    <div className="maroon-cards">
      {items.map((c) => (
        <article key={c.title} className="artform-card">
          <Crop src={a(c.img)} crop={c.crop} className="extras-img" alt={c.title} />
          <h3 className="card-title">{c.title}</h3>
          <p className="body">{c.text}</p>
        </article>
      ))}
    </div>
  );
}

export default function PlanResult() {
  return (
    <main className="page-main plan result">
      <section className="hero result-hero">
        <img className="hero-bg" src={a('hero.jpg')} alt="" />
        <div className="container hero-content" style={{ gap: 16 }}>
          <div className="hero-text" style={{ gap: 16 }}>
            <h1 className="h1" style={{ maxWidth: 507 }}>
              Regal Meenakari Radiance
            </h1>
            <p className="tagline">
              A grand, craft-led celebration defined by rich jewel tones, intricate Zardosi detailing, and statement white metal accents. Designed to
              create visual depth, cultural richness, and a lasting impression.
            </p>
          </div>
          {/* No prototype destination on this button — kept inert */}
          <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: 10 }}>
            Contact Us
          </button>
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Your Visual Direction</h2>
        <VisualCollage />
        <p className="body text-center">
          Your wedding aesthetic leans toward layered textures, detailed craftsmanship, and bold cultural accents. The colour palette and material
          selections support a regal atmosphere while maintaining refined balance.
        </p>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Recommended Art Integration</h2>
        <div className="art-cards">
          {ART.map((c) => (
            <article key={c.title} className="art-card">
              <p className="h5">{c.label}</p>
              <Crop src={a(c.img)} crop={c.crop} className="extras-img" alt={c.title} />
              <h3 className="card-title">{c.title}</h3>
              <p className="body">{c.text}</p>
              {/* "View Gallery" has no prototype destination here — static text */}
              <span className="link-arrow static-link">View Gallery →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">How This Comes to Life</h2>
        <MaroonCards items={LIFE} />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Signature Installation Suggestion</h2>
        <MaroonCards items={SIGNATURE} />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Get Your Personalised Concept PDF</h2>
        <div className="stack gap-24" style={{ alignItems: 'flex-start' }}>
          <p className="body">
            Sign in to download a curated overview of your wedding concept, including moodboard direction, recommended craft integrations, and spatial
            suggestions. A copy will also be sent to your email for easy access and sharing.
          </p>
          {/* No prototype destination — kept inert */}
          <button type="button" className="btn btn-outline google-btn">
            <img src={asset('common/google.svg')} alt="" width="34" height="33" />
            Sign In using Google
          </button>
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Ready to Refine This Concept?</h2>
        <div className="stack gap-48" style={{ alignItems: 'flex-start' }}>
          <h3 className="h3 ink-h3">Check Our Packages</h3>
          <p className="body">
            Based on your wedding vision, we offer flexible packages that can support your celebration at different levels — from complete wedding
            planning to curated artisan experiences. Choose what fits your needs, or customise it with us.
          </p>
          <Link to={ROUTES.services} className="btn btn-primary">
            View Packages
          </Link>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
