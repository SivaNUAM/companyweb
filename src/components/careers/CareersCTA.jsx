import { Mail } from "lucide-react";
import Reveal from "../ui/Reveal";
import { careersCta } from "../../data/careers";

const CareersCTA = () => {
  return (
    <section className="section-surface section-padding">
      <div className="container-custom">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-16 text-white md:rounded-3xl md:px-12 md:py-24 lg:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--accent)]/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-[80px]" />
            <div className="noise-overlay absolute inset-0 opacity-30" />

            {/* Frame */}
            <span className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-white/15 md:left-10 md:top-10" />
            <span className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-white/15 md:right-10 md:top-10" />
            <span className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-white/15 md:bottom-10 md:left-10" />
            <span className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-white/15 md:bottom-10 md:right-10" />

            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="label-premium !text-white/35 mb-4">Talent network</p>
                <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-[-0.03em]">
                  {careersCta.title}
                </h2>
                <p className="mt-5 text-base text-white/60 md:text-lg">
                  {careersCta.support}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href={careersCta.button.href} className="btn-accent">
                  <Mail size={16} />
                  {careersCta.button.label}
                </a>
                <a
                  href={`mailto:${careersCta.email}`}
                  className="text-sm font-semibold tracking-wide text-white/55 transition-colors hover:text-[var(--accent)]"
                >
                  {careersCta.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CareersCTA;
