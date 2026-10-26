import { asset } from '../lib/asset';
import './Testimony.css';

/**
 * Testimony card between two arrows. The design has a single testimony per section and no
 * prototype action on the arrows / "Read More", so those stay static (as in the prototype).
 */
export default function Testimony({ image, imageAlt = '', quote, author, dots = 0 }) {
  return (
    <div className="testimony-block">
      <div className="testimony-row">
        <span className="arrow-btn static" aria-hidden="true">
          <img src={asset('common/arrow-left.svg')} alt="" />
        </span>
        <figure className="testimony">
          <img src={image} alt={imageAlt} />
          <div className="testimony-body">
            <blockquote className="quote">{quote}</blockquote>
            <figcaption>
              <span className="quote">{author}</span>
              <span className="link-arrow static-link">Read More →</span>
            </figcaption>
          </div>
        </figure>
        <span className="arrow-btn next static" aria-hidden="true">
          <img src={asset('common/arrow-left.svg')} alt="" />
        </span>
      </div>
      {dots > 0 && (
        <div className="dots" aria-hidden="true">
          {Array.from({ length: dots }, (_, i) => (
            <span key={i} className={`dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>
      )}
    </div>
  );
}
