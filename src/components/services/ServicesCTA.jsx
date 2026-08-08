import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { servicesCta } from "../../data/services";

const ServicesCTA = () => {
  return (
    <section className="site-cta section-surface">
      <div className="container-custom">
        <Reveal>
          <div className="site-cta-panel rounded-2xl md:rounded-3xl">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--accent)]/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-[var(--accent)]/15 blur-[80px]" />
            <div className="noise-overlay absolute inset-0 opacity-30" />

            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="label-premium !text-white/35 mb-4">Next</p>
                <h2 className="site-cta-title font-display">
                  {servicesCta.title}
                </h2>
                <p className="site-cta-support">{servicesCta.support}</p>
              </div>

              <div className="site-cta-actions">
                <Link to={servicesCta.button.to} className="btn-accent">
                  {servicesCta.button.label}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`mailto:${servicesCta.email}`}
                  className="site-cta-email transition-colors hover:text-[var(--accent)]"
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
