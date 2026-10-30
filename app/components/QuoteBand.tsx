'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from './motion';

type Token = { text: string; em?: boolean; br?: boolean };
const TOKENS: Token[] = [
  { text: 'There’s' },
  { text: 'always' },
  { text: 'time', br: true },
  { text: 'for' },
  { text: 'one', em: true },
  { text: 'more', em: true },
  { text: 'story.', em: true },
];

function Word({ token, progress, range, still }: { token: Token; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const Tag = token.em ? motion.em : motion.span;
  return (
    <>
      <Tag className="quote-word" style={still ? undefined : { opacity, y }}>
        {token.text}
      </Tag>
      {token.br ? <br /> : ' '}
    </>
  );
}

/** Words light up as the passage is read, tied directly to scroll position. */
export default function QuoteBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'center 0.45'] });

  return (
    <section ref={ref} className="quote-band" aria-label="The Sippin’ Stories way">
      <div className="wrap quote-inner">
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        <blockquote>
          <p className="quote-text">
            {TOKENS.map((t, i) => (
              <Word
                key={t.text}
                token={t}
                progress={scrollYProgress}
                range={[i / TOKENS.length, (i + 1) / TOKENS.length]}
                still={reduce}
              />
            ))}
          </p>
          <footer className="quote-cite">— The Sippin’ Stories way</footer>
        </blockquote>
      </div>
    </section>
  );
}

