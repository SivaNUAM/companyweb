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
    <section className="relative overflow-hidden section-ink border-y border-white/10" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/10 blur-[100px]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.15]" />
      </div>

      <div className="container-custom relative section-padding !py-16 md:!py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6 md:mb-16">
            <p className="label-premium !text-white/35">Impact</p>
            <p className="hidden max-w-xs text-right text-sm text-white/35 md:block">
              Honest numbers from a company built in 2025 — corporate by 2026.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
          {aboutStats.map((stat, i) => {
            const isWide = String(stat.value).replace(/\D/g, "").length >= 4;
            return (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className={`min-w-0 overflow-hidden lg:px-5 xl:px-8 ${
                  i > 0 ? "lg:border-l lg:border-white/10" : "lg:pl-0"
                }`}
              >
                <p className="mb-4 font-display text-[0.65rem] font-semibold tracking-[0.22em] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={`font-display font-extrabold leading-none text-[var(--accent)] ${
                    isWide
                      ? "text-[clamp(1.85rem,3.8vw,3.25rem)] tracking-[-0.05em]"
                      : "text-[clamp(2.5rem,5vw,4.5rem)] tracking-[-0.04em]"
                  }`}
                >
                  <StatValue value={stat.value} active={inView} />
                </p>
                <p className="mt-3 text-sm text-white/50">{stat.label}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
