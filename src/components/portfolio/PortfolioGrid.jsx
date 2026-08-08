import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { portfolioFilters, portfolioWorks } from "../../data/portfolio";

const ease = [0.16, 1, 0.3, 1];

const WorkCard = ({ work, index }) => {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease }}
    >
      <Link
        to="/contact"
        className="group relative block outline-none"
        aria-label={`${work.client} — ${work.industry}`}
      >
        <article className="relative overflow-hidden bg-ink">
          <div className="site-folio-card w-full">
            <motion.div
              className="absolute inset-0"
              initial={reduceMotion ? false : { scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease }}
            >
              <img
                src={work.image}
                alt=""
                aria-hidden
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.05]"
                loading="lazy"
                sizes="100vw"
              />
            </motion.div>

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.05) 40%, rgba(11,11,11,0.75) 78%, rgba(11,11,11,0.95) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
          </div>

          <div className="site-folio-overlay absolute inset-0 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-white/45">
                  {number}
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {work.year}
                </span>
              </div>
              <span className="label-premium !text-white/50 transition-colors duration-300 group-hover:!text-[var(--accent)]">
                {work.industry}
              </span>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="min-w-0 max-w-3xl">
                <h3 className="site-folio-client font-display text-white transition-transform duration-500 ease-expo group-hover:-translate-y-1">
                  {work.client}
                </h3>
                <div className="mt-3 h-px w-0 bg-[var(--accent)] transition-all duration-500 ease-expo group-hover:w-16" />
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  {work.title}
                </p>
                <p className="mt-2 hidden max-w-xl text-sm text-white/45 md:block md:translate-y-2 md:opacity-0 md:transition-all md:duration-500 md:ease-expo md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {work.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {work.services.map((s) => (
                    <li
                      key={s}
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/35"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="site-folio-arrow relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 text-white transition-all duration-500 ease-expo group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>

          <span className="pointer-events-none absolute inset-0 ring-0 ring-[var(--accent)] transition-[box-shadow] duration-300 group-focus-visible:ring-2" />
        </article>
      </Link>
    </motion.div>
  );
};

const PortfolioGrid = () => {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return portfolioWorks;
    return portfolioWorks.filter((w) => w.industry === filter);
  }, [filter]);

  return (
    <section className="site-folio section-surface">
      <div className="section-padding pb-8 md:pb-10">
        <div className="container-custom">
          <Reveal>
            <div className="mb-10 flex flex-col gap-8 border-b border-[var(--border-subtle)] pb-10 md:mb-12 md:flex-row md:items-end md:justify-between md:pb-12">
              <div>
                <p className="label-premium mb-4">Case studies</p>
                <h2 className="site-folio-title font-display">
                  Archive
                  <span className="block text-[var(--text-muted)]">
                    {String(filtered.length).padStart(2, "0")} projects
                  </span>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)] md:text-right">
                Filter by industry. Hover a case for the fuller story.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="flex flex-wrap gap-2 md:gap-3"
              role="tablist"
              aria-label="Filter by industry"
            >
              {portfolioFilters.map((item) => {
                const active = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(item)}
                    className={`border-b px-1 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                      active
                        ? "border-[var(--ink)] text-[var(--ink)]"
                        : "border-transparent text-[var(--text-muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="site-folio-deck">
        <AnimatePresence mode="popLayout">
          {filtered.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioGrid;
