import { useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Hero from '../../components/Hero';
import Crop from '../../components/Crop';
import CtaBanner from '../../components/CtaBanner';
import ContactSection from '../../components/ContactSection';
import './Weddings.css';

// [file, left, top, width, height, crop] on a 1207.7 × 415.3 stage
const COLLAGE = [
  ['c-84', 0, 0, 252.3, 151],
  ['c-86', 0, 163, 252.3, 252.3, [-33.69, -33.53, 166.95, 166.95]],
  ['c-85', 264.3, 0, 190.7, 260.9, [-0.31, 0.03, 136.81, 100]],
  ['c-87', 264.3, 272.9, 190.7, 141.1],
  ['c-83', 467.05, 0, 330.5, 151],
  ['c-89', 467, 163, 331, 252],
  ['c-90', 810.9, 0, 190.7, 260.9],
  ['c-88', 810.9, 272.9, 190.7, 141.1],
  ['c-92', 1013.7, 0, 194, 151],
  ['c-93', 1013.7, 163, 194, 251],
];

const ART_FILTERS = ['Zardosi', 'Meenakari Craft', 'Textile Craft', 'Warli  Painting', 'White Metal Craft'];

const STORIES = [
  {
    title: 'Echoes of Rajasthani Heritage',
    text: 'A three-day destination wedding rooted in Rajasthani craft traditions. Designed around regal tones, intricate metal detailing, and layered textile artistry, this celebration brought heritage craftsmanship into a contemporary luxury setting.',
    couple: 'Vidhi & Darshan',
    location: 'Udaipur, Rajasthan',
    art: 'Zardosi & Meenakari Craft ',
    tags: ['Zardosi', 'Meenakari Craft'],
    img: 'story-1',
    crop: [-12.38, -9.6, 124.62, 119.12],
    to: ROUTES.weddingStory,
  },
  {
    title: 'Woven in Ritual & Simplicity',
    text: 'An intimate Ahmedabad wedding centred around family and meaningful rituals. Soft textile detailing and subtle folk art elements created warmth. Every space reflected simplicity with thoughtful craftsmanship.',
    couple: 'Samya & Arjun',
    location: 'Ahmedabad, Gujarat',
    art: 'Textile Craft, Warli Interpretation',
    tags: ['Textile Craft', 'Warli  Painting'],
    img: 'story-2',
    crop: [-25.64, -22.38, 151.28, 144.61],
  },
  {
    title: 'Tradition in a Contemporary Frame',
    text: 'A Bengaluru celebration blending clean modern structures with heritage artforms.Modular craft installations added texture without overwhelming the space.A balanced expression of tradition within a contemporary setting.',
    couple: 'Megha & Kunal',
    location: 'Bengaluru, Karnataka',
    art: 'Modular Metal Craft, Contemporary Textile Integration',
    tags: ['Textile Craft', 'White Metal Craft'],
    img: 'story-3',
    crop: [-6.69, -0.37, 113.59, 108.58],
  },
  {
    title: 'Threads of Gold & Earth',
    text: 'A Jaipur celebration inspired by warm earthy tones and intricate gold detailing. Zardosi embroidery and handcrafted metal accents defined the ceremony space. A vibrant yet balanced wedding that honoured tradition with refined execution.',
    couple: 'Rhea & Dev',
    location: 'Jaipur, Rajasthan',
    art: 'Zardosi, White Metal Craft',
    tags: ['Zardosi', 'White Metal Craft'],
    img: 'story-4',
    crop: [-34.57, -30.86, 168.97, 161.52],
  },
];

function StoryCard({ s }) {
  // Only the first story has a full-story page in the prototype; the others keep inert buttons.
  const cta = (
    <>
      View&nbsp; full story
      <img src={asset('weddings/chevron-maroon.svg')} alt="" width="24" height="24" />
    </>
  );
  return (
    <article className="wedding-card">
      <Crop src={asset(`weddings/${s.img}.jpg`)} crop={s.crop} className="wedding-card-img" alt={s.title} />
      <div className="wedding-card-copy">
        <div className="stack gap-24">
          {s.to ? (
            <Link to={s.to} className="card-title wedding-card-title link-title">
              {s.title}
            </Link>
          ) : (
            <h3 className="card-title wedding-card-title">{s.title}</h3>
          )}
          <p className="body">{s.text}</p>
          <ul className="body wedding-meta">
            <li>Couple: {s.couple}</li>
            <li>Location: {s.location}</li>
            <li>Art Forms: {s.art}</li>
          </ul>
        </div>
        {s.to ? (
          <Link to={s.to} className="btn btn-gold story-cta">
            {cta}
          </Link>
        ) : (
          <button type="button" className="btn btn-gold story-cta">
            {cta}
          </button>
        )}
      </div>
    </article>
  );
}

export default function Weddings() {
  const [active, setActive] = useState([]);
  const [query, setQuery] = useState('');

  const toggle = (f) => setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));
  const q = query.trim().toLowerCase();
  const visible = STORIES.filter(
    (s) =>
      (!active.length || active.some((f) => s.tags.includes(f))) &&
      (!q || [s.title, s.text, s.couple, s.location, s.art].some((v) => v.toLowerCase().includes(q))),
  );

  return (
    <main className="page-main weddings">
      <Hero
        image={asset('weddings/hero.jpg')}
        className="hero-plain"
        title="Weddings by Kalārika"
        subtitle="A curated collection of real celebrations designed through craft, culture, and thoughtful execution. Each wedding reflects a unique story brought to life through India’s living art traditions."
      />

      <section className="container">
        <div className="collage collage-weddings">
          {COLLAGE.map(([src, l, t, w, h, crop]) => (
            <Crop
              key={src}
              src={asset(`weddings/${src}.jpg`)}
              crop={crop}
              className="collage-tile"
              style={{ left: `${(l / 1207.7) * 100}%`, top: `${(t / 415.3) * 100}%`, width: `${(w / 1207.7) * 100}%`, height: `${(h / 415.3) * 100}%` }}
            />
          ))}
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Real Wedding Stories</h2>
        <div className="story-filter">
          <div className="story-chips" role="toolbar" aria-label="Filter by art form">
            {ART_FILTERS.map((f) => (
              <button key={f} type="button" className={`chip ${active.includes(f) ? 'active' : ''}`} aria-pressed={active.includes(f)} onClick={() => toggle(f)}>
                {f}
              </button>
            ))}
          </div>
          <label className="search-box on-dark">
            <img src={asset('common/search-gold.svg')} alt="" width="18" height="18" />
            <span className="sr-only">Search wedding stories</span>
            <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} maxLength={60} />
          </label>
        </div>
        <div className="wedding-list" aria-live="polite">
          {visible.length ? (
            visible.map((s) => <StoryCard key={s.title} s={s} />)
          ) : (
            <p className="g-empty">No wedding stories match your selection. Try clearing a filter or searching for another city or art form.</p>
          )}
        </div>
        {/* "View More" has no destination in the prototype */}
        <button type="button" className="btn btn-outline view-more" style={{ alignSelf: 'center' }}>
          View More
          <img src={asset('common/chevron-maroon-2.svg')} alt="" width="24" height="24" style={{ transform: 'rotate(90deg)' }} />
        </button>
      </section>

      <CtaBanner
        title="Ready to Craft Your Own Story?"
        text="Let us guide you with thoughtful suggestions that match your style, traditions, and dreams. Answer a few questions and discover a plan crafted around you."
        cta="Take the questionnaire"
        to={ROUTES.planWedding}
      />

      <section className="weddings-contact">
        <h2 className="container section-title">Already Have a Direction For Your Wedding?</h2>
        <ContactSection />
      </section>
    </main>
  );
}
