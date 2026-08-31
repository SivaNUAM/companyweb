import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "../ui/Reveal";
import { productsFaq } from "../../data/products";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ProductsFaq = () => {
  const { reduceMotion, ease } = useSimplifyMotion();
  const [open, setOpen] = useState(0);
  const data = productsFaq;

  return (
    <section className="site-products-faq section-surface">
      <div className="container-custom">
        <Reveal>
          <div className="site-products-faq-head">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--accent)]" />
              <p className="label-premium">{data.label}</p>
            </div>
            <h2 className="site-products-faq-title font-display">{data.title}</h2>
          </div>
        </Reveal>

        <div className="site-products-faq-list">
          {data.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.04, 0.2)}>
                <div className={`site-products-faq-item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="site-products-faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="font-display">{item.q}</span>
                    <Plus
                      size={18}
                      className={`site-products-faq-icon${isOpen ? " is-open" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="a"
                        initial={
                          reduceMotion ? false : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <p className="site-products-faq-a">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsFaq;
