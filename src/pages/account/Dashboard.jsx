import { Link, Navigate } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import { useCustomer } from '../../lib/customer';
import VisualCollage, { VISUAL_DIRECTION } from '../../components/VisualCollage';
import './Account.css';

const a = (f) => asset(`account/${f}`);

// Sample wedding shown to every customer: the site has no backend, so this mirrors the Figma dashboard.
const PROGRESS = 40;

const STATS = [
  { icon: 'i-done.svg', value: 2, label: 'Tasks Completed' },
  { icon: 'i-progress.svg', value: 4, label: 'Tasks In progress' },
  { icon: 'i-date.svg', value: 25, label: 'Days to Wedding' },
];

// status: done | current | upcoming
const PROCESS = [
  {
    title: 'Consultation & Vision Setting',
    text: 'We begin by understanding the couple’s story, cultural context, and expectations to define a clear and meaningful direction for the celebration.',
    status: 'done',
  },
  {
    title: 'Concept Development',
    text: 'Our team translates insights into a cohesive design narrative, blending traditional craft with contemporary spatial design.',
    status: 'current',
  },
  {
    title: 'Artisan Collaboration',
    text: 'We identify and collaborate with skilled artisans, aligning craft techniques with the design intent and project requirements.',
    status: 'upcoming',
  },
  {
    title: 'Sampling & Prototyping',
    text: 'Select elements are developed and tested through samples to ensure quality, material integrity, and visual alignment.',
    status: 'upcoming',
  },
  {
    title: 'Production & Fabrication',
    text: 'Once approved, all design elements move into full-scale production, managed with precision and clear coordination.',
    status: 'upcoming',
  },
  {
    title: 'On-Site Installation',
    text: 'Our team oversees installation at the venue, ensuring every detail is executed seamlessly and as envisioned.',
    status: 'upcoming',
  },
];

const UPDATES = [
  { text: ['Rangoli design samples have been finalized! We’ll share photos via email within 24 hours.'], from: 'Meera Sharma, Wedding Coordinator' },
  { text: ['Embroidered drapes are 80% complete. Quality check scheduled for Feb 10th.'], from: 'Chandni Textiles Team' },
  { text: ['Payment 2 of 5 is due 15th February.', 'Next milestone: Feb 25.'], from: 'Kalārika Finance Team' },
];

// The dashboard moodboard swaps one photo of the plan-result collage, as in the design
const COLLAGE = VISUAL_DIRECTION.map((tile) => (tile[0] === 'result/r-90.jpg' ? ['account/visual-90.jpg', 811, 0, 191, 198] : tile));

export default function Dashboard() {
  const { customer } = useCustomer();
  if (!customer) return <Navigate to={ROUTES.login} replace />;

  return (
    <main className="page-main dashboard">
      <section className="container dash-top">
        <h1 className="page-title">Welcome Back, Vidhi And Darshan</h1>
        <div className="maroon-panel dash-progress">
          <div className="dash-progress-head">
            <span className="dash-tag">Wedding Progress</span>
            <p className="dash-percent">
              {PROGRESS}%
              <br />
              Complete
            </p>
          </div>
          <div className="dash-package">
            <h2 className="h2 text-gold">Complete Wedding Package</h2>
            <div className="bar dash-bar" role="progressbar" aria-valuenow={PROGRESS} aria-valuemin={0} aria-valuemax={100} aria-label="Wedding progress">
              <span style={{ width: `${PROGRESS}%` }} />
            </div>
          </div>
          <ul className="dash-stats">
            {STATS.map((s) => (
              <li key={s.label}>
                <span className="dash-stat-icon">
                  <img src={a(s.icon)} alt="" />
                </span>
                <span className="dash-stat-copy">
                  <span className="dash-stat-value">{s.value}</span>
                  <span className="dash-stat-label">{s.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container dash-main">
        <div className="dash-process">
          <h2 className="h2">Our process</h2>
          <ol className="dash-steps">
            {PROCESS.map((p, i) => (
              <li key={p.title} className={`dash-step ${p.status}`} aria-current={p.status === 'current' ? 'step' : undefined}>
                <span className="dash-step-num">{i + 1}</span>
                <div className="dash-step-copy">
                  <h3 className="h3">{p.title}</h3>
                  <p className="body">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="dash-side">
          <div className="dash-card dash-payment">
            <p className="dash-box maroon">
              Total Package Cost
              <br />
              4.5 Lakhs
            </p>
            <div className="dash-pay-bar">
              <div className="bar light" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} aria-label="Amount paid">
                <span style={{ width: '40%' }} />
              </div>
              <span className="h5">40%</span>
            </div>
            <p className="body text-primary">1,80,000 Rs of 4,50,000 Rs received</p>
            <p className="dash-pay-row">
              <img src={a('i-paid.svg')} alt="" width="24" height="24" />
              <span className="h5">Paid</span>
              <span className="h5">1,80,000 Rs</span>
            </p>
            <p className="dash-pay-row">
              <img src={a('i-pending.svg')} alt="" width="24" height="24" />
              <span className="h5">Pending</span>
              <span className="h5">2,70,000 Rs</span>
            </p>
            <div className="dash-pay-next">
              <p className="dash-box cream">
                Next Payment of 1,80,000
                <br />
                Due on 15th February
              </p>
              {/* No destination in the design, so this stays inert */}
              <button type="button" className="btn btn-primary">
                Make Payment
              </button>
            </div>
          </div>

          <div className="dash-card dash-updates">
            <h2 className="card-title">Recent Updates</h2>
            <ul>
              {UPDATES.map((u) => (
                <li key={u.from}>
                  <p>
                    {u.text.map((t, i) => (
                      <span key={t}>
                        {i > 0 && <br />}
                        {t}
                      </span>
                    ))}
                  </p>
                  <p>— {u.from}</p>
                </li>
              ))}
            </ul>
            {/* No destination in the design, so this stays inert */}
            <button type="button" className="btn btn-primary">
              Contact Your Co-ordinator
            </button>
          </div>
        </aside>
      </section>

      <section className="container stack gap-48 dash-visual">
        <h2 className="h2">Your Visual Direction</h2>
        <VisualCollage tiles={COLLAGE} />
        <p className="body text-center">
          Vidhi and Darshan wanted a celebration that felt culturally rich yet refined. Their vision centered around traditional craftsmanship,
          immersive installations, and meaningful storytelling woven into every detail.
        </p>
        <Link to={ROUTES.planResult} className="btn btn-outline dash-moodboard">
          Go to My Wedding Moodboard
        </Link>
      </section>
    </main>
  );
}
