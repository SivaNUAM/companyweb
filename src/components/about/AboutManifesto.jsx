import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Reveal from "../ui/Reveal";
import { aboutManifesto } from "../../data/about";

const ease = [0.16, 1, 0.3, 1];

const paragraphs = aboutManifesto.paragraphs;
const charCounts = paragraphs.map((p) => p.length);
const totalChars = charCounts.reduce((a, b) => a + b, 0);

const revealByProgress = (progress) => {
  const target = Math.min(
    totalChars,
    Math.max(0, Math.floor((progress >= 0.985 ? 1 : progress) * totalChars)),
  );
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
  const trackRef = useRef(null);
  const [lines, setLines] = useState(() =>
    reduceMotion ? revealByProgress(1) : revealByProgress(0),
  );

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.3,
  });

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduceMotion) return;
    setLines(revealByProgress(v));
  });

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
        initial={reduceMotion ? false : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
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

              <div className="space-y-7 md:space-y-9" aria-hidden={!reduceMotion}>
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
