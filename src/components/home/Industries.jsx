import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Reveal from "../ui/Reveal";
import { industries, industriesSection } from "../../data/home";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const AUTO_MS = 4800;

const Industries = () => {
  const { reduceMotion, simplify, ease } = useSimplifyMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = industries[active] || industries[0];

  useEffect(() => {
    const next = industries[(active + 1) % industries.length];
    [current, next].forEach((item) => {
      if (!item?.image) return;
      const img = new Image();
      img.src = item.image;
    });
  }, [active, current]);

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % industries.length);
    }, simplify ? AUTO_MS + 1200 : AUTO_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused, active, simplify]);

  return (
    <section
      className="site-industries section-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft atmosphere wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/60 to-transparent"
      />

      <div className="relative">
        <Reveal>
          <div className="site-industries-head">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium">{industriesSection.label}</p>
              </div>
              <h2 className="site-industries-title font-display">
                {industriesSection.title[0]}
                <span className="block text-[var(--text-muted)]">
                  {industriesSection.title[1]}
                </span>
              </h2>
            </div>
            <p className="site-industries-support">{industriesSection.support}</p>
          </div>
        </Reveal>

        <div className="site-industries-grid">
          {/* Cinematic media — first on mobile */}
          <div className="site-industries-media-wrap">
            <div className="site-industries-media">
              {/* Film corners */}
              <span className="pointer-events-none absolute left-4 top-4 z-30 h-7 w-7 border-l border-t border-white/35" />
              <span className="pointer-events-none absolute right-4 top-4 z-30 h-7 w-7 border-r border-t border-white/35" />
              <span className="pointer-events-none absolute bottom-4 left-4 z-30 h-7 w-7 border-b border-l border-white/35" />
              <span className="pointer-events-none absolute bottom-4 right-4 z-30 h-7 w-7 border-b border-r border-white/35" />

              {!reduceMotion && (
                <div className="absolute left-0 right-0 top-0 z-30 h-[2px] bg-white/15">
                  <motion.div
                    key={`ind-bar-${active}-${paused}`}
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

              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={
                    reduceMotion || simplify
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.1 }
                  }
                  decoding="async"
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    reduceMotion || simplify
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.04 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.2 : simplify ? 0.35 : 0.75,
                    ease,
                  }}
                />
              </AnimatePresence>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.05) 35%, rgba(11,11,11,0.55) 70%, rgba(11,11,11,0.92) 100%)",
                }}
              />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />

              {/* Name watermark — contained, smaller on mobile */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`wm-${current.id}`}
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 select-none px-4 font-display text-[clamp(2.5rem,14vw,4rem)] font-extrabold leading-none tracking-[-0.05em] text-white/[0.07] md:px-6 md:text-[clamp(3rem,10vw,7rem)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {current.name.split(" ")[0]}
                </motion.p>
              </AnimatePresence>

              <div className="site-industries-media-copy">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 16 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <p className="font-display text-[0.65rem] font-semibold tracking-[0.24em] text-[var(--accent)]">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(industries.length).padStart(2, "0")} — SECTOR
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
                      {current.name}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-[0.95rem]">
                      {current.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Interactive list */}
          <div className="site-industries-list-wrap site-industries-list">
            <ul className="relative">
              {industries.map((item, i) => {
                const isActive = i === active;
                const number = String(i + 1).padStart(2, "0");

                return (
                  <li key={item.id} className="relative">
                    {isActive &&
                      (simplify ? (
                        <span className="absolute left-0 top-0 hidden h-full w-[2px] bg-[var(--accent)] lg:block" />
                      ) : (
                        <motion.span
                          layoutId="ind-active-bar"
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
                      className="group"
                      aria-pressed={isActive}
                    >
                      <span
                        className={`font-display shrink-0 text-[0.65rem] font-semibold tracking-[0.22em] transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--accent)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`site-industries-name font-display transition-colors duration-300 ${
                              isActive
                                ? "text-[var(--ink)]"
                                : "text-[var(--text-muted)] group-hover:text-[var(--ink)]"
                            }`}
                          >
                            {item.name}
                          </span>
                          <motion.span
                            aria-hidden
                            className="h-px shrink-0 bg-[var(--accent)]"
                            initial={false}
                            animate={{
                              width: isActive ? 36 : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{ duration: 0.4, ease }}
                          />
                        </div>

                        <div className="overflow-hidden">
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.p
                                key={item.id}
                                initial={
                                  reduceMotion
                                    ? false
                                    : { opacity: 0, height: 0 }
                                }
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.28, ease }}
                                className="pt-2 text-sm leading-relaxed text-[var(--text-secondary)]"
                              >
                                {item.detail}
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
        </div>
      </div>
    </section>
  );
};

export default Industries;
