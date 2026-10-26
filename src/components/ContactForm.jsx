import { useState } from 'react';
import { useForm } from '../lib/validation';
import { EmailField, FormAlert, PhoneField, TextArea, TextField } from './Field';

const schema = {
  firstName: { type: 'name', label: 'First name' },
  lastName: { type: 'name', label: 'Last name' },
  phone: { type: 'phone' },
  email: { type: 'email' },
  message: { type: 'message', required: false },
};

/** "Submit Enquiry" form used in every Contact Us block. */
export default function ContactForm({ className = '', rows = 2, children }) {
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
    <form className={`form-card form contact-form ${className}`} onSubmit={onSubmit} onChange={() => setSent(false)} noValidate>
      {children}
      <div className="form-row">
        <TextField label="First Name" required autoComplete="given-name" {...form.bind('firstName')} />
        <TextField label="Last Name" required autoComplete="family-name" {...form.bind('lastName')} />
        <PhoneField label="Phone number" required {...form.bind('phone')} />
        <EmailField label="Email" required {...form.bind('email')} />
      </div>
      <TextArea label="How can we help you ?" rows={rows} {...form.bind('message')} />
      {form.submitted && form.errorCount > 0 && (
        <FormAlert type="error">Please fix the highlighted field{form.errorCount > 1 ? 's' : ''} before submitting.</FormAlert>
      )}
      {sent && <FormAlert>Thank you! Your enquiry has been submitted. Our team will get back to you within 24 hours.</FormAlert>}
      <button type="submit" className="btn btn-primary contact-submit">
        Submit Enquiry
      </button>
    </form>
  );
}
