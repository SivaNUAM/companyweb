import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { productsHero } from "../../data/products";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ProductsHero = () => {
  const { reduceMotion, simplify, kenBurns, freezeLoops, ease } =
    useSimplifyMotion();
  const words = productsHero.headline.split(" ");

  return (
    <section className="site-products-hero" data-cursor-tone="dark">
      <motion.div
        className="site-products-hero-media"
        initial={kenBurns ? { scale: kenBurns.from } : false}
        animate={{ scale: 1 }}
        transition={
          kenBurns ? { duration: kenBurns.duration, ease } : undefined
        }
      >
        <img
          src={productsHero.image}
          alt={productsHero.imageAlt}
          className="site-products-hero-img"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
      </motion.div>

      <div className="site-products-hero-veil" aria-hidden />
      <div className="site-products-hero-glow" aria-hidden />
      {!simplify && !freezeLoops && (
        <motion.div
          className="site-products-hero-sweep"
          aria-hidden
          animate={{ x: ["-20%", "120%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
      )}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-35" />

      <div className="site-products-hero-frame" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="container-custom site-products-hero-inner">
        <motion.div
          className="site-products-hero-meta"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="label-premium !text-white/45">{productsHero.label}</p>
          <span className="site-products-hero-pill">Clinic OS</span>
        </motion.div>

        <motion.div
          className="site-products-hero-rule"
          aria-hidden
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease, delay: reduceMotion ? 0 : 0.15 }}
        />

        <h1 className="sr-only">
          {productsHero.brand} — {productsHero.headline}
        </h1>

        <p className="site-products-hero-brand font-display" aria-hidden>
          {productsHero.brand.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="site-products-hero-brand-char"
              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0.2 : simplify ? 0.45 : 0.85,
                delay: reduceMotion ? 0 : 0.2 + i * 0.06,
                ease,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </p>

        <motion.p
          className="site-products-hero-powered"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            ease,
            delay: reduceMotion ? 0 : 0.48,
          }}
        >
          <motion.span
            className="site-products-hero-dot"
            aria-hidden
            animate={
              freezeLoops
                ? undefined
                : { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {productsHero.poweredBy}
        </motion.p>

        <p className="site-products-hero-headline font-display" aria-hidden>
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="site-products-hero-word"
            >
              <motion.span
                className="inline-block"
                initial={reduceMotion ? false : { y: "115%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: reduceMotion ? 0.2 : simplify ? 0.5 : 0.8,
                  delay: reduceMotion ? 0 : 0.55 + i * 0.06,
                  ease,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        <motion.p
          className="site-products-hero-support"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease,
            delay: reduceMotion ? 0 : 0.95,
          }}
        >
          {productsHero.support}
        </motion.p>

        <motion.div
          className="site-products-hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            ease,
            delay: reduceMotion ? 0 : 1.08,
          }}
        >
          <Link to={productsHero.primaryCta.to} className="btn-accent">
            {productsHero.primaryCta.label}
            <ArrowRight size={16} />
          </Link>
          <a
            href={productsHero.secondaryCta.href}
            className="site-products-hero-link"
          >
            {productsHero.secondaryCta.label}
          </a>
        </motion.div>

        <motion.a
          href="#clms"
          className="site-products-hero-cue"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 1.25, duration: 0.6 }}
        >
          <ArrowDown size={14} className="animate-bounce text-[var(--accent)]" />
          See CLMS
        </motion.a>
      </div>
    </section>
  );
};

export default ProductsHero;
