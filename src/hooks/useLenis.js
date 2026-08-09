import { useEffect } from "react";
import Lenis from "lenis";

const isScrollLocked = () => {
  const root = document.documentElement;
  return (
    root.classList.contains("mobile-nav-open") ||
    root.classList.contains("welcome-loading")
  );
};

/**
 * Smooth scroll — skipped on touch/mobile for native performance.
 * Never locks for page transitions (that caused stuck/lag).
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 1023px)").matches;

    // Native scroll on phones/tablets — far smoother than Lenis there
    if (prefersReduced || coarse || narrow) return undefined;

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    const syncLock = () => {
      if (isScrollLocked()) lenis.stop();
      else lenis.start();
    };

    syncLock();

    const observer = new MutationObserver(syncLock);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);
}
