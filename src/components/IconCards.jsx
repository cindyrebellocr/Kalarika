/** Row of cream cards with a 44px icon, heading and text (Figma "card with icon"). */
export default function IconCards({ items, className = '' }) {
  return (
    <div className={`icon-cards ${className}`}>
      {items.map((c) => (
        <article key={c.title} className="card icon-card">
          <img src={c.icon} alt="" width="44" height="44" />
          <h3 className="card-title">{c.title}</h3>
          <p className="body">{c.text}</p>
        </article>
      ))}
    </div>
  );
}
