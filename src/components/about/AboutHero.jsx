import { motion, useReducedMotion } from "framer-motion";
import { aboutHero } from "../../data/about";

const ease = [0.16, 1, 0.3, 1];

const AboutHero = () => {
  const reduceMotion = useReducedMotion();
  const words = aboutHero.headline.split(" ");

  return (
    <section className="site-phero is-about relative overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
      >
        <img
          src={aboutHero.image}
          alt={aboutHero.imageAlt}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
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
            transition={{ duration: 0.7, ease }}
          >
            <p className="label-premium !text-white/45">{aboutHero.label}</p>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--accent)] backdrop-blur-sm">
              EST. 2025 · CORP 2026
            </span>
          </motion.div>

          <div className="mt-5 overflow-hidden">
            <motion.p
              className="site-phero-brand font-display"
              style={{ textShadow: "0 0 80px rgba(107,138,255,0.35)" }}
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.15, ease, delay: 0.12 }}
            >
              {aboutHero.brand}
            </motion.p>
          </div>

          <motion.div
            className="mt-6 h-px w-16 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
          />

          <h1 className="site-phero-headline font-display">
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
                    delay: reduceMotion ? 0 : 0.55 + i * 0.055,
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
              duration: 0.8,
              delay: reduceMotion ? 0 : 1.05,
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
