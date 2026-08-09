import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { clients, clientsSection } from "../../data/home";

const MarqueeRow = ({ items, reverse = false, outlined = false, running }) => {
  const loop = [...items, ...items];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--surface)] to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--surface)] to-transparent md:w-24" />

      <div
        className={`${
          reverse ? "marquee-track-reverse" : "marquee-track"
        } items-center gap-0${running ? "" : " is-paused"}`}
      >
        {loop.map((name, i) => (
          <div
            key={`${name}-${reverse ? "r" : "f"}-${i}`}
            className="flex shrink-0 items-center"
          >
            <span
              className={`site-clients-name font-display ${
                outlined
                  ? "client-name-outline"
                  : "text-[var(--ink)]/20 transition-colors duration-300 hover:text-[var(--ink)]"
              }`}
            >
              {name}
            </span>
            <span
              aria-hidden
              className="mx-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-70 md:mx-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ClientMarquee = () => {
  const sectionRef = useRef(null);
  const [running, setRunning] = useState(true);
  const rowA = clients;
  const rowB = [...clients].reverse();

  // Pause CSS marquee when off-screen — free continuous compositor work
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;

    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="site-clients section-surface">
      <div className="site-clients-intro container-custom">
        <div className="site-clients-intro-row">
          <Reveal>
            <p className="label-premium mb-4">{clientsSection.label}</p>
            <h2 className="site-clients-title font-display">
              {clientsSection.title[0]}
              <span className="block text-[var(--text-muted)]">
                {clientsSection.title[1]}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
              <p className="site-clients-support">{clientsSection.support}</p>
              <Link
                to={clientsSection.cta.to}
                className="group inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-55"
              >
                {clientsSection.cta.label}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="site-clients-tracks">
        <Reveal>
          <MarqueeRow items={rowA} running={running} />
        </Reveal>
        <Reveal delay={0.08}>
          <MarqueeRow items={rowB} reverse outlined running={running} />
        </Reveal>
      </div>
    </section>
  );
};

export default ClientMarquee;
