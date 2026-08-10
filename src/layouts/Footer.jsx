import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Dribbble,
} from "lucide-react";
import Reveal from "../components/ui/Reveal";
import BrandLogo from "../components/ui/BrandLogo";

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Works" },
  { to: "/brochure", label: "Brochure" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  { to: "/services", label: "Product Engineering" },
  { to: "/services", label: "Experience Design" },
  { to: "/services", label: "Mobile Platforms" },
  { to: "/services", label: "Cloud & DevOps" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
  },
  // {
  //   label: "YouTube",
  //   href: "https://www.youtube.com/",
  //   icon: Youtube,
  // },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
  // {
  //   label: "Dribbble",
  //   href: "https://dribbble.com/",
  //   icon: Dribbble,
  // },
  // {
  //   label: "Behance",
  //   href: "https://www.behance.net/",
  //   icon: "behance",
  // },
  {
    label: "X",
    href: "https://x.com/",
    icon: "x",
  },
];

const BehanceIcon = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.086 3-5.251 3-3.268 0-5.495-2.088-5.495-5.42 0-3.55 2.433-5.58 5.389-5.58 3.115 0 5.105 2.065 5.105 5.59 0 .3-.02.58-.055.85H13.4c.18 1.63 1.41 2.33 2.92 2.33.96 0 1.8-.36 2.22-1.2l2.186.95zM15.98 13h4.48c-.16-1.36-.95-1.95-2.13-1.95-1.28 0-2.1.66-2.35 1.95zM6.2 18.5H0V5.5h6.48c3.02 0 5.02 1.78 5.02 4.45 0 1.78-.95 3.15-2.55 3.72 1.95.48 3.2 2.05 3.2 4.05 0 2.9-2.35 4.78-5.95 4.78zm-2.9-7.7h2.55c1.45 0 2.3-.72 2.3-1.9 0-1.2-.85-1.85-2.25-1.85H3.3v3.75zm3 6.4c1.65 0 2.65-.8 2.65-2.15 0-1.35-1-2.15-2.7-2.15H3.3v4.3h3z" />
  </svg>
);

const XIcon = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const SocialIcon = ({ item }) => {
  const content =
    item.icon === "behance" ? (
      <BehanceIcon size={28} />
    ) : item.icon === "x" ? (
      <XIcon size={26} />
    ) : (
      (() => {
        const Icon = item.icon;
        return <Icon size={28} strokeWidth={1.75} />;
      })()
    );

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="site-footer-social-link"
      aria-label={item.label}
    >
      {content}
    </a>
  );
};

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex min-h-11 items-center gap-2 py-1 text-[0.9rem] text-white/55 transition-colors duration-300 hover:text-white sm:min-h-0 sm:text-[0.95rem]"
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
    <footer className="site-footer relative overflow-hidden section-ink">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="container-custom relative section-padding !pb-8 md:!pb-10">
        <Reveal>
          <div className="site-footer-brand flex flex-col border-b border-white/10 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <Link
                to="/"
                className="site-footer-logo inline-flex max-w-full items-center"
                aria-label="Nuam home"
              >
                <BrandLogo
                  tone="light"
                  size="footer"
                  className="drop-shadow-[0_4px_20px_rgba(107,138,255,0.25)]"
                />
              </Link>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:mt-6 sm:text-[0.95rem] md:text-base">
                Nuam Technologies Pvt Ltd — founded 2025, corporate technology
                partner in 2026. Brands, platforms, and experiences that move
                businesses forward.
              </p>
            </div>

            <a
              href="mailto:nuamtechnologies@gmail.com"
              className="group mt-2 inline-flex max-w-full items-center gap-3 self-start break-all md:mt-0 md:self-auto"
            >
              <span className="border-b border-white/25 pb-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] sm:text-[0.7rem] sm:tracking-[0.18em]">
                nuamtechnologies@gmail.com
              </span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </Reveal>

        <div className="site-footer-grid">
          <Reveal className="site-footer-cta" delay={0.05}>
            <p className="font-display text-[clamp(1.35rem,5vw,2rem)] font-bold leading-snug tracking-[-0.03em] text-white">
              Let&apos;s build
              <span className="block text-white/35">what comes next.</span>
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] transition-opacity hover:opacity-70 sm:mt-6 sm:min-h-0"
            >
              Start a project
              <ArrowUpRight size={14} />
            </Link>
          </Reveal>

          <div className="site-footer-links">
            <Reveal delay={0.1}>
              <p className="label-premium mb-4 !text-white/30 sm:mb-5">
                Company
              </p>
              <ul className="space-y-1 sm:space-y-3.5">
                {companyLinks.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="label-premium mb-4 !text-white/30 sm:mb-5">
                Services
              </p>
              <ul className="space-y-1 sm:space-y-3.5">
                {serviceLinks.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="site-footer-bar">
            <p className="site-footer-copy">
              NUAM Technologies Pvt Ltd © {year} All rights reserved
            </p>

            <div className="site-footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <span aria-hidden>|</span>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </div>

            <div className="site-footer-socials" aria-label="Social media">
              {socialLinks.map((item) => (
                <SocialIcon key={item.label} item={item} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
