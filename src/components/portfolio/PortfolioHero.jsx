import { motion } from "framer-motion";
import { portfolioHero } from "../../data/portfolio";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const PortfolioHero = () => {
  const { reduceMotion, kenBurns, ease } = useSimplifyMotion();
  const words = portfolioHero.headline.split(" ");

  return (
    <section className="site-phero is-portfolio">
      <motion.div
        className="absolute inset-0"
        initial={kenBurns ? { scale: kenBurns.from } : false}
        animate={{ scale: 1 }}
        transition={
          kenBurns ? { duration: kenBurns.duration, ease } : undefined
        }
      >
        <img
          src={portfolioHero.image}
          alt={portfolioHero.imageAlt}
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
            "linear-gradient(180deg, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.28) 42%, rgba(11,11,11,0.92) 100%)",
        }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

      <div className="site-phero-content">
        <div className="container-custom w-full">
          <motion.p
            className="label-premium !text-white/45"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {portfolioHero.label}
          </motion.p>

          <motion.div
            className="mt-5 h-px w-12 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
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
                    duration: 0.85,
                    delay: reduceMotion ? 0 : 0.35 + i * 0.05,
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
              delay: reduceMotion ? 0 : 0.95,
              ease,
            }}
          >
            {portfolioHero.support}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
