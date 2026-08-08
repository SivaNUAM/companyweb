import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { aboutStats } from "../../data/about";

const parseStat = (value) => {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] || "" };
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
    const duration = 1200;
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

const AboutStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      className="site-impact section-ink max-w-full overflow-hidden border-y border-white/10"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[100px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.15]" />
      </div>

      <div className="site-impact-inner container-custom relative">
        <Reveal>
          <div className="site-impact-head">
            <p className="label-premium !text-white/35">Impact</p>
            <p className="site-impact-support">
              Honest numbers from a company built in 2025 — corporate by 2026.
            </p>
          </div>
        </Reveal>

        <div className="site-impact-grid">
          {aboutStats.map((stat, i) => {
            const isWide = String(stat.value).replace(/\D/g, "").length >= 4;
            return (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className="site-impact-cell"
              >
                <div className="site-impact-item group">
                  <div className="site-impact-meta">
                    <p className="font-display text-[0.65rem] font-semibold tracking-[0.22em] text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <p
                    className={`site-impact-value ${isWide ? "is-wide" : ""}`}
                  >
                    <StatValue value={stat.value} active={inView} />
                  </p>
                  <p className="site-impact-label">{stat.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
