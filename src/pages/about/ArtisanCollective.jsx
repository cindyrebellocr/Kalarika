import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import Hero from '../../components/Hero';
import Crop from '../../components/Crop';
import Testimony from '../../components/Testimony';
import StoryCards from '../../components/StoryCards';
import FaqAccordion from '../../components/FaqAccordion';
import JoinBanner from '../../components/JoinBanner';
import './About.css';

// [file, left, top, width, height, crop] on a 1208 × 415 stage
const COLLAGE = [
  ['c-84', 0, 0, 252.3, 151, [0.05, -57, 100, 167.11]],
  ['c-86', 0, 163, 252.3, 251, [0, 0, 106.64, 107.48]],
  ['c-85', 264.3, 0, 190.7, 260.9],
  ['c-87', 264.3, 272.9, 190.7, 141.1],
  ['c-83', 467.1, 0, 330.5, 151, [0.14, -89.32, 100, 218.86]],
  ['c-89', 467.1, 163, 190.7, 252.3],
  ['c-91', 669.8, 163, 129.1, 252.3],
  ['c-90', 810.9, 0, 190.7, 260.9],
  ['c-88', 810.9, 272.9, 190.7, 141.1, [-27.29, -91.4, 154.58, 209.01]],
  ['c-92', 1013.7, 0, 194, 151],
  ['c-93', 1013.7, 163, 194, 251],
];

const WHY = [
  { icon: 'why-1', title: 'Strengthening Artisan Independence', text: 'Creating structured opportunities that support stable livelihoods, fair collaboration, and long-term professional growth.' },
  { icon: 'why-2', title: 'Elevating Craft in Contemporary Spaces', text: 'Positioning traditional art forms within modern wedding environments, allowing regional crafts to be seen, valued, and experienced at scale.' },
  { icon: 'why-3', title: 'Extending Cultural Relevance', text: 'Bringing heritage practices into new contexts, ensuring traditions evolve while staying rooted in their origins.' },
];

const ARTFORMS = [
  { img: 'art-zardosi', title: 'Zardosi Emroidery', text: 'A traditional embroidery technique known for its intricate metallic threadwork, Zardosi brings richness and detail to textiles, adding depth and ceremonial elegance to wedding environments.' },
  { img: 'art-meenakari', title: 'Meenakari Craft', text: 'An ornamental craft combining metalwork and enamel detailing, Meenakari is celebrated for its vibrant colours and intricate patterns, often used to create refined decorative elements.' },
  { img: 'art-warli', title: 'Warli painting', text: 'Originating from Maharashtra, Warli art uses minimal forms and natural tones to depict stories of community, ritual, and everyday life, bringing cultural narrative into contemporary spaces.' },
];

const STORIES = [
  { image: asset('artisan/story-1.jpg'), title: 'From Village to Venue: Ramesh’s Journey', text: 'A story of how traditional artistry found new meaning and wider recognition through contemporary wedding collaborations.' },
  { image: asset('artisan/story-2.jpg'), title: 'Keeping Tradition Alive, One Celebration at a Time', text: 'An intimate look into an artisan’s life, the challenges they face, and how meaningful partnerships help sustain their work.' },
  { image: asset('artisan/story-3.jpg'), title: 'Beyond the Craft: A Maker’s Perspective', text: 'Exploring the everyday realities, aspirations, and impact of working within a growing artisan collective.' },
];

const FAQS = [
  {
    q: 'How does Kalārika collaborate with artisans?',
    a: 'Our design team works closely with each artisan community, aligning their traditional techniques with the design intent of every celebration. We plan together, sample together and credit the makers behind every crafted detail.',
  },
  {
    q: 'How can artisans become part of the collective?',
    a: 'Artisans can apply through “Apply as Artisan” under Careers. Once we receive your details and samples of your work, our team reaches out to discuss your craft and upcoming opportunities.',
  },
  {
    q: 'Does Kalārika provide consistent work opportunities?',
    a: 'We create structured, skill-based opportunities and long-term partnerships so that artisans can rely on steady work across the wedding season and beyond.',
  },
  {
    q: 'How are artisans credited and recognised in projects?',
    a: 'Every project highlights the art forms and artisans involved — in our wedding stories, on-site and across our channels — so that the makers are seen and valued.',
  },
  {
    q: 'Can artisans from new regions or craft forms join the collective?',
    a: 'Yes. As we grow, we continue to expand the collective by welcoming new crafts and skilled makers from across India into our network.',
  },
];

export default function ArtisanCollective() {
  return (
    <main className="page-main about">
      <Hero
        image={asset('artisan/hero.jpg')}
        imageStyle={{ objectPosition: '0 8%' }}
        title="Artisan Collective"
        subtitle="The Artisan Collective by Kalārika brings together skilled craft communities whose work forms the foundation of our wedding experiences. Through thoughtful collaboration and shared respect for tradition, we integrate diverse art forms into contemporary celebrations ensuring that culture, craft, and creativity remain central to everything we design."
        className="hero-plain"
      />

      <section className="container hands">
        <div className="split-intro">
          <div className="split-intro-copy">
            <h2 className="section-title">Hands that shape our work</h2>
            <div className="body">
              <p>
                Our wedding experiences are shaped by skilled artisans from across India, carrying forward generations of craft knowledge. From Zardosi
                embroidery in textiles, to White Metal and Meenakari craftsmanship, and Warli painting traditions, each art form brings its own regional
                identity and cultural depth.
              </p>
              <p>
                Through close collaboration with our design team, these communities adapt their traditional techniques for contemporary wedding spaces. By
                creating meaningful, skill-based opportunities and long-term partnerships, Kalārika supports artisans in sustaining and evolving their craft
                with dignity and recognition.
              </p>
            </div>
          </div>
          <div className="hands-mark" aria-hidden="true">
            <img src={asset('artisan/hands-a.svg')} alt="" className="a" />
            <img src={asset('artisan/hands-b.svg')} alt="" className="b" />
            <img src={asset('artisan/hands-c.svg')} alt="" className="c" />
          </div>
        </div>
        <div className="collage collage-artisans">
          {COLLAGE.map(([src, l, t, w, h, crop]) => (
            <Crop
              key={src}
              src={asset(`artisan/${src}.jpg`)}
              crop={crop}
              className="collage-tile square"
              style={{ left: `${(l / 1208) * 100}%`, top: `${(t / 415) * 100}%`, width: `${(w / 1208) * 100}%`, height: `${(h / 415) * 100}%` }}
            />
          ))}
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Why the collective exists?</h2>
        <div className="why-grid">
          {WHY.map((w) => (
            <article key={w.title} className="why-card">
              <img src={asset(`artisan/${w.icon}.svg`)} alt="" width="60" height="60" />
              <h3 className="card-title">{w.title}</h3>
              <p className="body">{w.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Artforms we work with</h2>
        <div className="stack gap-24">
          <p className="body" style={{ maxWidth: 729 }}>
            The following art forms represent our current collaborations with artisan communities. As we grow, we continue to expand our collective by
            welcoming new crafts and skilled makers into our network.
          </p>
          <div className="artform-grid">
            {ARTFORMS.map((a) => (
              <article key={a.title} className="artform-card">
                <img src={asset(`artisan/${a.img}.png`)} alt={a.title} loading="lazy" />
                <h3 className="card-title">{a.title}</h3>
                <p className="body">{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">Artisan Experiences</h2>
        <Testimony
          image={asset('artisan/testimony-ramesh.jpg')}
          imageAlt="Ramesh Pawar at work"
          quote="“Working with Kalārika has been a proud experience for our community. They understand our art and give it space to be seen and valued. It feels good to know our tradition is appreciated in such meaningful celebrations.”"
          author="- Ramesh Pawar , Warli artist"
        />
      </section>

      <section className="container stack gap-48">
        <div className="section-row">
          <h2 className="section-title">Stories from the makers</h2>
          <span className="link-arrow static-link">See More →</span>
        </div>
        <StoryCards items={STORIES} />
      </section>

      <section className="container">
        <JoinBanner title="Become a part of our growing artisan network." to={ROUTES.artisanSteps} ctaWidth={291} />
      </section>

      <section className="container stack gap-48">
        <h2 className="section-title">FAQs</h2>
        <FaqAccordion items={FAQS} />
      </section>
    </main>
  );
}

