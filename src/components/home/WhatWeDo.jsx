import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { services, servicesSection } from "../../data/home";

const WhatWeDo = () => {
  const [active, setActive] = useState(services[0].id);
  const activeService = services.find((s) => s.id === active) || services[0];

  return (
    <section className="section-ink section-padding overflow-hidden">
      <div className="container-custom">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label-premium !text-white/40">{servicesSection.label}</p>
            <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {servicesSection.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to={servicesSection.cta.to}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/60 transition-colors hover:text-[var(--accent)]"
            >
              {servicesSection.cta.label}
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6" delay={0.05}>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {services.map((service) => {
                const isActive = active === service.id;
                return (
                  <li key={service.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(service.id)}
                      onFocus={() => setActive(service.id)}
                      onClick={() => setActive(service.id)}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors md:py-6"
                    >
                      <span
                        className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 md:text-2xl lg:text-3xl ${
                          isActive
                            ? "text-[var(--accent)]"
                            : "text-white/55 group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </span>
                      <ArrowUpRight
                        size={18}
                        className={`shrink-0 transition-all duration-300 ${
                          isActive
                            ? "text-[var(--accent)] translate-x-0 opacity-100"
                            : "translate-x-[-4px] text-white/20 opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </button>
                    <p
                      className={`overflow-hidden text-sm leading-relaxed text-white/50 transition-all duration-300 md:hidden ${
                        isActive ? "max-h-24 pb-5 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {service.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal className="relative hidden lg:col-span-6 lg:block" delay={0.15}>
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-white/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-8">
                <p className="text-sm leading-relaxed text-white/80">
                  {activeService.description}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
