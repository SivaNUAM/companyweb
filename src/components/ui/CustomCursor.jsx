import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { isDarkSurfaceAt } from "../../utils/surfaceTone";

const HOVER_SEL =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

/**
 * Agency custom cursor — auto white on dark pages/sections, black on light.
 */
const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [onDark, setOnDark] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const spring = {
    stiffness: 280,
    damping: 22,
    mass: 0.4,
  };
  const ringX = useSpring(x, spring);
  const ringY = useSpring(y, spring);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(fine.matches && !reduceMotion);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return undefined;
    }

    document.documentElement.classList.add("has-custom-cursor");

    let raf = 0;
    let latest = { x: 0, y: 0 };

    const sampleTone = () => {
      raf = 0;
      try {
        setOnDark(isDarkSurfaceAt(latest.x, latest.y));
      } catch {
        /* ignore */
      }
    };

    const onMove = (e) => {
      latest = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      if (!raf) raf = requestAnimationFrame(sampleTone);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      setHovering(Boolean(t.closest(HOVER_SEL)));
    };

    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const color = onDark ? "#ffffff" : "#0b0b0b";

  return (
    <div
      aria-hidden
      data-custom-cursor
      className="pointer-events-none fixed inset-0 z-[300] hidden md:block"
    >
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          animate={{
            width: hovering ? 56 : 36,
            height: hovering ? 56 : 36,
            opacity: visible ? (pressing ? 0.35 : 0.95) : 0,
            scale: pressing ? 0.85 : 1,
            borderColor: color,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      </motion.div>

      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: hovering ? 6 : 8,
            height: hovering ? 6 : 8,
            opacity: visible ? 1 : 0,
            scale: pressing ? 0.6 : 1,
            backgroundColor: color,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
