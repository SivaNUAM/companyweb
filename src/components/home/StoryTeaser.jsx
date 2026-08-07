import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { story } from "../../data/home";

const ease = [0.16, 1, 0.3, 1];

const sentences = story.body
  .split(/(?<=\.)\s+/)
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * Types story lines one character at a time when the block enters view.
 */
const TypewriterStory = ({ lines, reduceMotion }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setLineIndex(lines.length - 1);
      setCharIndex(lines[lines.length - 1]?.length ?? 0);
      setDone(true);
      return undefined;
    }
    if (!inView || done) return undefined;

    const current = lines[lineIndex] ?? "";
    if (charIndex < current.length) {
      const lag = current[charIndex] === " " ? 18 : 28;
      const id = window.setTimeout(() => setCharIndex((c) => c + 1), lag);
      return () => clearTimeout(id);
    }

    // Line complete — pause, then next line
    if (lineIndex < lines.length - 1) {
      const id = window.setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 420);
      return () => clearTimeout(id);
    }

    setDone(true);
    return undefined;
  }, [inView, reduceMotion, lineIndex, charIndex, done, lines]);

  return (
    <h2
      ref={ref}
      className="font-display text-[clamp(1.65rem,3.6vw,3.15rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)]"
      aria-label={lines.join(" ")}
    >
      {lines.map((line, i) => {
        const visible =
          i < lineIndex
            ? line
            : i === lineIndex
              ? line.slice(0, charIndex)
              : "";
        const isTyping = i === lineIndex && !done;
        const showCursor = isTyping || (done && i === lines.length - 1);

        if (i > lineIndex && !reduceMotion) return null;

        return (
          <span
            key={line}
            className={`block ${i > 0 ? "mt-5 text-[var(--text-secondary)]" : ""}`}
          >
            {visible}
            {showCursor && (
              <motion.span
                aria-hidden
                className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.08em] bg-[var(--accent)] align-baseline"
                animate={
                  reduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.85, repeat: Infinity, ease: "linear" }
                }
              />
            )}
          </span>
        );
      })}
    </h2>
  );
};

const StoryTeaser = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden section-surface section-padding">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-8 select-none font-display text-[min(42vw,22rem)] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink)]/[0.035] md:top-4 lg:-left-8"
        initial={reduceMotion ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        NUAM
      </motion.span>

      <div className="container-custom relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="label-premium mb-5">{story.label}</p>
                <div className="h-px w-12 origin-left bg-[var(--accent)]" />
                <p className="mt-6 max-w-[22ch] text-sm leading-relaxed text-[var(--text-secondary)] md:text-[0.95rem]">
                  {story.aside}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="relative">
              <Reveal>
                <span
                  aria-hidden
                  className="font-display mb-4 block text-6xl font-extrabold leading-none text-[var(--accent)] md:text-7xl"
                >
                  “
                </span>
              </Reveal>

              <TypewriterStory lines={sentences} reduceMotion={reduceMotion} />

              <Reveal delay={0.2}>
                <div className="mt-12 flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[var(--text-muted)]">
                    {story.footer}
                  </p>
                  <Link
                    to={story.cta.to}
                    className="group inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--ink)]"
                  >
                    <span className="border-b border-[var(--ink)] pb-1 transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                      {story.cta.label}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-all duration-500 ease-expo group-hover:translate-x-1 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryTeaser;
