import { useSyncExternalStore } from "react";

let simplify = false;
const listeners = new Set();
let bound = false;

const subscribeReducedMotion = (listener) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
};

const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const readSimplify = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 1023px)").matches
  );
};

const emit = () => {
  const next = readSimplify();
  if (next === simplify) return;
  simplify = next;
  listeners.forEach((l) => l());
};

const subscribe = (listener) => {
  listeners.add(listener);
  if (!bound && typeof window !== "undefined") {
    bound = true;
    simplify = readSimplify();
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 1023px)");
    coarse.addEventListener("change", emit);
    narrow.addEventListener("change", emit);
  }
  return () => listeners.delete(listener);
};

const getSnapshot = () => simplify;
const getServerSnapshot = () => false;

/**
 * Shared motion budget for mobile / coarse pointers.
 * Keeps animations; just makes them cheaper and shorter.
 * One media-query subscription for the whole app.
 */
export function useSimplifyMotion() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const simplifyMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    reduceMotion: !!reduceMotion,
    /** Mobile / touch — lighter animation params */
    simplify: simplifyMotion,
    /** Prefer static or one-shot motion (no infinite loops) */
    freezeLoops: !!reduceMotion || simplifyMotion,
    ease: [0.16, 1, 0.3, 1],
    /** Ken Burns / hero image scale */
    kenBurns: reduceMotion
      ? false
      : simplifyMotion
        ? { from: 1.04, duration: 1.05 }
        : { from: 1.12, duration: 2 },
    /** Reveal / enter distance + duration */
    reveal: reduceMotion
      ? null
      : simplifyMotion
        ? { y: 14, duration: 0.42 }
        : { y: 28, duration: 0.75 },
  };
}
