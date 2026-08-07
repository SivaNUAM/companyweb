import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import Reveal from "../ui/Reveal";
import { contactForm } from "../../data/contact";

const ease = [0.16, 1, 0.3, 1];

const ContactFormPanel = () => {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry${company ? ` — ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    );
    window.location.href = `mailto:${contactForm.to}?subject=${subject}&body=${body}`;
  };

  const fieldWrap = (id) =>
    `relative border-b transition-colors duration-300 ${
      focused === id
        ? "border-[var(--accent)]"
        : "border-[var(--border-strong)]"
    }`;

  const inputClass =
    "w-full bg-transparent py-3.5 text-[0.95rem] text-[var(--ink)] outline-none placeholder:text-[var(--text-muted)]";

  return (
    <Reveal>
      <motion.div
        id="contact-form"
        className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] md:rounded-3xl"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--accent)]/12 blur-[90px]" />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-15" />

        <span className="pointer-events-none absolute left-5 top-5 h-7 w-7 border-l border-t border-[var(--border-strong)] md:left-8 md:top-8" />
        <span className="pointer-events-none absolute right-5 top-5 h-7 w-7 border-r border-t border-[var(--border-strong)] md:right-8 md:top-8" />
        <span className="pointer-events-none absolute bottom-5 left-5 h-7 w-7 border-b border-l border-[var(--border-strong)] md:bottom-8 md:left-8" />
        <span className="pointer-events-none absolute bottom-5 right-5 h-7 w-7 border-b border-r border-[var(--border-strong)] md:bottom-8 md:right-8" />

        <form
          onSubmit={onSubmit}
          className="relative space-y-8 px-6 py-10 md:px-10 md:py-14 lg:px-12"
        >
          <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--accent)]">
                01 — INQUIRY
              </p>
              <h2 className="font-display mt-2 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                {contactForm.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {contactForm.support}
              </p>
            </div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              → {contactForm.to}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <label className="block">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {contactForm.fields.name}
              </span>
              <div className={`mt-1 ${fieldWrap("name")}`}>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className={inputClass}
                  autoComplete="name"
                  placeholder="Alex Rivera"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {contactForm.fields.email}
              </span>
              <div className={`mt-1 ${fieldWrap("email")}`}>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className={inputClass}
                  autoComplete="email"
                  placeholder="alex@company.com"
                />
              </div>
            </label>
          </div>

          <label className="block">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {contactForm.fields.company}
            </span>
            <div className={`mt-1 ${fieldWrap("company")}`}>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onFocus={() => setFocused("company")}
                onBlur={() => setFocused(null)}
                className={inputClass}
                autoComplete="organization"
                placeholder="Company name"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {contactForm.fields.message}
            </span>
            <div className={`mt-1 ${fieldWrap("message")}`}>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className={`${inputClass} resize-y`}
                placeholder="Goals, timeline, links — whatever helps us prepare."
              />
            </div>
          </label>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="btn-accent">
              {contactForm.submit}
              <Send size={15} />
            </button>
            <p className="text-xs text-[var(--text-muted)]">
              Opens your email client with this brief filled in.
            </p>
          </div>
        </form>
      </motion.div>
    </Reveal>
  );
};

export default ContactFormPanel;
