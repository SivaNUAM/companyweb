import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { brochureChapters } from "../../data/brochure";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";
import BrochureChapter from "./BrochureChapter";

const CHAPTER_VH = 90;
const ease = [0.16, 1, 0.3, 1];
const clamp01 = (n) => Math.min(1, Math.max(0, n));

const BrochureDeck = ({ onDownload }) => {
  const { reduceMotion } = useSimplifyMotion();
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const total = brochureChapters.length;
  const maxIndex = Math.max(0, total - 1);
  const chapter = brochureChapters[index];
  const progress = maxIndex > 0 ? index / maxIndex : 1;

  const trackHeight = useMemo(
    () => `${Math.max(total, 2) * CHAPTER_VH}vh`,
    [total],
  );

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const syncFromProgress = useCallback(
    (p) => {
      if (maxIndex <= 0) {
        setIndex(0);
        return;
      }
      const next = Math.min(maxIndex, Math.round(clamp01(p) * maxIndex));
      setIndex((prev) => {
        if (prev === next) return prev;
        setDir(next > prev ? 1 : -1);
        return next;
      });
    },
    [maxIndex],
  );

  useMotionValueEvent(scrollYProgress, "change", syncFromProgress);

  useEffect(() => {
    syncFromProgress(scrollYProgress.get());
  }, [syncFromProgress, scrollYProgress]);

  const scrollToIndex = (target) => {
    const el = trackRef.current;
    if (!el || maxIndex <= 0) return;
    const clamped = Math.min(maxIndex, Math.max(0, target));
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const usable = el.offsetHeight - window.innerHeight;
    const y = top + (clamped / maxIndex) * Math.max(usable, 0);
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="brochure-deck"
      className="site-brochure-deck"
      data-tone={chapter?.tone || "azure"}
    >
      <div
        ref={trackRef}
        className="site-brochure-track"
        style={{ height: trackHeight }}
      >
        <div className="site-brochure-sticky">
          <div className="site-brochure-chrome">
            <div className="site-brochure-chrome-meta">
              <div className="site-brochure-chrome-row">
                <span className="site-brochure-chrome-swatch" aria-hidden />
                <p className="site-brochure-chrome-label">
                  {chapter?.label || "Profile"}
                  <span aria-hidden> · </span>
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </p>
              </div>
              <div
                className="site-brochure-progress"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                aria-label="Brochure progress"
              >
                <span style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
            <button
              type="button"
              className="site-brochure-download"
              onClick={onDownload}
            >
              Download PDF
              <Download size={14} strokeWidth={2.25} />
            </button>
          </div>

          <div className="site-brochure-stage">
            <nav className="site-brochure-rail" aria-label="Chapters">
              {brochureChapters.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={`site-brochure-rail-item${i === index ? " is-active" : ""}`}
                  data-tone={c.tone}
                  onClick={() => scrollToIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                >
                  <span className="site-brochure-rail-swatch" aria-hidden />
                  <span className="site-brochure-rail-index">{c.index}</span>
                  <span className="site-brochure-rail-label">{c.label}</span>
                </button>
              ))}
            </nav>

            <div className="site-brochure-panel" data-tone={chapter?.tone}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={chapter.id}
                  className="site-brochure-panel-inner"
                  custom={dir}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: dir > 0 ? 36 : -36, scale: 0.985 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: dir > 0 ? -28 : 28, scale: 0.99 }
                  }
                  transition={{ duration: reduceMotion ? 0.2 : 0.45, ease }}
                >
                  <BrochureChapter chapter={chapter} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="site-brochure-controls">
            <button
              type="button"
              className="site-brochure-nav-btn"
              onClick={() => scrollToIndex(index - 1)}
              disabled={index <= 0}
              aria-label="Previous chapter"
            >
              <ChevronLeft size={18} />
              Prev
            </button>
            <div className="site-brochure-dots" role="tablist" aria-label="Chapters">
              {brochureChapters.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  data-tone={c.tone}
                  className={`site-brochure-dot${i === index ? " is-active" : ""}${c.type === "cover" || c.type === "close" ? " is-plate" : ""}`}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${c.label}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="site-brochure-nav-btn"
              onClick={() => scrollToIndex(index + 1)}
              disabled={index >= maxIndex}
              aria-label="Next chapter"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrochureDeck;
