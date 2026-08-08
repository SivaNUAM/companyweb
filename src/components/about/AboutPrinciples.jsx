import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { aboutPrinciples } from "../../data/about";

const AboutPrinciples = () => {
  return (
    <section className="site-about-prin section-ink section-padding">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/12 blur-[120px]" />
        <div className="noise-overlay absolute inset-0 opacity-20" />
      </div>

      <div className="container-custom relative">
        <Reveal>
          <div className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-10 md:mb-20 md:flex-row md:items-end md:justify-between md:pb-12">
            <div>
              <p className="label-premium !text-white/35 mb-4">Principles</p>
              <h2 className="site-about-prin-title font-display text-white">
                What we
                <span className="block text-white/35">won’t compromise.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right">
              Four beliefs that shape every corporate engagement.
            </p>
          </div>
        </Reveal>

        <div className="site-about-prin-grid">
          {aboutPrinciples.map((item, i) => {
            const isLeft = i % 2 === 0;
            const isTop = i < 2;
            return (
              <Reveal key={item.id} delay={Math.min(i * 0.08, 0.24)}>
                <article
                  className={[
                    "site-about-prin-card group py-10 md:py-14",
                    isLeft ? "md:pr-12 md:border-r md:border-white/10" : "md:pl-12",
                    isTop ? "border-b border-white/10" : "",
                    !isTop ? "border-b border-white/10 md:border-b-0" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <motion.div
                    aria-hidden
                    className="site-about-prin-ghost transition-colors duration-500 group-hover:text-[var(--accent)]/[0.08]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.div>

                  <div className="relative mb-6 flex items-center justify-between">
                    <span className="font-display text-xs font-semibold tracking-[0.22em] text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-white/15 transition-all duration-500 ease-expo group-hover:w-16 group-hover:bg-[var(--accent)]" />
                  </div>
                  <h3 className="relative font-display text-2xl font-bold tracking-[-0.03em] text-white transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-[0.95rem]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutPrinciples;
