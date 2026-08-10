import { motion } from "framer-motion";
import { aboutHero } from "../../data/about";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const AboutHero = () => {
  const { reduceMotion, simplify, kenBurns, ease } = useSimplifyMotion();
  const words = aboutHero.headline.split(" ");
  const d = simplify ? 0.55 : 1;

  return (
    <section className="site-phero is-about relative overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute inset-0"
        initial={kenBurns ? { scale: kenBurns.from } : false}
        animate={{ scale: 1 }}
        transition={
          kenBurns ? { duration: kenBurns.duration, ease } : undefined
        }
      >
        <img
          src={aboutHero.image}
          alt={aboutHero.imageAlt}
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
            "radial-gradient(ellipse 60% 45% at 20% 70%, rgba(107,138,255,0.2) 0%, transparent 55%), linear-gradient(180deg, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.28) 42%, rgba(5,5,5,0.94) 100%)",
        }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-35" />

      <div className="site-phero-frame" aria-hidden>
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
            transition={{ duration: 0.7 * d, ease }}
          >
            <p className="label-premium !text-white/45">{aboutHero.label}</p>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--accent)] md:backdrop-blur-sm">
              EST. 2025 · CORP 2026
            </span>
          </motion.div>

          <div className="mt-5 overflow-hidden">
            <motion.p
              className="site-phero-brand font-display"
              style={{ textShadow: "0 0 80px rgba(107,138,255,0.35)" }}
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.15 * d, ease, delay: 0.08 * d }}
            >
              {aboutHero.brand}
            </motion.p>
          </div>

          <motion.div
            className="mt-6 h-px w-16 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9 * d, ease, delay: 0.35 * d }}
          />

          <h1 className="site-phero-headline font-display font-bold">
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
                    duration: 0.85 * d,
                    delay: reduceMotion
                      ? 0
                      : (0.4 + i * (simplify ? 0.03 : 0.055)) * d,
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
            transition={{
              duration: 0.8 * d,
              delay: reduceMotion ? 0 : 0.75 * d,
              ease,
            }}
          >
            {aboutHero.support}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
