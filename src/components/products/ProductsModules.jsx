import Reveal from "../ui/Reveal";
import { productsModules } from "../../data/products";

const ProductsModules = () => {
  const data = productsModules;

  return (
    <section className="site-products-modules section-surface">
      <div className="container-custom">
        <Reveal>
          <div className="site-products-modules-head">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium">{data.label}</p>
              </div>
              <h2 className="site-products-modules-title font-display">
                {data.title[0]}
                <span className="block text-[var(--text-muted)]">
                  {data.title[1]}
                </span>
              </h2>
            </div>
            <p className="site-products-modules-support">{data.support}</p>
          </div>
        </Reveal>

        <div className="site-products-modules-grid">
          {data.items.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 0.05, 0.2)}>
              <article className="site-products-module">
                <p className="site-products-module-index font-display">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="site-products-module-name font-display">
                  {item.name}
                </h3>
                <p className="site-products-module-summary">{item.summary}</p>
                <ul className="site-products-module-details">
                  {item.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsModules;
