import Reveal from "../ui/Reveal";
import { aboutApproach } from "../../data/about";

const AboutApproach = () => {
  return (
    <section className="section-surface section-padding">
      <div className="container-custom">
        <Reveal>
          <div className="mb-14 md:mb-20">
            <p className="label-premium mb-4">Approach</p>
            <h2 className="font-display max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              How we
              <span className="block text-[var(--text-muted)]">move work forward.</span>
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col">
          {aboutApproach.map((step, i) => (
            <Reveal key={step.step} delay={Math.min(i * 0.06, 0.2)}>
              <div className="group grid gap-4 border-t border-[var(--border-subtle)] py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-12">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-[var(--accent)] md:col-span-2">
                  {step.step}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-[-0.03em] md:col-span-3 md:text-3xl">
                  {step.title}
                </h3>
                <p className="max-w-xl text-[0.95rem] leading-relaxed text-[var(--text-secondary)] md:col-span-7 md:text-base">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-[var(--border-subtle)]" />
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
