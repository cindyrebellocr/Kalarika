import { Link } from 'react-router-dom';
import { asset } from '../lib/asset';
import { ROUTES } from '../lib/routes';
import { Logo } from './NavBar';
import './Footer.css';

// Items with `to` open the same page as the matching navigation-bar entry.
// Items without `to` have no destination in the prototype and stay as plain text.
const COLUMNS = [
  [
    {
      title: 'Site Map',
      links: [
        { label: 'Home page', to: ROUTES.home },
        { label: 'About Us', to: ROUTES.aboutKalarika },
        { label: 'Our Services', to: ROUTES.services },
        { label: 'Plan Wedding', to: ROUTES.planWedding },
        { label: 'Blogs', to: ROUTES.blogs },
        { label: 'Careers', to: ROUTES.careers },
        { label: 'Contact Us', to: ROUTES.contact },
      ],
    },
    {
      title: 'About Us',
      links: [
        { label: 'About Kalārika', to: ROUTES.aboutKalarika },
        { label: 'Artisan Collective', to: ROUTES.artisanCollective },
        { label: 'Our Social Impact', to: ROUTES.socialImpact },
      ],
    },
    { title: 'Our Services', links: [{ label: 'Our Services', to: ROUTES.services }] },
  ],
  [
    { title: 'Plan Wedding', links: [{ label: 'Plan Wedding', to: ROUTES.planWedding }] },
    {
      title: 'Careers',
      links: [
        { label: 'Apply as Artisans', to: ROUTES.artisanSteps },
        { label: 'Apply as Employee', to: ROUTES.careers },
      ],
    },
    {
      title: 'Our Works',
      links: [
        { label: 'Gallery', to: ROUTES.gallery },
        { label: 'Weddings by Kalārika', to: ROUTES.weddings },
      ],
    },
    { title: 'Blogs', links: [{ label: 'Blogs', to: ROUTES.blogs }] },
  ],
  [
    {
      title: 'Legal',
      links: [{ label: 'Privacy Policy' }, { label: 'Terms of Service' }, { label: 'Cancellation Policy' }, { label: 'Refund Policy' }],
    },
    {
      title: 'Help',
      links: [{ label: 'Contact Us', to: ROUTES.contact }, { label: 'FAQ' }, { label: 'Report an Issue' }],
    },
  ],
];

const SOCIAL = ['youtube', 'instagram', 'x', 'facebook'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Link to={ROUTES.home} aria-label="Kalārika home">
          <Logo mark="common/footer-logo-mark.svg" />
        </Link>
        <p className="intro footer-blurb">
          Kalārika reflects the soul of Indian weddings. Everything expressed with quiet elegance and cultural depth
        </p>
        <div className="footer-social">
          {SOCIAL.map((s) => (
            <img key={s} src={asset(`common/${s}.svg`)} alt={s === 'x' ? 'X' : s[0].toUpperCase() + s.slice(1)} width="40" height="40" />
          ))}
        </div>
        <div className="footer-contact">
          <p>
            Email : <a href="mailto:kalarika@gmail.com" className="underline">kalārika@gmail.com</a>
          </p>
          <p>Phone : +910878465378&nbsp;&nbsp;|&nbsp;&nbsp;+918889444450</p>
          <p className="meta">Available Everyday 9AM-6PM</p>
        </div>
      </div>

      <div className="footer-cols">
        {COLUMNS.map((col, i) => (
          <div className="footer-col" key={i}>
            {col.map((group) => (
              <div className="footer-group" key={group.title}>
                <p className="footer-title">{group.title}</p>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.label}>{l.to ? <Link to={l.to}>{l.label}</Link> : <span>{l.label}</span>}</li>
                  ))}
                </ul>
              </div>
            ))}
            {i === COLUMNS.length - 1 && (
              <button type="button" className="btn btn-gold-outline footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to top
              </button>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
