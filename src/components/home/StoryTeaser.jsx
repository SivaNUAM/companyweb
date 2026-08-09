import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { story } from "../../data/home";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const sentences = story.body
  .split(/(?<=\.)\s+/)
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * Types story lines one character at a time when the block enters view.
 */
const TypewriterStory = ({ lines, reduceMotion, simplify }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
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
      // Mobile: type in larger steps so fewer React updates
      const step = simplify ? (current[charIndex] === " " ? 2 : 3) : 1;
      const lag = simplify
        ? 16
        : current[charIndex] === " "
          ? 18
          : 28;
      const id = window.setTimeout(
        () => setCharIndex((c) => Math.min(current.length, c + step)),
        lag,
      );
      return () => clearTimeout(id);
    }

    if (lineIndex < lines.length - 1) {
      const id = window.setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, simplify ? 220 : 420);
      return () => clearTimeout(id);
    }

    setDone(true);
    return undefined;
  }, [inView, reduceMotion, simplify, lineIndex, charIndex, done, lines]);

  return (
    <h2
      ref={ref}
      className="site-story-body"
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
            className={`line block ${i > 0 ? "" : ""}`}
          >
            {visible}
            {showCursor && (
              <span
                aria-hidden
                className={`ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.08em] bg-[var(--accent)] align-baseline${
                  reduceMotion || simplify ? "" : " site-story-caret"
                }`}
              />
            )}
          </span>
        );
      })}
    </h2>
  );
};

const StoryTeaser = () => {
  const { reduceMotion, simplify, ease } = useSimplifyMotion();

  return (
    <section className="site-story section-surface">
      <motion.span
        aria-hidden
        className="site-story-mark"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: simplify ? 0.5 : 1, ease }}
      >
        NUAM
      </motion.span>

      <div className="container-custom relative">
        <div className="site-story-grid">
          <div className="site-story-aside">
            <Reveal>
              <div className="site-story-aside-inner">
                <p className="label-premium mb-4 sm:mb-5">{story.label}</p>
                <div className="h-px w-10 origin-left bg-[var(--accent)] sm:w-12" />
                <p>{story.aside}</p>
              </div>
            </Reveal>
          </div>

          <div className="site-story-main">
            <div className="relative">
              <Reveal>
                <span aria-hidden className="site-story-quote">
                  “
                </span>
              </Reveal>

              <TypewriterStory
                lines={sentences}
                reduceMotion={reduceMotion}
                simplify={simplify}
              />

              <Reveal delay={0.2}>
                <div className="site-story-foot">
                  <p className="text-sm text-[var(--text-muted)]">
                    {story.footer}
                  </p>
                  <Link
                    to={story.cta.to}
                    className="group inline-flex min-h-11 items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--ink)] sm:min-h-0 sm:text-[0.7rem]"
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
