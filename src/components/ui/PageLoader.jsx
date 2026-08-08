import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import BrandLogo from "./BrandLogo";

const ease = [0.76, 0, 0.24, 1];
const HOLD_MS = 280;
const EXIT_MS = 320;
const FAILSAFE_MS = 900;

const LABELS = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/portfolio": "Portfolio",
  "/careers": "Careers",
  "/contact": "Contact",
};

const clearPageLock = () => {
  document.documentElement.classList.remove("page-loading");
  if (!document.documentElement.classList.contains("mobile-nav-open")) {
    document.body.style.overflow = "";
  }
};

/**
 * Simple, fast route transition — logo + label + slide away.
 * Soft-locks Lenis only; never uses overflow:hidden.
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
      clearPageLock();
      return undefined;
    }

    let cancelled = false;
    let exitTimer = 0;

    setTargetPath(pathname);
    setActive(true);
    document.documentElement.classList.add("page-loading");

    const hold = reduceMotion ? 80 : HOLD_MS;
    const exit = reduceMotion ? 140 : EXIT_MS;

    const holdTimer = window.setTimeout(() => {
      if (cancelled) return;
      setActive(false);
      exitTimer = window.setTimeout(() => {
        if (cancelled) return;
        clearPageLock();
      }, exit);
    }, hold);

    const failsafe = window.setTimeout(() => {
      if (cancelled) return;
      setActive(false);
      clearPageLock();
    }, FAILSAFE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(holdTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(failsafe);
      clearPageLock();
    };
  }, [pathname, reduceMotion]);

  useEffect(() => () => clearPageLock(), []);

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={targetPath}
          className="pointer-events-auto fixed inset-0 z-[180] flex flex-col items-center justify-center bg-[var(--ink)] text-white"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${label}`}
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: reduceMotion ? 0.14 : EXIT_MS / 1000,
              ease,
            },
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrandLogo
              tone="light"
              size="header"
              className="!h-10 !w-auto md:!h-11"
            />

            <div className="h-px w-10 bg-[var(--accent)]" />

            <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50">
              {label}
            </p>

            <div className="mt-1 h-[2px] w-20 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-[var(--accent)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduceMotion ? 0.12 : HOLD_MS / 1000,
                  ease: [0.45, 0, 0.15, 1],
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
