import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "../ui/Reveal";
import { impactSection, stats } from "../../data/home";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const parseStat = (value) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value, prefix: "" };
  return { target: Number(match[1]), suffix: match[2] || "", prefix: "" };
};

const StatValue = ({ value, active }) => {
  const { reduceMotion, simplify } = useSimplifyMotion();
  const { target, suffix } = parseStat(value);
  const [display, setDisplay] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!active || reduceMotion) {
      setDisplay(target);
      return;
    }

    let frame;
    let lastShown = -1;
    const duration = simplify ? 550 : 900;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(target * eased);
      if (next !== lastShown) {
        lastShown = next;
        setDisplay(next);
      }
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, simplify, target]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const { reduceMotion, simplify, ease } = useSimplifyMotion();
  const number = String(index + 1).padStart(2, "0");
  const digitLen = String(stat.value).replace(/\D/g, "").length;
  const isWide = digitLen >= 4;

  return (
    <motion.div
      ref={ref}
      className="site-impact-item group"
      initial={reduceMotion ? false : { opacity: 0, y: simplify ? 10 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: simplify ? 0.4 : 0.55,
        delay: index * (simplify ? 0.03 : 0.05),
        ease,
      }}
    >
      <div className="site-impact-meta">
        <span className="font-display text-[0.6rem] font-semibold tracking-[0.22em] text-white/30 sm:text-[0.65rem]">
          {number}
        </span>
        <span className="h-px w-6 origin-right bg-white/15 transition-all duration-500 ease-expo group-hover:w-12 group-hover:bg-[var(--accent)] sm:w-8 group-hover:sm:w-14" />
      </div>

      <div className="min-w-0">
        <p
          className={`site-impact-value ${isWide ? "is-wide" : ""}`}
        >
          <StatValue value={stat.value} active={inView} />
        </p>
        <p className="site-impact-label">{stat.label}</p>
      </div>
    </motion.div>
  );
};

const ImpactStrip = () => {
  return (
    <section className="site-impact section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.18]" />

      <div className="site-impact-inner container-custom">
        <Reveal>
          <div className="site-impact-head">
            <p className="label-premium !text-white/35">{impactSection.label}</p>
            <p className="site-impact-support">{impactSection.support}</p>
          </div>
        </Reveal>

        <div className="site-impact-grid">
          {stats.map((stat, i) => (
            <div key={stat.label} className="site-impact-cell">
              <StatItem stat={stat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStrip;
