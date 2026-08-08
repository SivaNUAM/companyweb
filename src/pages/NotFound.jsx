import { Link } from "react-router-dom";
import Reveal from "../components/ui/Reveal";

const NotFound = () => {
  return (
    <section className="site-nf section-ink section-padding">
      <div className="container-custom max-w-3xl">
        <Reveal>
          <p className="label-premium !text-white/40 mb-4">404</p>
          <h1 className="site-nf-title">Page not found</h1>
          <p className="site-nf-support">
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
