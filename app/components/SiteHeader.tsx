'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Instagram, MapPin } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { INSTAGRAM_URL, MAPS_URL, nav } from '../lib/content';
import { EASE_IN_OUT, EASE_OUT, Magnetic, usePrefersReducedMotion } from './motion';

/** Text that rolls to a duplicate of itself on hover (CSS-driven, see .roll). */
function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = usePrefersReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    lastY.current = window.scrollY;
    setScrolled(window.scrollY > 40);
  }, []);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = lastY.current;
    lastY.current = y;
    setScrolled(y > 40);
    if (open) return;
    if (y > prev + 6 && y > 360) setHidden(true);
    else if (y < prev - 6 || y < 360) setHidden(false);
  });

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Scroll lock, Escape to close, focus trap while the panel is open.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbar}px`;

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    }, 380);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current || !toggleRef.current) return;
      const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')];
      const idx = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (idx <= 0 ? items.length - 1 : idx - 1) : idx === items.length - 1 ? 0 : idx + 1;
      e.preventDefault();
      items[next].focus();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      body.style.overflow = '';
      body.style.paddingRight = '';
    };
  }, [open, close]);

  // Close the panel if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /** Mobile links: release the scroll lock first, then travel to the section. */
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    setOpen(false);
    window.requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', href);
    });
  };

  const panelEase = reduce ? { duration: 0 } : { duration: 0.75, ease: EASE_IN_OUT };

  return (
    <>
      <div className="announcement">
        <div className="wrap announcement-inner">
          <span>Good coffee. Unhurried moments. Stories that stay.</span>
          <span className="announcement-right">
            Est. 2023 <span className="dot" aria-hidden="true" /> Stories over coffee
          </span>
        </div>
      </div>

      <header
        className={`site-header${scrolled ? ' is-scrolled' : ''}${hidden ? ' is-hidden' : ''}${open ? ' is-open' : ''}`}
      >
        <div className="wrap header-inner">
          <a href="#top" className="brand" aria-label="Sippin' Stories home">
            <span className="brand-logo">
              <Image
                src="/images/brand-logo.webp"
                alt="Sippin' Stories — Stories over coffee, established 2023"
                width={92}
                height={92}
                priority
              />
            </span>
            <span className="brand-text">
              <b>Sippin’ Stories</b>
              <small>Café · Stories over coffee</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <ol>
              {nav.map((n, i) => (
                <li key={n.href}>
                  <a href={n.href}>
                    <span className="nav-no">0{i + 1}</span>
                    <Roll>{n.label}</Roll>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Magnetic className="nav-cta-wrap" strength={0.25}>
            <a className="btn btn-outline nav-cta" href="#visit">
              <span className="btn-label">Come say hello</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Magnetic>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="toggle-word" aria-hidden="true">
              {open ? 'Close' : 'Index'}
            </span>
            <span className="toggle-bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        <motion.span className="read-progress" style={{ scaleX: progress }} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', transition: panelEase }}
            exit={{
              clipPath: 'inset(0% 0% 100% 0%)',
              transition: reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_IN_OUT, delay: 0.18 },
            }}
          >
            <nav aria-label="Mobile navigation" className="mm-nav">
              <ol>
                {nav.map((n, i) => (
                  <li key={n.href} className="mm-item">
                    <span className="line-mask">
                      <motion.a
                        href={n.href}
                        onClick={(e) => goTo(e, n.href)}
                        className="mm-link"
                        initial={{ y: '110%' }}
                        animate={{ y: '0%', transition: { duration: 0.85, ease: EASE_OUT, delay: 0.32 + i * 0.07 } }}
                        exit={{ y: '-110%', transition: { duration: 0.35, ease: [0.5, 0, 0.75, 0], delay: i * 0.035 } }}
                      >
                        <span className="mm-no">0{i + 1}</span>
                        <span className="mm-label">{n.label}</span>
                        <ArrowUpRight className="mm-arrow" size={22} aria-hidden="true" />
                      </motion.a>
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
            <motion.div
              className="mm-foot"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.6, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <Instagram size={16} aria-hidden="true" /> @sippinstories23
              </a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer">
                <MapPin size={16} aria-hidden="true" /> Get directions
              </a>
              <span className="mm-hand">see you soon —</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
