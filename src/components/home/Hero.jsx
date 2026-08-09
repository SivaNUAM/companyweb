import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { hero } from "../../data/home";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ease = [0.16, 1, 0.3, 1];
const cinematic = [0.22, 1, 0.36, 1];
const AUTO_MS = 5200;

/** Brand mark — 3D tilt only on fine pointers (desktop) */
const BrandMark = ({ reduceMotion, simplify }) => {
  const wrapRef = useRef(null);
  const letters = hero.brand.split("");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 120,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 28,
  });

  const tiltEnabled = !reduceMotion && !simplify;

  const onMove = (e) => {
    if (!tiltEnabled || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={wrapRef}
      className="site-hero-brand-wrap relative"
      style={tiltEnabled ? { perspective: 1400 } : undefined}
      onMouseMove={tiltEnabled ? onMove : undefined}
      onMouseLeave={tiltEnabled ? onLeave : undefined}
    >
      <motion.div
        className="relative max-w-full"
        style={
          tiltEnabled
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: simplify ? 0.55 : 0.95, ease }}
      >
        <h2 className="sr-only">{hero.brand}</h2>
        <p
          aria-hidden
          className="site-hero-brand relative m-0 flex font-display font-extrabold text-white"
        >
          {letters.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              className="inline-block origin-bottom"
              initial={
                reduceMotion ? false : { opacity: 0, y: "0.45em" }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: simplify ? 0.45 : 0.8,
                delay: (simplify ? 0.06 : 0.14) + i * (simplify ? 0.04 : 0.07),
                ease,
              }}
              whileHover={
                tiltEnabled
                  ? {
                      y: -4,
                      color: "#6b8aff",
                      transition: {
                        type: "spring",
                        stiffness: 420,
                        damping: 22,
                      },
                    }
                  : undefined
              }
            >
              {letter}
            </motion.span>
          ))}
        </p>

        <motion.div
          className="site-hero-brand-meta relative flex flex-wrap items-center"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: simplify ? 0.35 : 0.7, duration: 0.5, ease }}
        >
          <span className="h-px w-7 bg-[var(--accent)] sm:w-8 md:w-10" />
          <span className="tag font-semibold uppercase text-white/60">
            Technologies
          </span>
          <span className="text-[0.5rem] font-semibold tracking-[0.12em] text-white/40 sm:text-[0.55rem] sm:tracking-[0.14em]">
            PVT LTD
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { reduceMotion, simplify, kenBurns } = useSimplifyMotion();
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slides = hero.slides;
  const active = slides[index];
  const words = active.headline.split(" ");
  const progressRef = useRef(0);
  const lastTs = useRef(null);
  const lastPaint = useRef(0);
  const videoRef = useRef(null);
  const slideMs = simplify ? 0.55 : 0.95;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Scroll parallax is desktop-only — saves compositor work on phones
  const useParallax = !reduceMotion && !simplify;

  const goTo = useCallback(
    (nextIdx) => {
      setIndex((nextIdx + slides.length) % slides.length);
      progressRef.current = 0;
      setProgress(0);
      lastTs.current = null;
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const isVideoSlide =
    active.type === "video" && !!active.video && !reduceMotion;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !isVideoSlide) return;

    el.muted = true;
    el.loop = false;
    progressRef.current = 0;
    setProgress(0);

    const onTimeUpdate = () => {
      if (!el.duration || Number.isNaN(el.duration)) return;
      const p = Math.min(1, el.currentTime / el.duration);
      progressRef.current = p;
      const now = performance.now();
      // Throttle React progress paints (especially mobile)
      if (now - lastPaint.current > (simplify ? 80 : 32)) {
        lastPaint.current = now;
        setProgress(p);
      }
    };

    const onEnded = () => {
      progressRef.current = 0;
      setProgress(0);
      setIndex((i) => (i + 1) % slides.length);
    };

    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    el.play().catch(() => {});

    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
    };
  }, [index, isVideoSlide, slides.length, simplify]);

  useEffect(() => {
    if (reduceMotion || slides.length < 2 || isVideoSlide) return;

    let raf;
    const tick = (ts) => {
      if (lastTs.current == null) lastTs.current = ts;
      if (!paused) {
        const delta = ts - lastTs.current;
        progressRef.current = Math.min(
          1,
          progressRef.current + delta / AUTO_MS,
        );
        if (ts - lastPaint.current > (simplify ? 80 : 32)) {
          lastPaint.current = ts;
          setProgress(progressRef.current);
        }
        if (progressRef.current >= 1) {
          progressRef.current = 0;
          setProgress(0);
          setIndex((i) => (i + 1) % slides.length);
          lastTs.current = ts;
          raf = requestAnimationFrame(tick);
          return;
        }
      }
      lastTs.current = ts;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, reduceMotion, slides.length, isVideoSlide, index, simplify]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Preload next slide only (not the whole deck)
  useEffect(() => {
    const nextSlide = slides[(index + 1) % slides.length];
    if (!nextSlide?.image) return;
    const img = new Image();
    img.src = nextSlide.image;
  }, [index, slides]);

  return (
    <section
      ref={sectionRef}
      className="site-hero relative w-full max-w-full overflow-hidden bg-ink text-white"
      data-cursor-tone="dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Nuam hero"
    >
      <motion.div
        className="absolute inset-0"
        style={useParallax ? { y: mediaY } : undefined}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : simplify
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.06 }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={
              reduceMotion || simplify
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.03 }
            }
            transition={{
              duration: slideMs,
              ease: cinematic,
            }}
          >
            {active.type === "video" && active.video && !reduceMotion ? (
              <video
                ref={videoRef}
                key={`${active.id}-video`}
                className="h-full w-full object-cover object-[center_30%] sm:object-center"
                autoPlay
                muted
                playsInline
                preload={simplify ? "metadata" : "auto"}
                poster={active.image}
              >
                <source src={active.video} type="video/mp4" />
              </video>
            ) : (
              <motion.img
                src={active.image}
                alt={active.imageAlt}
                className="h-full w-full object-cover object-[center_30%] sm:object-center"
                fetchPriority="high"
                decoding="async"
                sizes="100vw"
                draggable={false}
                initial={
                  kenBurns && !simplify ? { scale: kenBurns.from } : false
                }
                animate={{ scale: 1 }}
                transition={
                  kenBurns && !simplify
                    ? {
                        duration: Math.max(AUTO_MS / 1000, slideMs + 0.5),
                        ease: cinematic,
                      }
                    : { duration: slideMs, ease: cinematic }
                }
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,28,0.55) 0%, rgba(8,12,28,0.12) 28%, rgba(8,12,28,0.35) 58%, rgba(6,8,18,0.97) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 78% 38%, rgba(107,138,255,0.22) 0%, transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 12% 88%, transparent 0%, rgba(6,8,18,0.55) 100%)",
        }}
      />
      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1] opacity-[0.28]" />

      <div className="site-hero-frame pointer-events-none absolute z-[2]">
        <span className="absolute left-0 top-0 border-l border-t border-white/20" />
        <span className="absolute right-0 top-0 border-r border-t border-white/20" />
        <span className="absolute bottom-0 left-0 border-b border-l border-white/20" />
        <span className="absolute bottom-0 right-0 border-b border-r border-white/20" />
      </div>

      <div className="site-hero-hud pointer-events-none absolute inset-x-0 z-[3]">
        <div className="container-custom flex items-center justify-between">
          <motion.p
            className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/35"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Nuam · Est. 2025
          </motion.p>
          <motion.div
            className="flex items-center gap-2"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isVideoSlide && (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  {!simplify && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-500/70" />
                  )}
                  <span className="relative h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                <span className="text-[0.6rem] font-semibold tracking-[0.22em] text-white/45">
                  FILM
                </span>
              </>
            )}
            {!isVideoSlide && (
              <span className="text-[0.6rem] font-semibold tracking-[0.22em] text-white/35">
                STILL
              </span>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="site-hero-content relative z-10"
        style={
          useParallax ? { y: contentY, opacity: contentOpacity } : undefined
        }
      >
        <div className="site-hero-inner container-custom">
          <BrandMark reduceMotion={reduceMotion} simplify={simplify} />

          <div className="site-hero-slide-label flex items-center gap-3">
            <span className="h-px w-6 bg-[var(--accent)]" />
            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.label}
                  className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-white/50 sm:text-[0.65rem] sm:tracking-[0.28em]"
                  initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: simplify ? 0.35 : 0.55, ease: cinematic }}
                >
                  {active.label}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="site-hero-grid">
            <div className="site-hero-copy">
              <h1 className="site-hero-headline font-display font-bold">
                <AnimatePresence mode="wait">
                  <motion.span key={active.id} className="inline" initial={false}>
                    {words.map((word, i) => (
                      <span
                        key={`${active.id}-${word}-${i}`}
                        className="mr-[0.28em] inline-block overflow-hidden align-bottom"
                      >
                        <motion.span
                          className="inline-block"
                          initial={
                            reduceMotion ? false : { y: "115%", opacity: 0 }
                          }
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-100%", opacity: 0 }}
                          transition={{
                            duration: simplify ? 0.4 : 0.65,
                            delay: reduceMotion
                              ? 0
                              : i * (simplify ? 0.025 : 0.04),
                            ease: cinematic,
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </h1>
            </div>

            <div className="site-hero-aside flex flex-col gap-5 lg:gap-7">
              <div className="site-hero-support">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${active.id}-support`}
                    className="text-white/68"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: simplify ? 0.35 : 0.55, ease: cinematic }}
                  >
                    {active.support}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.div
                className="site-hero-cta"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: simplify ? 0.35 : 0.85,
                  ease,
                }}
              >
                <Link
                  to={hero.cta.to}
                  className="group inline-flex items-center gap-3 border-b border-white/25 pb-2.5 font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {hero.cta.label}
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:scale-105 sm:h-9 sm:w-9">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="site-hero-controls flex items-center justify-between"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: simplify ? 0.4 : 1,
              ease,
            }}
          >
            <div
              className="site-hero-dots flex items-center gap-2 sm:gap-3"
              role="tablist"
              aria-label="Hero slides"
            >
              {slides.map((slide, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show slide ${i + 1}: ${slide.label}`}
                    onClick={() => goTo(i)}
                    className="group relative flex items-center"
                  >
                    <span
                      className={`relative block h-[2px] overflow-hidden rounded-full transition-all duration-500 ease-expo ${
                        isActive
                          ? "dot-active bg-white/15"
                          : "dot-idle bg-white/25 hover:bg-white/45"
                      }`}
                    >
                      {isActive && (
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(107,138,255,0.6)]"
                          style={{
                            width: reduceMotion
                              ? "100%"
                              : `${Math.max(progress * 100, 2)}%`,
                          }}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="mr-2 hidden font-display text-xs tracking-[0.2em] text-white/40 sm:mr-3 sm:inline">
                {String(index + 1).padStart(2, "0")}
                <span className="text-white/20"> / </span>
                {String(slides.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="site-hero-nav-btn flex items-center justify-center rounded-full border border-white/20 text-white md:backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <ArrowLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="site-hero-nav-btn flex items-center justify-center rounded-full border border-white/20 text-white md:backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="site-hero-scroll-cue pointer-events-none absolute left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: simplify ? 0.55 : 1.3, duration: 0.5 }}
        >
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-white/30">
            Scroll
          </span>
          <ArrowDown
            size={14}
            className={`${simplify ? "" : "animate-bounce "}text-[var(--accent)]/70`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
