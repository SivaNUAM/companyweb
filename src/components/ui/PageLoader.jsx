import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import BrandLogo from "./BrandLogo";

const ease = [0.76, 0, 0.24, 1];
const easeOut = [0.16, 1, 0.3, 1];
const MIN_MS = 420;

const LABELS = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/portfolio": "Portfolio",
  "/careers": "Careers",
  "/contact": "Contact",
};

/**
 * Polished page-transition loader with logo.
 * Skips the first paint (WelcomeLoader handles that).
 */
const PageLoader = () => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const first = useRef(true);
  const [active, setActive] = useState(false);
  const [targetPath, setTargetPath] = useState(pathname);

  const label = useMemo(() => {
    if (LABELS[targetPath]) return LABELS[targetPath];
    const slug = targetPath.replace(/^\//, "").split("/")[0];
    return slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Nuam";
  }, [targetPath]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }

    setTargetPath(pathname);
    setActive(true);
    const ms = reduceMotion ? 180 : MIN_MS;
    const t = window.setTimeout(() => setActive(false), ms);
    return () => clearTimeout(t);
  }, [pathname, reduceMotion]);

  useEffect(() => {
    if (!active) return undefined;
    document.documentElement.classList.add("page-loading");
    return () => document.documentElement.classList.remove("page-loading");
  }, [active]);

  const hold = reduceMotion ? 0.15 : MIN_MS / 1000;

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={targetPath}
          className="fixed inset-0 z-[180] flex flex-col overflow-hidden bg-[var(--ink)] text-white"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${label}`}
          initial={{ y: "0%" }}
          animate={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: {
              duration: reduceMotion ? 0.2 : 0.4,
              ease,
            },
          }}
        >
          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/[0.12] blur-[100px]"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="noise-overlay absolute inset-0 opacity-[0.22]" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
              }}
            />
          </div>

          {/* Corners */}
          <div className="pointer-events-none absolute inset-5 md:inset-8">
            {[
              "left-0 top-0 border-l border-t",
              "right-0 top-0 border-r border-t",
              "left-0 bottom-0 border-l border-b",
              "right-0 bottom-0 border-r border-b",
            ].map((pos) => (
              <motion.span
                key={pos}
                className={`absolute h-5 w-5 border-white/25 md:h-7 md:w-7 ${pos}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              />
            ))}
          </div>

          {/* Top meta */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-7 md:px-10 md:pt-9">
            <motion.p
              className="font-display text-[0.65rem] font-semibold tracking-[0.28em] text-white/40"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              NUAM
            </motion.p>
            <motion.p
              className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white/30"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              Transition
            </motion.p>
          </div>

          {/* Center stage */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
            <motion.div
              className="flex flex-col items-center"
              initial={
                reduceMotion ? false : { opacity: 0, y: 16, scale: 0.94 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <div className="relative mb-7 flex h-28 w-28 items-center justify-center md:mb-8 md:h-32 md:w-32">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-white/10"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.55, ease: easeOut }}
                />
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-dashed border-[var(--accent)]/45"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.span
                  aria-hidden
                  className="absolute inset-0"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(107,138,255,0.8)]" />
                </motion.span>

                <BrandLogo
                  tone="light"
                  size="header"
                  className="relative z-10 !h-11 !w-auto md:!h-12"
                />
              </div>

              <motion.p
                className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {label}
              </motion.p>

              <div className="relative mt-5 h-[2px] w-24 overflow-hidden bg-white/10 md:w-28">
                <motion.div
                  className="h-full origin-left bg-[var(--accent)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: hold, ease: [0.45, 0, 0.15, 1] }}
                />
                {!reduceMotion && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    initial={{ left: "-40%" }}
                    animate={{ left: "120%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15,
                      ease: "easeInOut",
                      repeat: 1,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Bottom rail */}
          <div className="relative z-10 px-6 pb-7 md:px-10 md:pb-9">
            <div className="flex items-end justify-between gap-4">
              <motion.p
                className="text-[0.6rem] uppercase tracking-[0.2em] text-white/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Please wait
              </motion.p>
              <motion.p
                className="font-display text-sm font-bold tracking-wide text-white/55"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {label}
              </motion.p>
            </div>
            <div className="mt-3 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full origin-left bg-white/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: hold, ease: [0.45, 0, 0.15, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
