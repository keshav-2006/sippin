import Image from 'next/image';
import { ArrowUpRight, Instagram, MapPin } from 'lucide-react';
import { INSTAGRAM_URL, MAPS_URL } from '../lib/content';
import { CropImage, cropAspect } from './CropImage';
import { Wordmark } from './Extras';
import { ClipReveal, Drift, LineReveal, Magnetic, Parallax, Reveal } from './motion';

/* ------------------------------------------------------------------ */

export function Ticker() {
  const phrase = (
    <>
      <span>Slow down a little</span>
      <i aria-hidden="true">✳</i>
      <span>sip something good</span>
      <i aria-hidden="true">✳</i>
      <span>stay for the story</span>
      <i aria-hidden="true">✳</i>
    </>
  );
  return (
    <section className="ticker" aria-label="Café motto: slow down a little, sip something good, stay for the story">
      <div className="ticker-track" aria-hidden="true">
        <div className="ticker-group">
          {phrase}
          {phrase}
        </div>
        <div className="ticker-group">
          {phrase}
          {phrase}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Story() {
  return (
    <section className="story section" id="story" aria-labelledby="story-title">
      <div className="wrap story-grid">
        <aside className="chapter" aria-hidden="true">
          <span className="chapter-big">01</span>
          <span className="chapter-label">A little about us</span>
        </aside>

        <div className="story-main">
          <p className="chapter-inline story-kicker">
            <span className="chapter-no">01</span> A little about us
          </p>
          <LineReveal
            as="h2"
            id="story-title"
            className="display-2"
            lines={['Not just a café.', <em key="f">A feeling.</em>]}
          />

          <div className="story-cols">
            <div className="story-copy">
              <Reveal>
                <p className="story-lead dropcap">
                  We believe the best moments don&apos;t need a plan. Just a familiar face, a favourite bite, and one
                  more sip before you go.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="body-copy">
                  Sippin’ Stories is your space to pause, reconnect and make the everyday feel a little more special.
                  Come for the coffee, stay for the conversations — and leave with a story of your own.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="story-links">
                <a className="link-line" href="#space">
                  Take a look around <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <span className="hand-note">
                  stay a little longer <b aria-hidden="true">↗</b>
                </span>
              </Reveal>
            </div>

            <figure className="story-figure">
              <ClipReveal from="left" duration={1.4} className="story-frame" style={cropAspect('lamps')}>
                <CropImage
                  name="lamps"
                  alt="Warm pendant lighting above the café's illustrated wall"
                  frameSizes={{ mobile: 80, desktop: 28 }}
                />
              </ClipReveal>
              <figcaption className="fig-caption">
                <span>Fig. 02</span> Warm light, low ceiling, long conversations
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Space() {
  return (
    <section className="space section" id="space" aria-labelledby="space-title">
      <div className="wrap">
        <div className="space-head">
          <div>
            <p className="chapter-inline">
              <span className="chapter-no">03</span> Your table is waiting
            </p>
            <LineReveal
              as="h2"
              id="space-title"
              className="display-2"
              lines={['A space to', <em key="m">make memories.</em>]}
            />
          </div>
          <Reveal className="space-intro" delay={0.15}>
            <p>Warm lights, easy conversations and corners that make you want to stay for just five more minutes.</p>
          </Reveal>
        </div>

        <div className="gallery">
          <figure className="g-item g-a">
            <ClipReveal from="bottom" duration={1.5} style={cropAspect('storefront')}>
              <CropImage
                name="storefront"
                alt="Sippin' Stories café entrance at night, with hanging lights and a neon coffee sign"
                frameSizes={{ mobile: 92, desktop: 38 }}
              />
            </ClipReveal>
            <figcaption className="fig-caption">
              <span>Fig. 03</span> The front porch, after dark
            </figcaption>
          </figure>

          <Drift className="g-item g-b" amount={48}>
            <figure>
              <ClipReveal from="top" duration={1.4} delay={0.1} style={cropAspect('mural')}>
                <CropImage
                  name="mural"
                  alt="Detail of the illustrated street-café mural on the café wall"
                  frameSizes={{ mobile: 76, desktop: 44 }}
                />
              </ClipReveal>
              <figcaption className="fig-caption">
                <span>Fig. 04</span> The mural wall — a whole street of regulars
              </figcaption>
            </figure>
          </Drift>

          <div className="g-pull">
            <LineReveal
              as="p"
              className="pull-quote"
              lines={['The little details', <em key="d">make the moment.</em>]}
            />
          </div>

          <figure className="g-item g-c">
            <ClipReveal from="right" duration={1.3} style={cropAspect('drinks')}>
              <CropImage
                name="drinks"
                alt="A colourful selection of drinks served at the café"
                frameSizes={{ mobile: 86, desktop: 40 }}
              />
            </ClipReveal>
            <figcaption className="fig-caption">
              <span>Fig. 05</span> One round becomes two
            </figcaption>
          </figure>

          <p className="g-note">
            Scroll, explore, make yourself at home <span aria-hidden="true">↗</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Visit() {
  return (
    <section className="visit section" id="visit" aria-labelledby="visit-title">
      <div className="wrap visit-grid">
        <div className="visit-copy">
          <p className="chapter-inline">
            <span className="chapter-no">04</span> Let’s make it a date
          </p>
          <LineReveal
            as="h2"
            id="visit-title"
            className="display-2"
            lines={['Your next', <em key="c">favourite corner.</em>]}
          />
          <Reveal delay={0.15}>
            <p className="body-copy visit-lead">
              Bring your people, bring your stories. We’ll save a little time for you.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="visit-cta">
            <Magnetic>
              <a className="btn btn-ink btn-lg" href={MAPS_URL} target="_blank" rel="noreferrer">
                <MapPin size={17} aria-hidden="true" />
                <span className="btn-label">Get directions</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Magnetic>
          </Reveal>

          <ul className="visit-index">
            <li>
              <a className="index-row" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <span className="index-key">Follow along</span>
                <span className="index-val">
                  <Instagram size={17} aria-hidden="true" /> @sippinstories23
                </span>
                <ArrowUpRight className="index-arrow" size={18} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className="index-row" href="#menu">
                <span className="index-key">Hungry already?</span>
                <span className="index-val">Browse the menu</span>
                <ArrowUpRight className="index-arrow" size={18} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <figure className="visit-figure">
          <ClipReveal from="top" duration={1.5} className="visit-frame">
            <Parallax distance={50}>
              <Image
                src="/images/cafe-interior.webp"
                alt="A welcoming table inside Sippin' Stories"
                fill
                sizes="(max-width: 767px) 92vw, 46vw"
                className="cover"
                style={{ objectPosition: '62% 78%' }}
              />
            </Parallax>
          </ClipReveal>
          <figcaption className="photo-label">Come as you are. Stay as long as you like.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <a href="#top" className="brand footer-brand">
            <span className="brand-logo">
              <Image src="/images/brand-logo.webp" alt="Sippin' Stories logo" width={74} height={74} />
            </span>
            <span className="brand-text">
              <b>Sippin’ Stories</b>
              <small>Stories over coffee</small>
            </span>
          </a>
          <p className="footer-tag">
            Good sips. Good people.
            <br />
            <em>Good stories, always.</em>
          </p>
          <a className="footer-insta" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <Instagram size={17} aria-hidden="true" /> @sippinstories23 <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <Wordmark text="Sippin’ Stories" />

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sippin’ Stories Café</span>
          <span>
            Made with care by <b>Codeworth</b>
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

