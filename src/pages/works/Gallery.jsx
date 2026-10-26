import { useMemo, useState } from 'react';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import CtaBanner from '../../components/CtaBanner';
import './Gallery.css';

const FILTERS = ['All', 'Weddings', 'Haldi', 'Mehendi', 'Sangeet', 'Engagement', 'Reception', 'Live Stations', 'Culturals', 'Artefacts', 'Hampers'];

/*
 * Tile geometry from Figma (each collage is 1209.7 × 415.3):
 * [file, tags, caption, tile(left, top, width, height), image box relative to tile(left, top, width, height)]
 * Image boxes come from the Figma mask groups: image frame offset by the mask position, then the inner image crop.
 */
const tile = (file, tags, caption, mask, div, crop = [0, 0, 100, 100]) => {
  const [dl, dt, dw, dh, mx, my] = div;
  const [, , mw, mh] = mask;
  const imgL = -mx + (crop[0] / 100) * dw;
  const imgT = -my + (crop[1] / 100) * dh;
  return {
    file,
    tags,
    caption,
    box: [dl + mx, dt + my, mw, mh],
    img: [(imgL / mw) * 100, (imgT / mh) * 100, ((crop[2] / 100) * dw * 100) / mw, ((crop[3] / 100) * dh * 100) / mh],
  };
};

const ROW_1 = [
  tile('g45', ['Weddings'], 'Bridal portrait with fresh florals', [0, 0, 252.3, 151], [2.83, -47, 244, 273, -2.83, 47], [0, -11.8, 100, 111.8]),
  tile('g52', ['Culturals', 'Sangeet'], 'Classical music performance', [0, 0, 249.6, 244.6], [-14.17, 106, 261, 322, 16.91, 60.87]),
  tile('g106', ['Haldi'], 'Garden ceremony setup', [0, 0, 190.7, 260.9], [242.83, 3, 225, 270, 21.49, -3]),
  tile('g62', ['Mehendi'], 'Mehendi lounge with floor seating', [0, 0, 190.7, 141.1], [242.83, 186, 252, 252, 21.49, 86.93]),
  tile('g72', ['Reception'], 'Courtyard seating arrangement', [0, 0, 330.5, 151], [421.83, -56, 389, 223, 45.23, 56], [-0.03, -114.88, 100.03, 218.44]),
  tile('g110', ['Engagement'], 'Engagement portrait', [0, 0, 190.7, 252.3], [454.83, 98, 215, 349, 12.23, 65]),
  tile('g43', ['Weddings'], 'Bride in traditional jewellery', [0, 0, 129.1, 252.3], [657.62, 151.97, 152.9, 274.18, 12.17, 11.03], [-1.58, -1.48, 102.36, 101.48]),
  tile('g92', ['Haldi', 'Mehendi'], 'Colourful lounge with umbrellas', [0, 0, 190.7, 260.9], [810.83, 0, 215, 261, 0.1, 0], [0.01, -1.49, 99.95, 150.68]),
  tile('g5', ['Mehendi'], 'Alta and anklets', [0, 0, 190.7, 141.1], [771.83, 273, 230, 180, 39.1, -0.07], [0, -32.48, 100, 139.56]),
  tile('g79', ['Artefacts'], 'Heirloom jewellery', [0, 0, 194, 151], [1013.83, -7, 217, 164, -0.17, 7], [0.05, -58.02, 100, 166.21]),
  tile('g3', ['Weddings'], 'Sacred fire ritual', [0, 0, 194, 251], [978.83, 163, 263, 395, 34.83, 0]),
];

const ROW_2 = [
  tile('g111', ['Hampers'], 'Jasmine favours in leaf cups', [0, 0, 252.3, 151], [-27.17, -0.32, 305, 206, 27.17, 0.32], [0, -26.79, 103.93, 230.67]),
  tile('g95', ['Artefacts'], 'Zardosi embroidery in progress', [0, 0, 252.3, 252.3], [-43.17, 142.68, 338, 272, 43.17, 20.32], [-3.77, -36.9, 115.41, 214.53]),
  tile('g88', ['Artefacts', 'Culturals'], 'Handwoven tassel hangings', [0, 0, 190.7, 260.9], [202.83, -3.32, 321, 292, 61.49, 3.32], [0.03, -41.77, 102.97, 175.54]),
  tile('g96', ['Artefacts'], 'Hand-painted artwork', [0, 0, 190.7, 141.1], [263.83, 260.68, 213.98, 166.11, 0.49, 12.25], [-9.08, -0.03, 116.5, 100.05]),
  tile('g46', ['Sangeet'], 'Sangeet celebrations', [0, 0, 330.5, 151], [443.83, -121.32, 428, 503, 23.23, 121.32], [0, 0, 100, 104.25]),
  tile('g89', ['Artefacts'], 'Block printing on fabric', [0, 0, 190.7, 252.3], [297.83, 39.68, 487, 376, 169.23, 123.32], [0.03, -29.01, 100, 172.87]),
  tile('g87', ['Culturals'], 'Folk musicians', [0, 0, 129.1, 252.3], [617.83, 119.68, 531, 294, 51.96, 43.32], [0, -96.46, 100, 225.87]),
  tile('g99', ['Hampers'], 'Lacquered bangles', [0, 0, 190.7, 260.9], [783.83, -14.32, 230, 287, 27.1, 14.32]),
  tile('g32', ['Culturals', 'Artefacts'], 'Warli wall painting', [0, 0, 190.7, 141.1], [791.83, 221.68, 228, 282, 19.1, 51.25], [-0.79, -7.78, 100.75, 108.77]),
  tile('g108', ['Reception', 'Engagement'], 'Blue pottery stage décor', [0, 0, 194, 151], [1008.83, -0.32, 200.65, 200.65, 4.83, 0.32]),
  tile('g94', ['Artefacts'], 'Carpet weaving on the loom', [0, 0, 194, 251], [950.83, 134.68, 307, 308, 62.83, 28.32], [0, -11.87, 100, 124.65]),
];

const STAGE_W = 1209.7;
const STAGE_H = 415.3;

function Tile({ t, style }) {
  return (
    <figure className="g-tile" style={style}>
      <img
        src={asset(`gallery/${t.file}.jpg`)}
        alt={t.caption}
        loading="lazy"
        style={{ left: `${t.img[0]}%`, top: `${t.img[1]}%`, width: `${t.img[2]}%`, height: `${t.img[3]}%` }}
      />
      <figcaption>{t.caption}</figcaption>
    </figure>
  );
}

function Collage({ tiles }) {
  return (
    <div className="g-collage">
      {tiles.map((t) => (
        <Tile
          key={t.file}
          t={t}
          style={{
            left: `${(t.box[0] / STAGE_W) * 100}%`,
            top: `${(t.box[1] / STAGE_H) * 100}%`,
            width: `${(t.box[2] / STAGE_W) * 100}%`,
            height: `${(t.box[3] / STAGE_H) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const all = useMemo(() => [...ROW_1, ...ROW_2], []);
  const q = query.trim().toLowerCase();
  const showCollage = filter === 'All' && !q;
  const results = all.filter(
    (t) => (filter === 'All' || t.tags.includes(filter)) && (!q || t.caption.toLowerCase().includes(q) || t.tags.some((g) => g.toLowerCase().includes(q))),
  );

  return (
    <main className="page-main gallery-page">
      <section className="container gallery-head">
        <h1 className="h1 text-primary">Gallery</h1>
        <p className="body">
          Explore our gallery of thoughtfully crafted celebrations.From intricate artisan details to grand cultural moments, each wedding reflects
          tradition, creativity, and care.Discover how every element comes together to tell a unique story.
        </p>
      </section>

      <section className="container gallery-body">
        <div className="gallery-tools">
          <label className="search-box">
            <img src={asset('common/search.svg')} alt="" width="18" height="18" />
            <span className="sr-only">Search the gallery</span>
            <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} maxLength={60} />
          </label>
          <div className="chip-bar" role="toolbar" aria-label="Filter gallery">
            {FILTERS.map((f) => (
              <button key={f} type="button" className={`chip ${filter === f ? 'active' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {showCollage ? (
          <div className="g-collages">
            <Collage tiles={ROW_1} />
            <Collage tiles={ROW_2} />
          </div>
        ) : results.length ? (
          <div className="g-grid" aria-live="polite">
            {results.map((t) => (
              <Tile key={t.file} t={{ ...t, img: [0, 0, 100, 100] }} />
            ))}
          </div>
        ) : (
          <p className="g-empty" aria-live="polite">
            No photos found{filter !== 'All' ? ` in “${filter}”` : ''}
            {q ? ` for “${query.trim()}”` : ''}. Try another category or search term.
          </p>
        )}

        {/* "View More" has no destination in the prototype, so it stays as an inert button */}
        <button type="button" className="btn btn-outline view-more">
          View More
          <img src={asset('common/chevron-maroon-2.svg')} alt="" width="24" height="24" style={{ transform: 'rotate(90deg)' }} />
        </button>
      </section>

      <CtaBanner
        title="Looking for the Perfect Wedding Setup?"
        text="Let us guide you with thoughtful suggestions that match your style, traditions, and dreams. Answer a few questions and discover a plan crafted around you."
        cta="Contact us"
        to={ROUTES.contact}
        className="gallery-cta"
      />
    </main>
  );
}
