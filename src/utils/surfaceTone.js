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

/**
 * Detect dark surface at a viewport point.
 * Dark → use light (white) UI; light → use dark (black) UI.
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

/** Sample page content just under the fixed header band. */
export const isDarkBehindHeader = () => {
  const header = document.querySelector("[data-site-header]");
  const midX = window.innerWidth / 2;
  const y = header
    ? Math.min(window.innerHeight - 4, header.getBoundingClientRect().bottom + 12)
    : 96;
  return isDarkSurfaceAt(midX, y);
};
