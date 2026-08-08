import ContactHero from "../components/contact/ContactHero";
import ContactChannels from "../components/contact/ContactChannels";
import ContactFormPanel from "../components/contact/ContactFormPanel";

const Contact = () => {
  return (
    <>
      <ContactHero />

      <section className="site-contact section-surface section-padding">
        <span className="site-contact-mark">HELLO</span>
        <div className="site-contact-grid container-custom">
          <div className="site-contact-aside">
            <ContactChannels />
          </div>
          <div className="site-contact-main">
            <ContactFormPanel />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
