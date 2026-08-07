import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { careersHero, openings } from "../../data/careers";

const ease = [0.16, 1, 0.3, 1];

const CareersHero = () => {
  const reduceMotion = useReducedMotion();
  const words = careersHero.headline.split(" ");
  const openCount = openings.length;

  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
      >
        <img
          src={careersHero.image}
          alt={careersHero.imageAlt}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          sizes="100vw"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 75% 35%, rgba(107,138,255,0.22) 0%, transparent 55%), linear-gradient(180deg, rgba(11,11,11,0.45) 0%, rgba(11,11,11,0.3) 42%, rgba(5,5,5,0.95) 100%)",
        }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-35" />

      <div className="pointer-events-none absolute inset-6 z-20 md:inset-10">
        <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-white/20" />
        <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-white/20" />
        <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-white/20" />
        <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-white/20" />
      </div>

      <div className="relative z-10 flex min-h-[90svh] flex-col justify-end px-5 pb-20 pt-[calc(var(--nav-height)+3rem)] md:px-8 md:pb-28">
        <div className="container-custom w-full">
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="label-premium !text-white/45">{careersHero.label}</p>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--accent)] backdrop-blur-sm">
              {openCount === 0
                ? "0 OPEN ROLES"
                : `${String(openCount).padStart(2, "0")} OPEN`}
            </span>
          </motion.div>

          <motion.div
            className="mt-6 h-px w-16 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          />

          <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
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
                    delay: reduceMotion ? 0 : 0.25 + i * 0.08,
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
            transition={{ duration: 0.75, delay: 0.65, ease }}
          >
            {careersHero.support}
          </motion.p>

          <motion.a
            href="#openings"
            className="mt-12 inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/40 transition-colors hover:text-[var(--accent)]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <ArrowDown size={14} className="animate-bounce text-[var(--accent)]" />
            See openings
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
