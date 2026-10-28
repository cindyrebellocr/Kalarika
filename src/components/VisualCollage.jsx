import { asset } from '../lib/asset';
import Crop from './Crop';

const W = 1207.7;
const H = 415.3;

/** "Your Visual Direction" moodboard collage: [image, left, top, width, height, crop?] in Figma pixels. */
export const VISUAL_DIRECTION = [
  ['result/r-84.jpg', 0, 0, 252.3, 151, [0, -15.96, 100, 121.94]],
  ['result/r-86.jpg', -1, 163, 252, 251, [-4.17, 0, 108.33, 108.77]],
  ['result/r-85.jpg', 264.3, 0, 190.7, 260.9],
  ['result/r-87.jpg', 264.3, 272.9, 190.7, 141.1, [-0.15, -17.65, 100, 135.21]],
  ['result/r-83.jpg', 467, 0, 331, 198],
  ['result/r-89.jpg', 467, 210, 160, 205],
  ['result/r-91.jpg', 639, 210, 160, 205],
  ['result/r-90.jpg', 811, 0, 191, 198, [-6.15, 0.25, 112.3, 108.33]],
  ['result/r-88.jpg', 811, 210, 191, 204],
  ['result/r-92.jpg', 1013.7, 0, 194, 151],
  ['result/r-93.jpg', 1013.7, 163, 194, 251],
];

export default function VisualCollage({ tiles = VISUAL_DIRECTION }) {
  return (
    <div className="collage" style={{ aspectRatio: `${W} / ${H}`, width: 'calc(100% + 8px)' }}>
      {tiles.map(([src, l, t, w, h, crop]) => (
        <Crop
          key={src}
          src={asset(src)}
          crop={crop}
          className="collage-tile"
          style={{ left: `${(l / W) * 100}%`, top: `${(t / H) * 100}%`, width: `${(w / W) * 100}%`, height: `${(h / H) * 100}%`, borderRadius: 0 }}
        />
      ))}
    </div>
  );
}
