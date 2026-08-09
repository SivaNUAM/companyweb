import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Reveal from "../ui/Reveal";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";
import { aboutManifesto } from "../../data/about";

const ease = [0.16, 1, 0.3, 1];

const paragraphs = aboutManifesto.paragraphs;
const charCounts = paragraphs.map((p) => p.length);
const totalChars = charCounts.reduce((a, b) => a + b, 0);

const charsFromProgress = (progress) => {
  const p = progress >= 0.985 ? 1 : progress;
  return Math.min(totalChars, Math.max(0, Math.floor(p * totalChars)));
};

const revealByChars = (target) => {
  let remaining = target;
  return paragraphs.map((text, i) => {
    const take = Math.min(remaining, charCounts[i]);
    remaining -= take;
    return {
      shown: text.slice(0, take),
      done: take >= charCounts[i],
      typing: take > 0 && take < charCounts[i],
      started: take > 0 || i === 0,
    };
  });
};

const AboutManifesto = () => {
  const reduceMotion = useReducedMotion();
  const { simplify } = useSimplifyMotion();
  const trackRef = useRef(null);
  const lastChars = useRef(-1);
  const [lines, setLines] = useState(() =>
    reduceMotion ? revealByChars(totalChars) : revealByChars(0),
  );

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Desktop: soft spring. Mobile: raw progress (no spring jank).
  const smooth = useSpring(scrollYProgress, {
    stiffness: simplify ? 400 : 140,
    damping: simplify ? 40 : 32,
    mass: simplify ? 0.2 : 0.3,
  });

  const applyProgress = (v) => {
    if (reduceMotion) return;
    const chars = charsFromProgress(v);
    // Only re-render when visible character count actually changes
    if (chars === lastChars.current) return;
    // On mobile, step by 2–3 chars to cut React work ~half
    if (simplify && chars !== totalChars && chars - lastChars.current < 2) {
      return;
    }
    lastChars.current = chars;
    setLines(revealByChars(chars));
  };

  useMotionValueEvent(simplify ? scrollYProgress : smooth, "change", applyProgress);

  // Ensure final state when scrub ends
  useEffect(() => {
    if (reduceMotion) {
      setLines(revealByChars(totalChars));
      lastChars.current = totalChars;
    }
  }, [reduceMotion]);

  const typingIndex = lines.findIndex((l) => l.typing);
  const nextIndex = lines.findIndex((l) => !l.done);
  const allDone = nextIndex === -1;
  const caretIndex =
    reduceMotion || allDone
      ? -1
      : typingIndex >= 0
        ? typingIndex
        : Math.max(0, nextIndex);

  return (
    <section className="site-about-manif section-surface">
      <motion.span
        aria-hidden
        className="site-about-manif-mark"
        initial={reduceMotion ? false : { opacity: 0, x: simplify ? 16 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: simplify ? 0.55 : 1.2, ease }}
      >
        STORY
      </motion.span>

      <div ref={trackRef} className="site-about-manif-track">
        <div className="site-about-manif-sticky section-padding">
          <div className="site-about-manif-grid container-custom">
            <Reveal className="site-about-manif-aside">
              <div className="lg:sticky lg:top-28">
                <p className="label-premium mb-5">{aboutManifesto.label}</p>
                <div className="h-px w-12 bg-[var(--accent)]" />
                <p className="mt-6 max-w-[20ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                  Nuam Technologies Pvt Ltd — who we are when the pitch deck is
                  closed.
                </p>
                <div className="mt-10 space-y-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  <p>Founded 2025</p>
                  <p>Corporate 2026</p>
                  <p>10+ clients</p>
                </div>
              </div>
            </Reveal>

            <div className="site-about-manif-body">
              <span aria-hidden className="site-about-manif-quote">
                “
              </span>

              <div className="sr-only">
                {paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div
                className="space-y-7 md:space-y-9"
                aria-hidden={!reduceMotion}
              >
                {(reduceMotion
                  ? paragraphs.map((p) => ({
                      shown: p,
                      done: true,
                      typing: false,
                      started: true,
                    }))
                  : lines
                ).map((line, i) => {
                  if (!line.started && i > 0) return null;
                  return (
                    <p
                      key={paragraphs[i]}
                      className={`site-about-manif-line${i === 0 ? " is-em" : ""}`}
                    >
                      {line.shown}
                      {caretIndex === i && (
                        <span
                          aria-hidden
                          className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.06em] bg-[var(--accent)] align-baseline site-about-manif-caret"
                        />
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutManifesto;
