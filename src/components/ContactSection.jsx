import { asset } from '../lib/asset';
import ContactForm from './ContactForm';
import './ContactSection.css';

/** "Contact Us" block (Figma: Frame 150) shared by several pages. */
export default function ContactSection({ title = 'Contact Us' }) {
  return (
    <section className="container contact-section">
      <div className="contact-info">
        <div className="contact-copy">
          <h2 className="section-title">{title}</h2>
          <div className="intro">
            <p>We’re here to listen and help!</p>
            <p>Every great celebration begins with a simple conversation.</p>
            <p>Reach out to us, and together we’ll bring your traditions to life.</p>
          </div>
        </div>
        <ContactDetails />
      </div>
      <ContactForm className="contact-section-form" />
    </section>
  );
}

export function ContactDetails() {
  return (
    <div className="contact-details">
      <p className="contact-line intro">
        <img src={asset('common/mail.svg')} alt="" width="20" height="16" />
        kalārika@gmail.com
      </p>
      <p className="contact-line intro">
        <img src={asset('common/phone.svg')} alt="" width="18" height="18" />
        +919999444450 | +918889444450
      </p>
      {/* No destination in the prototype — kept as an inert button */}
      <button type="button" className="btn btn-outline whatsapp-btn">
        Chat on Whatsapp
        <img src={asset('common/whatsapp.svg')} alt="" width="15" height="15" />
      </button>
    </div>
  );
}
