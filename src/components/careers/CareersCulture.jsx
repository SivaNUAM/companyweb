import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { careersCulture } from "../../data/careers";

const ease = [0.16, 1, 0.3, 1];

const CareersCulture = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden section-ink section-padding">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/12 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[20rem] w-[20rem] rounded-full bg-[var(--accent)]/8 blur-[90px]" />
        <div className="noise-overlay absolute inset-0 opacity-20" />
      </div>

      <div className="container-custom relative">
        <Reveal>
          <div className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-10 md:mb-20 md:flex-row md:items-end md:justify-between md:pb-12">
            <div>
              <p className="label-premium !text-white/35 mb-4">
                {careersCulture.label}
              </p>
              <h2 className="font-display max-w-xl text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-white">
                {careersCulture.title.split(". ").map((part, i, arr) => (
                  <span key={part} className={i > 0 ? "block text-white/35" : "block"}>
                    {part}
                    {i < arr.length - 1 ? "." : ""}
                  </span>
                ))}
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right">
              What working at Nuam Technologies Pvt Ltd feels like — when we hire
              again.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-0 md:grid-cols-3">
          {careersCulture.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.1}>
              <article
                className={`group relative overflow-hidden border-t border-white/10 py-10 md:border-t-0 md:px-8 md:py-4 ${
                  i > 0 ? "md:border-l md:border-white/10" : "md:pl-0"
                } ${i < careersCulture.items.length - 1 ? "border-b border-white/10 md:border-b-0" : ""}`}
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 top-0 font-display text-[5.5rem] font-extrabold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-[var(--accent)]/[0.1]"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                <p className="relative font-display text-[0.65rem] font-semibold tracking-[0.22em] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="relative mt-5 h-px w-8 bg-white/15 transition-all duration-500 ease-expo group-hover:w-14 group-hover:bg-[var(--accent)]" />
                <h3 className="relative mt-5 font-display text-xl font-bold tracking-tight text-white transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 md:text-2xl">
                  {item.title}
                </h3>
                <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-white/50 md:text-[0.95rem]">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersCulture;
