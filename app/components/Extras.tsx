'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { INSTAGRAM_URL } from '../lib/content';
import { EASE_OUT } from './motion';

/** Appears once the hero has been read; stays out of the way until then. */
export function FloatingContact() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="floating-contact"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact Sippin Stories on Instagram"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span>Let’s talk</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Oversized footer wordmark; letters rise in sequence when it enters view. */
export function Wordmark({ text }: { text: string }) {
  return (
    <motion.p
      className="wordmark"
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      {Array.from(text).map((ch, i) => (
        <span key={i} className="wm-mask" aria-hidden="true">
          <motion.span
            className="wm-char"
            variants={{
              hidden: { y: '105%' },
              shown: { y: '0%', transition: { duration: 1, ease: EASE_OUT, delay: i * 0.035 } },
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

