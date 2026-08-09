import { motion } from "framer-motion";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  once = true,
  amount = 0.2,
}) => {
  const { reduceMotion, simplify, reveal } = useSimplifyMotion();
  const Component = motion[as] || motion.div;

  if (reduceMotion || !reveal) {
    const Tag = as === "div" ? "div" : as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reveal.y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: simplify ? 0.12 : amount }}
      transition={{
        duration: reveal.duration,
        delay: simplify ? Math.min(delay, 0.12) : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
