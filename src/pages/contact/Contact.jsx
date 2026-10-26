import { useState } from 'react';
import { asset } from '../../lib/asset';
import { useForm } from '../../lib/validation';
import { EmailField, FormAlert, PhoneField, TextArea, TextField } from '../../components/Field';
import './Contact.css';

const schema = {
  firstName: { type: 'name', label: 'First name' },
  phone: { type: 'phone' },
  lastName: { type: 'name', label: 'Last name' },
  email: { type: 'email' },
  message: { type: 'message', required: false },
};

const SOCIAL = ['youtube', 'instagram', 'x', 'facebook'];

export default function Contact() {
  const form = useForm(schema);
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.validateAll()) {
      setSent(false);
      return;
    }
    setSent(true);
    form.reset();
  };

  return (
    <main className="page-main contact-page">
      <h1 className="h1 text-primary text-center">Contact Us</h1>
      <section className="container">
        <div className="contact-panel">
          <div className="contact-left">
            <div className="stack" style={{ gap: 19 }}>
              <h2 className="section-title">Send Us A Message</h2>
              <p className="body">
                Have a question or need guidance for your wedding decor?
                <br />
                We’re here to help you choose the perfect styling and bring your vision to life. Feel free to reach out to Kalārika anytime.
              </p>
            </div>
            <form className="form contact-page-form" onSubmit={onSubmit} onChange={() => setSent(false)} noValidate>
              <div className="form-row">
                <TextField label="First Name" required autoComplete="given-name" {...form.bind('firstName')} />
                <PhoneField label="Phone number" required {...form.bind('phone')} />
                <TextField label="Last Name" required autoComplete="family-name" {...form.bind('lastName')} />
                <EmailField label="Email" required {...form.bind('email')} />
              </div>
              <TextArea label="How can we help you ?" rows={4} {...form.bind('message')} />
              {form.submitted && form.errorCount > 0 && (
                <FormAlert type="error">Please fix the highlighted field{form.errorCount > 1 ? 's' : ''} before submitting.</FormAlert>
              )}
              {sent && <FormAlert>Thank you! Your enquiry has been submitted. Our team will get back to you within 24 hours.</FormAlert>}
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'center' }}>
                Submit Enquiry
              </button>
            </form>
          </div>

          <aside className="contact-right">
            <p className="tagline text-primary">Hi ! We are always here to help you .</p>
            <div className="contact-tiles">
              <div className="contact-tile">
                <img src={asset('contact/phone.svg')} alt="" width="21" height="20" />
                <span>Hotline: +918889444450</span>
              </div>
              <div className="contact-tile">
                <img src={asset('contact/message.svg')} alt="" width="26" height="26" />
                <span>WhatsApp: +918889444460</span>
              </div>
              <div className="contact-tile">
                <img src={asset('contact/mail.svg')} alt="" width="25" height="20" />
                <span>Email: Kalārika@gmail.com</span>
              </div>
            </div>
            <hr />
            <p className="tagline text-primary text-center">Connect with us</p>
            <div className="contact-social">
              {SOCIAL.map((s) => (
                <img key={s} src={asset(`contact/${s}.svg`)} alt={s} width="40" height="40" />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
