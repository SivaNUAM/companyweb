import { useCallback, useEffect, useState } from "react";
import BrochureDeck from "../components/brochure/BrochureDeck";
import BrochureHero from "../components/brochure/BrochureHero";
import BrochurePdfModal, {
  downloadBrochurePdf,
} from "../components/brochure/BrochurePdfModal";

const Brochure = () => {
  const [pdfOpen, setPdfOpen] = useState(false);

  const confirmPdf = useCallback(() => {
    downloadBrochurePdf();
    setPdfOpen(false);
  }, []);

  useEffect(() => {
    if (!pdfOpen) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [pdfOpen]);

  return (
    <main className="site-brochure-page">
      <BrochureHero onDownload={() => setPdfOpen(true)} />
      <BrochureDeck onDownload={() => setPdfOpen(true)} />
      <BrochurePdfModal
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        onConfirm={confirmPdf}
        description="Get the PDF company profile — or keep reading the interactive profile on this page."
      />
    </main>
  );
};

export default Brochure;
