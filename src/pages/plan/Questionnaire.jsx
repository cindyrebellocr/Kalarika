import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import './Plan.css';

const RECOMMEND = 'I’d like the studio to recommend';

const SECTIONS = [
  {
    title: 'Section 1 - Defining Your Aesthetic',
    questions: [
      {
        id: 'feel',
        q: 'How do you want your wedding to feel?',
        options: ['Grand and royal', 'Warm and intimate', 'Modern and elegant', 'Bright and festive', 'Traditional and rooted', 'Creative and artistic'],
      },
      { id: 'detail', q: 'How detailed do you want the décor to be?', options: ['Very detailed and rich', 'Balanced and elegant', 'Simple with subtle details'] },
    ],
  },
  {
    title: 'Section 2 - Art & Craft Preferences',
    questions: [
      { id: 'artAmount', q: 'How much do you want Indian art forms in your décor?', options: ['Small accents only', 'Visible in key areas', 'The main highlight'] },
      {
        id: 'artForms',
        q: 'Which art forms do you like most?',
        multi: true,
        options: ['Zardosi embroidery', 'White metal / Meenakari', 'Warli painting', 'Rogan painting', RECOMMEND],
      },
      {
        id: 'materials',
        q: 'Which materials do you prefer?',
        multi: true,
        options: ['Rich fabrics (silk, velvet, embroidery)', 'Metallic finishes', 'Hand-painted elements', 'Natural textures', 'A mix of everything', RECOMMEND],
      },
    ],
  },
  {
    title: 'Section 3 - Colour & Setting',
    questions: [
      {
        id: 'palette',
        q: 'Which colour palette do you prefer?',
        options: ['Ivory and gold', 'Deep reds and jewel tones', 'Soft pastels', 'Earthy neutrals', 'Black with metallic accents', RECOMMEND],
      },
      {
        id: 'venue',
        q: 'What type of venue are you planning?',
        options: ['Palace or heritage property', 'Luxury hotel ballroom', 'Outdoor garden', 'Beach', 'Destination venue', 'Private estate'],
      },
      { id: 'guests', q: 'Expected number of guests', options: ['Under 150', '150–300', '300–600', '600-800', '800-1000', '1000+'] },
    ],
  },
  {
    title: 'Section 4 - Experience',
    questions: [
      {
        id: 'remember',
        q: 'What do you want guests to remember the most?',
        options: ['The grandeur', 'The cultural elements', 'The overall aesthetic', 'The emotional moments', 'The unique installations'],
      },
      { id: 'installation', q: 'Would you like a handcrafted statement installation?', options: ['Yes, a large statement piece', 'Yes, something subtle', 'Not necessary'] },
      {
        id: 'lookingFor',
        q: 'What are you looking for?',
        options: ['Full wedding design and complete execution', 'A personalised design concept before deciding', 'I’m exploring ideas for now'],
      },
      {
        id: 'budget',
        q: 'How would you describe your wedding décor budget?',
        options: ['I’m comfortable investing in premium, customised design', 'I prefer a balanced approach', 'I’d like to understand options first'],
      },
    ],
  },
];

const ALL = SECTIONS.flatMap((s) => s.questions);

export default function Questionnaire() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const refs = useRef({});

  const isAnswered = (q) => (q.multi ? (answers[q.id] || []).length > 0 : !!answers[q.id]);
  const answeredCount = ALL.filter(isAnswered).length;

  const setSingle = (id, value) => setAnswers((a) => ({ ...a, [id]: value }));
  const toggleMulti = (id, value) =>
    setAnswers((a) => {
      const cur = a[id] || [];
      return { ...a, [id]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });

  const onSubmit = (e) => {
    e.preventDefault();
    const missing = ALL.find((q) => !isAnswered(q));
    if (missing) {
      setShowErrors(true);
      const el = refs.current[missing.id];
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.querySelector('input')?.focus({ preventScroll: true });
      return;
    }
    try {
      sessionStorage.setItem('kalarika-questionnaire', JSON.stringify(answers));
    } catch {
      /* storage unavailable — the result page works without it */
    }
    navigate(ROUTES.planResult);
  };

  let n = 0;
  return (
    <main className="page-main plan questionnaire">
      <section className="hero">
        <img className="hero-bg" src={asset('plan/questionnaire-hero.jpg')} alt="" />
        <div className="container hero-content" style={{ gap: 16 }}>
          <div className="hero-text" style={{ gap: 16 }}>
            <h1 className="h1" style={{ maxWidth: 507 }}>
              Wedding Design Questionnaire
            </h1>
            <p className="tagline">
              Answer a few guided questions about your preferences, venue, and aesthetic direction. Your responses will help us curate a personalised
              wedding concept rooted in craft and tailored to your celebration.
            </p>
          </div>
          {/* No prototype destination — kept as an inert button */}
          <button type="button" className="btn btn-gold-outline" style={{ alignSelf: 'flex-start' }}>
            Call Us For Assistance
          </button>
        </div>
      </section>

      <form className="stack questionnaire-form" onSubmit={onSubmit} noValidate>
        <p className="container q-note">
          All questions are required (<span aria-hidden="true">*</span>). {answeredCount} of {ALL.length} answered.
        </p>
        {SECTIONS.map((section) => (
          <section key={section.title} className="container stack gap-48">
            <h2 className="section-title ink">{section.title}</h2>
            <div className="stack gap-16">
              {section.questions.map((q) => {
                n += 1;
                const missing = showErrors && !isAnswered(q);
                return (
                  <fieldset key={q.id} ref={(el) => (refs.current[q.id] = el)} className={`q-card ${missing ? 'has-error' : ''}`} aria-invalid={missing}>
                    <legend className="card-title">
                      {n}. {q.q}
                      <span className="q-req" aria-hidden="true">
                        {' '}
                        *
                      </span>
                    </legend>
                    {q.multi && <p className="meta q-hint">Select multiple</p>}
                    <div className="q-options">
                      {q.options.map((opt) => (
                        <label key={opt} className="choice q-choice">
                          {q.multi ? (
                            <input type="checkbox" name={q.id} value={opt} checked={(answers[q.id] || []).includes(opt)} onChange={() => toggleMulti(q.id, opt)} />
                          ) : (
                            <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => setSingle(q.id, opt)} />
                          )}
                          <span>{opt.trim()}</span>
                        </label>
                      ))}
                    </div>
                    {missing && (
                      <p className="field-error" role="alert">
                        {q.multi ? 'Please select at least one option' : 'Please select an option'}
                      </p>
                    )}
                  </fieldset>
                );
              })}
            </div>
          </section>
        ))}
        <div className="container q-submit">
          {showErrors && answeredCount < ALL.length && (
            <p className="form-alert error" role="alert">
              {ALL.length - answeredCount} question{ALL.length - answeredCount > 1 ? 's are' : ' is'} still unanswered. Please complete the highlighted
              questions.
            </p>
          )}
          <button type="submit" className="btn btn-primary">
            Submit Questionnaire
          </button>
        </div>
      </form>
    </main>
  );
}
