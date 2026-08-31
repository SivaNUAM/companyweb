import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { productBrief } from "../../data/home";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ProductBrief = () => {
  const { reduceMotion, freezeLoops, ease } = useSimplifyMotion();
  const data = productBrief;

  return (
    <section className="site-product-brief section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />
      <div className="site-product-brief-glow is-a" aria-hidden />
      <div className="site-product-brief-glow is-b" aria-hidden />
      {!freezeLoops && (
        <motion.div
          className="site-product-brief-sweep"
          aria-hidden
          animate={{ x: ["-30%", "130%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="container-custom relative">
        <Reveal>
          <div className="site-product-brief-shell">
            <div className="site-product-brief-inner">
              <div className="site-product-brief-copy">
                <div className="site-product-brief-meta">
                  <span className="site-product-brief-rule" aria-hidden />
                  <p className="label-premium !text-white/45">{data.label}</p>
                  <span className="site-product-brief-pill">
                    <Sparkles size={11} strokeWidth={2.5} />
                    {data.poweredBy}
                  </span>
                </div>

                <motion.p
                  className="site-product-brief-brand font-display"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease }}
                >
                  {data.brand}
                </motion.p>

                <h2 className="site-product-brief-title font-display">
                  {data.title}
                </h2>
                <p className="site-product-brief-body">{data.body}</p>
                <p className="site-product-brief-note">{data.note}</p>

                <ul className="site-product-brief-points">
                  {data.points.map((point, i) => (
                    <motion.li
                      key={point.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: reduceMotion ? 0 : 0.08 + i * 0.07,
                        ease,
                      }}
                    >
                      <strong>{point.title}</strong>
                      <span>{point.detail}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="site-product-brief-tags">
                  {data.specialties.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="site-product-brief-actions">
                  <Link to={data.cta.to} className="btn-accent">
                    {data.cta.label}
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    to={data.secondaryCta.to}
                    className="site-product-brief-link"
                  >
                    {data.secondaryCta.label}
                  </Link>
                </div>
              </div>

              <motion.div
                className="site-product-brief-panel"
                initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
              >
                <div className="site-product-brief-panel-chrome">
                  <span />
                  <span />
                  <span />
                  <p className="font-display">{data.preview.title}</p>
                  {!freezeLoops && (
                    <motion.i
                      className="site-product-brief-live"
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      Live
                    </motion.i>
                  )}
                </div>

                <div className="site-product-brief-panel-body">
                  <div className="site-product-brief-metrics">
                    {data.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-display">{m.value}</p>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="site-product-brief-panel-kicker">
                    {data.preview.kicker}
                  </p>
                  <p className="site-product-brief-panel-stat font-display">
                    {data.preview.stat}
                  </p>
                  <p className="site-product-brief-panel-label">
                    {data.preview.statLabel}
                  </p>

                  <div className="site-product-brief-rows">
                    {data.preview.rows.map((row) => (
                      <div key={`${row.time}-${row.label}`}>
                        <span>{row.time}</span>
                        <strong>{row.label}</strong>
                        <em className={`is-${row.tone}`}>{row.status}</em>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProductBrief;
