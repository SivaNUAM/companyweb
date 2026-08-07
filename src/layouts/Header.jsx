import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BrandLogo from "../components/ui/BrandLogo";

const ease = [0.16, 1, 0.3, 1];

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Works" },
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const lightNav = open || (isHome && !scrolled);
  const solid = scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-expo ${
          solid
            ? "border-b border-[var(--border-subtle)] bg-[var(--surface)]/92 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-custom flex items-center justify-between px-5 transition-[height] duration-500 ease-expo md:px-8 ${
            scrolled && !open ? "h-[5.25rem]" : "h-[var(--nav-height)]"
          }`}
        >
          {/* Brand */}
          <Link
            to="/"
            className="relative z-50 flex shrink-0 items-center py-1"
            onClick={() => setOpen(false)}
            aria-label="Nuam home"
          >
            <BrandLogo
              tone={lightNav ? "light" : "dark"}
              size="header"
              className={lightNav ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]" : ""}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group relative px-3.5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    lightNav
                      ? isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                      : isActive
                        ? "text-[var(--ink)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--ink)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-3.5 right-3.5 h-px origin-left transition-transform duration-500 ease-expo ${
                        lightNav ? "bg-[var(--accent)]" : "bg-[var(--ink)]"
                      } ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="relative z-50 flex items-center gap-3">
            <Link
              to="/contact"
              className={`group hidden items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 lg:inline-flex ${
                lightNav
                  ? "text-white hover:text-[var(--accent)]"
                  : "text-[var(--ink)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <span
                className={`border-b pb-0.5 transition-colors duration-300 ${
                  lightNav
                    ? "border-white/40 group-hover:border-[var(--accent)]"
                    : "border-[var(--ink)] group-hover:border-[var(--text-muted)]"
                }`}
              >
                Get started
              </span>
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ease-expo group-hover:translate-x-0.5 ${
                  lightNav
                    ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                    : "bg-ink text-white group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]"
                }`}
              >
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </span>
            </Link>

            <button
              type="button"
              className={`relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border transition-colors duration-300 lg:hidden ${
                lightNav
                  ? "border-white/35 text-white"
                  : "border-[var(--border-strong)] text-[var(--ink)]"
              }`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <motion.span
                className="block h-px w-4 origin-center bg-current"
                animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease }}
              />
              <motion.span
                className="block h-px w-4 origin-center bg-current"
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease }}
              />
            </button>
          </div>
        </div>

        {/* Solid-state underline accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-[var(--accent)]"
          initial={false}
          animate={{ scaleX: solid ? 1 : 0 }}
          transition={{ duration: 0.45, ease }}
        />
      </header>

      {/* Mobile menu — full ink takeover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink text-white lg:hidden"
          >
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />

            <div className="relative flex h-full flex-col px-6 pb-10 pt-[calc(var(--nav-height)+1rem)]">
              <p className="label-premium !text-white/30 mb-8">Menu</p>

              <nav className="flex flex-1 flex-col" aria-label="Mobile">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      delay: 0.06 * i,
                      duration: 0.5,
                      ease,
                    }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-baseline justify-between border-b border-white/10 py-5 ${
                          isActive ? "text-[var(--accent)]" : "text-white"
                        }`
                      }
                    >
                      <span className="font-display text-[clamp(2rem,9vw,3.25rem)] font-bold tracking-[-0.03em]">
                        {link.label}
                      </span>
                      <span className="font-display text-xs tracking-[0.2em] text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease }}
                className="mt-8 flex flex-col gap-5"
              >
                <Link
                  to="/contact"
                  className="btn-accent w-full"
                  onClick={() => setOpen(false)}
                >
                  Get started
                  <ArrowUpRight size={16} />
                </Link>
                <a
                  href="mailto:hello@nuam.tech"
                  className="text-center text-sm text-white/45 transition-colors hover:text-[var(--accent)]"
                >
                  hello@nuam.tech
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
