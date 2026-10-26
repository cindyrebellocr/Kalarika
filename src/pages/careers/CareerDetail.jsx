import { useState } from 'react';
import { asset } from '../../lib/asset';
import { useForm } from '../../lib/validation';
import { EmailField, FileField, FormAlert, PhoneField, TextField } from '../../components/Field';
import './Careers.css';

const DOCS = ['.pdf', '.doc', '.docx'];

const schema = {
  firstName: { type: 'name', label: 'First name' },
  lastName: { type: 'name', label: 'Last name' },
  phone: { type: 'phone' },
  email: { type: 'email' },
  resume: { type: 'file', label: 'your resume', accept: DOCS, maxMb: 5 },
  portfolio: { type: 'file', required: false, label: 'your portfolio', accept: [...DOCS, '.zip', '.jpg', '.png'], maxMb: 20 },
};

export default function CareerDetail() {
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
    <main className="page-main careers job">
      <section className="hero hero-plain job-hero">
        <img className="hero-bg" src={asset('careers/job-hero.jpg')} alt="" />
        <div className="container hero-content job-hero-content">
          <h1 className="h1">Junior Design Associate</h1>
          <p className="h5 job-hero-meta">Gujarat, India&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Full-time&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;On-site</p>
        </div>
      </section>

      <section className="container job-grid">
        <article className="job-card">
          <h2 className="h3">Overview</h2>
          <div className="body">
            <p>
              As a Junior Design Associate at Kalārika, you will be involved in the complete design journey—from research and concept development to
              on-site installation. This role is ideal for individuals eager to work hands-on with materials, collaborate with artisan communities, and
              contribute to meaningful wedding experiences.
            </p>
            <ul>
              <li>Salary : ₹3.2 – ₹4.5 LPA (based on experience, portfolio strength, and selection performance)</li>
            </ul>
          </div>
        </article>
        <article className="job-card">
          <h2 className="h3">Qualification</h2>
          <ul className="body">
            <li>Bachelor’s degree in Architecture, Interior Design, or related field</li>
            <li>0–2 years of relevant experience (internships accepted)</li>
            <li>Strong interest in craft, culture, and spatial design</li>
            <li>Willingness to work on-site during wedding events</li>
            <li>Basic proficiency in design tools such as AutoCAD, SketchUp etc.</li>
            <li>Ability to create clear visual presentations and mood boards</li>
            <li>Strong organisational skills with attention to timelines and details</li>
          </ul>
        </article>
        <article className="job-card">
          <h2 className="h3">Responsibilities</h2>
          <ul className="body">
            <li>Assist in concept development and mood board preparation</li>
            <li>Coordinate with artisan partners during sampling and production</li>
            <li>Support material sourcing and design detailing</li>
            <li>Participate in on-site setup and installation</li>
            <li>Document project processes and design outputs</li>
            <li>Assist in preparing design presentations and client review materials</li>
            <li>Support coordination with vendors and venue teams during execution</li>
          </ul>
        </article>
        <article className="job-card">
          <h2 className="h3">Skills required</h2>
          <div className="body">
            <p>
              A strong understanding of design fundamentals combined with the ability to translate ideas into practical, executable outcomes. The role
              requires balancing creative thinking with coordination skills to ensure concepts are developed thoughtfully and implemented effectively.
            </p>
            <p>
              Core Skills:
              <br />
              Design Research • Spatial Planning • Material Awareness • Visual Presentation • Attention to Detail • Communication • Adaptability
            </p>
          </div>
        </article>
      </section>

      <section className="container">
        <form className="apply-form" onSubmit={onSubmit} onChange={() => setSent(false)} noValidate>
          <h2 className="h3 text-primary apply-title">Ready to join us?</h2>
          <div className="apply-fields form">
            <div className="form-row">
              <TextField label="First Name" required inputClassName="lg" autoComplete="given-name" {...form.bind('firstName')} />
              <TextField label="Last Name" required inputClassName="lg" autoComplete="family-name" {...form.bind('lastName')} />
              <PhoneField label="Phone number" required inputClassName="lg" {...form.bind('phone')} />
              <EmailField label="Email" required inputClassName="lg" {...form.bind('email')} />
            </div>
            <div className="upload-row">
              <FileField label="Upload Resume" required icon={asset('careers/upload.svg')} accept={DOCS.join(',')} {...form.bind('resume')} />
              <FileField label="Upload Portfolio" icon={asset('careers/upload.svg')} accept=".pdf,.doc,.docx,.zip,.jpg,.png" {...form.bind('portfolio')} />
            </div>
            <p className="field-hint">Resume: PDF or Word, up to 5 MB. Portfolio (optional): PDF, Word, ZIP or image, up to 20 MB.</p>
            {form.submitted && form.errorCount > 0 && (
              <FormAlert type="error">Please fix the highlighted field{form.errorCount > 1 ? 's' : ''} before submitting.</FormAlert>
            )}
            {sent && <FormAlert>Thank you for applying! Our team will review your application and contact you within 7 working days.</FormAlert>}
          </div>
          <button type="submit" className="btn btn-primary apply-submit">
            Submit Application
          </button>
        </form>
      </section>
    </main>
  );
}
