import ContactHero from "../components/contact/ContactHero";
import ContactChannels from "../components/contact/ContactChannels";
import ContactFormPanel from "../components/contact/ContactFormPanel";

const Contact = () => {
  return (
    <>
      <ContactHero />

      <section className="relative overflow-hidden section-surface section-padding">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-16 select-none font-display text-[min(36vw,14rem)] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink)]/[0.03]"
        >
          HELLO
        </span>

        <div className="container-custom relative grid gap-16 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-5">
            <ContactChannels />
          </div>
          <div className="lg:col-span-7">
            <ContactFormPanel />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
