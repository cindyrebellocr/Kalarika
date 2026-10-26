import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Hero from '../../components/Hero';
import IconCards from '../../components/IconCards';
import CtaBanner from '../../components/CtaBanner';
import '../plan/Plan.css';
import './Careers.css';

const a = (f) => asset(`artisan-steps/${f}`);

/** Icons drawn as a maroon disc plus positioned glyph pieces (as layered in Figma). */
const LAYERED = {
  groups: [
    ['g-a.svg', 16.43, 9.29, 11.74, 13.1],
    ['g-b.svg', 8.18, 19.42, 15.29],
    ['g-c.svg', 20.53, 19.42, 15.29],
  ],
  ngo: [
    ['n-a.svg', 17.04, 10.69, 10.44, 11.66],
    ['n-b.svg', 9.71, 19.71, 13.6],
    ['n-c.svg', 20.69, 19.71, 13.6],
    ['n-d.svg', 5.56, 5.95, 32.89],
  ],
};

function LayeredIcon({ parts }) {
  return (
    <span className="layered-icon" aria-hidden="true">
      <img src={a('g-bg.svg')} alt="" className="bg" />
      {parts.map(([file, left, top, w, h]) => (
        <img key={file} src={a(file)} alt="" style={{ left, top, width: w, height: h ?? 'auto' }} />
      ))}
    </span>
  );
}

const WHO = [
  {
    icon: <img src={a('i-independent.svg')} alt="" width="44" height="44" />,
    title: 'Indpendant Artisan',
    text: [
      'Individual craftsmen and craftswomen practicing traditional art forms independently.',
      'If you work directly from your workshop or studio and wish to showcase your skill on larger platforms.',
    ],
  },
  {
    icon: <LayeredIcon parts={LAYERED.groups} />,
    title: 'Artisan Groups',
    text: [
      'Clusters, collectives, or family-led craft units working together to preserve shared traditions. We collaborate with organized groups to scale their impact while maintaining authenticity and quality.',
    ],
  },
  {
    icon: <LayeredIcon parts={LAYERED.ngo} />,
    title: 'NGO Referred Artisans',
    text: [
      'Artisans supported or represented by NGOs and social organizations. We partner with mission-driven institutions to create sustainable opportunities and fair recognition for talented craft communities.',
    ],
  },
];

const WHY = [
  { icon: a('i-reach.svg'), title: 'Expand Your Reach', text: 'Connect directly with clients who value handmade craft and are willing to pay fair prices for quality work.' },
  { icon: a('i-regular.svg'), title: 'Regular Work', text: 'Receive project-based assignments throughout the year, not just seasonal demand.' },
  { icon: a('i-recognition.svg'), title: 'Recognition', text: 'Your name, your story, your craft fully credited and celebrated in every project you contribute to.' },
  { icon: asset('story/i-fair.svg'), title: 'Fair Payment', text: 'Transparent pricing discussions from the start. Payments made on time, every time.' },
];

const STEPS = [
  {
    title: 'Share Your Craft Details',
    text: 'Tell us about your craft, experience, and regional specialization. Share basic contact information so we can reach you.',
    points: ['Art form and specialization', 'Location and workshop details', 'Years of experience', 'Contact information (phone/email)'],
  },
  {
    title: 'Verification & Understanding',
    text: 'Our team reviews your details and reaches out for a conversation by phone or in-person if nearby—to understand your work better.',
    points: ['Our team reviews your submission', 'Discuss your craft, capacity, and preferences', 'We schedule a call or visit'],
  },
  {
    title: 'Onboarding & Profile Creation',
    text: 'Once verified, we create your artisan profile with photos of your work and craft story. You receive dashboard access to manage projects.',
    points: ['Artisan profile is created', 'Dashboard access provided', 'Photos and story documented', 'Training and support offered'],
  },
  {
    title: 'Project Assignment & Collaboration',
    text: 'You start receiving project invitations based on your craft. Accept projects that suit your capacity, with clear timelines and expectations.',
    points: ['Receive project notifications', 'Work with clear communication and support', 'Review requirements and timelines'],
  },
];

const AFTER = [
  { icon: a('i-communication.svg'), title: 'Clear Communication', text: "You'll always know what's expected, when it's due, and who to contact if you have questions." },
  { icon: a('i-pricing.svg'), title: 'Fair Pricing', text: 'We discuss pricing openly before any project begins. Your skill and time are valued fairly.' },
  { icon: a('i-payments.svg'), title: 'Timely Payments', text: 'Payments are made on schedule without delays. Your work is respected with prompt payment.' },
  { icon: a('i-support.svg'), title: 'Ongoing Support', text: 'Our team is available to help with project questions, material needs, or any challenges you face.' },
];

export default function ArtisanSteps() {
  return (
    <main className="page-main artisan-steps">
      <Hero
        image={asset('artisan/testimony-ramesh.jpg')}
        imageStyle={{ objectPosition: 'center 58%' }}
        className="hero-plain"
        title="Enroll as Artisan"
        subtitle="Join Kalārika and become part of a curated collective that celebrates heritage, empowers skill, and transforms traditional art into meaningful wedding experiences."
        actions={[{ label: 'Enroll as an Artisan', to: ROUTES.artisanEnroll }]}
      />

      <section className="container stack gap-48">
        <h2 className="section-title ink">Who can Enroll with us?</h2>
        <p className="body">
          We welcome skilled creators who carry forward traditional art forms and believe in preserving craft through collaboration,
          innovation, and excellence.
        </p>
        <div className="icon-cards">
          {WHO.map((c) => (
            <article key={c.title} className="card icon-card">
              {c.icon}
              <h3 className="card-title">{c.title}</h3>
              <div className="body">
                {c.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="maroon-panel matters">
          <h2 className="h3 text-gold">What Matters to us?</h2>
          <p className="body text-gold">
            At Kalārika, craft is more than design, it is dignity, identity, and living heritage. We value authenticity, fair
            collaboration, and excellence in every detail, ensuring artisans are respected as creative partners, not just
            contributors. Our commitment lies in preserving cultural traditions while creating meaningful growth, visibility, and
            opportunity for the hands that keep them alive.
          </p>
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Why Join Kalārika?</h2>
        <IconCards items={WHY} className="four" />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">Steps to Enroll</h2>
        <ol className="enroll-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="enroll-step">
              <span className="enroll-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="card-title">{s.title}</h3>
              <p className="body">{s.text}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>
                    <img src={a('check.svg')} alt="" width="20" height="20" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title ink">What Happens After You Join</h2>
        <IconCards items={AFTER} className="four" />
      </section>

      <CtaBanner
        title="Ready to join Kalārika?"
        text="Become part of a curated platform that connects traditional craft with contemporary celebrations. Collaborate with our design studio, work on premium wedding projects, and gain structured visibility. Apply to join our artisan network and grow with long-term creative opportunities."
        cta="Enroll as an Artisan"
        to={ROUTES.artisanEnroll}
        className="steps-cta"
      />
    </main>
  );
}
