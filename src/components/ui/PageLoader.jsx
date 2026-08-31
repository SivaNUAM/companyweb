import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const LABELS = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/products": "Products",
  "/portfolio": "Works",
  "/careers": "Careers",
  "/contact": "Contact",
  "/brochure": "Brochure",
  "/privacy": "Privacy",
  "/terms": "Terms",
};

/**
 * Logo-highlight page transition — CSS only, no scroll lock.
 */
const PageLoader = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [tick, setTick] = useState(0);
  const [active, setActive] = useState(false);
  const [path, setPath] = useState(pathname);

  const label = useMemo(() => {
    if (LABELS[path]) return LABELS[path];
    const slug = path.replace(/^\//, "").split("/")[0];
    return slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Nuam";
  }, [path]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }

    setPath(pathname);
    setTick((n) => n + 1);
    setActive(true);

    const done = window.setTimeout(() => setActive(false), 680);
    return () => window.clearTimeout(done);
  }, [pathname]);

  return (
    <div
      className={`site-page-loader${active ? " is-active" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={active}
      aria-label={`Loading ${label}`}
      aria-hidden={!active}
    >
      {active && (
        <div key={tick} className="site-page-loader-inner">
          <div className="site-page-loader-glow" aria-hidden />
          <div className="site-page-loader-logo">
            <BrandLogo
              tone="light"
              size="header"
              className="site-page-loader-mark"
            />
          </div>
          <p className="site-page-loader-label">{label}</p>
          <div className="site-page-loader-track">
            <span className="site-page-loader-bar" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLoader;
