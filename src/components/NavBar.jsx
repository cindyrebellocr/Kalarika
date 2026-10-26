import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { asset } from '../lib/asset';
import { ROUTES } from '../lib/routes';
import './NavBar.css';

const MENU = [
  {
    label: 'About Us',
    items: [
      { label: 'About Kalārika', to: ROUTES.aboutKalarika },
      { label: 'Artisan Collective', to: ROUTES.artisanCollective },
      { label: 'Our Social Impact', to: ROUTES.socialImpact },
    ],
  },
  { label: 'Our Services', to: ROUTES.services },
  {
    label: 'Our Works',
    items: [
      { label: 'Gallery', to: ROUTES.gallery },
      { label: 'Weddings by Kalārika', to: ROUTES.weddings },
    ],
  },
  { label: 'Plan Wedding', to: ROUTES.planWedding },
  { label: 'Blogs', to: ROUTES.blogs },
  {
    label: 'Careers',
    items: [
      { label: 'Apply as Artisan', to: ROUTES.artisanSteps },
      { label: 'Apply as Employee', to: ROUTES.careers },
    ],
  },
];

export function Logo({ className = '', mark = 'common/logo-mark.svg' }) {
  return (
    <span className={`logo ${className}`}>
      <img className="logo-mark" src={asset(mark)} alt="" width="55" height="55" />
      <span className="logo-words">
        <img className="logo-text" src={asset('common/logo-text.svg')} alt="Kalārika" width="162" height="33" />
        <span className="logo-tagline">Crafting sacred moments</span>
      </span>
    </span>
  );
}

const canHover = () => window.matchMedia('(hover: hover) and (min-width: 1081px)').matches;

function Dropdown({ item, open, onToggle, onClose }) {
  const { pathname } = useLocation();
  const active = item.items.some((i) => pathname === i.to || pathname.startsWith(`${i.to}/`));
  return (
    <li
      className={`nav-item has-menu ${open ? 'open' : ''}`}
      onMouseEnter={() => canHover() && onToggle(true)}
      onMouseLeave={() => canHover() && onToggle(false)}
    >
      <button
        type="button"
        className={`nav-link ${active ? 'active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => onToggle(!open)}
      >
        {item.label}
        <img className="nav-chevron" src={asset('common/chevron-down.svg')} alt="" width="24" height="24" />
      </button>
      <ul className="nav-menu" role="menu">
        {item.items.map((sub) => (
          <li key={sub.to} role="none">
            <NavLink role="menuitem" to={sub.to} className="nav-menu-link" onClick={onClose}>
              {sub.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="navbar" ref={navRef}>
      <Link to={ROUTES.home} className="navbar-logo" aria-label="Kalārika home">
        <Logo />
      </Link>

      <button
        type="button"
        className="nav-burger"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-right ${mobileOpen ? 'mobile-open' : ''}`}>
        <nav aria-label="Main">
          <ul className="nav-list">
            {MENU.map((item) =>
              item.items ? (
                <Dropdown
                  key={item.label}
                  item={item}
                  open={openMenu === item.label}
                  onToggle={(o) => setOpenMenu(o ? item.label : null)}
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <li className="nav-item" key={item.label}>
                  <NavLink to={item.to} className="nav-link">
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
        <Link to={ROUTES.contact} className="btn btn-gold nav-cta">
          Contact Us
        </Link>
        {/* Account icon has no destination in the prototype, so it stays inert */}
        <span className="nav-account" aria-hidden="true">
          <img src={asset('common/account-group.svg')} alt="" width="40" height="40" />
        </span>
      </div>
    </header>
  );
}
