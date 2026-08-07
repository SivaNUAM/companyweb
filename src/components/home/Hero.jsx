import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { hero } from "../../data/home";

const ease = [0.16, 1, 0.3, 1];
const cinematic = [0.22, 1, 0.36, 1];
const AUTO_MS = 5200;
const SLIDE_MS = 0.95;

/** Brand mark — clean letters, no frosted/blur panel */
const BrandMark = ({ reduceMotion }) => {
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

  const onMove = (e) => {
    if (reduceMotion || !wrapRef.current) return;
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
      className="relative w-fit"
      style={{ perspective: 1400 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="relative"
        style={
          reduceMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease }}
      >
        <h2 className="sr-only">{hero.brand}</h2>
        <p
          aria-hidden
          className="relative m-0 flex font-display text-[clamp(3.5rem,14vw,10rem)] font-extrabold leading-[0.78] tracking-[-0.05em] text-white"
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
                duration: 0.8,
                delay: 0.14 + i * 0.07,
                ease,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      color: "#6b8aff",
                      transition: {
                        type: "spring",
                        stiffness: 420,
                        damping: 22,
                      },
                    }
              }
            >
              {letter}
            </motion.span>
          ))}
        </p>

        <motion.div
          className="relative mt-3 flex flex-wrap items-center gap-3 md:mt-4"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6, ease }}
        >
          <span className="h-px w-8 bg-[var(--accent)] md:w-10" />
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.36em] text-white/60">
            Technologies
          </span>
          <span className="text-[0.55rem] font-semibold tracking-[0.14em] text-white/40">
            PVT LTD
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slides = hero.slides;
  const active = slides[index];
  const words = active.headline.split(" ");
  const progressRef = useRef(0);
  const lastTs = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

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
      setProgress(p);
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
  }, [index, isVideoSlide, slides.length]);

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
        setProgress(progressRef.current);
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
  }, [paused, reduceMotion, slides.length, isVideoSlide, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    slides.forEach((slide) => {
      if (!slide.image) return;
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Nuam hero"
    >
      {/* Media carousel */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduceMotion ? undefined : { y: mediaY }}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={active.id}
            className="absolute inset-0 will-change-[opacity,transform,filter]"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.08, filter: "blur(8px)" }
            }
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.04, filter: "blur(6px)" }
            }
            transition={{
              duration: SLIDE_MS,
              ease: cinematic,
              opacity: { duration: SLIDE_MS * 0.9, ease: cinematic },
              scale: { duration: SLIDE_MS * 1.15, ease: cinematic },
              filter: { duration: SLIDE_MS * 0.75, ease: cinematic },
            }}
          >
            {active.type === "video" && active.video && !reduceMotion ? (
              <video
                ref={videoRef}
                key={`${active.id}-video`}
                className="h-full w-full scale-105 object-cover object-center"
                autoPlay
                muted
                playsInline
                preload="auto"
                poster={active.image}
              >
                <source src={active.video} type="video/mp4" />
              </video>
            ) : (
              <motion.img
                src={active.image}
                alt={active.imageAlt}
                className="h-full w-full object-cover object-center will-change-transform"
                fetchPriority="high"
                decoding="async"
                sizes="100vw"
                draggable={false}
                initial={reduceMotion ? false : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: Math.max(AUTO_MS / 1000, SLIDE_MS + 0.5),
                  ease: cinematic,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cinematic grading */}
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

      {/* Film frame */}
      <div className="pointer-events-none absolute inset-5 z-[2] md:inset-8">
        <span className="absolute left-0 top-0 h-9 w-9 border-l border-t border-white/20 md:h-11 md:w-11" />
        <span className="absolute right-0 top-0 h-9 w-9 border-r border-t border-white/20 md:h-11 md:w-11" />
        <span className="absolute bottom-0 left-0 h-9 w-9 border-b border-l border-white/20 md:h-11 md:w-11" />
        <span className="absolute bottom-0 right-0 h-9 w-9 border-b border-r border-white/20 md:h-11 md:w-11" />
      </div>

      {/* Top HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-height)+0.5rem)] z-[3] hidden px-8 md:block lg:px-12">
        <div className="container-custom flex items-center justify-between">
          <motion.p
            className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/35"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Nuam · Est. 2025
          </motion.p>
          <motion.div
            className="flex items-center gap-2"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isVideoSlide && (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-500/70" />
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

      {/* Content */}
      <motion.div
        className="relative z-10 flex min-h-[100svh] flex-col justify-end"
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        <div className="container-custom w-full px-5 pb-24 pt-[calc(var(--nav-height)+2.5rem)] md:px-8 md:pb-28 lg:pb-32">
          <BrandMark reduceMotion={reduceMotion} />

          {/* Slide label */}
          <div className="mt-8 flex items-center gap-3 md:mt-10">
            <span className="h-px w-6 bg-[var(--accent)]" />
            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.label}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/50"
                  initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.55, ease: cinematic }}
                >
                  {active.label}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 grid gap-8 lg:mt-6 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <h1 className="font-display max-w-[16ch] text-[clamp(1.85rem,4.4vw,3.85rem)] font-bold leading-[1.05] tracking-[-0.035em]">
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
                            duration: 0.65,
                            delay: reduceMotion ? 0 : i * 0.04,
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

            <div className="flex flex-col gap-7 lg:col-span-4 lg:pb-1">
              <div className="min-h-[4.5rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${active.id}-support`}
                    className="max-w-sm text-[0.95rem] leading-[1.7] text-white/68 md:text-[1.05rem]"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.55, ease: cinematic }}
                  >
                    {active.support}
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.85, ease }}
              >
                <Link
                  to={hero.cta.to}
                  className="group inline-flex items-center gap-3 border-b border-white/25 pb-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {hero.cta.label}
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:scale-105">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <motion.div
            className="mt-12 flex items-center justify-between gap-6 md:mt-16"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease }}
          >
            <div
              className="flex items-center gap-3"
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
                    className="group relative flex h-10 items-center"
                  >
                    <span
                      className={`relative block h-[2px] overflow-hidden rounded-full transition-all duration-500 ease-expo ${
                        isActive
                          ? "w-16 bg-white/15"
                          : "w-7 bg-white/25 hover:bg-white/45"
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

            <div className="flex items-center gap-2">
              <span className="mr-3 hidden font-display text-xs tracking-[0.2em] text-white/40 sm:inline">
                {String(index + 1).padStart(2, "0")}
                <span className="text-white/20"> / </span>
                {String(slides.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <ArrowLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-white/30">
            Scroll
          </span>
          <ArrowDown size={14} className="animate-bounce text-[var(--accent)]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
