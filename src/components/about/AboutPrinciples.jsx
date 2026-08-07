import Reveal from "../ui/Reveal";
import { aboutPrinciples } from "../../data/about";

const AboutPrinciples = () => {
  return (
    <section className="section-ink section-padding relative overflow-hidden">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-custom relative">
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 border-b border-white/10 pb-10 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-premium !text-white/35 mb-4">Principles</p>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-white">
                What we
                <span className="block text-white/35">won’t compromise.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/40 md:text-right">
              Four beliefs that shape every engagement.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2">
          {aboutPrinciples.map((item, i) => {
            const isLeft = i % 2 === 0;
            const isTop = i < 2;
            return (
              <Reveal key={item.id} delay={Math.min(i * 0.08, 0.24)}>
                <article
                  className={[
                    "group py-10 md:py-12",
                    isLeft ? "md:pr-10 md:border-r md:border-white/10" : "md:pl-10",
                    isTop ? "border-b border-white/10" : "",
                    !isTop ? "border-b border-white/10 md:border-b-0" : "",
                    i === 2 ? "md:border-t-0" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-display text-xs font-semibold tracking-[0.22em] text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-white/15 transition-all duration-500 ease-expo group-hover:w-14 group-hover:bg-[var(--accent)]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55 md:text-[0.95rem]">
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
