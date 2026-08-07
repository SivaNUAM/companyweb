import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { serviceOfferings, servicesHero } from "../../data/services";

const ease = [0.16, 1, 0.3, 1];

const ServicesHero = () => {
  const reduceMotion = useReducedMotion();
  const words = servicesHero.headline.split(" ");

  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
      >
        <img
          src={servicesHero.image}
          alt={servicesHero.imageAlt}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          sizes="100vw"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 30%, rgba(107,138,255,0.22) 0%, transparent 55%), linear-gradient(180deg, rgba(11,11,11,0.45) 0%, rgba(11,11,11,0.25) 40%, rgba(5,5,5,0.94) 100%)",
        }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-35" />

      {/* Frame corners */}
      <div className="pointer-events-none absolute inset-6 z-20 md:inset-10">
        <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-white/20" />
        <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-white/20" />
        <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-white/20" />
        <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-white/20" />
      </div>

      <div className="relative z-10 flex min-h-[90svh] flex-col justify-end px-5 pb-20 pt-[calc(var(--nav-height)+3rem)] md:px-8 md:pb-28">
        <div className="container-custom w-full">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="label-premium !text-white/45">{servicesHero.label}</p>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--accent)] backdrop-blur-sm">
                  {String(serviceOfferings.length).padStart(2, "0")} CAPABILITIES
                </span>
              </motion.div>

              <motion.div
                className="mt-6 h-px w-16 origin-left bg-[var(--accent)]"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
              />

              <h1 className="mt-7 font-display text-[clamp(2.25rem,5.5vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
                {words.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="mr-[0.28em] inline-block overflow-hidden align-bottom"
                  >
                    <motion.span
                      className="inline-block"
                      initial={reduceMotion ? false : { y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.85,
                        delay: reduceMotion ? 0 : 0.3 + i * 0.05,
                        ease,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: reduceMotion ? 0 : 0.9,
                  ease,
                }}
              >
                {servicesHero.support}
              </motion.p>
            </div>

            {/* Jump chips */}
            <motion.div
              className="flex max-w-sm flex-wrap gap-2 lg:justify-end"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7, ease }}
            >
              {serviceOfferings.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.65rem] font-semibold tracking-wide text-white/55 backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-white"
                >
                  {String(i + 1).padStart(2, "0")} {s.title.split(" ")[0]}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="mt-14 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/35"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <ArrowDown size={14} className="animate-bounce text-[var(--accent)]" />
            Explore offerings
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
