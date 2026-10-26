/** Wide cream blog card with image + quote + "Read more" (Figma "Blog card 4"). */
export default function FeatureBlogCard({ image, title, text, cta = 'Read more →', dots = 0 }) {
  return (
    <div className="feature-blog">
      <article className="feature-blog-card">
        <img src={image} alt="" loading="lazy" />
        <div className="feature-blog-copy">
          <div className="stack gap-16">
            <h3 className="card-title">{title}</h3>
            <p className="body">{text}</p>
          </div>
          {/* No prototype destination for this button, so it is kept inert */}
          <button type="button" className="btn btn-primary">
            {cta}
          </button>
        </div>
      </article>
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
