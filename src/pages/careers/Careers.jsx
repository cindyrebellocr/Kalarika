import { Link } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Hero from '../../components/Hero';
import IconCards from '../../components/IconCards';
import ContactSection from '../../components/ContactSection';
import './Careers.css';

const WHY = [
  {
    icon: asset('careers/i-meaningful.svg'),
    title: 'Meaningful Work',
    text: 'Be part of projects that go beyond decoration- where design, culture, and craft come together to create celebrations with depth and purpose.',
  },
  {
    icon: asset('careers/i-hands.svg'),
    title: 'Hands-On Learning',
    text: 'Gain real-world experience across research, concept development, collaboration, and on-site execution, building skills through practice.',
  },
  {
    icon: 'collab',
    title: 'Collaborative Studio Culture',
    text: 'Work alongside designers, planners, and artisan communities in an environment built on respect, shared responsibility, and open communication.',
  },
];

export const JOBS = [
  {
    title: 'Junior Design Associate',
    meta: 'Gujarat, India   •   Full-time   •   On-site',
    text: 'Support the design team in research, concept development, mood boards, and on-site execution. This role is ideal for someone eager to gain hands-on experience in wedding design, material exploration, and artisan collaboration.',
    to: ROUTES.careerDetail,
  },
  {
    title: 'Project & Execution Coordinator',
    meta: 'Gujarat, India   •   Full-time   •   Hybrid',
    text: 'Coordinate between designers, artisan partners, vendors, and venues to ensure smooth project execution. This role focuses on timelines, logistics, and on-ground supervision during wedding setups.',
  },
  {
    title: 'Content & Media Associate',
    meta: 'Gujarat, India   •   Part-Time   •   Hybrid',
    text: 'Manage visual documentation, social media content, and storytelling around projects and artisan journeys. This role supports brand communication across digital platforms.',
  },
  {
    title: 'Craft Research Intern',
    meta: 'Internship   •   Remote',
    text: 'Manage visual documentation, social media content, and storytelling around projects and artisan journeys. This role supports brand communication across digital platforms.',
  },
];

function CollabIcon() {
  return (
    <span className="collab-icon">
      <img src={asset('careers/i-collab-bg.svg')} alt="" />
      <img src={asset('careers/i-collab.svg')} alt="" className="fg" />
    </span>
  );
}

export default function Careers() {
  return (
    <main className="page-main careers">
      <Hero
        image={asset('careers/hero.jpg')}
        imageStyle={{ objectPosition: 'center 38%' }}
        className="hero-plain"
        title="Join us!"
        subtitle="Be part of a team that transforms ideas into lived experiences, blending tradition, design, and purpose."
      />

      <section className="container stack gap-48">
        <h2 className="section-title">Why join Kalārika ?</h2>
        <div className="icon-cards careers-why">
          {WHY.map((c) => (
            <article key={c.title} className="card icon-card">
              {c.icon === 'collab' ? <CollabIcon /> : <img src={c.icon} alt="" width="44" height="44" />}
              <h3 className="card-title">{c.title}</h3>
              <p className="body">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Open positions</h2>
        <div className="job-grid">
          {JOBS.map((j) => (
            <article key={j.title} className="job-card">
              <div className="stack gap-24">
                <div className="stack gap-16">
                  <h3 className="h3">{j.title}</h3>
                  <p className="job-meta">{j.meta}</p>
                </div>
                <p className="body">{j.text}</p>
              </div>
              {j.to ? (
                <Link to={j.to} className="btn btn-gold">
                  Read more →
                </Link>
              ) : (
                // Only the first role has a detail page in the prototype
                <button type="button" className="btn btn-gold">
                  Read more →
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="container careers-life">
        <div className="stack gap-48" style={{ alignItems: 'flex-start' }}>
          <h2 className="section-title">Life at Kalārika</h2>
          <p className="body" style={{ maxWidth: 568 }}>
            Life at Kalārika is shaped by collaboration, curiosity, and responsibility. From early concepts to on-site installations, team members are
            involved in building experiences that blend culture, craft, and contemporary design. It’s a place to grow, experiment, and contribute to work
            that carries real meaning.
          </p>
          <Link to={ROUTES.aboutKalarika} className="btn btn-primary">
            Learn more →
          </Link>
        </div>
        <img src={asset('about/life-3.jpg')} alt="The Kalārika team at work" />
      </section>

      <ContactSection />
    </main>
  );
}
