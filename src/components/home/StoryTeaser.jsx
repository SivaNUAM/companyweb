import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { story } from "../../data/home";

const ease = [0.16, 1, 0.3, 1];

const StoryTeaser = () => {
  const reduceMotion = useReducedMotion();
  const sentences = story.body
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden section-surface section-padding">
      {/* Oversized watermark */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-8 font-display text-[min(42vw,22rem)] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink)]/[0.035] select-none md:top-4 lg:-left-8"
        initial={reduceMotion ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        NUAM
      </motion.span>

      <div className="container-custom relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Sticky label column */}
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

          {/* Pull quote */}
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

              <h2 className="font-display text-[clamp(1.65rem,3.6vw,3.15rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--ink)]">
                {sentences.map((sentence, i) => (
                  <motion.span
                    key={sentence}
                    className={`block ${i > 0 ? "mt-5 text-[var(--text-secondary)]" : ""}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.12 + i * 0.12,
                      ease,
                    }}
                  >
                    {sentence}
                  </motion.span>
                ))}
              </h2>

              <Reveal delay={0.35}>
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
