import { motion, useReducedMotion } from "framer-motion";
import { aboutHero } from "../../data/about";

const ease = [0.16, 1, 0.3, 1];

const AboutHero = () => {
  const reduceMotion = useReducedMotion();
  const words = aboutHero.headline.split(" ");

  return (
    <section className="relative min-h-[85svh] overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease }}
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
            "linear-gradient(180deg, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.25) 40%, rgba(11,11,11,0.88) 100%)",
        }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative z-10 flex min-h-[85svh] flex-col justify-end px-5 pb-16 pt-[calc(var(--nav-height)+3rem)] md:px-8 md:pb-24">
        <div className="container-custom w-full">
          <motion.p
            className="label-premium !text-white/45"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {aboutHero.label}
          </motion.p>

          <div className="mt-4 overflow-hidden">
            <motion.p
              className="font-display text-[clamp(3rem,12vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-[var(--accent)]"
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.1 }}
            >
              {aboutHero.brand}
            </motion.p>
          </div>

          <motion.div
            className="mt-6 h-px w-12 origin-left bg-[var(--accent)] md:w-16"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
          />

          <h1 className="mt-7 max-w-3xl font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em]">
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
                    delay: reduceMotion ? 0 : 0.55 + i * 0.06,
                    ease,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: reduceMotion ? 0 : 1.1,
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
