import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, FileText, X } from "lucide-react";
import BrandLogo from "../components/ui/BrandLogo";
import { observeHeaderTone } from "../utils/surfaceTone";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Works" },
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const BROCHURE_HREF = "/Nuam-Brochure.pdf";
const BROCHURE_NAME = "Nuam-Brochure.pdf";
const ease = [0.16, 1, 0.3, 1];

const BrochureModal = ({ open, onClose, onConfirm }) => {
  const titleId = useId();
  const descId = useId();
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => confirmRef.current?.focus(), 40);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="site-brochure-modal"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease }}
        >
          <button
            type="button"
            className="site-brochure-modal-backdrop"
            aria-label="Close brochure dialog"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="site-brochure-modal-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.38, ease }}
          >
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
            <div className="site-brochure-modal-glow" aria-hidden />

            <button
              type="button"
              className="site-brochure-modal-close"
              onClick={onClose}
              aria-label="Cancel"
            >
              <X size={16} strokeWidth={2.25} />
            </button>

            <div className="relative z-10">
              <div className="site-brochure-modal-icon" aria-hidden>
                <FileText size={22} strokeWidth={2} />
              </div>

              <p className="label-premium mb-3 !text-[var(--text-muted)]">
                Company brochure
              </p>
              <h2 id={titleId} className="site-brochure-modal-title font-display">
                Download Nuam brochure?
              </h2>
              <p id={descId} className="site-brochure-modal-copy">
                Get our company profile PDF — services, approach, and how we
                partner with corporate teams.
              </p>

              <div className="site-brochure-modal-meta">
                <span>PDF · 11 pages</span>
                <span aria-hidden>·</span>
                <span>{BROCHURE_NAME}</span>
              </div>

              <div className="site-brochure-modal-actions">
                <button
                  type="button"
                  className="site-brochure-modal-cancel"
                  onClick={onClose}
                >
                  Not now
                </button>
                <button
                  ref={confirmRef}
                  type="button"
                  className="btn-accent site-brochure-modal-confirm"
                  onClick={onConfirm}
                >
                  Download
                  <Download size={15} strokeWidth={2.25} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  const lightNav = open || onDark;
  const solid = scrolled && !open && !onDark;

  const openBrochure = () => {
    setOpen(false);
    setBrochureOpen(true);
  };

  const closeBrochure = () => setBrochureOpen(false);

  const confirmBrochure = () => {
    const a = document.createElement("a");
    a.href = BROCHURE_HREF;
    a.download = BROCHURE_NAME;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setBrochureOpen(false);
  };

  // Scroll class only — no tone sampling on the scroll path
  useEffect(() => {
    let raf = 0;
    let prev = window.scrollY > 24;

    const tick = () => {
      raf = 0;
      const next = window.scrollY > 24;
      if (next !== prev) {
        prev = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    setScrolled(prev);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Cheap IO tone — rebinds on route so new sections are watched
  useEffect(() => {
    let alive = true;
    let stop = () => {};

    const id = requestAnimationFrame(() => {
      if (!alive) return;
      stop = observeHeaderTone((dark) => {
        if (alive) setOnDark((prev) => (prev === dark ? prev : dark));
      });
    });

    return () => {
      alive = false;
      cancelAnimationFrame(id);
      stop();
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setBrochureOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lock = open || brochureOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    document.documentElement.classList.toggle("mobile-nav-open", open);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("mobile-nav-open");
    };
  }, [open, brochureOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("mobile-nav-open");
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        data-site-header
        className={`site-header${scrolled ? " is-scrolled" : ""}${solid ? " is-solid" : ""}${onDark && scrolled && !open ? " is-on-dark" : ""}${open ? " is-menu-open" : ""}${lightNav ? " is-light" : ""}`}
      >
        <div className="site-header-shell">
          <div
            className={`site-header-inner container-custom flex items-center justify-between ${
              scrolled && !open ? "is-compact" : ""
            }`}
          >
            <Link
              to="/"
              className="site-header-logo relative z-50 flex shrink-0 items-center py-1"
              onClick={() => setOpen(false)}
              aria-label="Nuam home"
            >
              <BrandLogo
                tone={lightNav ? "light" : "dark"}
                size="header"
              />
            </Link>

            <nav
              className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 lg:flex xl:gap-1"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative px-2.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 xl:px-3.5 xl:text-[0.78rem] ${
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
                        className={`absolute bottom-1 left-2.5 right-2.5 h-px origin-left transition-transform duration-500 ease-expo xl:left-3.5 xl:right-3.5 ${
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

            <div className="relative z-50 flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={openBrochure}
                className={`site-header-brochure group hidden items-center gap-2 rounded-full pl-3.5 pr-1.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-all duration-300 lg:inline-flex ${
                  lightNav
                    ? "bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_8px_24px_rgba(107,138,255,0.35)] hover:brightness-110"
                    : "bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_8px_22px_rgba(107,138,255,0.28)] hover:brightness-110"
                }`}
              >
                Brochure
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 ease-expo group-hover:translate-y-0.5">
                  <Download size={13} strokeWidth={2.5} />
                </span>
              </button>

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
                      ? "bg-white text-[var(--ink)]"
                      : "bg-ink text-white group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]"
                  }`}
                >
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </span>
              </Link>

              <button
                type="button"
                className={`site-header-menu-btn relative z-50 lg:hidden${open ? " is-open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-navigation"
              >
                <span className="site-header-menu-bar" />
                <span className="site-header-menu-bar" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        data-mobile-nav
        className={`site-mobile-nav-panel lg:hidden${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />

        <div className="site-mobile-nav relative flex min-h-full flex-col">
          <p className="label-premium mb-5 !text-white/30 sm:mb-8">Menu</p>

          <nav className="flex flex-1 flex-col" aria-label="Mobile">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `site-mobile-nav-link group flex items-baseline justify-between gap-4 border-b border-white/10 ${
                    isActive ? "text-[var(--accent)]" : "text-white"
                  }`
                }
                style={{ "--i": i }}
              >
                <span className="font-display font-bold tracking-[-0.03em]">
                  {link.label}
                </span>
                <span className="shrink-0 font-display text-[0.65rem] tracking-[0.2em] text-white/30 sm:text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="site-mobile-nav-cta mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
            <button
              type="button"
              className="btn-accent w-full"
              onClick={openBrochure}
              tabIndex={open ? 0 : -1}
            >
              Download brochure
              <Download size={16} strokeWidth={2.25} />
            </button>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center gap-2 border border-white/20 px-5 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-white/45"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              Get started
              <ArrowUpRight size={16} />
            </Link>
            <a
              href="mailto:nuamtechnologies@gmail.com"
              className="break-all text-center text-sm text-white/45 transition-colors hover:text-[var(--accent)]"
              tabIndex={open ? 0 : -1}
            >
              nuamtechnologies@gmail.com
            </a>
          </div>
        </div>
      </div>

      <BrochureModal
        open={brochureOpen}
        onClose={closeBrochure}
        onConfirm={confirmBrochure}
      />
    </>
  );
};

export default Header;
