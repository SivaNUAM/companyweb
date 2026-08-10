import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { portfolioFilters, portfolioWorks } from "../../data/portfolio";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

/** Shared pin line under the fixed header — every card sticks here */
const STICKY_TOP = "calc(var(--nav-height) + 0.75rem)";

/**
 * Same deck curve as SelectedWorks (keeps cover feel identical).
 * Longer archives only damp early gaps — end taper unchanged — so Lenis doesn’t hang.
 */
const coverGap = (index, total, simplify) => {
  if (index >= total - 1) return 0;
  const fromEnd = total - 1 - index;

  if (simplify) {
    if (fromEnd === 1) return 4;
    if (fromEnd === 2) return 5;
    const base = Math.max(6, 10 - index);
    return total > 6 ? Math.max(6, Math.round(base * 0.85)) : base;
  }

  if (fromEnd === 1) return 5;
  if (fromEnd === 2) return 7;
  if (fromEnd === 3) return 9;
  const base = Math.max(8, 16 - index * 2);
  return total > 6 ? Math.max(8, Math.round(base * 0.72)) : base;
};

const WorkCardShell = ({
  work,
  index,
  scaleStyle,
  overlayOpacity,
  showOverlay,
}) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div style={scaleStyle} className="origin-center">
      <Link
        to="/contact"
        className="group relative block outline-none"
        aria-label={`${work.client} — ${work.industry}`}
      >
        <article className="site-folio-card relative">
          <div className="site-folio-media">
            <img
              src={work.image}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo md:group-hover:scale-[1.04]"
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              sizes="100vw"
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.05) 40%, rgba(11,11,11,0.75) 78%, rgba(11,11,11,0.95) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

            {showOverlay && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
          </div>

          <div className="site-folio-overlay">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-white/45 sm:text-sm md:text-base">
                  {number}
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {work.year}
                </span>
              </div>
              <span className="label-premium !text-white/50 transition-colors duration-300 group-hover:!text-[var(--accent)]">
                {work.industry}
              </span>
            </div>

            <div className="flex items-end justify-between gap-4 sm:gap-6">
              <div className="min-w-0 max-w-3xl">
                <h3 className="site-folio-client font-display text-white transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                  {work.client}
                </h3>
                <div className="mt-2 h-px w-0 bg-[var(--accent)] transition-all duration-500 ease-expo group-hover:w-16 sm:mt-3" />
                <p className="site-folio-desc">{work.title}</p>
                <p className="site-folio-summary">{work.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 sm:mt-4">
                  {work.services.map((s) => (
                    <li
                      key={s}
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/35"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="site-folio-arrow relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 text-white transition-all duration-500 ease-expo group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>

          <span className="pointer-events-none absolute inset-0 ring-0 ring-[var(--accent)] transition-[box-shadow] duration-300 group-focus-visible:ring-2" />
        </article>
      </Link>
    </motion.div>
  );
};

const CardSlot = ({ children, isLast, index, gap, cardRef }) => (
  <>
    <div
      ref={cardRef}
      className={`site-folio-card-slot ${isLast ? "relative" : "sticky"}`}
      style={{
        top: isLast ? undefined : STICKY_TOP,
        zIndex: index + 1,
      }}
    >
      {children}
    </div>
    {gap > 0 && (
      <div
        aria-hidden
        className="pointer-events-none"
        style={{ height: `${gap}vh` }}
      />
    )}
  </>
);

/** Sticky slot without scroll scrub — no useScroll cost */
const WorkCardPlain = ({ work, index, total, simplify }) => {
  const isLast = index === total - 1;
  const gap = coverGap(index, total, !!simplify);

  return (
    <CardSlot isLast={isLast} index={index} gap={gap}>
      <WorkCardShell work={work} index={index} />
    </CardSlot>
  );
};

/** Desktop scrub only while a later card is covering this one */
const WorkCardTracked = ({ work, index, total }) => {
  const cardRef = useRef(null);
  const gap = coverGap(index, total, false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 1], [1, 1, 0.97]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0, 0, 0.22],
  );

  return (
    <CardSlot isLast={false} index={index} gap={gap} cardRef={cardRef}>
      <WorkCardShell
        work={work}
        index={index}
        scaleStyle={{ scale }}
        overlayOpacity={overlayOpacity}
        showOverlay
      />
    </CardSlot>
  );
};

const WorkCard = ({ work, index, total }) => {
  const { simplify, reduceMotion } = useSimplifyMotion();
  const trackScroll = !simplify && !reduceMotion && index < total - 2;

  if (trackScroll) {
    return <WorkCardTracked work={work} index={index} total={total} />;
  }

  return (
    <WorkCardPlain
      work={work}
      index={index}
      total={total}
      simplify={simplify || reduceMotion}
    />
  );
};

const PortfolioGrid = () => {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return portfolioWorks;
    return portfolioWorks.filter((w) => w.industry === filter);
  }, [filter]);

  return (
    <section className="site-folio section-surface">
      <div className="site-folio-intro">
        <div className="container-custom">
          <Reveal>
            <div className="mb-8 flex flex-col gap-6 border-b border-[var(--border-subtle)] pb-8 md:mb-10 md:flex-row md:items-end md:justify-between md:pb-10">
              <div>
                <p className="label-premium mb-4">Case studies</p>
                <h2 className="site-folio-title font-display">
                  Archive
                  <span className="block text-[var(--text-muted)]">
                    {String(filtered.length).padStart(2, "0")} projects
                  </span>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)] md:text-right">
                Filter by industry. Scroll the stack — each case covers the last.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="flex flex-wrap gap-2 md:gap-3"
              role="tablist"
              aria-label="Filter by industry"
            >
              {portfolioFilters.map((item) => {
                const active = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(item)}
                    className={`border-b px-1 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                      active
                        ? "border-[var(--ink)] text-[var(--ink)]"
                        : "border-transparent text-[var(--text-muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="site-folio-deck" key={filter}>
        {filtered.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            index={index}
            total={filtered.length}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
