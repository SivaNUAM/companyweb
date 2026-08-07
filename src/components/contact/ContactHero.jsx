import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { contactHero } from "../../data/contact";

const ease = [0.16, 1, 0.3, 1];

const ContactHero = () => {
  const reduceMotion = useReducedMotion();
  const words = contactHero.headline.split(" ");

  return (
    <section className="relative min-h-[85svh] overflow-hidden bg-[var(--surface)] text-[var(--ink)]">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <img
          src={contactHero.image}
          alt={contactHero.imageAlt}
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
        />
      </motion.div>

      {/* Soft color wash — keeps HD photo visible and readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(246,245,242,0.92) 0%, rgba(246,245,242,0.72) 40%, rgba(246,245,242,0.28) 72%, rgba(246,245,242,0.1) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface)]/50 via-transparent to-transparent" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-15" />

      <div className="pointer-events-none absolute inset-6 z-20 md:inset-10">
        <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-[var(--ink)]/12" />
        <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-[var(--ink)]/12" />
        <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-[var(--ink)]/12" />
        <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-[var(--ink)]/12" />
      </div>

      <div className="relative z-10 flex min-h-[85svh] flex-col justify-end px-5 pb-20 pt-[calc(var(--nav-height)+3rem)] md:px-8 md:pb-28">
        <div className="container-custom w-full">
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="label-premium">{contactHero.label}</p>
            <span className="rounded-full border border-[var(--border-subtle)] bg-white/80 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--accent)] backdrop-blur-sm">
              REPLY · 1 BUSINESS DAY
            </span>
          </motion.div>

          <motion.div
            className="mt-6 h-px w-16 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, ease, delay: 0.2 }}
          />

          <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.045em]">
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
                    delay: reduceMotion ? 0 : 0.2 + i * 0.05,
                    ease,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            {contactHero.support}
          </motion.p>

          <motion.a
            href="#contact-form"
            className="mt-12 inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.55 }}
          >
            <ArrowDown size={14} className="animate-bounce text-[var(--accent)]" />
            Send a brief
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
