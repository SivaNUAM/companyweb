import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { serviceOfferings } from "../../data/services";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

/** Soft cinematic open — decelerates into rest */
const openEase = [0.16, 1, 0.3, 1];

const ServiceMedia = ({ service, number, reverse }) => {
  const { reduceMotion, simplify } = useSimplifyMotion();
  const frameRef = useRef(null);
  const inView = useInView(frameRef, {
    amount: simplify ? 0.28 : 0.4,
    once: true,
    margin: "0px 0px -6% 0px",
  });

  const open = reduceMotion || inView;
  const doorDuration = simplify ? 0.7 : 1.15;
  const imgDuration = simplify ? 0.85 : 1.45;

  return (
    <div
      className={`lg:col-span-6 ${reverse ? "lg:order-2" : "lg:order-1"}`}
    >
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-2xl bg-ink shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/11]">
          <div className="h-full w-full overflow-hidden transition-transform duration-[1.2s] ease-expo will-change-transform group-hover/row:scale-[1.03]">
            <motion.img
              src={service.image}
              alt=""
              aria-hidden
              className="site-svc-media-img h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 100vw, 50vw"
              initial={
                reduceMotion
                  ? false
                  : {
                      scale: simplify ? 1.08 : 1.14,
                      opacity: 0.55,
                      filter: simplify ? "blur(2px)" : "blur(6px)",
                    }
              }
              animate={
                open
                  ? {
                      scale: 1.04,
                      opacity: 1,
                      filter: "blur(0px)",
                    }
                  : undefined
              }
              transition={{
                duration: imgDuration,
                ease: openEase,
              }}
            />
          </div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-tr from-ink/55 via-transparent to-[var(--accent)]/10"
            initial={false}
            animate={{ opacity: 1 }}
          />
          <div className="noise-overlay pointer-events-none absolute inset-0 z-[6] opacity-25" />

          {/* Center accent flash as doors part */}
          {!reduceMotion && (
            <motion.span
              aria-hidden
              className="site-svc-door-seam pointer-events-none absolute inset-y-0 left-1/2 z-[25] w-px -translate-x-1/2"
              initial={{ opacity: 0.85, scaleY: 0.45 }}
              animate={
                open
                  ? { opacity: [0.9, 0.35, 0], scaleY: [0.45, 1, 1] }
                  : undefined
              }
              transition={{
                duration: doorDuration * 0.85,
                ease: openEase,
                times: [0, 0.35, 1],
              }}
            />
          )}

          {/* Dual doors — open once on enter */}
          {!reduceMotion && (
            <>
              <motion.div
                aria-hidden
                className="site-svc-door site-svc-door-left pointer-events-none absolute inset-y-0 left-0 z-20 w-[52%]"
                initial={{ x: "0%" }}
                animate={open ? { x: "-101%" } : undefined}
                transition={{
                  duration: doorDuration,
                  ease: openEase,
                }}
              >
                <span className="site-svc-door-edge site-svc-door-edge-left" />
              </motion.div>
              <motion.div
                aria-hidden
                className="site-svc-door site-svc-door-right pointer-events-none absolute inset-y-0 right-0 z-20 w-[52%]"
                initial={{ x: "0%" }}
                animate={open ? { x: "101%" } : undefined}
                transition={{
                  duration: doorDuration,
                  ease: openEase,
                  delay: simplify ? 0.05 : 0.09,
                }}
              >
                <span className="site-svc-door-edge site-svc-door-edge-right" />
              </motion.div>
            </>
          )}

          {/* Corners */}
          <span className="pointer-events-none absolute left-4 top-4 z-30 h-7 w-7 border-l border-t border-white/30" />
          <span className="pointer-events-none absolute right-4 top-4 z-30 h-7 w-7 border-r border-t border-white/30" />
          <span className="pointer-events-none absolute bottom-4 left-4 z-30 h-7 w-7 border-b border-l border-white/30" />
          <span className="pointer-events-none absolute bottom-4 right-4 z-30 h-7 w-7 border-b border-r border-white/30" />

          <motion.div
            className="absolute left-5 top-5 z-30 flex items-center gap-3 md:left-6 md:top-6"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={open ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: simplify ? 0.4 : 0.65,
              ease: openEase,
              delay: open ? doorDuration * 0.35 : 0,
            }}
          >
            <span className="font-display text-sm font-bold tracking-[0.2em] text-white/80">
              {number}
            </span>
            <span className="h-px w-8 bg-[var(--accent)]" />
          </motion.div>

          <motion.span
            aria-hidden
            className="site-svc-ghost z-10 select-none"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={open ? { opacity: 1, scale: 1 } : undefined}
            transition={{
              duration: simplify ? 0.45 : 0.75,
              ease: openEase,
              delay: open ? doorDuration * 0.25 : 0,
            }}
          >
            {number}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

const ServiceRow = ({ service, index }) => {
  const number = String(index + 1).padStart(2, "0");
  const reverse = index % 2 === 1;

  return (
    <Reveal delay={Math.min(index * 0.04, 0.16)} amount={0.18}>
      <article
        id={service.id}
        className="site-svc-row group/row scroll-mt-28 border-t border-[var(--border-subtle)]"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <ServiceMedia
            service={service}
            number={number}
            reverse={reverse}
          />

          {/* Copy */}
          <div
            className={`lg:col-span-6 ${reverse ? "lg:order-1" : "lg:order-2"}`}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Capability {number}
            </p>
            <h2 className="site-svc-copy-title font-display mt-3 leading-[1.05]">
              {service.title}
            </h2>
            <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-[var(--text-muted)] md:text-[0.95rem]">
              {service.tagline}
            </p>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-[var(--text-secondary)] md:text-base">
              {service.body}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--border-subtle)] bg-white px-3.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.1em] text-[var(--text-secondary)] transition-colors group-hover/row:border-[var(--accent)]/40"
                >
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
            >
              <span className="border-b border-[var(--ink)] pb-1 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                Start this engagement
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-all duration-500 ease-expo group-hover:translate-x-0.5 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const ServicesList = () => {
  return (
    <section className="site-svc-list section-surface section-padding !pt-12 md:!pt-16">
      <div className="container-custom">
        <Reveal>
          <div className="mb-6 flex flex-col gap-6 border-b border-[var(--border-subtle)] pb-12 md:mb-4 md:flex-row md:items-end md:justify-between md:pb-14">
            <div>
              <p className="label-premium mb-4">Offerings</p>
              <h2 className="site-svc-list-title font-display">
                Six ways we
                <span className="block text-[var(--text-muted)]">
                  create leverage.
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)] md:text-right">
              Mix and match — most corporate clients engage across two or more
              capabilities.
            </p>
          </div>
        </Reveal>

        {/* Desktop sticky mini-index */}
        <div className="mb-8 hidden gap-2 overflow-x-auto pb-2 lg:flex">
          {serviceOfferings.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-[0.65rem] font-semibold tracking-wide text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--ink)]"
            >
              {String(i + 1).padStart(2, "0")} · {s.title}
            </a>
          ))}
        </div>

        {serviceOfferings.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
