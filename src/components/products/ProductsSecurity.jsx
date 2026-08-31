import Reveal from "../ui/Reveal";
import { productsSecurity } from "../../data/products";

const ProductsSecurity = () => {
  const data = productsSecurity;

  return (
    <section className="site-products-trust section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="container-custom relative">
        <Reveal>
          <div className="site-products-trust-head">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium !text-white/40">{data.label}</p>
              </div>
              <h2 className="site-products-trust-title font-display">
                {data.title[0]}
                <span className="block text-white/40">{data.title[1]}</span>
              </h2>
            </div>
            <p className="site-products-trust-support">{data.support}</p>
          </div>
        </Reveal>

        <div className="site-products-trust-grid">
          {data.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="site-products-trust-item">
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

export default ProductsSecurity;
