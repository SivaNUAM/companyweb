import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { careersHero, openings } from "../../data/careers";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const CareersHero = () => {
  const { reduceMotion, kenBurns, ease } = useSimplifyMotion();
  const words = careersHero.headline.split(" ");
  const openCount = openings.length;

  return (
    <section className="site-phero is-careers">
      <motion.div
        className="absolute inset-0"
        initial={kenBurns ? { scale: kenBurns.from } : false}
        animate={{ scale: 1 }}
        transition={
          kenBurns ? { duration: kenBurns.duration, ease } : undefined
        }
      >
        <img
          src={careersHero.image}
          alt={careersHero.imageAlt}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
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

      <div className="site-phero-frame">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="site-phero-content">
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

          <h1 className="site-phero-headline">
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
            className="site-phero-support"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.65, ease }}
          >
            {careersHero.support}
          </motion.p>

          <motion.a
            href="#openings"
            className="site-phero-cue transition-colors hover:text-[var(--accent)]"
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
