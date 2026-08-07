import { Link } from "react-router-dom";
import Reveal from "../components/ui/Reveal";

const NotFound = () => {
  return (
    <section className="section-ink flex min-h-[80vh] items-center section-padding pt-[calc(var(--nav-height)+3rem)]">
      <div className="container-custom max-w-3xl">
        <Reveal>
          <p className="label-premium !text-white/40 mb-4">404</p>
          <h1 className="font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg text-white/60">
            This route doesn&apos;t exist — head back home and keep exploring.
          </p>
          <Link to="/" className="btn-accent mt-10 inline-flex">
            Back to home
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default NotFound;
