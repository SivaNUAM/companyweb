import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { portfolioCta } from "../../data/portfolio";

const PortfolioCTA = () => {
  return (
    <section className="site-cta">
      <Reveal>
        <div className="site-cta-panel">
          <div className="noise-overlay absolute inset-0 opacity-30" />
          <div className="relative z-10 max-w-3xl">
            <p className="label-premium !text-white/35 mb-4">Next</p>
            <h2 className="site-cta-title font-display">{portfolioCta.title}</h2>
            <p className="site-cta-support">{portfolioCta.support}</p>
            <div className="site-cta-actions">
              <Link to={portfolioCta.button.to} className="btn-accent">
                {portfolioCta.button.label}
                <ArrowRight size={16} />
              </Link>
              <a
                href={`mailto:${portfolioCta.email}`}
                className="site-cta-email transition-colors hover:text-[var(--accent)]"
              >
                {portfolioCta.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default PortfolioCTA;
