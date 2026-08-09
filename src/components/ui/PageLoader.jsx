import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

const HOLD_MS = 140;
const EXIT_MS = 160;
const FAILSAFE_MS = 420;

const LABELS = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/portfolio": "Portfolio",
  "/careers": "Careers",
  "/contact": "Contact",
};

/**
 * Ultra-light route transition — CSS only, no Lenis lock, no heavy images.
 * Feels instant on mobile + Windows laptops.
 */
const PageLoader = () => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const first = useRef(true);
  const [phase, setPhase] = useState("idle"); // idle | in | out
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

    let cancelled = false;
    setTargetPath(pathname);
    setPhase("in");

    const hold = reduceMotion ? 40 : HOLD_MS;
    const exit = reduceMotion ? 80 : EXIT_MS;

    const holdTimer = window.setTimeout(() => {
      if (cancelled) return;
      setPhase("out");
    }, hold);

    const doneTimer = window.setTimeout(() => {
      if (cancelled) return;
      setPhase("idle");
    }, hold + exit);

    const failsafe = window.setTimeout(() => {
      if (cancelled) return;
      setPhase("idle");
    }, FAILSAFE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(holdTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(failsafe);
      setPhase("idle");
    };
  }, [pathname, reduceMotion]);

  if (phase === "idle") return null;

  return (
    <div
      className={`site-page-loader${phase === "out" ? " is-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${label}`}
    >
      <div className="site-page-loader-bar" />
      <p className="site-page-loader-label">{label}</p>
    </div>
  );
};

export default PageLoader;
