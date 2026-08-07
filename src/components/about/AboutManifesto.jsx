import { motion, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { aboutManifesto } from "../../data/about";

const ease = [0.16, 1, 0.3, 1];

const AboutManifesto = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden section-surface section-padding">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 top-10 select-none font-display text-[min(40vw,18rem)] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink)]/[0.03]"
      >
        STORY
      </span>

      <div className="container-custom relative grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="label-premium mb-5">{aboutManifesto.label}</p>
            <div className="h-px w-12 bg-[var(--accent)]" />
            <p className="mt-6 max-w-[18ch] text-sm leading-relaxed text-[var(--text-secondary)]">
              Who we are when the pitch deck is closed.
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <span
            aria-hidden
            className="font-display mb-2 block text-6xl font-extrabold leading-none text-[var(--accent)] md:text-7xl"
          >
            “
          </span>
          <div className="space-y-6 md:space-y-8">
            {aboutManifesto.paragraphs.map((p, i) => (
              <motion.p
                key={p}
                className={`font-display text-[clamp(1.35rem,2.8vw,2.35rem)] font-semibold leading-[1.25] tracking-[-0.025em] ${
                  i === 0 ? "text-[var(--ink)]" : "text-[var(--text-secondary)]"
                }`}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutManifesto;
