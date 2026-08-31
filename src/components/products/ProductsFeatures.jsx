import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { productsFeatures } from "../../data/products";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ProductsFeatures = () => {
  const { reduceMotion, ease } = useSimplifyMotion();
  const data = productsFeatures;

  return (
    <section className="site-products-features section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[55%] w-[55%] rounded-full bg-[var(--accent)]/[0.08] blur-[110px]"
        aria-hidden
      />
      <div className="container-custom relative">
        <Reveal>
          <div className="site-products-features-head">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium !text-white/40">{data.label}</p>
              </div>
              <h2 className="site-products-features-title font-display">
                {data.title[0]}
                <span className="block text-white/40">{data.title[1]}</span>
              </h2>
            </div>
            <p className="site-products-features-support">{data.support}</p>
          </div>
        </Reveal>

        <div className="site-products-features-grid">
          {data.items.map((item, i) => (
            <motion.article
              key={item.id}
              className="site-products-feature"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : Math.min(i * 0.06, 0.3),
                ease,
              }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
            >
              <span className="site-products-feature-index font-display">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="site-products-feature-title font-display">
                {item.title}
              </h3>
              <p className="site-products-feature-body">{item.body}</p>
              {item.points?.length > 0 && (
                <ul className="site-products-feature-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsFeatures;
