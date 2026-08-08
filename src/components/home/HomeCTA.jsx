import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { cta } from "../../data/home";

const HomeCTA = () => {
  return (
    <section className="site-cta">
      <Reveal>
        <div className="site-cta-panel">
          <div className="noise-overlay absolute inset-0 opacity-30" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="site-cta-title font-display">{cta.title}</h2>
            <p className="site-cta-support">{cta.support}</p>
            <div className="site-cta-actions">
              <Link to={cta.button.to} className="btn-accent">
                {cta.button.label}
                <ArrowRight size={16} />
              </Link>
              <a
                href={`mailto:${cta.email}`}
                className="site-cta-email transition-colors hover:text-[var(--accent)]"
              >
                {cta.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default HomeCTA;
