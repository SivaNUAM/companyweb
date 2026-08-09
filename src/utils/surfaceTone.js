const parseRgba = (value) => {
  if (!value || value === "transparent") return null;
  const m = value.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i,
  );
  if (!m) return null;
  return {
    r: Number(m[1]),
    g: Number(m[2]),
    b: Number(m[3]),
    a: m[4] === undefined ? 1 : Number(m[4]),
  };
};

const luminance = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

const IGNORE_SEL = "[data-custom-cursor], [data-site-header], [data-mobile-nav]";

/** Sections that should flip the header to light-on-dark */
export const DARK_SURFACE_SEL =
  '.section-ink, .bg-ink, [data-cursor-tone="dark"], .site-phero';

/**
 * Detect dark surface at a viewport point.
 * Used by custom cursor (desktop only) — avoid on mobile scroll paths.
 */
export const isDarkSurfaceAt = (clientX, clientY) => {
  const stack = document.elementsFromPoint(clientX, clientY);
  for (const el of stack) {
    if (!(el instanceof Element)) continue;
    if (el.closest?.(IGNORE_SEL)) continue;

    const tone = el.closest?.("[data-cursor-tone]");
    if (tone) {
      return tone.getAttribute("data-cursor-tone") === "dark";
    }

    if (
      el.classList.contains("section-ink") ||
      el.classList.contains("bg-ink") ||
      el.closest?.(".section-ink, .bg-ink")
    ) {
      return true;
    }

    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS") {
      return true;
    }

    const bg = parseRgba(getComputedStyle(el).backgroundColor);
    if (bg && bg.a >= 0.2) {
      return luminance(bg.r, bg.g, bg.b) < 0.55;
    }
  }

  const bodyBg = parseRgba(getComputedStyle(document.body).backgroundColor);
  if (bodyBg) return luminance(bodyBg.r, bodyBg.g, bodyBg.b) < 0.55;
  return false;
};

/** Legacy one-shot sample — prefer observeHeaderTone on scroll UIs */
export const isDarkBehindHeader = () => {
  const header = document.querySelector("[data-site-header]");
  const midX = window.innerWidth / 2;
  const y = header
    ? Math.min(window.innerHeight - 4, header.getBoundingClientRect().bottom + 12)
    : 96;
  return isDarkSurfaceAt(midX, y);
};

/**
 * Cheap header tone: IntersectionObserver on dark surfaces in the top band.
 * No elementsFromPoint / getComputedStyle — safe for mobile scroll.
 */
export const observeHeaderTone = (onChange) => {
  const intersecting = new Set();
  let band = Math.min(140, Math.max(72, Math.round(window.innerHeight * 0.14)));

  const emit = () => onChange(intersecting.size > 0);

  let observer = null;

  const makeObserver = () => {
    observer?.disconnect();
    band = Math.min(140, Math.max(72, Math.round(window.innerHeight * 0.14)));
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        emit();
      },
      {
        root: null,
        // Only the top `band` px of the viewport counts as the sampling zone
        rootMargin: `0px 0px -${Math.max(0, window.innerHeight - band)}px 0px`,
        threshold: 0,
      },
    );
  };

  const watch = () => {
    makeObserver();
    intersecting.clear();
    document.querySelectorAll(DARK_SURFACE_SEL).forEach((el) => {
      observer.observe(el);
    });
    emit();
  };

  watch();

  let resizeTimer = 0;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(watch, 150);
  };
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    window.clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    observer?.disconnect();
    intersecting.clear();
  };
};
