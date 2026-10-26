/**
 * Image inside a rounded box, cropped exactly like the Figma frame.
 * crop = [left%, top%, width%, height%] of the image relative to the box; omit for object-fit: cover.
 */
export default function Crop({ src, alt = '', crop, className = '', style, position }) {
  const imgStyle = crop
    ? { position: 'absolute', left: `${crop[0]}%`, top: `${crop[1]}%`, width: `${crop[2]}%`, height: `${crop[3]}%`, maxWidth: 'none', objectFit: 'cover' }
    : { width: '100%', height: '100%', objectFit: 'cover', objectPosition: position };
  return (
    <div className={`crop ${className}`} style={style}>
      <img src={src} alt={alt} style={imgStyle} loading="lazy" />
    </div>
  );
}
