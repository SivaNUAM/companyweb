import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, X } from "lucide-react";
import { brochureMeta } from "../../data/brochure";

const ease = [0.16, 1, 0.3, 1];

export const downloadBrochurePdf = () => {
  const a = document.createElement("a");
  a.href = brochureMeta.pdfHref;
  a.download = brochureMeta.pdfName;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const BrochurePdfModal = ({
  open,
  onClose,
  onConfirm,
  description = "Get the PDF company profile — capabilities, approach, and contact in one file.",
}) => {
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
                {description}
              </p>
              <div className="site-brochure-modal-meta">
                <span>PDF</span>
                <span aria-hidden>·</span>
                <span>{brochureMeta.pdfName}</span>
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

export default BrochurePdfModal;
