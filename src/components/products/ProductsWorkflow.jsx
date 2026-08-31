import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { productsWorkflow } from "../../data/products";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ProductsWorkflow = () => {
  const { reduceMotion, ease } = useSimplifyMotion();
  const data = productsWorkflow;

  return (
    <section className="site-products-flow section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="container-custom relative">
        <Reveal>
          <div className="site-products-flow-head">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium !text-white/40">{data.label}</p>
              </div>
              <h2 className="site-products-flow-title font-display">
                {data.title[0]}
                <span className="block text-white/40">{data.title[1]}</span>
              </h2>
            </div>
            <p className="site-products-flow-support">{data.support}</p>
          </div>
        </Reveal>

        <div className="site-products-flow-list">
          {data.steps.map((step, i) => (
            <motion.article
              key={step.step}
              className="site-products-flow-step"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : i * 0.08,
                ease,
              }}
            >
              <p className="site-products-flow-num font-display">{step.step}</p>
              <div>
                <h3 className="site-products-flow-name font-display">
                  {step.title}
                </h3>
                <p className="site-products-flow-body">{step.body}</p>
                <ul className="site-products-flow-points">
                  {step.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsWorkflow;
