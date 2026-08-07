import { Link } from "react-router-dom";
import Reveal from "../components/ui/Reveal";

const StubPage = ({ title, description }) => {
  return (
    <section className="section-surface flex min-h-[80vh] items-center section-padding pt-[calc(var(--nav-height)+3rem)]">
      <div className="container-custom max-w-3xl">
        <Reveal>
          <p className="label-premium mb-4">Coming next</p>
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            {description}
          </p>
          <Link to="/" className="btn-primary mt-10">
            Back to home
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default StubPage;
