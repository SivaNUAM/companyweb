import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Reveal from "../ui/Reveal";
import { process, processSection } from "../../data/home";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const AUTO_MS = 4200;

const HowWeWork = () => {
  const { reduceMotion, simplify, freezeLoops, ease } = useSimplifyMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = process[active] || process[0];

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % process.length);
    }, simplify ? AUTO_MS + 1200 : AUTO_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused, active, simplify]);

  return (
    <section
      className="site-hww section-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.2]" />

      {/* Atmosphere — static on mobile (animated blurs are a major jank source) */}
      {!simplify && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-[var(--accent)]/[0.07] blur-[120px]"
            animate={
              freezeLoops
                ? undefined
                : { x: [0, 40, 0], y: [0, 30, 0], opacity: [0.5, 0.85, 0.5] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-1/4 bottom-0 h-[55%] w-[55%] rounded-full bg-white/[0.04] blur-[100px]"
            animate={
              freezeLoops
                ? undefined
                : { x: [0, -30, 0], opacity: [0.3, 0.55, 0.3] }
            }
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Softened watermark step */}
      <AnimatePresence mode="wait">
        <motion.span
          key={current.step}
          aria-hidden
          className="site-hww-mark"
          initial={reduceMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.7, ease }}
        >
          {current.step}
        </motion.span>
      </AnimatePresence>

      <div className="site-hww-inner container-custom">
        <Reveal>
          <div className="site-hww-head">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium !text-white/40">
                  {processSection.label}
                </p>
              </div>
              <h2 className="site-hww-title font-display">
                {processSection.title[0]}
                <span
                  className="block text-transparent"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.28)",
                  }}
                >
                  {processSection.title[1]}
                </span>
              </h2>
            </div>
            <p className="site-hww-support">{processSection.support}</p>
          </div>
        </Reveal>

        {/* Progress spine */}
        <div className="relative mb-10 hidden md:block">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
          <motion.div
            className="absolute left-0 top-1/2 h-px origin-left -translate-y-1/2 bg-[var(--accent)]"
            initial={false}
            animate={{
              scaleX: (active + 1) / process.length,
            }}
            transition={{ duration: 0.55, ease }}
            style={{ width: "100%" }}
          />
          <div className="relative grid grid-cols-4">
            {process.map((item, i) => {
              const done = i <= active;
              return (
                <button
                  key={`node-${item.step}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex justify-start first:justify-start"
                  aria-label={`Step ${item.step}: ${item.title}`}
                >
                  <span
                    className={`relative flex h-3 w-3 items-center justify-center rounded-full border transition-all duration-500 ${
                      done
                        ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_20px_rgba(107,138,255,0.55)]"
                        : "border-white/25 bg-ink"
                    }`}
                  >
                    {i === active && !freezeLoops && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-[var(--accent)]"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 2.4, opacity: 0 }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="site-hww-grid">
          {/* Step list — first for tap UX */}
          <ul className="site-hww-list flex flex-col">
            {process.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.step} className="relative">
                  {isActive &&
                    (simplify ? (
                      <span className="absolute left-0 top-0 hidden h-full w-[2px] bg-[var(--accent)] lg:block" />
                    ) : (
                      <motion.span
                        layoutId="hww-active-bar"
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
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="site-hww-step-btn group"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`mt-1 font-display text-[0.7rem] font-semibold tracking-[0.28em] transition-colors duration-300 ${
                        isActive ? "text-[var(--accent)]" : "text-white/25"
                      }`}
                    >
                      {item.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span
                        className={`font-display block text-xl font-bold tracking-[-0.03em] transition-colors duration-300 md:text-2xl ${
                          isActive
                            ? "text-white"
                            : "text-white/35 group-hover:text-white/65"
                        }`}
                      >
                        {item.title}
                      </span>
                      <div className="overflow-hidden">
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.p
                              key={item.step}
                              initial={
                                reduceMotion
                                  ? false
                                  : { opacity: 0, height: 0 }
                              }
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease }}
                              className="pt-2 text-sm leading-relaxed text-white/50 md:text-[0.95rem]"
                            >
                              {item.body}
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

          {/* Featured stage */}
          <div className="site-hww-stage-wrap">
            <div className="site-hww-stage">
              {/* Film corners */}
              <span className="pointer-events-none absolute left-4 top-4 z-20 h-7 w-7 border-l border-t border-white/30" />
              <span className="pointer-events-none absolute right-4 top-4 z-20 h-7 w-7 border-r border-t border-white/30" />
              <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-7 w-7 border-b border-l border-white/30" />
              <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-7 w-7 border-b border-r border-white/30" />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(107,138,255,0.18),transparent_55%)]"
              />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />

              {/* Auto progress */}
              {!reduceMotion && (
                <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-white/10">
                  <motion.div
                    key={`bar-${active}-${paused}`}
                    className="h-full origin-left bg-[var(--accent)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{
                      duration: paused ? 0 : AUTO_MS / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.step}
                  className="site-hww-stage-body"
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-[0.65rem] font-semibold tracking-[0.24em] text-[var(--accent)]">
                      GATE {current.step} / 0{process.length}
                    </p>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/30">
                      Process
                    </span>
                  </div>

                  <div>
                    <motion.h3
                      className="site-hww-stage-title font-display"
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 20 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.05, ease }}
                    >
                      {current.title}
                    </motion.h3>
                    <motion.p
                      className="mt-5 max-w-md text-base leading-relaxed text-white/55 md:text-lg"
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 12 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.12, ease }}
                    >
                      {current.body}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
