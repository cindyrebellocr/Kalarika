import Crop from './Crop';
import './StoryCards.css';

/**
 * Maroon "blog with read more" cards. The "Read More" links have no destination in the
 * prototype, so they are rendered as static text.
 */
export default function StoryCards({ items, more = 'Read More →', tone = 'light' }) {
  return (
    <div className={`story-cards tone-${tone}`}>
      {items.map((s) => (
        <article key={s.title} className="story-card">
          <div className="story-card-top">
            <Crop src={s.image} crop={s.crop} className="story-card-img" />
            <h3 className="card-title">{s.title}</h3>
            <p className="body">{s.text}</p>
          </div>
          <span className="link-arrow story-more">{s.more || more}</span>
        </article>
      ))}
    </div>
  );
}
