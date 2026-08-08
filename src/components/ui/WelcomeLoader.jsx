import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  animate,
  useReducedMotion,
} from "framer-motion";
import BrandLogo from "./BrandLogo";

const ease = [0.76, 0, 0.24, 1];
const SESSION_KEY = "nuam-welcome-seen";

/**
 * Standard agency preloader — logo, counter, line, slide-up reveal.
 * Runs once per browser session.
 */
const WelcomeLoader = ({ onDone }) => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("load"); // load | exit | gone
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      setPhase("gone");
      onDone?.();
      return undefined;
    }

    document.documentElement.classList.add("welcome-loading");

    const duration = reduceMotion ? 0.9 : 2.4;
    const controls = animate(progress, 100, {
      duration,
      ease: [0.45, 0, 0.15, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        window.setTimeout(() => setPhase("exit"), reduceMotion ? 80 : 320);
      },
    });

    return () => {
      controls.stop();
      document.documentElement.classList.remove("welcome-loading");
    };
  }, [onDone, progress, reduceMotion]);

  useEffect(() => {
    if (phase !== "exit") return undefined;

    // Unlock the page as soon as the slide-up starts so the real UI
    // is already painted underneath (no white flash).
    onDone?.();

    const exitMs = reduceMotion ? 300 : 900;
    const t = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.documentElement.classList.remove("welcome-loading");
      setVisible(false);
      setPhase("gone");
    }, exitMs);
    return () => clearTimeout(t);
  }, [phase, onDone, reduceMotion]);

  if (!visible && phase === "gone") return null;

  const exiting = phase === "exit";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-[var(--ink)] text-white"
          role="status"
          aria-live="polite"
          aria-label="Loading Nuam Technologies"
          initial={{ y: "0%" }}
          animate={exiting ? { y: "-100%" } : { y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduceMotion ? 0.35 : 0.85, ease }}
        >
          {/* Top */}
          <div className="flex items-center justify-between px-6 pt-7 md:px-10 md:pt-9 lg:px-14">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <BrandLogo
                tone="light"
                size="header"
                className="!h-9 !w-auto md:!h-11"
              />
            </motion.div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white/35">
              Loading
            </p>
          </div>

          {/* Center logo */}
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.25 : 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: reduceMotion ? 0 : 0.1,
              }}
            >
              <BrandLogo tone="light" size="loader" />

              <motion.div
                className="mt-6 h-px w-12 origin-center bg-[var(--accent)] md:mt-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              <motion.p
                className="mt-5 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-white/40 md:mt-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.5, duration: 0.45 }}
              >
                Technologies
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom */}
          <div className="px-6 pb-8 md:px-10 md:pb-10 lg:px-14">
            <div className="mb-4 flex items-end justify-between">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
                Please wait
              </p>
              <p className="font-display text-[clamp(2rem,6vw,3.25rem)] font-bold leading-none tracking-[-0.04em] tabular-nums">
                {String(count).padStart(2, "0")}
                <span className="text-[0.45em] font-semibold text-[var(--accent)]">
                  %
                </span>
              </p>
            </div>

            <div className="h-[2px] w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full origin-left bg-white"
                style={{ scaleX: count / 100 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeLoader;
