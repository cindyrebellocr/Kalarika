import { asset } from '../../lib/asset';
import Hero from '../../components/Hero';
import Crop from '../../components/Crop';
import FeatureBlogCard from '../../components/FeatureBlogCard';
import './About.css';

const PILLARS = [
  {
    eyebrow: 'People',
    title: 'Empowering Artisan Communities',
    text: 'We work closely with artisan communities by creating meaningful, skill-based opportunities through real wedding projects. By offering fair collaboration and long-term partnerships, we help artisans sustain their livelihoods while bringing their craft into contemporary celebrations.',
    img: 'people',
    crop: [-0.05, 0.18, 100, 152.97],
  },
  {
    eyebrow: 'Sustainability',
    title: 'Designing Responsibly',
    text: 'Weddings often generate unnecessary waste. At Kalārika, we consciously choose natural materials, modular installations, and reusable elements to reduce environmental impact. Our goal is to create beautiful celebrations without compromising on responsibility.',
    img: 'sustainability',
    crop: [-0.07, -8.52, 100, 152.97],
    reverse: true,
  },
  {
    eyebrow: 'Culture',
    title: 'Keeping Traditions Alive',
    text: 'We believe traditions should be lived, not just displayed. By thoughtfully integrating regional art forms and cultural practices into modern wedding spaces, we ensure heritage remains relevant and meaningful for today’s celebrations.',
    img: 'culture',
    crop: [0.07, -22.16, 100, 152.97],
  },
];

export default function SocialImpact() {
  return (
    <main className="page-main about">
      <Hero
        image={asset('impact/hero.jpg')}
        className="hero-plain"
        title="Social Impact"
        subtitle="Our social impact is shaped through the weddings we design—supporting artisan livelihoods, encouraging responsible material use, and keeping cultural traditions alive."
      />

      <div className="impact-rows">
        {PILLARS.map((p) => (
          <section key={p.title} className={`container impact-row ${p.reverse ? 'reverse' : ''}`}>
            <div className="impact-copy">
              <div className="stack gap-16">
                <p className="eyebrow">{p.eyebrow}</p>
                <h2 className="h3">{p.title}</h2>
              </div>
              <p className="body">{p.text}</p>
            </div>
            <Crop src={asset(`impact/${p.img}.jpg`)} crop={p.crop} className="impact-img" alt={p.title} />
          </section>
        ))}
      </div>

      <section className="container">
        <FeatureBlogCard
          image={asset('impact/blog.jpg')}
          title="Living Traditions Blog"
          text="“When traditional craft finds space in contemporary celebrations, it does more than decorate it continues a living story. It creates opportunities for artisans to sustain their practice while allowing heritage to evolve within new contexts.”"
          dots={4}
        />
      </section>
    </main>
  );
}
