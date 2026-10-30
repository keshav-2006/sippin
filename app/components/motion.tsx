'use client';

/**
 * Motion primitives for Sippin' Stories.
 *
 * One vocabulary, used deliberately:
 *  - LineReveal  → headlines rise out of a typographic mask (type is "set", not faded).
 *  - ClipReveal  → photographs are uncovered like a print pulled from a tray.
 *  - Parallax    → an image drifts inside its frame (depth, never decoration).
 *  - Drift       → a whole figure moves at a slightly different scroll speed.
 *  - Magnetic    → primary desktop CTAs lean toward the pointer.
 *  - Reveal      → quiet opacity/offset for supporting copy only.
 *
 * Reduced motion: <MotionConfig reducedMotion="user"> (see providers.tsx) neutralises
 * transform animations. Clip-path and scroll-linked values are handled here via
 * usePrefersReducedMotion, which starts `false` on both server and client so the
 * hydrated markup always matches.
 */

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/* ------------------------------------------------------------------ */
/* LineReveal                                                          */
/* ------------------------------------------------------------------ */

type LineRevealProps = {
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  id?: string;
  className?: string;
  lineClassNames?: string[];
  delay?: number;
  stagger?: number;
  /** Play on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
};

export function LineReveal({
  lines,
  as = 'h2',
  id,
  className,
  lineClassNames = [],
  delay = 0,
  stagger = 0.085,
  onMount = false,
}: LineRevealProps) {
  const Tag = motion[as];
  const trigger = onMount
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: { once: true, amount: 0.6 } };

  return (
    <Tag id={id} className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className={`line-mask ${lineClassNames[i] ?? ''}`}>
          <motion.span
            className="line-inner"
            variants={{
              hidden: { y: '115%', rotate: 2.5 },
              shown: {
                y: '0%',
                rotate: 0,
                transition: { duration: 1.15, ease: EASE_OUT, delay: delay + i * stagger },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* ClipReveal — an image frame that uncovers its contents              */
/* ------------------------------------------------------------------ */

const CLOSED = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
} as const;
const OPEN = 'inset(0% 0% 0% 0%)';

type ClipRevealProps = {
  children: ReactNode;
  from?: keyof typeof CLOSED;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  onMount?: boolean;
  amount?: number;
};

export function ClipReveal({
  children,
  from = 'bottom',
  className = '',
  style,
  delay = 0,
  duration = 1.25,
  onMount = false,
  amount = 0.3,
}: ClipRevealProps) {
  const reduce = usePrefersReducedMotion();
  const frame: Variants = {
    hidden: { clipPath: CLOSED[from] },
    shown: {
      clipPath: OPEN,
      transition: reduce ? { duration: 0 } : { duration, ease: EASE_IN_OUT, delay },
    },
  };
  const inner: Variants = {
    hidden: { scale: 1.16 },
    shown: { scale: 1, transition: { duration: duration + 0.5, ease: EASE_OUT, delay } },
  };
  const trigger = onMount
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: { once: true, amount } };

  return (
    <motion.div className={`frame ${className}`} style={style} initial="hidden" variants={frame} {...trigger}>
      <motion.div className="frame-inner" variants={inner}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — image drifts inside a clipped frame                      */
/* ------------------------------------------------------------------ */

type ParallaxProps = {
  children: ReactNode;
  /** Max travel in px. The inner layer is oversized by this much on each side. */
  distance?: number;
  /** 'through' = while the frame crosses the viewport; 'exit' = from page top until it leaves. */
  mode?: 'through' | 'exit';
};

export function Parallax({ children, distance = 60, mode = 'through' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'exit' ? ['start start', 'end start'] : ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    mode === 'exit' ? [0, distance] : [-distance, distance],
  );

  return (
    <div ref={ref} className="parallax">
      <motion.div
        className="parallax-inner"
        style={{ y: reduce ? 0 : y, top: -distance, bottom: -distance }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drift — whole element shifts slightly against the scroll            */
/* ------------------------------------------------------------------ */

export function Drift({
  children,
  amount = 40,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const coarse = useMediaQuery('(max-width: 767px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduce || coarse ? 0 : y }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — desktop-only pointer attraction                          */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.32,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = useMediaQuery(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  );
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 240, damping: 18, mass: 0.5 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  const onMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — supporting copy only                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
  y = 14,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

