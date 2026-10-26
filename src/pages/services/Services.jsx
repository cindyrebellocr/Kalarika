import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Hero from '../../components/Hero';
import Coverflow from '../../components/Coverflow';
import Crop from '../../components/Crop';
import CtaBanner from '../../components/CtaBanner';
import './Services.css';

const PROVIDE = [
  { src: asset('services/provide-1.jpg'), caption: 'Artisans work together for your grand celebrations' },
  { src: asset('services/provide-2.jpg'), caption: 'We provide detailed design plan and timeline' },
  { src: asset('services/provide-3.jpg'), caption: 'Professional decorative experience and finish' },
  { src: asset('services/provide-4.jpg'), caption: 'Traditional entrance with warm lighting.', position: 'center 77%' },
  { src: asset('services/provide-5.jpg'), caption: 'Traditional entrance with warm lighting.' },
];

export const PACKAGES = [
  {
    title: 'Complete Wedding Package',
    img: 'pkg-complete',
    crop: [-3.73, -22.52, 103.73, 144.59],
    points: ['Venue theme concept & design planning', 'Customized décor for all wedding functions', 'Floral styling & stage setup', 'On-site setup and end-to-end execution'],
    to: ROUTES.completePackage,
  },
  {
    title: 'Artisan Experience Packages',
    img: 'pkg-artisan',
    crop: [-7.05, -126.85, 107.05, 297.84],
    points: ['Handcrafted décor installations', 'Collaboration with skilled local artisans', 'Live artisan demonstrations during events', 'Integration of traditional art forms'],
  },
  {
    title: 'Event / Function Wise Packages',
    img: 'pkg-event',
    crop: [-12.45, -118.19, 124.69, 371.43],
    points: [
      'Custom theme for each function (Haldi, Mehendi, Sangeet, Wedding)',
      'Function-specific stage & backdrop design',
      'Coordinated floral and prop styling',
      'Dedicated setup and on-site management',
    ],
  },
  {
    title: 'Custom Packages',
    img: 'pkg-custom',
    crop: [-9.34, -106.07, 110.58, 230.74],
    points: ['Fully personalized theme development', 'Flexible décor elements based on budget', 'Unique color palette & styling curation', 'End-to-end planning and execution support'],
  },
];

export function PackageCard({ p, cta = 'Read more →' }) {
  return (
    <article className="package-card">
      <Crop src={asset(`services/${p.img}.jpg`)} crop={p.crop} className="package-img" alt={p.title} />
      <div className="package-copy">
        <div className="stack gap-16">
          <h3 className="card-title">{p.title}</h3>
          <ul className="body package-points">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
        {p.to ? (
          <Link to={p.to} className="btn btn-primary">
            {cta}
          </Link>
        ) : (
          // No prototype destination — kept as an inert button
          <button type="button" className="btn btn-primary">
            {cta}
          </button>
        )}
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <main className="page-main services">
      <Hero
        image={asset('services/hero.jpg')}
        imageStyle={{ objectPosition: 'center 45%' }}
        title="Our Services"
        subtitle="Thoughtfully curated services to bring your wedding vision to life."
        contentStyle={{ paddingBottom: 182 }}
      />

      <Coverflow title="What Do We Provide ?" slides={PROVIDE} titleOutside />

      <section className="container stack gap-48">
        <h2 className="section-title">Packages</h2>
        <div className="package-list">
          {PACKAGES.map((p) => (
            <PackageCard key={p.title} p={p} />
          ))}
        </div>
      </section>

      <CtaBanner
        title="Confused which package to choose ?"
        text="Let us guide you with thoughtful suggestions that match your style, traditions, and dreams. Answer a few questions and discover a plan crafted around you."
        cta="Take Questionnaire"
        to={ROUTES.planWedding}
        className="services-cta"
      />
    </main>
  );
}
