import { useId, useState } from 'react';
import { asset } from '../lib/asset';
import './FaqAccordion.css';

/** FAQ accordion (collapsed / expanded variants from the Figma "FAQ" component). */
export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null);
  const base = useId();
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <h3>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <img src={asset('common/chevron-maroon.svg')} alt="" width="24" height="24" />
              </button>
            </h3>
            <div id={`${base}-${i}`} className="faq-a" role="region" hidden={!isOpen}>
              <p className="body">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
