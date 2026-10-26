import { asset } from '../../lib/asset';
import Crop from '../../components/Crop';
import StoryCards from '../../components/StoryCards';
import IconCards from '../../components/IconCards';
import ContactSection from '../../components/ContactSection';
import './Weddings.css';

const a = (f) => asset(`story/${f}`);

// [file, left, top, width, height, crop] on a 1207.7 × 415.3 stage
const COLLAGE = [
  ['v-84', 0, 0, 252.3, 151],
  ['v-86', 0, 163, 252, 251, [-5.17, -0.08, 110, 110]],
  ['v-92', 264.3, 0, 190.7, 260.9],
  ['v-87', 264.3, 272.9, 190.7, 141.1],
  ['v-83', 467, 0, 331, 187],
  ['v-89', 469, 199, 191, 216, [-4.45, 0, 113.09, 100]],
  ['v-91', 670, 199, 129, 216],
  ['v-85', 810.9, 0, 190.7, 260.9],
  ['v-88', 810.9, 272.9, 190.7, 141.1],
  ['v-92', 1013.7, 0, 194, 151],
  ['v-93', 1013.7, 163, 194, 251],
];

const DECOR = [
  { image: a('v-83.jpg'), title: 'Mandap Design', text: 'Layered Zardosi embroidered drapes with antique gold framing and suspended detailing. The structure was handcrafted to balance grandeur and intimacy.' },
  { image: a('decor-entrance.jpg'), crop: [0, -0.05, 100, 144.87], title: 'Entrance Installation', text: 'A Meenakari-inspired white metal archway with handcrafted floral motifs. Designed as an immersive welcome moment.' },
  { image: a('decor-story.jpg'), title: 'Storytelling Corner', text: 'A Warli-inspired illustrated installation narrating the couple’s journey in traditional visual language.' },
];

const SIGNATURE = [
  { image: a('sig-1.jpg'), title: 'Suspended Embroidered Canopy', text: 'A floating Zardosi installation that became the visual anchor of the ceremony.' },
  { image: a('sig-2.jpg'), title: 'Custom Metal Pillar Framework', text: 'Engineered modular structures that allowed reuse and reinstallation.' },
  { image: a('sig-3.jpg'), title: 'Interactive Artisan Showcase', text: 'Guests could observe live detailing demonstrations during pre-wedding events.' },
];

const ARTISANS = [
  { image: a('art-1.jpg'), crop: [-4.65, -29.71, 109.51, 159.11], title: 'Zardosi Embroidery — Rajasthan', text: 'A 12-member embroidery team collaborated with our design studio to translate traditional Zardosi techniques into large-scale contemporary installations.' },
  { image: a('art-2.jpg'), crop: [-0.14, -33.18, 100, 144.87], title: 'White Metal & Meenakari Work — Jaipur', text: 'Second-generation metal artisans adapted heritage Meenakari techniques for modular structural frameworks.' },
  { image: a('art-3.jpg'), crop: [0.14, -76.72, 100, 199.11], title: 'Warli Interpretation Artist — Maharashtra', text: 'A contemporary folk artist reinterpreted Warli storytelling into a customised visual narrative of the couple.' },
];

const SUSTAIN = [
  { icon: a('i-reusable.svg'), title: 'Reusable Structures', text: 'Metal frameworks were designed modularly for future events.' },
  { icon: a('i-lowwaste.svg'), title: 'Low-Waste Textile Planning', text: 'Embroidery panels were measured and pre-cut to minimise fabric waste.' },
  { icon: a('i-local.svg'), title: 'Local Artisan Sourcing', text: 'Major production executed within Rajasthan to reduce transport impact.' },
];

const IMPACT = [
  { icon: a('i-fair.svg'), title: 'Fair Compensation Model', text: 'Artisans were contracted at premium rates above standard market pricing.' },
  { icon: a('i-longterm.svg'), title: 'Long-Term Collaboration', text: 'Three artisans entered long-term partnerships with Kalārika following this project.' },
  { icon: a('i-daily.svg'), title: 'Daily Life Impact', text: 'Steady income from this project supported school fees, workshop upgrades, and skill development for junior apprentices.' },
];

const SIMILAR = [
  { image: a('sim-1.jpg'), title: 'Ivory & Vermilion', text: 'A heritage palace wedding layered with ivory textiles, vermilion accents, and intricate Zardosi detailing. Designed to balance royal grandeur with refined craft integration.' },
  { image: a('sim-2.jpg'), title: 'Coastal Gold', text: 'A destination celebration blending soft coastal tones with handcrafted metal accents and subtle embroidered textures. Elegant, immersive, and culturally rooted.' },
  { image: a('sim-3.jpg'), title: 'Threads of Tradition', text: 'A craft-forward wedding centred around textile richness and hand-painted narrative elements. Traditional art forms reinterpreted for a contemporary setting.' },
];

export default function WeddingStory() {
  return (
    <main className="page-main weddings story">
      <section className="hero hero-plain story-hero">
        <img className="hero-bg" src={asset('weddings/story-1.jpg')} alt="" />
        <div className="container hero-content">
          <div className="hero-text" style={{ gap: 16 }}>
            <h1 className="h1">Echoes of Rajasthani Heritage</h1>
            <div className="tagline">
              <p>
                <strong>Couple: Rahul</strong> &amp; Priya
              </p>
              <p>
                <strong>Location: </strong>Udaipur, Rajasthan
              </p>
              <p>
                <strong>Art Forms: </strong>Zardosi &amp; Meenakari Craft
              </p>
            </div>
            <p className="tagline">
              A three-day destination wedding rooted in Rajasthani craft traditions. Designed around regal tones, intricate metal detailing, and layered
              textile artistry, this celebration brought heritage craftsmanship into a contemporary luxury setting.
            </p>
          </div>
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">The Couple’s Vision</h2>
        <div className="collage collage-weddings square-tiles">
          {COLLAGE.map(([src, l, t, w, h, crop], i) => (
            <Crop
              key={src + i}
              src={a(`${src}.jpg`)}
              crop={crop}
              className="collage-tile"
              style={{ left: `${(l / 1207.7) * 100}%`, top: `${(t / 415.3) * 100}%`, width: `${(w / 1207.7) * 100}%`, height: `${(h / 415.3) * 100}%`, borderRadius: 0 }}
            />
          ))}
        </div>
        <p className="body text-center" style={{ color: '#000' }}>
          Vidhi and Darshan wanted a celebration that felt culturally rich yet refined. Their vision centred around traditional craftsmanship, immersive
          installations, and meaningful storytelling woven into every detail.
        </p>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">The Celebration</h2>
        <div className="body story-text">
          <p>
            The wedding took place over three days, with each event thoughtfully designed to feel connected yet distinct. From the moment guests
            arrived, they experienced spaces shaped by handcrafted details and coordinated design.
          </p>
          <p>
            The entrance featured a Meenakari-inspired metal arch that set the tone for the celebration. Warli artwork panels added a personal
            storytelling element, helping guests connect with the couple’s journey.
          </p>
          <p>
            The ceremony was centred around a Zardosi-embroidered mandap, layered with rich fabrics and subtle metallic accents. It became the visual
            highlight of the wedding and framed the rituals beautifully.
          </p>
          <p>
            For the reception and evening events, lighting played an important role. Warm tones, metal detailing, and textured fabrics created a
            welcoming and intimate atmosphere. The dining areas were styled with embroidered runners, coordinated colour palettes, and handcrafted décor
            elements to maintain visual harmony.
            <br />
            Throughout the celebration, every space felt carefully planned, culturally rooted, and consistent in its design language.
          </p>
        </div>
        <figure className="couple-quote">
          <img src={a('testimonial.jpg')} alt="The couple at their mandap" />
          <div>
            <blockquote className="quote">
              “Kalārika transformed our ideas into a celebration that felt personal, elegant, and rooted in tradition. Every detail was thoughtfully
              crafted, and the artisans’ work truly made our wedding unforgettable.”
            </blockquote>
            <figcaption className="quote">-Rahul &amp; Priya</figcaption>
          </div>
        </figure>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Décor &amp; Design Details</h2>
        <StoryCards items={DECOR} tone="warm" />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Signature Craft Features</h2>
        <StoryCards items={SIGNATURE} tone="warm" />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Artisans &amp; Artforms Involved</h2>
        <StoryCards items={ARTISANS} tone="warm" />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Sustainability Approach</h2>
        <IconCards items={SUSTAIN} />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Artisan Empowerment &amp; Impact</h2>
        <div className="stack gap-24">
          <p className="body" style={{ color: '#000' }}>
            This wedding supported 28 artisans across three craft clusters.
          </p>
          <IconCards items={IMPACT} className="tall" />
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Similar Stories</h2>
        <StoryCards items={SIMILAR} tone="warm" more="View Story →" />
      </section>

      <ContactSection />
    </main>
  );
}
