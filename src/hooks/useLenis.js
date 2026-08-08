import { useEffect } from "react";
import Lenis from "lenis";

const isScrollLocked = () => {
  const root = document.documentElement;
  return (
    root.classList.contains("mobile-nav-open") ||
    root.classList.contains("welcome-loading") ||
    root.classList.contains("page-loading")
  );
};

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Avoid fighting native overflow locks / sticky sections
      syncTouch: false,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    const syncLock = () => {
      if (isScrollLocked()) {
        lenis.stop();
      } else {
        lenis.start();
        // Recalculate after overflow/sticky disruption
        try {
          lenis.resize();
        } catch {
          /* ignore */
        }
      }
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
