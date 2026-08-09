import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal";

/**
 * Shared legal document shell for Privacy + Terms.
 */
const LegalDoc = ({ label, title, updated, children }) => {
  return (
    <section className="site-legal section-surface">
      <div className="site-legal-hero">
        <div className="container-custom">
          <Reveal>
            <p className="label-premium mb-4">{label}</p>
            <h1 className="site-legal-title font-display">{title}</h1>
            <p className="site-legal-updated">Last updated · {updated}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-custom site-legal-body">
        <Reveal delay={0.06}>
          <div className="site-legal-content">{children}</div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="site-legal-footer">
            <p>
              Questions? Reach us at{" "}
              <a href="mailto:nuamtechnologies@gmail.com">
                nuamtechnologies@gmail.com
              </a>{" "}
              or{" "}
              <a href="tel:+918089623759">+91 80896 23759</a>.
            </p>
            <div className="site-legal-actions">
              <Link to="/contact" className="btn-accent">
                Contact us
              </Link>
              <Link to="/" className="site-legal-home">
                Back to home
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LegalDoc;
