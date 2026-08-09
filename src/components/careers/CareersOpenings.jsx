import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Mail } from "lucide-react";
import Reveal from "../ui/Reveal";
import { careersEmpty, openings } from "../../data/careers";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const CareersOpenings = () => {
  const { reduceMotion, freezeLoops, ease } = useSimplifyMotion();
  const hasRoles = openings.length > 0;

  return (
    <section
      className="site-careers-open section-surface section-padding"
      id="openings"
    >
      <span aria-hidden className="site-careers-open-mark">
        ROLES
      </span>

      <div className="container-custom relative">
        <div className="mb-12 flex flex-col gap-6 border-b border-[var(--border-subtle)] pb-10 md:mb-16 md:flex-row md:items-end md:justify-between md:pb-12">
          <Reveal>
            <p className="label-premium mb-4">Open roles</p>
            <h2 className="font-display max-w-xl text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              Current
              <span className="block text-[var(--text-muted)]">openings</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="md:text-right">
              <p className="font-display text-4xl font-extrabold tracking-tight text-[var(--accent)] md:text-5xl">
                {String(openings.length).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {hasRoles
                  ? `role${openings.length === 1 ? "" : "s"} open`
                  : "roles · we’ll post here when we hire"}
              </p>
            </div>
          </Reveal>
        </div>

        {hasRoles ? (
          <ul className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {openings.map((role, i) => (
              <li key={role.id}>
                <a
                  href={role.href || "mailto:nuamtechnologies@gmail.com"}
                  className="group flex flex-col gap-4 py-8 transition-colors md:flex-row md:items-center md:justify-between md:gap-8 md:py-10"
                >
                  <div className="flex gap-5">
                    <span className="font-display text-xs font-semibold tracking-[0.2em] text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                        {role.title}
                      </p>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        {role.location} · {role.type}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]">
                    Apply
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <motion.div
              className="site-careers-empty relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] md:rounded-3xl"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              {/* Atmosphere */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--accent)]/15 blur-[100px]" />
                <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-[80px]" />
                <div className="noise-overlay absolute inset-0 opacity-20" />
              </div>

              {/* Frame corners */}
              <span className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-[var(--border-strong)] md:left-8 md:top-8" />
              <span className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-[var(--border-strong)] md:right-8 md:top-8" />
              <span className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-[var(--border-strong)] md:bottom-8 md:left-8" />
              <span className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[var(--border-strong)] md:bottom-8 md:right-8" />

              <div className="relative grid items-center gap-10 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-5">
                  <motion.span
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-white text-[var(--accent)] shadow-[0_12px_40px_rgba(107,138,255,0.15)]"
                    animate={freezeLoops ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Briefcase size={26} strokeWidth={1.75} />
                  </motion.span>
                  <p className="mt-8 font-display text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--accent)]">
                    STATUS · CLOSED
                  </p>
                  <h3 className="font-display mt-3 text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                    {careersEmpty.title}
                  </h3>
                </div>

                <div className="md:col-span-7">
                  <p className="max-w-lg text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                    {careersEmpty.body}
                  </p>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <a href={careersEmpty.cta.href} className="btn-accent">
                      <Mail size={16} />
                      {careersEmpty.cta.label}
                    </a>
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                    >
                      Or use contact
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default CareersOpenings;
