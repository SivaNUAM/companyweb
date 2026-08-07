import Reveal from "../ui/Reveal";
import { servicesEngagement } from "../../data/services";

const ServicesEngagement = () => {
  return (
    <section className="section-ink section-padding relative overflow-hidden">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-custom relative">
        <Reveal>
          <div className="mb-14 md:mb-20">
            <p className="label-premium !text-white/35 mb-4">Engagement</p>
            <h2 className="font-display max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em] text-white">
              How we
              <span className="block text-white/35">work with you.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {servicesEngagement.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08}>
              <div
                className={`lg:px-8 ${
                  i > 0 ? "lg:border-l lg:border-white/10" : "lg:pl-0"
                }`}
              >
                <span className="font-display text-xs font-semibold tracking-[0.22em] text-[var(--accent)]">
                  {item.step}
                </span>
                <h3 className="font-display mt-5 text-xl font-bold tracking-[-0.03em] text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesEngagement;
