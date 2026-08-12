import { useEffect, useRef, useState } from "react";
import Reveal from "../ui/Reveal";
import { technologies, technologiesSection } from "../../data/home";
import TechIcon from "./TechIcon";

const LOOP_COPIES = 3;

const TechChip = ({ tech, variant = "solid" }) => (
  <article
    className={`site-tech-chip is-${variant}`}
    data-tone={tech.id}
    title={tech.name}
  >
    <span className="site-tech-chip-icon" aria-hidden>
      <TechIcon id={tech.id} />
    </span>
    <span className="site-tech-chip-copy">
      <span className="site-tech-chip-name font-display">{tech.name}</span>
      {tech.group && (
        <span className="site-tech-chip-group">{tech.group}</span>
      )}
    </span>
  </article>
);

const TechRow = ({ items, reverse = false, running, variant = "solid" }) => {
  const loop = Array.from({ length: LOOP_COPIES }, () => items).flat();

  return (
    <div className="site-tech-row">
      <div className="site-tech-fade is-left" aria-hidden />
      <div className="site-tech-fade is-right" aria-hidden />

      <div
        className={`${
          reverse ? "marquee-track-reverse" : "marquee-track"
        } site-tech-track${running ? "" : " is-paused"}`}
      >
        {loop.map((tech, i) => (
          <TechChip
            key={`${tech.id}-${reverse ? "r" : "f"}-${i}`}
            tech={tech}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

const Technologies = () => {
  const sectionRef = useRef(null);
  const [running, setRunning] = useState(true);
  const mid = Math.ceil(technologies.length / 2);
  const rowA = technologies.slice(0, mid);
  const rowB = [
    ...technologies.slice(mid),
    ...technologies.slice(0, Math.min(3, mid)),
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;

    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { rootMargin: "100px 0px", threshold: 0.04 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="site-tech">
      <div className="site-tech-atmosphere" aria-hidden>
        <span className="site-tech-orb is-a" />
        <span className="site-tech-orb is-b" />
        <span className="site-tech-grid" />
      </div>

      <div className="site-tech-intro container-custom">
        <div className="site-tech-intro-row">
          <Reveal>
            <div className="site-tech-kicker">
              <span className="site-tech-kicker-rule" />
              <p className="label-premium">{technologiesSection.label}</p>
              <span className="site-tech-count">
                {String(technologies.length).padStart(2, "0")} tools
              </span>
            </div>
            <h2 className="site-tech-title font-display">
              {technologiesSection.title[0]}
              <span className="block text-[var(--text-muted)]">
                {technologiesSection.title[1]}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="site-tech-support">{technologiesSection.support}</p>
          </Reveal>
        </div>
      </div>

      <div className="site-tech-tracks" aria-label="Technology stack">
        <Reveal>
          <TechRow items={rowA} running={running} variant="solid" />
        </Reveal>
        <Reveal delay={0.06}>
          <TechRow items={rowB} reverse running={running} variant="ghost" />
        </Reveal>
      </div>
    </section>
  );
};

export default Technologies;
