import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { serviceOfferings } from "../../data/services";

const ease = [0.16, 1, 0.3, 1];

const ServiceRow = ({ service, index }) => {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const reverse = index % 2 === 1;

  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)} amount={0.2}>
      <article
        id={service.id}
        className="scroll-mt-28 border-t border-[var(--border-subtle)] py-14 md:py-20"
      >
        <div
          className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
            reverse ? "" : ""
          }`}
        >
          <div
            className={`lg:col-span-6 ${
              reverse ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ink md:aspect-[16/11]">
              <motion.img
                src={service.image}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                initial={reduceMotion ? false : { scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.2, ease }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <span className="absolute left-5 top-5 font-display text-xs font-semibold tracking-[0.22em] text-white/70 md:left-6 md:top-6">
                {number}
              </span>
            </div>
          </div>

          <div
            className={`lg:col-span-6 ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <p className="label-premium mb-3">{service.tagline}</p>
            <h2 className="font-display text-[clamp(1.85rem,3.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {service.title}
            </h2>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-[var(--text-secondary)] md:text-base">
              {service.body}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]"
                >
                  <span className="mr-2 inline-block h-1 w-1 rounded-full bg-[var(--accent)] align-middle" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
            >
              <span className="border-b border-[var(--ink)] pb-1 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                Start this engagement
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-all duration-500 ease-expo group-hover:translate-x-0.5 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const ServicesList = () => {
  return (
    <section className="section-surface section-padding !pt-10 md:!pt-14">
      <div className="container-custom">
        <Reveal>
          <div className="mb-4 flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-10 md:mb-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-premium mb-4">Offerings</p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
                Six ways we
                <span className="block text-[var(--text-muted)]">create leverage.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)] md:text-right">
              Mix and match — most clients engage across two or more capabilities.
            </p>
          </div>
        </Reveal>

        {serviceOfferings.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
