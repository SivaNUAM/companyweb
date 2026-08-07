import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { servicesEngagement } from "../../data/services";

const ease = [0.16, 1, 0.3, 1];

const ServicesEngagement = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden section-ink section-padding">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
        <div className="absolute -left-20 top-1/3 h-[24rem] w-[24rem] rounded-full bg-[var(--accent)]/10 blur-[110px]" />
        <div className="noise-overlay absolute inset-0 opacity-20" />
      </div>

      <div className="container-custom relative">
        <Reveal>
          <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-premium !text-white/35 mb-4">Engagement</p>
              <h2 className="font-display max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-white">
                How we
                <span className="block text-white/35">work with you.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right">
              A clear path from brief to production — without the agency fog.
            </p>
          </div>
        </Reveal>

        {/* Progress spine */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block" />
          <motion.div
            className="pointer-events-none absolute left-0 top-8 hidden h-px origin-left bg-[var(--accent)] lg:block"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease }}
            style={{ width: "100%" }}
          />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {servicesEngagement.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <div
                  className={`relative lg:px-8 ${
                    i > 0 ? "lg:border-l lg:border-white/10" : "lg:pl-0"
                  }`}
                >
                  <div className="relative mb-6 flex items-center gap-3">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--accent)]/50 bg-ink font-display text-xs font-bold tracking-wide text-[var(--accent)] shadow-[0_0_24px_rgba(107,138,255,0.25)]">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesEngagement;
