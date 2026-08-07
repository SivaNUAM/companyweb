import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { aboutManifesto } from "../../data/about";

const ease = [0.16, 1, 0.3, 1];

const TypeLine = ({ text, active, emphasize, reduceMotion, onDone }) => {
  const [n, setN] = useState(reduceMotion ? text.length : 0);
  const finished = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setN(text.length);
      if (!finished.current) {
        finished.current = true;
        onDone?.();
      }
      return undefined;
    }
    if (!active || finished.current) return undefined;
    if (n >= text.length) {
      finished.current = true;
      const t = window.setTimeout(() => onDone?.(), 280);
      return () => clearTimeout(t);
    }
    const id = window.setTimeout(
      () => setN((c) => c + 1),
      text[n] === " " ? 12 : 22,
    );
    return () => clearTimeout(id);
  }, [active, n, text, reduceMotion, onDone]);

  const show = active || n > 0 || reduceMotion;

  if (!show && !reduceMotion) return null;

  return (
    <p
      className={`font-display text-[clamp(1.35rem,2.8vw,2.35rem)] font-semibold leading-[1.25] tracking-[-0.025em] ${
        emphasize ? "text-[var(--ink)]" : "text-[var(--text-secondary)]"
      }`}
    >
      {text.slice(0, n)}
      {active && n < text.length && (
        <motion.span
          aria-hidden
          className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.06em] bg-[var(--accent)] align-baseline"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </p>
  );
};

const AboutManifesto = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (reduceMotion) setLine(aboutManifesto.paragraphs.length);
  }, [reduceMotion]);

  return (
    <section className="relative overflow-hidden section-surface section-padding">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-8 top-10 select-none font-display text-[min(40vw,18rem)] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink)]/[0.03]"
        initial={reduceMotion ? false : { opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        STORY
      </motion.span>

      <div className="container-custom relative grid gap-12 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
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

        <div className="lg:col-span-8" ref={ref}>
          <span
            aria-hidden
            className="font-display mb-2 block text-6xl font-extrabold leading-none text-[var(--accent)] md:text-7xl"
          >
            “
          </span>
          <div className="space-y-7 md:space-y-9">
            {aboutManifesto.paragraphs.map((p, i) => (
              <TypeLine
                key={p}
                text={p}
                emphasize={i === 0}
                reduceMotion={reduceMotion}
                active={inView && line === i}
                onDone={() =>
                  setLine((curr) => (curr === i ? i + 1 : curr))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutManifesto;
