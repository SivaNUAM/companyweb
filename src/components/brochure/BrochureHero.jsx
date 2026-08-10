import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { brochureMeta } from "../../data/brochure";

const ease = [0.16, 1, 0.3, 1];

const BrochureHero = ({ onDownload }) => (
  <section className="site-brochure-hero" data-cursor-tone="dark">
    <div className="site-brochure-hero-bg" aria-hidden>
      <div className="site-brochure-hero-orb is-coral" />
      <div className="site-brochure-hero-orb is-teal" />
      <div className="site-brochure-hero-orb is-violet" />
      <div className="site-brochure-hero-orb is-amber" />
      <div className="site-brochure-hero-glow" />
      <div className="site-brochure-hero-grid" />
      <div className="noise-overlay opacity-25" />
    </div>

    <div className="container-custom site-brochure-hero-inner">
      <motion.p
        className="site-brochure-hero-eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        Company profile
      </motion.p>

      <motion.h1
        className="site-brochure-hero-brand font-display"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.08, ease }}
      >
        {brochureMeta.brand}
      </motion.h1>

      <motion.div
        className="site-brochure-hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.28, ease }}
      >
        <span className="site-brochure-hero-rule" aria-hidden />
        <span>{brochureMeta.subBrand}</span>
        <span className="site-brochure-hero-tag">{brochureMeta.tagline}</span>
      </motion.div>

      <motion.div
        className="site-brochure-hero-spectrum"
        aria-hidden
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.32, ease }}
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </motion.div>

      <motion.p
        className="site-brochure-hero-support"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.36, ease }}
      >
        {brochureMeta.support}
      </motion.p>

      <motion.div
        className="site-brochure-hero-actions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.48, ease }}
      >
        <button type="button" className="btn-accent" onClick={onDownload}>
          Download PDF
          <Download size={15} strokeWidth={2.25} />
        </button>
        <a href="#brochure-deck" className="site-brochure-hero-scroll">
          Enter profile
          <ArrowDown size={14} strokeWidth={2.25} />
        </a>
      </motion.div>
    </div>
  </section>
);

export default BrochureHero;
