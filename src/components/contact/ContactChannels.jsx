import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "../ui/Reveal";
import { contactChannels, contactDetails } from "../../data/contact";

const ContactChannels = () => {
  return (
    <div className="site-contact-channels">
      <Reveal>
        <p className="label-premium mb-8">Reach us</p>
        <ul className="space-y-0">
          {contactChannels.map((ch, i) => (
            <li
              key={ch.id}
              className="group border-t border-[var(--border-subtle)] py-8 first:border-t-0 first:pt-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    <span className="text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {ch.label}
                  </p>
                  <a
                    href={ch.href}
                    className="site-contact-channel-value font-display mt-3 inline-flex items-center gap-2 transition-colors hover:text-[var(--accent)]"
                  >
                    {ch.value}
                    <ArrowUpRight
                      size={20}
                      className="opacity-30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[var(--accent)]"
                    />
                  </a>
                  <p className="mt-2 max-w-xs text-sm text-[var(--text-secondary)]">
                    {ch.note}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-6 border-t border-[var(--border-subtle)] pt-10 sm:grid-cols-1">
          {contactDetails.map((d, i) => (
            <motion.div
              key={d.id}
              className="flex gap-5"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {d.label}
                </p>
                <p className="mt-1.5 text-[0.95rem] text-[var(--text-primary)]">
                  {d.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-12 rounded-2xl border border-[var(--border-subtle)] bg-white px-5 py-5">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <Mail size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">
                Prefer a direct line?
              </p>
              <a
                href="mailto:hello@nuam.tech"
                className="mt-1 inline-block text-sm text-[var(--accent)] transition-opacity hover:opacity-80"
              >
                hello@nuam.tech
              </a>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                Hiring?{" "}
                <Link
                  to="/careers"
                  className="font-semibold text-[var(--ink)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                >
                  Careers — no openings right now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default ContactChannels;
