import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { aboutApproach } from "../../data/about";

const ease = [0.16, 1, 0.3, 1];

const AboutApproach = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden section-surface section-padding">
      <div className="container-custom">
        <Reveal>
          <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-premium mb-4">Approach</p>
              <h2 className="font-display max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
                How we
                <span className="block text-[var(--text-muted)]">
                  move work forward.
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)] md:text-right">
              Discover → Design → Build → Evolve — clarity at every gate.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical spine on desktop */}
          <div className="pointer-events-none absolute bottom-0 left-[1.15rem] top-3 hidden w-px bg-[var(--border-subtle)] md:block" />
          <motion.div
            className="pointer-events-none absolute left-[1.15rem] top-3 hidden w-px origin-top bg-[var(--accent)] md:block"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease }}
            style={{ height: "calc(100% - 1.5rem)" }}
          />

          <div className="flex flex-col">
            {aboutApproach.map((step, i) => (
              <Reveal key={step.step} delay={Math.min(i * 0.07, 0.28)}>
                <div className="group relative grid gap-4 border-t border-[var(--border-subtle)] py-10 md:grid-cols-12 md:items-start md:gap-8 md:py-14">
                  <div className="relative z-10 flex items-center gap-4 md:col-span-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--surface)] font-display text-[0.65rem] font-bold tracking-wide text-[var(--accent)] shadow-[0_0_20px_rgba(107,138,255,0.15)] md:ml-0">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.03em] transition-colors group-hover:text-[var(--accent)] md:col-span-3 md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-xl text-[0.95rem] leading-relaxed text-[var(--text-secondary)] md:col-span-7 md:text-base">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[var(--border-subtle)]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
