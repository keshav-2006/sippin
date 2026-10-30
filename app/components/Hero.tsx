'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Coffee } from 'lucide-react';
import { useRef } from 'react';
import { CropImage, cropAspect } from './CropImage';
import { ClipReveal, EASE_OUT, LineReveal, Magnetic, Parallax, usePrefersReducedMotion } from './motion';

/**
 * Entrance choreography (≈1.6s, plays once):
 *   0.10  masthead rule + meta fade in
 *   0.15  headline lines rise from their masks, staggered
 *   0.30  arch photograph is uncovered from the bottom
 *   0.85  supporting copy + CTAs settle
 *   1.05  drinks inset wipes in from the left, stamp lands
 * On scroll the arch photo drifts down inside its frame while the
 * headline lifts slightly faster — a two-plane depth cue.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const stampRotate = useTransform(scrollYProgress, [0, 1], [-8, 120]);

  const settle = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  });

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="kicker">
            <span className="kicker-rule" aria-hidden="true" /> Your little corner of comfort
          </span>
          <span className="hero-meta-right">
            <span>Est. 2023</span>
            <span aria-hidden="true">✳</span>
            <span>Stories over coffee</span>
          </span>
        </motion.div>

        <motion.div className="hero-head" style={{ y: reduce ? 0 : headY }}>
          <LineReveal
            as="h1"
            id="hero-title"
            className="hero-title"
            onMount
            delay={0.15}
            stagger={0.1}
            lines={['Some stories', 'are best', <em key="sipped">sipped.</em>]}
            lineClassNames={['', 'hero-line-2', 'hero-line-3']}
          />
        </motion.div>

        <div className="hero-foot">
          <motion.p className="hero-sub" {...settle(0.85)}>
            A good cup. Something lovely to eat. And all the time in the world to catch up.
          </motion.p>
          <motion.div className="hero-actions" {...settle(0.95)}>
            <Magnetic>
              <a className="btn btn-ink" href="#menu">
                <span className="btn-label">Explore the menu</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Magnetic>
            <a className="link-line" href="#story">
              Get to know us <ArrowDown size={15} aria-hidden="true" />
            </a>
          </motion.div>
          <motion.p className="hero-note" {...settle(1.1)}>
            <span className="note-star" aria-hidden="true">✳</span>
            <span>
              Made for the moments
              <br />
              <b>between hellos &amp; goodbyes</b>
            </span>
          </motion.p>
        </div>

        <div className="hero-visual">
          <ClipReveal onMount from="bottom" delay={0.3} duration={1.45} className="hero-arch">
            <Parallax mode="exit" distance={70}>
              <Image
                src="/images/cafe-interior.webp"
                alt="Warm, welcoming interior of Sippin' Stories café"
                fill
                priority
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 60vw, 40vw"
                className="cover"
                style={{ objectPosition: '46% 50%' }}
              />
            </Parallax>
          </ClipReveal>

          <ClipReveal onMount from="left" delay={1.05} duration={1.1} className="hero-inset" style={cropAspect('drinksInset')}>
            <CropImage name="drinksInset" alt="A table of colourful café drinks" frameSizes={{ mobile: 42, desktop: 16 }} />
          </ClipReveal>

          <motion.div
            className="hero-stamp"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 1.2 }}
            aria-hidden="true"
          >
            <motion.svg viewBox="0 0 120 120" style={{ rotate: reduce ? 0 : stampRotate }}>
              <defs>
                <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text>
                <textPath href="#stamp-circle" startOffset="0" textLength="272" lengthAdjust="spacing">
                  TAKE A BREATHER ✳ YOU’RE HERE ✳
                </textPath>
              </text>
            </motion.svg>
            <span className="stamp-core">
              <Coffee size={22} strokeWidth={1.5} />
            </span>
          </motion.div>

          <motion.p className="hero-caption" {...settle(1.25)}>
            <span>Fig. 01</span> The main room, lamps on
          </motion.p>
        </div>
      </div>

      <a href="#story" className="scroll-cue" aria-label="Scroll to our story">
        <span className="scroll-cue-line" aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
