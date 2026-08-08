import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Reveal from "../ui/Reveal";
import { voices, voicesSection } from "../../data/home";

const ease = [0.16, 1, 0.3, 1];
const ROTATE_MS = 6200;

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Voices = () => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const voice = voices[index] || voices[0];

  useEffect(() => {
    if (reduceMotion || paused || voices.length < 2) return undefined;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % voices.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused, index]);

  const goTo = (next) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const variants = {
    enter: (dir) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: dir > 0 ? 28 : -28 },
    center: { opacity: 1, y: 0 },
    exit: (dir) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, y: dir > 0 ? -20 : 20 },
  };

  return (
    <section
      className="site-voices section-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.18]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[50%] w-[80%] -translate-x-1/2 rounded-full bg-[var(--accent)]/[0.08] blur-[130px]"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Softened quote mark */}
      <motion.span
        aria-hidden
        className="site-voices-mark"
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
      >
        “
      </motion.span>

      <div className="site-voices-inner container-custom">
        <Reveal>
          <div className="site-voices-head">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium !text-white/40">
                  {voicesSection.label}
                </p>
              </div>
              <h2 className="site-voices-title font-display">
                {voicesSection.title[0]}
                <span
                  className="block text-transparent"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.28)",
                  }}
                >
                  {voicesSection.title[1]}
                </span>
              </h2>
            </div>
            <p className="site-voices-support">{voicesSection.support}</p>
          </div>
        </Reveal>

        <div className="site-voices-grid">
          {/* Quote stage — first on mobile */}
          <div className="site-voices-stage-wrap">
            <div className="site-voices-stage">
              <span className="pointer-events-none absolute left-4 top-4 z-20 h-6 w-6 border-l border-t border-white/25" />
              <span className="pointer-events-none absolute right-4 top-4 z-20 h-6 w-6 border-r border-t border-white/25" />
              <span className="pointer-events-none absolute bottom-4 left-4 z-20 h-6 w-6 border-b border-l border-white/25" />
              <span className="pointer-events-none absolute bottom-4 right-4 z-20 h-6 w-6 border-b border-r border-white/25" />

              {!reduceMotion && (
                <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-white/10">
                  <motion.div
                    key={`voice-bar-${index}-${paused}`}
                    className="h-full origin-left bg-[var(--accent)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{
                      duration: paused ? 0 : ROTATE_MS / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              <div className="site-voices-stage-body">
                <p className="mb-6 font-display text-[0.65rem] font-semibold tracking-[0.24em] text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(voices.length).padStart(2, "0")} — TESTIMONIAL
                </p>

                <div className="relative min-h-[10rem] md:min-h-[12rem]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.blockquote
                      key={voice.id}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease }}
                      className="m-0"
                    >
                      <p className="site-voices-quote font-display">
                        {voice.quote}
                      </p>
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.footer
                    key={`meta-${voice.id}`}
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 font-display text-sm font-bold tracking-wide text-[var(--accent)]">
                      {initials(voice.name)}
                    </span>
                    <cite className="not-italic">
                      <span className="block text-sm font-semibold tracking-wide text-white">
                        {voice.name}
                      </span>
                      <span className="mt-1 block text-sm text-white/40">
                        {voice.role}
                      </span>
                    </cite>
                  </motion.footer>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Picker */}
          <div className="site-voices-picker-wrap">
            <div className="site-voices-picker flex flex-col gap-1">
              {voices.map((item, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(i)}
                    onMouseEnter={() => goTo(i)}
                    className="group relative"
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="voice-picker-glow"
                        className="absolute inset-0 bg-white/[0.04]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 36,
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 font-display text-[0.65rem] font-semibold tracking-[0.2em] transition-colors ${
                        isActive ? "text-[var(--accent)]" : "text-white/25"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="relative z-10 min-w-0 flex-1">
                      <span
                        className={`block font-display text-base font-bold tracking-[-0.02em] transition-colors md:text-lg ${
                          isActive
                            ? "text-white"
                            : "text-white/35 group-hover:text-white/70"
                        }`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`mt-1 block truncate text-[0.7rem] transition-colors ${
                          isActive ? "text-white/45" : "text-white/25"
                        }`}
                      >
                        {item.role}
                      </span>
                    </span>

                    <motion.span
                      aria-hidden
                      className="relative z-10 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.25 }}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/25">
              <span className="md:hidden">Tap to switch</span>
              <span className="hidden md:inline">Hover or tap to switch</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voices;
