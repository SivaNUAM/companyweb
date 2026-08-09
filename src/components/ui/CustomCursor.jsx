import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { isDarkSurfaceAt } from "../../utils/surfaceTone";

const HOVER_SEL =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

/**
 * Custom cursor:
 * - Light / white background → black cursor
 * - Dark / black background → white cursor
 * Tone sampling is throttled for Windows/laptop smoothness.
 */
const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const sync = () =>
      setEnabled(fine.matches && !coarse.matches && !reduceMotion);
    sync();
    fine.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return undefined;
    }

    const root = document.querySelector("[data-custom-cursor]");
    const ring = root?.querySelector("[data-cursor-ring]");
    const dot = root?.querySelector("[data-cursor-dot]");
    if (
      !(root instanceof HTMLElement) ||
      !(ring instanceof HTMLElement) ||
      !(dot instanceof HTMLElement)
    ) {
      return undefined;
    }

    document.documentElement.classList.add("has-custom-cursor");

    let x = -100;
    let y = -100;
    let hovering = false;
    let pressing = false;
    let visible = false;
    let onDark = false;
    let raf = 0;
    let toneRaf = 0;
    let needsDraw = true;
    let lastToneAt = 0;

    const applyTone = (dark) => {
      if (dark === onDark) return;
      onDark = dark;
      root.classList.toggle("is-dark", dark);
      root.classList.toggle("is-light", !dark);
    };

    const sampleTone = () => {
      toneRaf = 0;
      lastToneAt = performance.now();
      try {
        // Dark surface → white cursor; light surface → black cursor
        applyTone(isDarkSurfaceAt(x, y));
      } catch {
        /* ignore */
      }
    };

    const requestTone = () => {
      const now = performance.now();
      if (now - lastToneAt < 90) return;
      if (!toneRaf) toneRaf = requestAnimationFrame(sampleTone);
    };

    const draw = () => {
      raf = 0;
      if (!needsDraw) return;
      needsDraw = false;
      const scale = pressing ? 0.85 : hovering ? 1.35 : 1;
      const opacity = visible ? 1 : 0;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity = String(opacity * (pressing ? 0.45 : 0.95));
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${pressing ? 0.65 : 1})`;
      dot.style.opacity = String(opacity);
      root.classList.toggle("is-hover", hovering);
    };

    const requestDraw = () => {
      needsDraw = true;
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      visible = true;
      requestDraw();
      requestTone();
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const next = Boolean(t.closest(HOVER_SEL));
      if (next !== hovering) {
        hovering = next;
        requestDraw();
      }
      // Section / tone hints often change on mouseover
      requestTone();
    };

    const onDown = () => {
      pressing = true;
      requestDraw();
    };
    const onUp = () => {
      pressing = false;
      requestDraw();
    };
    const onLeave = () => {
      visible = false;
      requestDraw();
    };
    const onEnter = () => {
      visible = true;
      requestDraw();
    };

    // Default: assume light page until first sample
    applyTone(false);
    requestTone();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (toneRaf) cancelAnimationFrame(toneRaf);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      data-custom-cursor
      className="site-cursor is-light pointer-events-none fixed inset-0 z-[300] hidden md:block"
    >
      <div data-cursor-ring className="site-cursor-ring" />
      <div data-cursor-dot className="site-cursor-dot" />
    </div>
  );
};

export default CustomCursor;
