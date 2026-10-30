'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { filters, menuItems, type Filter } from '../lib/content';
import { EASE_IN_OUT, EASE_OUT, LineReveal, Reveal, usePrefersReducedMotion } from './motion';

const INITIAL_COUNT = 8;
const pad = (n: number) => n.toString().padStart(2, '0');

/**
 * The menu reads like a printed carte: ruled rows, dotted leaders, prices set
 * flush right. Filtering keeps rows that survive in place and glides them to
 * their new position (layout animation) while departing rows lift away and
 * arriving rows settle in with a short stagger.
 */
export default function MenuSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const filtered = useMemo(
    () => menuItems.filter((item) => activeFilter === 'All' || item.category === activeFilter),
    [activeFilter],
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const remaining = filtered.length - INITIAL_COUNT;

  const counts = useMemo(
    () =>
      Object.fromEntries(
        filters.map((f) => [f, f === 'All' ? menuItems.length : menuItems.filter((i) => i.category === f).length]),
      ) as Record<Filter, number>,
    [],
  );

  const toggleShowAll = () => {
    const collapsing = showAll;
    setShowAll(!showAll);
    if (collapsing && listRef.current) {
      const top = listRef.current.getBoundingClientRect().top;
      if (top < 0) listRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section className="menu section" id="menu" aria-labelledby="menu-title">
      <div className="wrap">
        <div className="menu-head">
          <p className="chapter-inline">
            <span className="chapter-no">02</span> Something for every mood
          </p>
          <LineReveal
            as="h2"
            id="menu-title"
            className="display-2 menu-title"
            lines={['A menu worth', <em key="l">lingering over.</em>]}
          />
          <Reveal className="menu-intro" delay={0.2}>
            <p>Comforting favourites, little indulgences and something for that “let’s order one more” feeling.</p>
          </Reveal>
        </div>

        <div className="menu-toolbar">
          <LayoutGroup id="menu-tabs">
            <div className="filter-tabs" role="group" aria-label="Filter menu">
              {filters.map((f) => {
                const active = activeFilter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    className={active ? 'is-active' : ''}
                    onClick={() => {
                      setActiveFilter(f);
                      setShowAll(false);
                    }}
                  >
                    <span className="tab-label">{f}</span>
                    <sup className="tab-count">{pad(counts[f])}</sup>
                    {active && (
                      <motion.span
                        layoutId="tab-rule"
                        className="tab-rule"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="menu-toolbar-meta">
            <span className="menu-legend" aria-hidden="true">
              <span>
                <i className="food-mark veg" /> Veg
              </span>
              <span>
                <i className="food-mark nonveg" /> Non-veg
              </span>
            </span>
            <p className="menu-count" aria-live="polite">
              <span className="count-window">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeFilter}
                    className="count-num"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    {pad(filtered.length)}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}
              good things
            </p>
          </div>
        </div>

        <motion.div
          ref={listRef}
          className="menu-board"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={reduce ? { duration: 0 } : { duration: 1.3, ease: EASE_IN_OUT }}
        >
          <ul className="menu-list" id="menu-list">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, i) => (
                <motion.li
                  key={item.name}
                  layout="position"
                  className="menu-row"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_OUT, delay: Math.min(i, 12) * 0.03 },
                  }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }}
                  transition={{ layout: { duration: 0.55, ease: EASE_IN_OUT } }}
                >
                  <span className="row-no" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <div className="row-body">
                    <div className="row-line">
                      <h3 className="row-name">
                        {item.name}
                        <i
                          className={`food-mark ${item.veg ? 'veg' : 'nonveg'}`}
                          role="img"
                          aria-label={item.veg ? 'Vegetarian' : 'Non-vegetarian'}
                        />
                      </h3>
                      <span className="row-leader" aria-hidden="true" />
                      <b className="row-price">{item.price}</b>
                    </div>
                    <p className="row-note">
                      {item.note}
                      <span className="row-cat"> · {item.category}</span>
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>

        <motion.div className="menu-foot" layout="position" transition={{ duration: 0.55, ease: EASE_IN_OUT }}>
          {filtered.length > INITIAL_COUNT && (
            <button
              type="button"
              className="menu-more"
              onClick={toggleShowAll}
              aria-expanded={showAll}
              aria-controls="menu-list"
            >
              <span className="roll">
                <span className="roll-a">{showAll ? 'Show a little less' : 'See the full selection'}</span>
                <span className="roll-b" aria-hidden="true">
                  {showAll ? 'Show a little less' : 'See the full selection'}
                </span>
              </span>
              {!showAll && <span className="more-count">+{remaining}</span>}
              <ChevronDown size={16} className={showAll ? 'rotate' : ''} aria-hidden="true" />
            </button>
          )}
          {(activeFilter === 'All' || activeFilter === 'Pizza') && (
            <p className="menu-aside">
              <span className="hand">psst —</span> extra cheese on a pizza, ₹50
            </p>
          )}
          <p className="menu-footnote">
            Menu and prices shown for this concept demo. Final items, variants and pricing to be confirmed by the café.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

