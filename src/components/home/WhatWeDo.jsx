import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { services, servicesSection } from "../../data/home";

const ease = [0.16, 1, 0.3, 1];
/** Viewport height per capability — keep short so scroll doesn’t feel stuck */
const STEP_VH = 42;

const WhatWeDo = () => {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [segment, setSegment] = useState(0);
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
    setActiveIndex(index);
    setSegment(raw - index);
  });

  useEffect(() => {
    services.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const jumpTo = (index) => {
    const el = trackRef.current;
    if (!el) {
      setActiveIndex(index);
      return;
    }
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const trackHeight = el.offsetHeight;
    const target =
      top + (index / services.length) * trackHeight + 4;
    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
    setActiveIndex(index);
  };

  const panel = (
    <div className="grid h-full items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14">
      {/* List */}
      <div className="lg:col-span-5">
        <ul className="relative">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const number = String(index + 1).padStart(2, "0");

            return (
              <li
                key={service.id}
                className="relative border-b border-white/10 first:border-t"
              >
                {isActive && (
                  <motion.span
                    layoutId="wwd-scroll-bar"
                    className="absolute left-0 top-0 hidden h-full w-[2px] bg-[var(--accent)] lg:block"
                    transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  />
                )}

                <button
                  type="button"
                  onClick={() => jumpTo(index)}
                  className="group flex w-full items-start gap-4 py-4 pl-0 text-left lg:pl-5 md:py-5"
                  aria-pressed={isActive}
                >
                  <span
                    className={`mt-1 font-display text-[0.65rem] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                      isActive ? "text-[var(--accent)]" : "text-white/25"
                    }`}
                  >
                    {number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-display text-lg font-semibold tracking-tight transition-colors duration-300 md:text-xl xl:text-2xl ${
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

      {/* Media */}
      <div className="relative hidden lg:col-span-7 lg:block">
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-white/[0.04] xl:aspect-[16/11] xl:max-h-[min(62vh,34rem)]">
          <span className="pointer-events-none absolute left-4 top-4 z-20 h-7 w-7 border-l border-t border-white/25" />
          <span className="pointer-events-none absolute right-4 top-4 z-20 h-7 w-7 border-r border-t border-white/25" />
          <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-7 w-7 border-b border-l border-white/25" />
          <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-7 w-7 border-b border-r border-white/25" />

          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={activeService.id}
              src={activeService.image}
              alt={activeService.title}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.06 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.32, ease }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeService.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease }}
              >
                <p className="font-display text-[0.65rem] font-semibold tracking-[0.22em] text-[var(--accent)]">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(services.length).padStart(2, "0")} — CAPABILITY
                </p>
                <p className="mt-2 font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  {activeService.title}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex gap-1.5">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/15"
                  aria-label={s.title}
                >
                  <motion.span
                    className="block h-full origin-left bg-[var(--accent)]"
                    initial={false}
                    animate={{
                      scaleX:
                        i < activeIndex ? 1 : i === activeIndex ? segment : 0,
                    }}
                    transition={{ duration: 0.12, ease: "linear" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Reduced motion: normal static section, click to switch
  if (reduceMotion) {
    return (
      <section className="relative section-ink section-padding overflow-hidden">
        <div className="container-custom relative">
          <HeaderBlock />
          <div className="mt-12 md:mt-16">{panel}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative section-ink overflow-visible">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/10 blur-[100px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.12]" />
      </div>

      {/* Header scrolls away normally */}
      <div className="container-custom relative section-padding !pb-8 md:!pb-10">
        <HeaderBlock />
      </div>

      {/* Scroll track — progress drives active capability */}
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${services.length * STEP_VH}vh` }}
      >
        <div
          className="sticky top-[calc(var(--nav-height)+0.5rem)] flex items-center"
          style={{ height: "calc(100svh - var(--nav-height) - 1rem)" }}
        >
          <div className="container-custom w-full pb-8">{panel}</div>
        </div>
      </div>
    </section>
  );
};

const HeaderBlock = () => (
  <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between md:pb-12">
    <Reveal>
      <p className="label-premium !text-white/35">{servicesSection.label}</p>
      <h2 className="font-display mt-3 max-w-[10ch] text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em] text-white">
        {servicesSection.title}
      </h2>
    </Reveal>
    <Reveal delay={0.08}>
      <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
        <p className="max-w-xs text-sm leading-relaxed text-white/45">
          Scroll to move through each capability — or tap any title to jump.
        </p>
        <Link
          to={servicesSection.cta.to}
          className="group inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
