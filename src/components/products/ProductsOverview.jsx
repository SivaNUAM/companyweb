import Reveal from "../ui/Reveal";
import { productsOverview } from "../../data/products";

const ProductsOverview = () => {
  const data = productsOverview;

  return (
    <section className="site-products-overview section-surface">
      <div className="container-custom">
        <Reveal>
          <div className="site-products-overview-head">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium">{data.label}</p>
              </div>
              <h2 className="site-products-overview-title font-display">
                {data.title[0]}
                <span className="block text-[var(--text-muted)]">
                  {data.title[1]}
                </span>
              </h2>
            </div>
            <p className="site-products-overview-lead">{data.lead}</p>
          </div>
        </Reveal>

        <div className="site-products-overview-body">
          {data.body.map((p) => (
            <Reveal key={p.slice(0, 28)}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="site-products-overview-grid">
          {data.highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="site-products-overview-card">
                <span className="site-products-overview-index font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display">{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsOverview;
