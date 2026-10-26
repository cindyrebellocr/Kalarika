import { useState } from 'react';
import { asset } from '../lib/asset';
import './Coverflow.css';

// Slot geometry from Figma (996 × 312 stage): offset → left, top, width (px)
const SLOTS = {
  '-2': { left: 0, top: 40, width: 416.4, z: 1 },
  '-1': { left: 74, top: 20, width: 488.2, z: 2 },
  0: { left: 218.1, top: 0, width: 560, z: 3 },
  1: { left: 434, top: 20, width: 488.2, z: 2 },
  2: { left: 580.1, top: 40, width: 416.4, z: 1 },
};
const STAGE_W = 996.5;
const STAGE_H = 312;

/** Centre-focused image carousel ("Moments shaped by Kalārika"). */
export default function Coverflow({ title, slides, titleOutside = false }) {
  const [active, setActive] = useState(0);
  const n = slides.length;
  const go = (d) => setActive((a) => (a + d + n) % n);

  return (
    <section className="container coverflow-wrap" aria-roledescription="carousel" aria-label={title}>
      {titleOutside && <h2 className="section-title coverflow-outside-title">{title}</h2>}
      <div className="coverflow">
      <button type="button" className="arrow-btn prev" onClick={() => go(-1)} aria-label="Previous image">
        <img src={asset('common/arrow-left.svg')} alt="" />
      </button>
      <div className="coverflow-body">
        {!titleOutside && <h2 className="section-title text-center">{title}</h2>}
        <div className="coverflow-stage">
          {slides.map((s, i) => {
            let off = i - active;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const slot = SLOTS[off];
            const visible = !!slot;
            const g = slot || SLOTS[off < 0 ? -2 : 2];
            const height = (g.width / 560) * STAGE_H;
            return (
              <button
                type="button"
                key={s.src}
                className={`coverflow-item ${off === 0 ? 'is-active' : ''}`}
                style={{
                  left: `${(g.left / STAGE_W) * 100}%`,
                  top: `${(g.top / STAGE_H) * 100}%`,
                  width: `${(g.width / STAGE_W) * 100}%`,
                  height: `${(height / STAGE_H) * 100}%`,
                  zIndex: g.z,
                  opacity: visible ? 1 : 0,
                }}
                onClick={() => setActive(i)}
                aria-label={s.caption}
                tabIndex={off === 0 ? -1 : 0}
              >
                <img src={s.src} alt={s.caption} style={{ objectPosition: s.position || 'center' }} />
              </button>
            );
          })}
        </div>
        <p className="h5 coverflow-caption" aria-live="polite">
          {slides[active].caption}
        </p>
      </div>
      <button type="button" className="arrow-btn next" onClick={() => go(1)} aria-label="Next image">
        <img src={asset('common/arrow-left.svg')} alt="" />
      </button>
      </div>
    </section>
  );
}
