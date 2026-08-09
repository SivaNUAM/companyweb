import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { services, servicesSection } from "../../data/home";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const WhatWeDo = () => {
  const { reduceMotion, simplify, ease } = useSimplifyMotion();
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [segment, setSegment] = useState(0);
  const lastIndex = useRef(-1);
  const lastSegQ = useRef(-1);
  const activeService = services[activeIndex] || services[0];

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduceMotion) return;
    const n = services.length;
    const raw = Math.min(0.9999, Math.max(0, v)) * n;
    const index = Math.min(n - 1, Math.floor(raw));
    const seg = raw - index;

    if (simplify) {
      const q = Math.floor(seg * 6);
      if (index === lastIndex.current && q === lastSegQ.current) return;
      lastIndex.current = index;
      lastSegQ.current = q;
    }

    setActiveIndex((prev) => (prev === index ? prev : index));
    setSegment(seg);
  });

  // Preload current + next only
  useEffect(() => {
    const next = services[(activeIndex + 1) % services.length];
    [activeService, next].forEach((s) => {
      if (!s?.image) return;
      const img = new Image();
      img.src = s.image;
    });
  }, [activeIndex, activeService]);

  const jumpTo = (index) => {
    const el = trackRef.current;
    if (!el) {
      setActiveIndex(index);
      return;
    }
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const trackHeight = el.offsetHeight;
    const target = top + (index / services.length) * trackHeight + 4;
    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveIndex(index);
  };

  const renderMedia = () => (
    <>
      <span className="pointer-events-none absolute left-3 top-3 z-20 h-5 w-5 border-l border-t border-white/25 sm:left-4 sm:top-4 sm:h-7 sm:w-7" />
      <span className="pointer-events-none absolute right-3 top-3 z-20 h-5 w-5 border-r border-t border-white/25 sm:right-4 sm:top-4 sm:h-7 sm:w-7" />
      <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-5 w-5 border-b border-l border-white/25 sm:bottom-4 sm:left-4 sm:h-7 sm:w-7" />
      <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-5 w-5 border-b border-r border-white/25 sm:bottom-4 sm:right-4 sm:h-7 sm:w-7" />

      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={activeService.id}
          src={activeService.image}
          alt={activeService.title}
          initial={
            reduceMotion || simplify
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.06 }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={
            reduceMotion || simplify
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.02 }
          }
          transition={{
            duration: reduceMotion ? 0.15 : simplify ? 0.22 : 0.32,
            ease,
          }}
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 md:p-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeService.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
          >
            <p className="font-display text-[0.6rem] font-semibold tracking-[0.22em] text-[var(--accent)] sm:text-[0.65rem]">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(services.length).padStart(2, "0")} — CAPABILITY
            </p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-white sm:mt-2 sm:text-xl md:text-2xl">
              {activeService.title}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex gap-1.5 sm:mt-5">
          {services.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => jumpTo(i)}
              className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/15"
              aria-label={s.title}
            >
              <span
                className="block h-full origin-left bg-[var(--accent)] will-change-transform"
                style={{
                  transformOrigin: "left center",
                  transform: `scaleX(${
                    i < activeIndex ? 1 : i === activeIndex ? segment : 0
                  })`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const panel = (
    <div className="site-wwd-panel">
      <div className="site-wwd-media-mobile">{renderMedia()}</div>

      <div className="site-wwd-list-wrap site-wwd-list">
        <ul className="relative">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const number = String(index + 1).padStart(2, "0");

            return (
              <li
                key={service.id}
                className="relative border-b border-white/10 first:border-t"
              >
                {isActive &&
                  (simplify ? (
                    <span className="absolute left-0 top-0 hidden h-full w-[2px] bg-[var(--accent)] lg:block" />
                  ) : (
                    <motion.span
                      layoutId="wwd-scroll-bar"
                      className="absolute left-0 top-0 hidden h-full w-[2px] bg-[var(--accent)] lg:block"
                      transition={{
                        type: "spring",
                        stiffness: 480,
                        damping: 38,
                      }}
                    />
                  ))}

                <button
                  type="button"
                  className="group"
                  onClick={() => jumpTo(index)}
                  aria-pressed={isActive}
                >
                  <span
                    className={`mt-1 font-display text-[0.6rem] font-semibold tracking-[0.2em] transition-colors duration-300 sm:text-[0.65rem] ${
                      isActive ? "text-[var(--accent)]" : "text-white/25"
                    }`}
                  >
                    {number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`site-wwd-list-title font-display tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-white/40 group-hover:text-white/70"
                        }`}
                      >
                        {service.title}
                      </span>
                      <motion.span
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -6,
                        }}
                        transition={{ duration: 0.22, ease }}
                        className="shrink-0 text-[var(--accent)]"
                      >
                        <ArrowUpRight size={17} />
                      </motion.span>
                    </div>

                    <div className="overflow-hidden">
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            key={service.id}
                            initial={
                              reduceMotion ? false : { opacity: 0, height: 0 }
                            }
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease }}
                            className="pt-1.5 text-sm leading-relaxed text-white/50"
                          >
                            {service.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="site-wwd-media-desktop">
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-white/[0.04] xl:aspect-[16/11] xl:max-h-[min(62vh,34rem)]">
          {renderMedia()}
        </div>
      </div>
    </div>
  );

  if (reduceMotion) {
    return (
      <section className="site-wwd section-ink">
        <div className="container-custom relative">
          <div className="site-wwd-intro !px-0">
            <HeaderBlock />
          </div>
          <div className="mt-8 px-[var(--site-gutter)] pb-12 md:mt-12 md:pb-16">
            {panel}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="site-wwd section-ink">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/10 blur-[100px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.12]" />
      </div>

      <div className="container-custom relative site-wwd-intro">
        <HeaderBlock />
      </div>

      <div
        ref={trackRef}
        className="site-wwd-track"
        style={{ ["--wwd-steps"]: String(services.length) }}
      >
        <div className="site-wwd-sticky">
          <div className="site-wwd-sticky-inner container-custom px-[var(--site-gutter)]">
            {panel}
          </div>
        </div>
      </div>
    </section>
  );
};

const HeaderBlock = () => (
  <div className="site-wwd-intro-row">
    <Reveal>
      <p className="label-premium !text-white/35">{servicesSection.label}</p>
      <h2 className="site-wwd-title font-display">{servicesSection.title}</h2>
    </Reveal>
    <Reveal delay={0.08}>
      <div className="flex flex-col items-start gap-3 sm:gap-4 md:items-end">
        <p className="site-wwd-support">
          Scroll to move through each capability — or tap any title to jump.
        </p>
        <Link
          to={servicesSection.cta.to}
          className="group inline-flex min-h-11 items-center gap-2 border-b border-white/30 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:min-h-0 sm:text-[0.7rem]"
        >
          {servicesSection.cta.label}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </Reveal>
  </div>
);

export default WhatWeDo;
