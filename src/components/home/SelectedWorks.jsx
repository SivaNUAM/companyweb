import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { works, worksSection } from "../../data/home";

/** Shared pin line under the fixed header — every card sticks here */
const STICKY_TOP = "calc(var(--nav-height) + 0.75rem)";

/** Scroll gap before the next card covers this one — tapers so the end doesn’t drag */
const coverGap = (index, total) => {
  if (index >= total - 1) return 0;
  // Earlier cards: room to read; later cards: quicker handoff
  const base = 36 - index * 4;
  return Math.max(16, base);
};

/**
 * Classic sticky deck: each card is sticky at the same top.
 * Later cards (higher z-index) slide up and sit on top of earlier ones.
 * Last card is NOT sticky so the stack releases cleanly (no end-of-deck stuck feel).
 */
const WorkCard = ({ work, index, total }) => {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const isLast = index === total - 1;
  const gap = coverGap(index, total);

  // Progress while this card is pinned and the next one climbs over it
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    reduceMotion || isLast ? [1, 1, 1] : [1, 1, 0.95],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    reduceMotion || isLast ? [0, 0, 0] : [0, 0, 0.32],
  );

  return (
    <div
      ref={cardRef}
      className={`px-3 md:px-4 lg:px-5 ${isLast ? "relative" : "sticky"}`}
      style={{
        top: isLast ? undefined : STICKY_TOP,
        zIndex: index + 1,
        marginBottom: gap ? `${gap}vh` : undefined,
      }}
    >
      {/* Transform only on INNER content — never on the sticky node itself */}
      <motion.div
        style={reduceMotion ? undefined : { scale }}
        className="origin-center will-change-transform"
      >
        <Link
          to="/portfolio"
          className="group relative block outline-none"
          aria-label={`${work.client} — ${work.industry}`}
        >
          <article className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_24px_64px_rgba(0,0,0,0.35)] md:rounded-3xl">
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[2.1/1] lg:max-h-[min(68vh,38rem)]">
              <img
                src={work.image}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04]"
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
              />

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0.15) 0%, rgba(11,11,11,0.05) 40%, rgba(11,11,11,0.72) 78%, rgba(11,11,11,0.94) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 md:p-10 lg:p-12">
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-white/45 md:text-base">
                  {number}
                </span>
                <span className="label-premium !text-white/50 transition-colors duration-300 group-hover:!text-[var(--accent)]">
                  {work.industry}
                </span>
              </div>

              <div className="flex items-end justify-between gap-6">
                <div className="min-w-0 max-w-3xl">
                  <h3 className="font-display text-[clamp(1.65rem,3.8vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                    {work.client}
                  </h3>

                  <div className="mt-3 h-px w-0 bg-[var(--accent)] transition-all duration-500 ease-expo group-hover:w-16" />

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 transition-all duration-500 ease-expo md:text-base md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {work.title}
                  </p>
                </div>

                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 text-white transition-all duration-500 ease-expo group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] sm:h-14 sm:w-14">
                  <ArrowUpRight
                    size={20}
                    className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </div>

            <span className="pointer-events-none absolute inset-0 ring-0 ring-[var(--accent)] transition-[box-shadow] duration-300 group-focus-visible:ring-2" />
          </article>
        </Link>
      </motion.div>
    </div>
  );
};

const SelectedWorks = () => {
  return (
    <section className="section-surface" id="works">
      <div className="section-padding pb-8 md:pb-10">
        <div className="container-custom">
          <div className="flex flex-col gap-8 border-b border-[var(--border-subtle)] pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
            <Reveal>
              <p className="label-premium mb-4">{worksSection.label}</p>
              <h2 className="font-display max-w-2xl text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em]">
                {worksSection.title[0]}
                <span className="block text-[var(--text-muted)]">
                  {worksSection.title[1]}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
                <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)] md:text-[0.95rem]">
                  {worksSection.support}
                </p>
                <Link
                  to={worksSection.cta.to}
                  className="group inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-55"
                >
                  {worksSection.cta.label}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Sibling sticky cards = true deck stack */}
      <div className="relative pb-10 md:pb-16">
        {works.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            index={index}
            total={works.length}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;
