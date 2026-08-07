import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { impactSection, stats } from "../../data/home";

const ease = [0.16, 1, 0.3, 1];

const parseStat = (value) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value, prefix: "" };
  return { target: Number(match[1]), suffix: match[2] || "", prefix: "" };
};

const StatValue = ({ value, active }) => {
  const reduceMotion = useReducedMotion();
  const { target, suffix } = parseStat(value);
  const [display, setDisplay] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!active || reduceMotion) {
      setDisplay(target);
      return;
    }

    let frame;
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, target]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const digitLen = String(stat.value).replace(/\D/g, "").length;
  const isWide = digitLen >= 4;

  return (
    <motion.div
      ref={ref}
      className="group relative flex min-w-0 flex-col justify-between overflow-hidden py-2 lg:min-h-[11rem]"
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.85, delay: index * 0.1, ease }}
    >
      <div className="mb-8 flex items-center justify-between lg:mb-auto">
        <span className="font-display text-[0.65rem] font-semibold tracking-[0.22em] text-white/30">
          {number}
        </span>
        <span className="h-px w-8 origin-right bg-white/15 transition-all duration-500 ease-expo group-hover:w-14 group-hover:bg-[var(--accent)]" />
      </div>

      <div className="min-w-0">
        <p
          className={`font-display font-extrabold leading-[0.9] text-[var(--accent)] ${
            isWide
              ? "text-[clamp(1.85rem,3.8vw,3.25rem)] tracking-[-0.05em]"
              : "text-[clamp(2.75rem,6.5vw,5.5rem)] tracking-[-0.04em]"
          }`}
        >
          <StatValue value={stat.value} active={inView} />
        </p>
        <p className="mt-4 max-w-[14ch] text-[0.8rem] font-medium leading-snug tracking-[0.04em] text-white/55 md:text-[0.95rem]">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
};

const ImpactStrip = () => {
  return (
    <section className="relative overflow-hidden section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.18]" />

      <div className="container-custom relative section-padding !py-16 md:!py-24 lg:!py-28">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6 md:mb-16 md:pb-8">
            <p className="label-premium !text-white/35">{impactSection.label}</p>
            <p className="hidden max-w-xs text-right text-sm leading-relaxed text-white/35 md:block">
              {impactSection.support}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`min-w-0 lg:px-5 xl:px-8 ${
                i > 0 ? "lg:border-l lg:border-white/10" : "lg:pl-0"
              } ${i === stats.length - 1 ? "lg:pr-0" : ""}`}
            >
              <StatItem stat={stat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStrip;
