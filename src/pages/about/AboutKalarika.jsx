import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Hero from '../../components/Hero';
import Crop from '../../components/Crop';
import FloralBanner from '../../components/FloralBanner';
import JoinBanner from '../../components/JoinBanner';
import './About.css';

const VALUES_TOP = [
  { icon: 'v-cultural', iw: 54.5, ih: 17, title: 'Cultural Integrity', text: 'We honor regional traditions and art forms by representing them with authenticity, respect, and contextual accuracy.' },
  { icon: 'v-craft', full: true, title: 'Craftsmanship', text: 'We value skilled making, paying close attention to materials, processes, and the hands behind every crafted detail.' },
];
const VALUES_BOTTOM = [
  { icon: 'v-emotional', iw: 43.2, ih: 35.5, w: 332, title: 'Emotional Meaning', text: 'We design experiences and objects that hold personal significance and become lasting memories beyond the moment.' },
  { icon: 'v-community', iw: 38.9, ih: 35, w: 447, title: 'Community Empowerment', text: 'We work closely with artisans and cultural practitioners to create fair opportunities, visibility, and sustainable livelihoods.' },
  { icon: 'v-trust', iw: 42.8, ih: 27.9, w: 388, rotate: true, title: 'Trust & Transparency', text: 'We believe in honest communication, fair pricing, and clarity across every stage of collaboration and delivery.' },
];

const PROCESS = [
  { img: 'process-1.svg', title: 'Consultation & Vision Setting', text: 'We begin by understanding the couple’s story, cultural context, and expectations to define a clear and meaningful direction for the celebration.' },
  { img: 'process-2.png', title: 'Concept Development', text: 'Our team translates insights into a cohesive design narrative, blending traditional craft with contemporary spatial design.' },
  { img: 'process-3.svg', title: 'Artisan Collaboration', text: 'We identify and collaborate with skilled artisans, aligning craft techniques with the design intent and project requirements.' },
  { img: 'process-4.png', title: 'Sampling & Prototyping', text: 'Select elements are developed and tested through samples to ensure quality, material integrity, and visual alignment.' },
  { img: 'process-5.svg', title: 'Production & Fabrication', text: 'Once approved, all design elements move into full-scale production, managed with precision and clear coordination.' },
  { img: 'process-6.png', title: 'On-Site Installation', text: 'Our team oversees installation at the venue, ensuring every detail is executed seamlessly and as envisioned.' },
];

const PARTNERS = [
  { src: 'logo-taj.png', alt: 'Taj', w: 71.5, box: 119 },
  { src: 'logo-oberoi.png', alt: 'The Oberoi Group', w: 245 },
  { src: 'logo-wedmegood.png', alt: 'WedMeGood', w: 276.5, crop: [-25.65, -66.22, 148.23, 236.49] },
  { src: 'logo-shaadisaga.png', alt: 'ShaadiSaga', w: 198, crop: [0, -100, 100, 300] },
  { src: 'logo-cci.png', alt: 'Crafts Council of India', w: 119.8 },
];

const TEAM = [
  { name: 'Prapti Shroff', role: 'Strategy Lead', src: 'team-prapti.png', crop: [-5.87, -16.03, 112.08, 153.28] },
  { name: 'Anjana Premjith', role: 'Creative Lead', src: 'team-anjana.jpg', crop: [-14.72, -28.82, 129.43, 177] },
  { name: 'Cindy Maria Rebello', role: 'Research Lead', src: 'team-cindy.jpg', crop: [-11.72, -22.03, 140.69, 193] },
  { name: 'Avanthika Anand', role: 'Coordination Lead', src: 'team-avanthika.jpg', crop: [-16.54, -51.6, 133.09, 182] },
];

// Collage tiles: [file, left, top, width, height, crop]
const COLLAGE = [
  ['life-2.jpg', 0, 0, 381, 228, [-14.82, -0.21, 114.76, 127.84]],
  ['life-8.jpg', 397, 0, 288, 394],
  ['life-1.jpg', 701, 0, 499, 228, [-8.51, -77.66, 116.73, 255.48]],
  ['life-3.jpg', 0, 244, 381, 379, [0, 0, 104.2, 106.15]],
  ['life-4.jpg', 397, 410, 288, 213],
  ['life-7.jpg', 701, 244, 288, 379, [0.09, 0, 132.29, 100]],
  ['life-5.png', 1005, 244, 195, 183],
  ['life-6.jpg', 1005, 443, 195, 182],
];

export default function AboutKalarika() {
  return (
    <main className="page-main about">
      <Hero
        image={asset('about/hero.jpg')}
        title="What is Kalārika ?"
        subtitle="Kalārika is a wedding design studio that creates culturally rooted and thoughtfully planned celebrations through craft, careful material selection, and structured execution"
      />

      <section className="container split-intro">
        <div className="split-intro-copy">
          <h2 className="section-title">Our Philosophy</h2>
          <div className="body">
            <p>
              At Kalārika, we believe that meaningful design begins with intention. Every celebration is approached with sensitivity to culture, respect
              for craft, and responsibility toward materials and people. Rather than treating design as surface decoration, we see it as a thoughtful
              process that connects tradition with contemporary expression.
            </p>
            <br />
            <p>
              Our philosophy guides how we collaborate, how we create, and how we deliver—ensuring that every wedding reflects clarity, integrity, and
              care. These beliefs are reflected in the core values that shape our everyday decisions and long-term direction.
            </p>
          </div>
        </div>
        <img className="split-intro-mark" src={asset('about/philosophy-mark.svg')} alt="" width="283" height="259" />
      </section>

      <section className="container values" aria-label="Core values">
        <div className="values-row top">
          {VALUES_TOP.map((v) => (
            <ValueCard key={v.title} v={v} />
          ))}
        </div>
        <div className="values-row bottom">
          {VALUES_BOTTOM.map((v) => (
            <ValueCard key={v.title} v={v} />
          ))}
        </div>
      </section>

      <section className="container motto">
        <blockquote className="home-quote motto-quote">
          <span className="quote-mark open" aria-hidden="true">“</span>
          <p className="h3">We create celebrations that honour tradition, embrace craft, and are designed with thoughtful intention.</p>
          <span className="quote-mark close" aria-hidden="true">”</span>
        </blockquote>
      </section>

      <section className="container process">
        <h2 className="section-title">Our process</h2>
        <ol className="process-list">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="process-step">
              <img className="process-icon" src={asset(`about/${p.img}`)} alt="" width="237" height="201" />
              <span className="process-num">{i + 1}</span>
              <div className="process-copy">
                <h3 className="h3">{p.title}</h3>
                <p className="body">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="partners">
        <div className="container split-intro">
          <div className="split-intro-copy">
            <h2 className="section-title">Our Brand Partnerships</h2>
            <p className="body">
              Kalārika works alongside brands and collaborators who align with our values of craft, quality, and cultural sensitivity. Together, we build
              partnerships that enhance the wedding experience through trust, expertise, and a shared dedication to meaningful design.
            </p>
          </div>
          <div className="partners-mark" aria-hidden="true">
            <img src={asset('about/partners-mark-a.svg')} alt="" className="a" />
            <img src={asset('about/partners-mark-b.svg')} alt="" className="b" />
          </div>
        </div>
        <ul className="container partner-logos">
          {PARTNERS.map((p) => (
            <li key={p.alt} style={{ minWidth: p.box }}>
              {p.crop ? (
                <Crop src={asset(`about/${p.src}`)} alt={p.alt} crop={p.crop} style={{ width: p.w, height: 66, borderRadius: 0 }} />
              ) : (
                <img src={asset(`about/${p.src}`)} alt={p.alt} style={{ width: p.w, height: 66, objectFit: 'cover' }} />
              )}
            </li>
          ))}
        </ul>
      </section>

      <FloralBanner title="Interested in collaborating with Kalārika? Let’s create meaningful experiences together." cta="Contact us" to={ROUTES.contact} />

      <section className="container team">
        <h2 className="section-title">Our Core team</h2>
        <div className="team-grid">
          {TEAM.map((t) => (
            <article key={t.name} className="team-card">
              <Crop src={asset(`about/${t.src}`)} alt={t.name} crop={t.crop} className="team-photo" />
              <h3 className="card-title">{t.name}</h3>
              <p className="body">{t.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="life">
        <div className="container life-inner">
          <h2 className="section-title">Life at Kalārika</h2>
          <p className="body life-text">
            Life at Kalārika is shaped by collaboration, creativity, and cultural depth. We work across design, craft, and execution to create meaningful
            celebrations—offering hands-on learning, shared ownership, and the opportunity to build work that truly matters.
          </p>
          <div className="collage">
            {COLLAGE.map(([src, l, t, w, h, crop]) => (
              <Crop
                key={src}
                src={asset(`about/${src}`)}
                crop={crop}
                className="collage-tile"
                style={{ left: `${(l / 1200) * 100}%`, top: `${(t / 625) * 100}%`, width: `${(w / 1200) * 100}%`, height: `${(h / 625) * 100}%` }}
              />
            ))}
          </div>
          <JoinBanner title="Want to be part of our journey?" to={ROUTES.careers} />
        </div>
      </section>
    </main>
  );
}

function ValueCard({ v }) {
  return (
    <article className="value-card" style={v.w ? { flexBasis: v.w } : undefined}>
      {v.full ? (
        <img className="value-icon" src={asset(`about/${v.icon}.svg`)} alt="" width="69" height="69" />
      ) : (
        <span className="value-icon">
          <img src={asset(`about/${v.icon}.svg`)} alt="" style={{ width: v.iw, height: v.ih, transform: v.rotate ? 'rotate(180deg)' : undefined }} />
        </span>
      )}
      <h3 className="h3">{v.title}</h3>
      <p className="value-text">{v.text}</p>
    </article>
  );
}
