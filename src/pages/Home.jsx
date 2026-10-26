import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../lib/asset';
import { ROUTES } from '../lib/routes';
import PlanCards from '../components/PlanCards';
import Coverflow from '../components/Coverflow';
import CtaBanner from '../components/CtaBanner';
import ContactSection from '../components/ContactSection';
import Testimony from '../components/Testimony';
import './Home.css';

const HERO_SLIDES = [
  {
    image: 'home/hero-1.jpg',
    position: 'center top',
    title: 'Traditions come true',
    text: 'An unforgettable beginning shaped by heritage, emotion, and thoughtful details.',
    actions: true,
  },
  { image: 'home/hero-2.jpg', title: 'Crafted by Heritage', text: 'Every motif and material reflects generations of skill, transformed into timeless expressions for today.' },
  { image: 'home/hero-3.jpg', title: 'Stories Woven by Hand', text: 'From intricate embroidery to ceremonial artistry, each creation reflects generations of skill, emotion, and dedication.' },
  { image: 'home/hero-4.jpg', title: 'Threads of Royalty', text: 'Intricate metallic embroidery crafted by hand, carrying a legacy of opulence and detail.' },
  { image: 'home/hero-5.jpg', title: 'Lines of Legacy', text: 'Minimal strokes that carry generations of cultural memory and tradition.' },
];

const PILLARS = [
  {
    icon: 'home/icon-purpose.svg',
    title: 'Purpose',
    text: 'To create meaningful celebration spaces that feel beautiful and authentic, support skilled artisans, and build an honest, sustainable design practice.',
  },
  {
    icon: 'home/icon-mission.svg',
    title: 'Mission',
    text: 'To design and deliver high-quality cultural experiences by working closely with artisans, ensuring fair pay and reliable execution and a sustainable way to provide decor.',
  },
  {
    icon: 'home/icon-vision.svg',
    title: 'Vision',
    text: 'To be India’s most trusted premium design studio, known for blending traditional Indian art and craft into modern celebrations responsibly.',
  },
];

const STATS = [
  { value: '120 +', label: 'Successful Weddings', w: 98, box: 135 },
  { value: '150 +', label: 'Artisans Enrolled', w: 78, box: 126 },
  { value: '1240 +', label: 'Decor Elements and Artefacts Made', w: 184, box: 185 },
  { value: '5', label: 'Different Artforms Integrated', w: 168, box: 169 },
];

const MOMENTS = [
  { src: asset('home/moment-1.jpg'), caption: 'Traditional entrance with warm lighting.' },
  { src: asset('home/moment-2.jpg'), caption: 'Handcrafted Meenakari pieces', position: 'center bottom' },
  { src: asset('home/moment-3.png'), caption: 'Traditional Zardosi craft detailing', position: 'center 100%' },
  { src: asset('home/moment-4.jpg'), caption: 'Wedding of Vidhi and Darshan' },
  { src: asset('home/moment-5.png'), caption: 'Intricate Zari work on lehenga' },
];

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearTimeout(t);
  }, [index, paused]);

  return (
    <section
      className="hero home-hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {HERO_SLIDES.map((s, i) => (
        <div key={s.title} className={`home-hero-slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
          <img className="hero-bg" src={asset(s.image)} alt="" style={{ objectPosition: s.position || 'center' }} />
          <div className="container hero-content home-hero-content">
            <div className="hero-text">
              {i === 0 ? <h1 className="h1">{s.title}</h1> : <h2 className="h1">{s.title}</h2>}
              <p className="tagline">{s.text}</p>
            </div>
            {s.actions && (
              <div className="hero-actions">
                <Link to={ROUTES.contact} className="btn btn-gold" tabIndex={i === index ? 0 : -1}>
                  Contact Us
                </Link>
                <Link to={ROUTES.weddings} className="btn btn-gold-outline" tabIndex={i === index ? 0 : -1}>
                  Explore our works
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="dots on-dark hero-dots" role="tablist" aria-label="Hero slides">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}: ${s.title}`}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="page-main home">
      <HeroCarousel />

      <section className="container home-intro">
        <blockquote className="home-quote">
          <span className="quote-mark open" aria-hidden="true">“</span>
          <p className="h2">Every celebration carries a story , we design spaces that let it be felt</p>
          <span className="quote-mark close" aria-hidden="true">”</span>
        </blockquote>
        <div className="pillars">
          {PILLARS.map((p) => (
            <article key={p.title} className="card pillar">
              <img className="card-icon" src={asset(p.icon)} alt="" />
              <h3 className="card-title">{p.title}</h3>
              <p className="body">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="maroon-panel stats">
          {STATS.map((s, i) => (
            <div className="stat-wrap" key={s.label}>
              {i > 0 && <span className="stat-divider" aria-hidden="true" />}
              <div className="stat" style={{ width: s.box }}>
                <p className="h1">{s.value}</p>
                <p className="h5" style={{ maxWidth: s.w }}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PlanCards />

      <Coverflow title="Moments Shaped By Kalārika" slides={MOMENTS} />

      <CtaBanner
        title="Unable to visualise your wedding ?"
        text="Let us guide you with thoughtful suggestions that match your style, traditions, and dreams. Answer a few questions and discover a plan crafted around you."
        cta="Take the questionnaire"
        to={ROUTES.planWedding}
      />

      <section className="container testimonies">
        <h2 className="section-title">Testimonies</h2>
        <Testimony
          image={asset('home/testimony-1.jpg')}
          imageAlt="Vidhi and Darshan on their wedding day"
          quote="“Kalarika brought our wedding vision to life in the most beautiful way. Every detail felt rooted in tradition yet thoughtfully designed for us. It truly felt personal, elegant, and unforgettable.”"
          author="-Vidhi & Darshan"
          dots={4}
        />
      </section>

      <ContactSection />
    </main>
  );
}
