import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Hero from '../../components/Hero';
import Crop from '../../components/Crop';
import CtaBanner from '../../components/CtaBanner';
import FaqAccordion from '../../components/FaqAccordion';
import './Services.css';

const a = (f) => asset(`package/${f}`);

const HIGHLIGHTS = [
  { icon: 'i-custom.svg', title: 'Customisation', points: ['Flexible themes and floral selections.', 'Layouts tailored to your venue scale.', 'Adaptable to your vision and preferences.', 'Scalable to match your celebration size.'] },
  { icon: 'i-weddings.svg', title: '300–500 Guest Weddings', points: ['Ideal for mid to large weddings.', 'Suited for multi-event venues.', 'Consistent styling throughout.', 'Seamless flow between functions.'] },
  { icon: 'i-events.svg', title: 'Events Covered', points: ['Haldi', 'Mehendi', 'Sangeet', 'Wedding'] },
];

const FUNCTIONS = [
  {
    title: 'Haldi',
    img: 'haldi.jpg',
    tint: true,
    points: [
      'Floral backdrop styled to match your chosen color palette',
      'Themed seating arrangements for family and guests',
      'Decorative props and traditional accent elements',
      'Entrance decor styled to create a warm welcome',
      'Custom signage reflecting the event theme',
      'Coordinated styling details for a cohesive look',
    ],
  },
  {
    title: 'Mehendi',
    img: 'mehendi.jpg',
    points: [
      'Theme-based decor concept tailored to your preference',
      'Stage backdrop designed for performances and photos',
      'Guest seating styled with coordinated fabrics and florals',
      'Dedicated photo booth or Instagram-worthy corner',
      'Table decor with matching centerpieces and accents',
      'Floral and draped elements enhancing overall ambience',
    ],
  },
  {
    title: 'Sangeet',
    img: 'sangeet.jpg',
    crop: [0, -62.55, 100, 208.66],
    points: [
      'Statement stage backdrop with structured design elements',
      'Ambient lighting concept to elevate the mood',
      'Decorated dance floor area for performances',
      'Lounge seating styled for comfort and elegance',
      'Grand entrance decor for impactful guest arrival',
      'Ceiling or overhead décor to enhance scale',
    ],
  },
  {
    title: 'Wedding',
    img: 'wedding.jpg',
    points: [
      'Custom mandap structure suited to the venue',
      'Floral detailing and draping aligned with theme',
      'Aisle decor for a graceful bridal entry',
      'Ritual area styling and ceremonial accents',
      'Bride and groom seating design',
      'Entrance installations and focal decor elements',
    ],
  },
];

const EXTRAS = [
  { img: 'y-1.jpg', title: 'Special Bride & Groom Entries', text: 'Memorable entry concepts tailored to your style.' },
  { img: 'y-2.jpg', title: 'Handcrafted Artisan Elements', text: 'Custom-crafted decor pieces designed to reflect your theme.' },
  { img: 'y-3.jpg', title: 'Personalised Signage', text: 'Custom name boards and directional decor details for every function.' },
  { img: 'y-4.jpg', crop: [-0.13, -8.68, 100, 144.44], title: 'Return Gift Styling', text: 'Elegantly presented gifts styled to leave a lasting impression.' },
  { img: 'y-5.jpg', title: 'Personalised Invitation Sets', text: 'Coordinated invitation designs aligned with your wedding aesthetic.' },
  { img: 'y-6.png', title: 'Guest Welcome Kits', text: 'Thoughtfully curated welcome hampers for your guests.' },
];

const FAQS = [
  {
    q: 'Can packages be customised?',
    a: 'Yes. Themes, florals, layouts and décor elements can all be adapted to your vision, venue and guest count — and you can add personalised touches from “Make It Truly Yours”.',
  },
  {
    q: 'How is pricing determined?',
    a: 'Pricing varies based on guest count, venue scale, florals, and custom elements. We share a transparent quotation with no hidden costs before anything is confirmed.',
  },
  {
    q: 'How long in advance should we book?',
    a: 'We recommend reaching out as early as possible so there is enough time for design, artisan collaboration, sampling and production. Contact us with your dates and we will confirm availability.',
  },
];

export default function CompletePackage() {
  return (
    <main className="page-main services package-page">
      <Hero
        image={a('hero.jpg')}
        imageStyle={{ objectPosition: 'center 50%' }}
        title="Complete Wedding Package"
        subtitle="A handcrafted celebration rooted in tradition and elevated with contemporary elegance."
        contentStyle={{ paddingBottom: 150 }}
      />

      <section className="container stack gap-48">
        <h2 className="section-title">Quick Highlights</h2>
        <div className="highlight-grid">
          {HIGHLIGHTS.map((h) => (
            <article key={h.title} className="card highlight-card">
              <img src={a(h.icon)} alt="" width="44" height="44" />
              <h3 className="card-title">{h.title}</h3>
              <ul className="body">
                {h.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container stack gap-48">
        <div className="stack gap-24">
          <h2 className="section-title">What’s Included</h2>
          <p className="body">
            From Haldi to the wedding ceremony, every function is styled with cohesive design, elegance, and intentional detail. Each celebration flows
            seamlessly while maintaining its own distinct character.
          </p>
        </div>
        <div className="package-list">
          {FUNCTIONS.map((f) => (
            <article key={f.title} className="package-card">
              <Crop src={a(f.img)} crop={f.crop} className={`package-img ${f.tint ? 'tinted' : ''}`} alt={f.title} />
              <div className="package-copy">
                <div className="stack gap-16">
                  <h3 className="card-title">{f.title}</h3>
                  <ul className="body bullet-dots">
                    {f.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Make It Truly Yours</h2>
        <div className="extras-grid">
          {EXTRAS.map((e) => (
            <article key={e.title} className="artform-card">
              <Crop src={a(e.img)} crop={e.crop} className="extras-img" alt={e.title} />
              <h3 className="card-title">{e.title}</h3>
              <p className="body">{e.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Crafted Within Your Budget"
        subtitle="Starting from ₹10,00,000"
        text="Pricing varies based on guest count, venue scale, florals, and custom elements. We ensure transparent quotations with no hidden costs."
        cta="Contact Us"
        to={ROUTES.contact}
        className="services-cta"
      />

      <section className="container stack gap-48">
        <h2 className="section-title">FAQs</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </main>
  );
}
