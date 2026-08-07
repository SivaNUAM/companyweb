import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import { clients, clientsSection } from "../../data/home";

const MarqueeRow = ({ items, reverse = false, outlined = false }) => {
  const loop = [...items, ...items];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--surface)] to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--surface)] to-transparent md:w-24" />

      <div
        className={`${
          reverse ? "marquee-track-reverse" : "marquee-track"
        } items-center gap-0`}
      >
        {loop.map((name, i) => (
          <div
            key={`${name}-${reverse ? "r" : "f"}-${i}`}
            className="flex shrink-0 items-center"
          >
            <span
              className={`font-display px-5 text-[clamp(1.75rem,4.5vw,3.75rem)] font-bold leading-none tracking-[-0.03em] md:px-8 ${
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
  const rowA = clients;
  const rowB = [...clients].reverse();

  return (
    <section className="section-surface overflow-hidden section-padding !pb-12 md:!pb-16">
      <div className="container-custom mb-12 md:mb-16">
        <div className="flex flex-col gap-8 border-b border-[var(--border-subtle)] pb-10 md:flex-row md:items-end md:justify-between md:pb-12">
          <Reveal>
            <p className="label-premium mb-4">{clientsSection.label}</p>
            <h2 className="font-display max-w-xl text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              {clientsSection.title[0]}
              <span className="block text-[var(--text-muted)]">
                {clientsSection.title[1]}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
              <p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
                {clientsSection.support}
              </p>
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

      <div className="flex flex-col gap-6 md:gap-8">
        <Reveal>
          <MarqueeRow items={rowA} />
        </Reveal>
        <Reveal delay={0.08}>
          <MarqueeRow items={rowB} reverse outlined />
        </Reveal>
      </div>
    </section>
  );
};

export default ClientMarquee;
