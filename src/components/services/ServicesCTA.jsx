import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { servicesCta } from "../../data/services";

const ServicesCTA = () => {
  return (
    <section className="section-surface section-padding">
      <div className="container-custom">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-16 text-white md:rounded-3xl md:px-12 md:py-24 lg:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--accent)]/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-[80px]" />
            <div className="noise-overlay absolute inset-0 opacity-30" />

            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="label-premium !text-white/35 mb-4">Next</p>
                <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-[-0.03em]">
                  {servicesCta.title}
                </h2>
                <p className="mt-5 text-base text-white/60 md:text-lg">
                  {servicesCta.support}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to={servicesCta.button.to} className="btn-accent">
                  {servicesCta.button.label}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`mailto:${servicesCta.email}`}
                  className="text-sm font-semibold tracking-wide text-white/55 transition-colors hover:text-[var(--accent)]"
                >
                  {servicesCta.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesCTA;
