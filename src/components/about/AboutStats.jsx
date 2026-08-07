import Reveal from "../ui/Reveal";
import { aboutStats } from "../../data/about";

const AboutStats = () => {
  return (
    <section className="section-ink border-y border-white/10">
      <div className="container-custom section-padding !py-14 md:!py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-0">
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
                <p
                  className={`font-display font-extrabold leading-none text-[var(--accent)] ${
                    isWide
                      ? "text-[clamp(1.85rem,3.8vw,3.25rem)] tracking-[-0.05em]"
                      : "text-[clamp(2.5rem,5vw,4.5rem)] tracking-[-0.04em]"
                  }`}
                >
                  {stat.value}
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
