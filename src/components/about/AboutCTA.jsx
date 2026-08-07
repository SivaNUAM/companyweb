import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { aboutCta } from "../../data/about";

const AboutCTA = () => {
  return (
    <section className="section-surface section-padding">
      <div className="container-custom">
        <Reveal>
          <div className="relative overflow-hidden bg-ink px-6 py-16 text-white md:px-12 md:py-24 lg:px-16">
            <div className="noise-overlay absolute inset-0 opacity-30" />
            <div className="relative z-10 max-w-3xl">
              <p className="label-premium !text-white/35 mb-4">Next</p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold tracking-[-0.03em]">
                {aboutCta.title}
              </h2>
              <p className="mt-5 text-base text-white/60 md:text-lg">
                {aboutCta.support}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to={aboutCta.button.to} className="btn-accent">
                  {aboutCta.button.label}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`mailto:${aboutCta.email}`}
                  className="text-sm font-semibold tracking-wide text-white/55 transition-colors hover:text-[var(--accent)]"
                >
                  {aboutCta.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutCTA;
