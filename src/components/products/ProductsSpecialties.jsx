import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { productsSpecialties } from "../../data/products";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ProductsSpecialties = () => {
  const { reduceMotion, ease } = useSimplifyMotion();
  const data = productsSpecialties;

  return (
    <section className="site-products-specs section-surface">
      <div className="container-custom">
        <Reveal>
          <div className="site-products-specs-head">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--accent)]" />
              <p className="label-premium">{data.label}</p>
            </div>
            <h2 className="site-products-specs-title font-display">
              {data.title}
            </h2>
            {data.support && (
              <p className="site-products-specs-support">{data.support}</p>
            )}
          </div>
        </Reveal>

        <div className="site-products-specs-grid">
          {data.items.map((item, i) => (
            <motion.article
              key={item.name}
              className="site-products-spec"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : i * 0.1,
                ease,
              }}
            >
              <p className="site-products-spec-index font-display">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="site-products-spec-name font-display">
                {item.name}
              </h3>
              <p className="site-products-spec-body">{item.body}</p>
              {item.points?.length > 0 && (
                <ul className="site-products-spec-points">
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

export default ProductsSpecialties;
