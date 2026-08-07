import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { works, worksSection } from "../../data/home";

const ease = [0.16, 1, 0.3, 1];

const WorkRow = ({ work, index }) => {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={Math.min(index * 0.06, 0.24)} amount={0.2}>
      <Link
        to="/portfolio"
        className="group relative block outline-none"
        aria-label={`${work.client} — ${work.industry}`}
      >
        <article className="relative overflow-hidden bg-ink">
          {/* Media */}
          <div
            className={`relative w-full overflow-hidden ${
              index === 0
                ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
                : "aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9]"
            }`}
          >
            <motion.div
              className="absolute inset-0 will-change-transform"
              initial={reduceMotion ? false : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.35, ease }}
            >
              <img
                src={work.image}
                alt=""
                aria-hidden
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.05]"
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw"
              />
            </motion.div>

            {/* Graded overlays */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-700"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,11,0.15) 0%, rgba(11,11,11,0.05) 40%, rgba(11,11,11,0.72) 78%, rgba(11,11,11,0.94) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
          </div>

          {/* Content plane */}
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 md:p-10 lg:p-12">
            <div className="flex items-start justify-between gap-4">
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-white/45 md:text-base">
                {number}
              </span>
              <span className="label-premium !text-white/50 transition-colors duration-300 group-hover:!text-[var(--accent)]">
                {work.industry}
              </span>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="min-w-0 max-w-3xl">
                <h3 className="font-display text-[clamp(1.65rem,3.8vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                  {work.client}
                </h3>

                <div className="mt-3 h-px w-0 bg-[var(--accent)] transition-all duration-500 ease-expo group-hover:w-16" />

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 transition-all duration-500 ease-expo md:text-base md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {work.title}
                </p>
              </div>

              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 text-white transition-all duration-500 ease-expo group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] sm:h-14 sm:w-14">
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>

          {/* Focus ring for a11y */}
          <span className="pointer-events-none absolute inset-0 ring-0 ring-[var(--accent)] transition-[box-shadow] duration-300 group-focus-visible:ring-2" />
        </article>
      </Link>
    </Reveal>
  );
};

const SelectedWorks = () => {
  return (
    <section className="section-surface overflow-hidden" id="works">
      <div className="section-padding pb-8 md:pb-10">
        <div className="container-custom">
          <div className="flex flex-col gap-8 border-b border-[var(--border-subtle)] pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
            <Reveal>
              <p className="label-premium mb-4">{worksSection.label}</p>
              <h2 className="font-display max-w-2xl text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em]">
                {worksSection.title[0]}
                <span className="block text-[var(--text-muted)]">
                  {worksSection.title[1]}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
                <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)] md:text-[0.95rem]">
                  {worksSection.support}
                </p>
                <Link
                  to={worksSection.cta.to}
                  className="group inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-55"
                >
                  {worksSection.cta.label}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Full-bleed case stack */}
      <div className="flex flex-col gap-3 px-3 pb-[4.5rem] md:gap-4 md:px-4 md:pb-28 lg:px-5">
        {works.map((work, index) => (
          <WorkRow key={work.id} work={work} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;
