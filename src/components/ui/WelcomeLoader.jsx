import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import BrandLogo from "./BrandLogo";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const SESSION_KEY = "nuam-welcome-seen";

/**
 * Agency preloader — logo, counter, line, slide-up reveal.
 * Runs once per browser session.
 * Mobile: DOM-driven progress (no per-frame React re-renders) + shorter timing.
 */
const WelcomeLoader = ({ onDone }) => {
  const reduceMotion = useReducedMotion();
  const { simplify } = useSimplifyMotion();
  const [phase, setPhase] = useState("load"); // load | exit | gone
  const [visible, setVisible] = useState(true);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const lastCount = useRef(-1);
  const doneRef = useRef(false);

  const loadMs = reduceMotion ? 700 : simplify ? 1400 : 2400;
  const holdMs = reduceMotion ? 60 : simplify ? 140 : 280;
  const exitMs = reduceMotion ? 280 : simplify ? 480 : 850;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setVisible(false);
        setPhase("gone");
        onDone?.();
        return undefined;
      }
    } catch {
      /* private mode */
    }

    document.documentElement.classList.add("welcome-loading");

    // Paint counter/bar via refs — avoid 100 React re-renders
    if (countRef.current) countRef.current.textContent = "00";
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";

    const controls = animate(0, 100, {
      duration: loadMs / 1000,
      ease: [0.45, 0, 0.15, 1],
      onUpdate: (v) => {
        const n = Math.round(v);
        if (n === lastCount.current) return;
        // Mobile: update every 2% to cut paint work in half
        if (simplify && n !== 100 && n - lastCount.current < 2) return;
        lastCount.current = n;
        if (countRef.current) {
          countRef.current.textContent = String(n).padStart(2, "0");
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${n / 100})`;
        }
      },
      onComplete: () => {
        if (countRef.current) countRef.current.textContent = "100";
        if (barRef.current) barRef.current.style.transform = "scaleX(1)";
        window.setTimeout(() => setPhase("exit"), holdMs);
      },
    });

    return () => {
      controls.stop();
      document.documentElement.classList.remove("welcome-loading");
    };
  }, [onDone, reduceMotion, simplify, loadMs, holdMs]);

  useEffect(() => {
    if (phase !== "exit") return undefined;

    // Unlock + mount app under the panel as soon as the slide starts
    if (!doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }

    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      document.documentElement.classList.remove("welcome-loading");
      setVisible(false);
      setPhase("gone");
    }, exitMs);

    return () => window.clearTimeout(t);
  }, [phase, onDone, exitMs]);

  if (!visible && phase === "gone") return null;
  if (!visible) return null;

  const exiting = phase === "exit";

  return (
    <div
      className={`site-welcome${exiting ? " is-exit" : ""}${simplify ? " is-simple" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Nuam Technologies"
      style={{
        // Drive exit duration from JS budget
        ["--welcome-exit-ms"]: `${exitMs}ms`,
      }}
    >
      <div className="site-welcome-top">
        <BrandLogo
          tone="light"
          size="header"
          className="site-welcome-logo-sm"
        />
        <p className="site-welcome-label">Loading</p>
      </div>

      <div className="site-welcome-center">
        <div className="site-welcome-brand">
          <BrandLogo
            tone="light"
            size="loader"
            className="site-welcome-logo"
          />
          <div className="site-welcome-rule" />
          <p className="site-welcome-sub">Technologies</p>
        </div>
      </div>

      <div className="site-welcome-bottom">
        <div className="site-welcome-meta">
          <p className="site-welcome-wait">Please wait</p>
          <p className="site-welcome-count font-display">
            <span ref={countRef}>00</span>
            <span className="site-welcome-pct">%</span>
          </p>
        </div>
        <div className="site-welcome-track">
          <div ref={barRef} className="site-welcome-bar" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeLoader;
