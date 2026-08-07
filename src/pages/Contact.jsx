import Reveal from "../components/ui/Reveal";

const Contact = () => {
  return (
    <section className="section-surface section-padding pt-[calc(var(--nav-height)+3rem)] min-h-[80vh]">
      <div className="container-custom max-w-3xl">
        <Reveal>
          <p className="label-premium mb-4">Contact</p>
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            Tell us about your product, brand, or platform. We typically reply within one business day.
          </p>
          <a href="mailto:hello@nuam.tech" className="btn-accent mt-10 inline-flex">
            hello@nuam.tech
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
