import { useRef, useState } from 'react';
import { asset } from '../../lib/asset';
import { useForm } from '../../lib/validation';
import { EmailField, FileField, FormAlert, PhoneField, SelectField, TextArea, TextField } from '../../components/Field';
import './Careers.css';

const a = (f) => asset(`enroll/${f}`);
const DRAFT_KEY = 'kalarika-artisan-draft';

const STEPS = ['Basic Information', 'Craft Details', 'Your Availability', 'Your Portfolio', 'Review Form'];

const LANGUAGES = ['Hindi', 'Gujarati', 'English', 'Marathi', 'Rajasthani', 'Bengali', 'Odia', 'Punjabi', 'Urdu', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Other'];
const APPLYING_AS = ['Independent Artisan', 'Artisan Group', 'NGO Referred Artisan'];
const ART_FORMS = [
  'Zardosi', 'Meenakari', 'White Metal Craft', 'Kutch Embroidery', 'Bandhani', 'Block Printing', 'Warli',
  'Madhubani', 'Pichwai', 'Gond', 'Pattachitra', 'Kalamkari', 'Phad', 'Other',
];
const WORK_TYPES = ['Full-time', 'Part-time', 'Seasonal (wedding season only)', 'Project-based'];
const TRAVEL = ['Yes, anywhere in India', 'Yes, within my state', 'No, I prefer working from my workshop'];
const WORK_MODES = ['Making pieces at my own workshop', 'On-site installation at the venue', 'Live craft demonstrations at events'];

const PHOTO_TYPES = ['.jpg', '.jpeg', '.png', '.pdf', '.zip'];
const ID_TYPES = ['.jpg', '.jpeg', '.png', '.pdf'];

const loadDraft = () => {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY)) || null;
  } catch {
    return null;
  }
};

/** Builds a schema, seeding each field with the saved draft value (files are never stored). */
const withDraft = (schema, saved = {}) =>
  Object.fromEntries(Object.entries(schema).map(([k, s]) => [k, saved[k] !== undefined && s.type !== 'file' ? { ...s, initial: saved[k] } : s]));

function Stepper({ step, done, onJump }) {
  const pct = done ? 100 : step * 20;
  return (
    <div className="stepper">
      <ol className="stepper-list">
        {STEPS.map((label, i) => {
          const state = done || i < step ? 'complete' : i === step ? 'current' : 'upcoming';
          const [first, ...rest] = label.split(' ');
          const content = (
            <>
              <span className="stepper-circle">{state === 'complete' ? '✓' : i + 1}</span>
              <span className="stepper-label">
                {first}
                <br />
                {rest.join(' ')}
              </span>
            </>
          );
          return (
            <li key={label} className={`stepper-item ${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              {state === 'complete' && !done ? (
                <button type="button" className="stepper-btn" onClick={() => onJump(i)} aria-label={`Go back to step ${i + 1}: ${label}`}>
                  {content}
                </button>
              ) : (
                <span className="stepper-btn">{content}</span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="stepper-progress" aria-live="polite">
        Step {Math.min(step + 1, 5)} of 5 - {pct}% Complete
      </p>
    </div>
  );
}

function CheckGroup({ legend, required, options, value, onChange, onBlur, error, ref, name }) {
  const toggle = (opt) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
    onBlur();
  };
  return (
    <fieldset className={`field check-group ${error ? 'has-error' : ''}`}>
      <legend className="field-label">
        {legend}
        {required && ' *'}
      </legend>
      {options.map((opt, i) => (
        <label key={opt} className="check-option">
          <input
            type="checkbox"
            name={name}
            ref={i === 0 ? ref : undefined}
            checked={value.includes(opt)}
            onChange={() => toggle(opt)}
            aria-invalid={!!error}
          />
          {opt}
        </label>
      ))}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function ReviewSection({ title, rows, onEdit }) {
  return (
    <section className="review-section">
      <div className="review-head">
        <h3 className="h5">{title}</h3>
        <button type="button" className="review-edit" onClick={onEdit}>
          Edit
        </button>
      </div>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k} className="review-row">
            <dt>{k}</dt>
            <dd>{v || '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ArtisanEnroll() {
  const [draft] = useState(loadDraft);
  const saved = draft?.values || {};
  const [step, setStep] = useState(() => Math.min(draft?.step ?? 0, 3));
  const [done, setDone] = useState(false);
  const [notice, setNotice] = useState(draft ? 'restored' : '');
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const cardRef = useRef(null);
  const consentRef = useRef(null);

  const basic = useForm(
    withDraft(
      {
        name: { type: 'name', label: 'Name' },
        place: { type: 'text', label: 'Place', max: 60 },
        phone: { type: 'phone' },
        email: { type: 'email', required: false },
        language: { type: 'select', label: 'your preferred language' },
      },
      saved,
    ),
  );
  const craft = useForm(
    withDraft(
      {
        applyingAs: { type: 'select', label: 'how you are applying' },
        artForm: { type: 'select', label: 'your art form' },
        specialization: { type: 'text', required: false, label: 'Specialization', max: 80 },
        experience: { type: 'number', label: 'Years of experience', min: 1, max: 80 },
        teamSize: { type: 'number', label: 'Team size', min: 1, max: 500 },
        pincode: { type: 'pincode' },
      },
      saved,
    ),
  );
  const availability = useForm(
    withDraft(
      {
        workType: { type: 'select', label: 'your work preference' },
        startDate: { type: 'date', label: 'Start date' },
        capacity: { type: 'number', label: 'Projects per month', min: 1, max: 20 },
        workModes: { type: 'checks', label: 'at least one way of working' },
        travel: { type: 'select', label: 'your travel preference' },
      },
      saved,
    ),
  );
  const portfolio = useForm(
    withDraft(
      {
        photos: { type: 'file', label: 'photos of your work', accept: PHOTO_TYPES, maxMb: 20 },
        idProof: { type: 'file', required: false, label: 'an ID proof', accept: ID_TYPES, maxMb: 5 },
        story: { type: 'message', required: true, limit: 200, label: 'Craft story' },
      },
      saved,
    ),
  );
  const forms = [basic, craft, availability, portfolio];

  const scrollToCard = () => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const goTo = (i) => {
    setStep(i);
    setNotice('');
    scrollToCard();
  };

  const next = () => {
    if (forms[step].validateAll()) goTo(step + 1);
    else setNotice('invalid');
  };

  const saveAndExit = () => {
    const values = {};
    forms.forEach((f) => Object.entries(f.values).forEach(([k, v]) => { if (!(v instanceof File)) values[k] = v; }));
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, values }));
      setNotice('saved');
    } catch {
      setNotice('save-failed');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (step < 4) {
      next();
      return;
    }
    const firstBad = forms.findIndex((f) => !f.validateAll());
    if (firstBad !== -1) {
      goTo(firstBad);
      setNotice('invalid');
      return;
    }
    if (!consent) {
      setConsentError('Please confirm that the details you have shared are accurate');
      consentRef.current?.focus();
      return;
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* storage unavailable — nothing to clear */
    }
    setDone(true);
    setNotice('');
    scrollToCard();
  };

  const b = basic.values;
  const c = craft.values;
  const av = availability.values;
  const p = portfolio.values;

  return (
    <main className="enroll">
      <section className="container enroll-top">
        <h1 className="h1 enroll-title">Artisan Registration Form</h1>
        <div className="enroll-panel" ref={cardRef}>
          <Stepper step={done ? 4 : step} done={done} onJump={goTo} />

          {done ? (
            <div className="enroll-card enroll-done" role="status">
              <span className="enroll-done-mark" aria-hidden="true">✓</span>
              <h2 className="h3">Thank you, {b.name.trim().split(' ')[0]}!</h2>
              <p className="body">
                Your artisan registration has been submitted. Our team will review your details and reach out on +91 {b.phone} within 5–7
                working days to schedule a call or visit.
              </p>
            </div>
          ) : (
            <form className="enroll-card" onSubmit={submit} noValidate>
              <h2 className="sr-only">
                Step {step + 1}: {STEPS[step]}
              </h2>
              {notice === 'restored' && <FormAlert>We restored the details you saved earlier. Uploaded files need to be added again.</FormAlert>}
              {notice === 'saved' && (
                <FormAlert>Your progress has been saved on this device. Come back to this page any time to continue where you left off.</FormAlert>
              )}
              {notice === 'save-failed' && <FormAlert type="error">We couldn’t save your progress on this browser.</FormAlert>}
              {notice === 'invalid' && forms[step]?.errorCount > 0 && (
                <FormAlert type="error">Please fix the highlighted fields before continuing.</FormAlert>
              )}

              {step === 0 && (
                <div className="enroll-fields">
                  <TextField label="Your Name" required icon={a('i-user.svg')} placeholder="Name" autoComplete="name" {...basic.bind('name')} />
                  <TextField label="Place you are from" required icon={a('i-pin.svg')} placeholder="Kutch, Gujarat" {...basic.bind('place')} />
                  <PhoneField label="Phone Number" required prefix="+91" placeholder="xxxxx xxxxx" {...basic.bind('phone')} />
                  <EmailField label="Email ID" icon={a('i-mail.svg')} placeholder="youremail@gmail.com" hint="Optional" {...basic.bind('email')} />
                  <SelectField label="Preferred Language" required icon={a('i-language.svg')} options={LANGUAGES} placeholder="Hindi" {...basic.bind('language')} />
                </div>
              )}

              {step === 1 && (
                <div className="enroll-fields">
                  <SelectField label="Applying as" required options={APPLYING_AS} {...craft.bind('applyingAs')} />
                  <SelectField label="Art form" required options={ART_FORMS} placeholder="Select your art form" {...craft.bind('artForm')} />
                  <TextField label="Specialization" placeholder="e.g. Bridal zardosi borders" hint="Optional" {...craft.bind('specialization')} />
                  <div className="form-row">
                    <TextField label="Years of experience" required inputMode="numeric" placeholder="e.g. 12" {...craft.bind('experience')} />
                    <TextField label="Artisans in your team" required inputMode="numeric" placeholder="1 if you work alone" {...craft.bind('teamSize')} />
                  </div>
                  <TextField label="Workshop PIN code" required inputMode="numeric" icon={a('i-pin.svg')} placeholder="6-digit PIN code" {...craft.bind('pincode')} />
                </div>
              )}

              {step === 2 && (
                <div className="enroll-fields">
                  <SelectField label="Work preference" required options={WORK_TYPES} {...availability.bind('workType')} />
                  <div className="form-row">
                    <TextField
                      label="Available from"
                      required
                      type="date"
                      min={new Date().toISOString().slice(0, 10)}
                      {...availability.bind('startDate')}
                    />
                    <TextField label="Projects you can take per month" required inputMode="numeric" placeholder="e.g. 3" {...availability.bind('capacity')} />
                  </div>
                  <CheckGroup legend="How can you work with us?" required options={WORK_MODES} {...availability.bind('workModes')} />
                  <SelectField label="Can you travel for projects?" required options={TRAVEL} {...availability.bind('travel')} />
                </div>
              )}

              {step === 3 && (
                <div className="enroll-fields">
                  <div className="enroll-upload">
                    <p className="field-label">Photos of your work *</p>
                    <FileField label="Upload photos" required icon={asset('careers/upload.svg')} accept={PHOTO_TYPES.join(',')} {...portfolio.bind('photos')} />
                    <p className="field-hint">JPG, PNG, PDF or ZIP · up to 20 MB</p>
                  </div>
                  <div className="enroll-upload">
                    <p className="field-label">ID proof</p>
                    <FileField label="Upload ID proof" icon={asset('careers/upload.svg')} accept={ID_TYPES.join(',')} {...portfolio.bind('idProof')} />
                    <p className="field-hint">Optional · Aadhaar, artisan card or voter ID · JPG, PNG or PDF up to 5 MB</p>
                  </div>
                  <TextArea
                    label="Tell us about your craft"
                    required
                    limit={200}
                    rows={4}
                    placeholder="Who taught you, what you make, and what makes your work special…"
                    {...portfolio.bind('story')}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="enroll-fields review">
                  <ReviewSection
                    title="Basic Information"
                    onEdit={() => goTo(0)}
                    rows={[['Name', b.name], ['Place', b.place], ['Phone', b.phone && `+91 ${b.phone}`], ['Email', b.email], ['Language', b.language]]}
                  />
                  <ReviewSection
                    title="Craft Details"
                    onEdit={() => goTo(1)}
                    rows={[
                      ['Applying as', c.applyingAs],
                      ['Art form', c.artForm],
                      ['Specialization', c.specialization],
                      ['Experience', c.experience && `${c.experience} years`],
                      ['Team size', c.teamSize],
                      ['PIN code', c.pincode],
                    ]}
                  />
                  <ReviewSection
                    title="Your Availability"
                    onEdit={() => goTo(2)}
                    rows={[
                      ['Work preference', av.workType],
                      ['Available from', av.startDate && new Date(av.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
                      ['Projects / month', av.capacity],
                      ['Ways of working', av.workModes.join(', ')],
                      ['Travel', av.travel],
                    ]}
                  />
                  <ReviewSection
                    title="Your Portfolio"
                    onEdit={() => goTo(3)}
                    rows={[['Work photos', p.photos?.name], ['ID proof', p.idProof?.name], ['Craft story', p.story]]}
                  />
                  <div className={`field ${consentError ? 'has-error' : ''}`}>
                    <label className="check-option">
                      <input
                        ref={consentRef}
                        type="checkbox"
                        checked={consent}
                        aria-invalid={!!consentError}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (e.target.checked) setConsentError('');
                        }}
                      />
                      I confirm that the details shared are accurate and I agree to be contacted by Kalārika.
                    </label>
                    {consentError && (
                      <p className="field-error" role="alert">
                        {consentError}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="enroll-actions">
                <button type="button" className="btn btn-outline" onClick={saveAndExit}>
                  Save and Exit
                </button>
                <div className="enroll-actions-right">
                  {step > 0 && (
                    <button type="button" className="btn btn-outline" onClick={() => goTo(step - 1)}>
                      Previous Step
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {step === 4 ? 'Submit Form' : 'Next Step'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="container enroll-help">
        <div className="maroon-panel need-help">
          <h2 className="h3 text-gold">Need help ?</h2>
          <p className="body text-gold">Having troubles in filling form or understanding details?</p>
          {/* No destination in the prototype, so this stays inert */}
          <button type="button" className="btn btn-gold help-btn">
            <img src={a('i-phone.svg')} alt="" width="24" height="24" />
            Contact Support
          </button>
        </div>
      </section>
    </main>
  );
}
