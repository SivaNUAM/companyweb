import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { cta } from "../../data/home";

const HomeCTA = () => {
  return (
    <section className="section-padding pt-8 md:pt-12">
      <div className="container-custom">
        <Reveal>
          <div className="relative overflow-hidden bg-ink px-6 py-16 text-white md:px-12 md:py-24 lg:px-16">
            <div className="noise-overlay absolute inset-0 opacity-30" />
            <div className="relative z-10 max-w-3xl">
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {cta.title}
              </h2>
              <p className="mt-5 text-base text-white/65 md:text-lg">
                {cta.support}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to={cta.button.to} className="btn-accent">
                  {cta.button.label}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`mailto:${cta.email}`}
                  className="text-sm font-semibold tracking-wide text-white/60 transition-colors hover:text-[var(--accent)]"
                >
                  {cta.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HomeCTA;
