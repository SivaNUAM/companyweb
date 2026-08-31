import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Users,
  Receipt,
  LayoutDashboard,
  Bell,
  Search,
  BarChart3,
} from "lucide-react";
import Reveal from "../ui/Reveal";
import { productsShowcase } from "../../data/products";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const navIcons = {
  Overview: LayoutDashboard,
  Schedule: CalendarDays,
  Patients: Users,
  Billing: Receipt,
  Reports: BarChart3,
};

const ProductsShowcase = () => {
  const { reduceMotion, simplify, freezeLoops, ease } = useSimplifyMotion();
  const [activeNav, setActiveNav] = useState("Overview");
  const data = productsShowcase;

  return (
    <section className="site-clms section-surface" id="clms">
      <div className="container-custom">
        <Reveal>
          <div className="site-clms-head">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                <p className="label-premium">{data.label}</p>
              </div>
              <h2 className="site-clms-title font-display">
                {data.title[0]}
                <span className="block text-[var(--text-muted)]">
                  {data.title[1]}
                </span>
              </h2>
            </div>
            <p className="site-clms-support">{data.support}</p>
          </div>
        </Reveal>

        <motion.div
          className="site-clms-shell"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: simplify ? 24 : 48, scale: 0.98 }
          }
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: simplify ? 0.5 : 0.9, ease }}
        >
          <div className="site-clms-chrome" aria-hidden>
            <span />
            <span />
            <span />
            <p className="site-clms-chrome-title font-display">
              {data.appName} · {data.clinicName}
            </p>
            {!freezeLoops && (
              <motion.span
                className="site-clms-live"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Live
              </motion.span>
            )}
          </div>

          <div className="site-clms-app">
            <aside className="site-clms-rail" aria-label="CLMS navigation">
              <p className="site-clms-rail-brand font-display">{data.appName}</p>
              <nav className="site-clms-rail-nav">
                {data.nav.map((item) => {
                  const Icon = navIcons[item] || LayoutDashboard;
                  const active = item === activeNav;
                  return (
                    <button
                      key={item}
                      type="button"
                      className={`site-clms-rail-item${active ? " is-active" : ""}`}
                      onClick={() => setActiveNav(item)}
                      aria-pressed={active}
                    >
                      {active && (
                        <motion.span
                          layoutId="clms-rail-active"
                          className="site-clms-rail-active"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 36,
                          }}
                        />
                      )}
                      <Icon size={15} strokeWidth={2.25} />
                      {item}
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="site-clms-main">
              <header className="site-clms-topbar">
                <div>
                  <p className="site-clms-topbar-kicker">{data.dateLabel}</p>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeNav}
                      className="site-clms-topbar-title font-display"
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28, ease }}
                    >
                      {activeNav === "Overview"
                        ? "Clinic overview"
                        : activeNav}
                    </motion.h3>
                  </AnimatePresence>
                </div>
                <div className="site-clms-topbar-tools">
                  <span className="site-clms-search" aria-hidden>
                    <Search size={14} />
                    Search patients
                  </span>
                  <span className="site-clms-bell" aria-hidden>
                    <Bell size={15} />
                    {!freezeLoops && <i className="site-clms-bell-dot" />}
                  </span>
                </div>
              </header>

              <div className="site-clms-stats">
                {data.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="site-clms-stat"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion ? 0 : 0.12 + i * 0.07,
                      ease,
                    }}
                  >
                    <p className="site-clms-stat-value font-display">
                      {stat.value}
                    </p>
                    <p className="site-clms-stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="site-clms-panels">
                <motion.div
                  className="site-clms-panel is-schedule"
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: 0.15, ease }}
                >
                  <div className="site-clms-panel-head">
                    <h4 className="font-display">Schedule</h4>
                    <span>4 upcoming</span>
                  </div>
                  <ul className="site-clms-appt-list">
                    {data.appointments.map((a, i) => (
                      <motion.li
                        key={`${a.time}-${a.patient}`}
                        className="site-clms-appt"
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: reduceMotion ? 0 : 0.2 + i * 0.06,
                          ease,
                        }}
                      >
                        <span className="site-clms-appt-time font-display">
                          {a.time}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="site-clms-appt-name">{a.patient}</p>
                          <p className="site-clms-appt-type">{a.type}</p>
                          {(a.clinician || a.room) && (
                            <p className="site-clms-appt-meta">
                              {[a.clinician, a.room].filter(Boolean).join(" · ")}
                            </p>
                          )}
                        </div>
                        <span className={`site-clms-status is-${a.tone}`}>
                          {a.tone === "live" && !freezeLoops && (
                            <i className="site-clms-status-pulse" aria-hidden />
                          )}
                          {a.status}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <div className="site-clms-side">
                  <motion.div
                    className="site-clms-panel"
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.22, ease }}
                  >
                    <div className="site-clms-panel-head">
                      <h4 className="font-display">Patients</h4>
                      <span>Live</span>
                    </div>
                    <ul className="site-clms-patient-list">
                      {data.patients.map((p) => (
                        <li key={p.id}>
                          <span className="site-clms-avatar" aria-hidden>
                            {p.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                          <div>
                            <p>{p.name}</p>
                            <span>
                              {p.id}
                              {p.note ? ` · ${p.note}` : ""}
                              {p.lastVisit ? ` · ${p.lastVisit}` : ""}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className="site-clms-panel"
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease }}
                  >
                    <div className="site-clms-panel-head">
                      <h4 className="font-display">Billing</h4>
                      <span>Today</span>
                    </div>
                    <ul className="site-clms-bill-list">
                      {data.billing.map((b) => (
                        <li key={b.label}>
                          <div>
                            <p>{b.label}</p>
                            {b.patient && (
                              <span className="site-clms-bill-patient">
                                {b.patient}
                                {b.method ? ` · ${b.method}` : ""}
                              </span>
                            )}
                            <span
                              className={
                                b.state === "Paid"
                                  ? "is-paid"
                                  : b.state === "Partial"
                                    ? "is-partial"
                                    : "is-due"
                              }
                            >
                              {b.state}
                            </span>
                          </div>
                          <strong className="font-display">{b.amount}</strong>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
