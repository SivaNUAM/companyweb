import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import BrandLogo from "../components/ui/BrandLogo";

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Works" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  { to: "/services", label: "Product Engineering" },
  { to: "/services", label: "Experience Design" },
  { to: "/services", label: "Mobile Platforms" },
  { to: "/services", label: "Cloud & DevOps" },
];

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-[0.95rem] text-white/55 transition-colors duration-300 hover:text-white"
    >
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-500 ease-expo group-hover:w-full" />
      </span>
    </Link>
  </li>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-custom relative section-padding !pb-8 md:!pb-10">
        {/* Top brand band */}
        <Reveal>
          <div className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
            <div>
              <Link to="/" className="inline-flex items-center" aria-label="Nuam home">
                <BrandLogo
                  tone="light"
                  size="footer"
                  className="drop-shadow-[0_4px_20px_rgba(107,138,255,0.25)]"
                />
              </Link>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/50 md:text-base">
                Nuam Technologies Pvt Ltd — founded 2025, corporate technology
                partner in 2026. Brands, platforms, and experiences that move
                businesses forward.
              </p>
            </div>

            <a
              href="mailto:hello@nuam.tech"
              className="group inline-flex items-center gap-3 self-start md:self-auto"
            >
              <span className="border-b border-white/25 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                hello@nuam.tech
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </Reveal>

        {/* Link columns */}
        <div className="grid gap-12 py-12 md:grid-cols-12 md:gap-8 md:py-16">
          <Reveal className="md:col-span-4" delay={0.05}>
            <p className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-snug tracking-[-0.03em] text-white">
              Let&apos;s build
              <span className="block text-white/35">what comes next.</span>
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] transition-opacity hover:opacity-70"
            >
              Start a project
              <ArrowUpRight size={14} />
            </Link>
          </Reveal>

          <Reveal className="md:col-span-4 md:pl-6" delay={0.1}>
            <p className="label-premium !text-white/30 mb-5">Company</p>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-4 md:pl-6" delay={0.15}>
            <p className="label-premium !text-white/30 mb-5">Services</p>
            <ul className="space-y-3.5">
              {serviceLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Bottom meta */}
        <Reveal delay={0.2}>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.7rem] tracking-[0.08em] text-white/30">
              © {year} Nuam. All rights reserved.
            </p>
            <p className="text-[0.7rem] tracking-[0.08em] text-white/30">
              Crafted for the next digital leap.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
