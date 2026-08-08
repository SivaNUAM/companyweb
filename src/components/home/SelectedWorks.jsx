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

/** Scroll gap before the next card covers this one — short + hard taper so Lenis doesn’t stick */
const coverGap = (index, total) => {
  if (index >= total - 1) return 0;
  const fromEnd = total - 1 - index;
  if (fromEnd === 1) return 5;
  if (fromEnd === 2) return 7;
  if (fromEnd === 3) return 9;
  const base = 16 - index * 2;
  return Math.max(8, base);
};

/**
 * Classic sticky deck: each card is sticky at the same top.
 * Gaps live on SEPARATE spacer nodes (not margin on sticky) — fixes end-of-stack stuck.
 */
const WorkCard = ({ work, index, total }) => {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const isLast = index === total - 1;
  const gap = coverGap(index, total);
  const trackScroll = !reduceMotion && !isLast && index < total - 2;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    trackScroll ? [1, 1, 0.97] : [1, 1, 1],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    trackScroll ? [0, 0, 0.22] : [0, 0, 0],
  );

  return (
    <>
      <div
        ref={cardRef}
        className={`site-works-card-slot ${isLast ? "relative" : "sticky"}`}
        style={{
          top: isLast ? undefined : STICKY_TOP,
          zIndex: index + 1,
        }}
      >
        <motion.div
          style={trackScroll ? { scale } : undefined}
          className="origin-center"
        >
          <Link
            to="/portfolio"
            className="group relative block outline-none"
            aria-label={`${work.client} — ${work.industry}`}
          >
            <article className="site-works-card relative">
              <div className="site-works-media">
                <img
                  src={work.image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04]"
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
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

                {trackScroll && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-black"
                    style={{ opacity: overlayOpacity }}
                  />
                )}
              </div>

              <div className="site-works-body">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <span className="font-display text-xs font-semibold tracking-[0.2em] text-white/45 sm:text-sm md:text-base">
                    {number}
                  </span>
                  <span className="label-premium !text-white/50 transition-colors duration-300 group-hover:!text-[var(--accent)]">
                    {work.industry}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4 sm:gap-6">
                  <div className="min-w-0 max-w-3xl">
                    <h3 className="site-works-client font-display transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                      {work.client}
                    </h3>

                    <div className="mt-2 h-px w-0 bg-[var(--accent)] transition-all duration-500 ease-expo group-hover:w-16 sm:mt-3" />

                    <p className="site-works-desc">{work.title}</p>
                  </div>

                  <span className="site-works-arrow transition-all duration-500 ease-expo group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
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
};

const SelectedWorks = () => {
  return (
    <section className="site-works section-surface" id="works">
      <div className="site-works-intro container-custom">
        <div className="site-works-intro-row">
          <Reveal>
            <p className="label-premium mb-3 sm:mb-4">{worksSection.label}</p>
            <h2 className="site-works-title font-display">
              {worksSection.title[0]}
              <span className="block text-[var(--text-muted)]">
                {worksSection.title[1]}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="site-works-aside flex flex-col items-start gap-3 sm:gap-4">
              <p className="site-works-support">{worksSection.support}</p>
              <Link
                to={worksSection.cta.to}
                className="group inline-flex min-h-11 items-center gap-2 border-b border-[var(--ink)] pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-55 sm:min-h-0 sm:text-[0.7rem]"
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

      <div className="site-works-deck">
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
