import { useState } from 'react';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Crop from '../../components/Crop';
import CtaBanner from '../../components/CtaBanner';
import './Blogs.css';

const CATEGORIES = ['Craft Chronicles', 'Artisan Personal Journeys', 'Living Traditions', 'Weddings  by Kalārika'];

const BLOGS = [
  { img: 'b1', cat: 0, title: 'Threads That Tell Stories', text: 'Centuries-old crafts that carry stories in every motif and material. Exploring their origins, symbolism, and evolving design language.' },
  { img: 'b2', cat: 0, title: 'Crafting Cultural Memory', text: 'How traditional art forms preserve regional identity and heritage. A closer look at the techniques that define India’s living crafts.' },
  { img: 'b3', cat: 0, title: 'Echoes in Embroidery', text: 'From royal ateliers to contemporary installations. Tracing the journey of intricate handcraft traditions.' },
  { img: 'b4', cat: 1, crop: [0, -45.67, 100, 145.73], title: 'Hands of Heritage', text: 'Meet the artisans whose skill is shaped by generations of learning. Their craft is not just work it is legacy.' },
  { img: 'b5', cat: 1, crop: [0, -34.13, 100, 145.73], title: 'Stories Behind Skill', text: 'A glimpse into the lives, struggles, and quiet dedication of master craftsmen.\nCelebrating resilience, pride, and passion.' },
  { img: 'b6', cat: 1, crop: [0.1, 0.09, 100, 145.73], title: 'From Workshop to Wedding', text: 'How artisans transition from local practice to grand celebrations. A journey of growth, visibility, and recognition.' },
  { img: 'b7', cat: 2, title: 'Traditions That Breathe', text: 'Art forms that continue to evolve while staying rooted in culture. Discover how heritage remains relevant in modern spaces.' },
  { img: 'b8', cat: 2, title: 'Rituals in Art', text: 'Where craftsmanship meets customs and community traditions. Exploring art forms that shape ceremonies and celebrations.' },
  { img: 'b9', cat: 2, title: 'Preserving Living Legacies', text: 'The importance of sustaining traditional skills for future generations. A dialogue between preservation and innovation.' },
  { img: 'b10', cat: 3, crop: [0.2, -33.32, 100, 145.73], title: 'Crafted Celebrations', text: 'Weddings designed through storytelling and artisanal excellence. Where heritage becomes an immersive experience.' },
  { img: 'b11', cat: 3, title: 'Artful Wedding Experiences', text: 'Handcrafted décor transforming venues into cultural narratives. Celebrations rooted in meaning and design.' },
  { img: 'b12', cat: 3, crop: [0.29, -34.11, 100, 145.73], title: 'Heritage in Every Detail', text: 'From installations to rituals, every element is thoughtfully curated. A wedding that reflects tradition, artistry, and soul.' },
];

export default function Blogs() {
  const [active, setActive] = useState([]);
  const [query, setQuery] = useState('');
  const toggle = (i) => setActive((a) => (a.includes(i) ? a.filter((x) => x !== i) : [...a, i]));
  const q = query.trim().toLowerCase();
  const visible = BLOGS.filter((b) => (!active.length || active.includes(b.cat)) && (!q || `${b.title} ${b.text}`.toLowerCase().includes(q)));

  return (
    <main className="page-main blogs">
      <section className="hero hero-plain">
        <img className="hero-bg" src={asset('blogs/hero.jpg')} alt="" style={{ transform: 'scaleX(-1)' }} />
        <div className="container hero-content" style={{ gap: 16 }}>
          <div className="hero-text" style={{ gap: 16 }}>
            <h1 className="h1">Stories of Kalārika</h1>
            <p className="tagline">Explore with us Indian Culture, Craftsmanship, wedding culture and the personal stories of our artisans</p>
          </div>
        </div>
      </section>

      <section className="container stack" style={{ gap: 44 }}>
        <h2 className="section-title ink">Featured Blog</h2>
        <article className="featured-blog">
          <img src={asset('blogs/featured.jpg')} alt="Rituals in Art" />
          <div className="featured-copy">
            <h3 className="card-title">Rituals in Art</h3>
            <p className="tagline">
              An exploration of how traditional Indian rituals are expressed through craft and visual storytelling. From embroidered symbols to painted
              narratives, each art form carries deeper cultural meaning. This blog uncovers the connection between celebration, heritage, and handcrafted
              detail.
            </p>
            {/* No prototype destination — static text */}
            <span className="link-arrow static-link">Read More →</span>
          </div>
        </article>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Blogs</h2>
        <div className="stack gap-48">
          <div className="story-filter blog-filter">
            <div className="story-chips" role="toolbar" aria-label="Filter blogs by category">
              {CATEGORIES.map((c, i) => (
                <button key={c} type="button" className={`chip ${active.includes(i) ? 'active' : ''}`} aria-pressed={active.includes(i)} onClick={() => toggle(i)}>
                  {c}
                </button>
              ))}
            </div>
            <label className="search-box on-dark">
              <img src={asset('common/search-gold.svg')} alt="" width="18" height="18" />
              <span className="sr-only">Search blogs</span>
              <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} maxLength={60} />
            </label>
          </div>
          {visible.length ? (
            <div className="blog-grid" aria-live="polite">
              {visible.map((b) => (
                <article key={b.title} className="blog-card">
                  <Crop src={asset(`blogs/${b.img}.jpg`)} crop={b.crop} className="blog-img" alt={b.title} />
                  <h3 className="card-title">{b.title}</h3>
                  <p className="body">{b.text}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="g-empty" aria-live="polite">
              No blogs match your selection. Try another category or search term.
            </p>
          )}
          {/* "View more" has no destination in the prototype */}
          <button type="button" className="btn btn-outline view-more" style={{ alignSelf: 'center' }}>
            View more
            <img src={asset('common/chevron-maroon-2.svg')} alt="" width="24" height="24" style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      </section>

      <CtaBanner
        title="Take a look at the weddings created by us"
        text="Take a look at how we transform traditions into thoughtfully curated wedding experiences, shaping each moment with intention, artistry, and cultural depth to create a celebration that truly feels like your own."
        cta="Weddings by Kalārika"
        to={ROUTES.weddings}
        className="wide-cta"
      />
    </main>
  );
}
