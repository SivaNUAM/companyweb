import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1];
const easeCinema = [0.76, 0, 0.24, 1];
const SESSION_KEY = "nuam-welcome-seen";

const letters = ["N", "U", "A", "M"];

const STATUS_LINES = [
  "Calibrating systems",
  "Loading craft",
  "Composing experience",
  "Ready",
];

/**
 * Cinematic first-paint welcome — film frame, brand draw, counter, wipe exit.
 * Runs once per browser session.
 */
const WelcomeLoader = ({ onDone }) => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("enter"); // enter | hold | exit | gone
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, [0, 100], ["0%", "100%"]);
  const progressGlow = useTransform(progress, [0, 100], [0.2, 1]);
  const [count, setCount] = useState(0);
  const [tick, setTick] = useState(0);

  const status = useMemo(() => {
    if (count >= 100) return STATUS_LINES[3];
    if (count >= 72) return STATUS_LINES[2];
    if (count >= 38) return STATUS_LINES[1];
    return STATUS_LINES[0];
  }, [count]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      setPhase("gone");
      onDone?.();
      return undefined;
    }

    document.documentElement.classList.add("welcome-loading");

    const duration = reduceMotion ? 1 : 3.15;
    const controls = animate(progress, 100, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setPhase("hold");
        window.setTimeout(() => setPhase("exit"), reduceMotion ? 100 : 560);
      },
    });

    const tickId = window.setInterval(() => setTick((t) => t + 1), 80);

    return () => {
      controls.stop();
      window.clearInterval(tickId);
      document.documentElement.classList.remove("welcome-loading");
    };
  }, [onDone, progress, reduceMotion]);

  useEffect(() => {
    if (phase !== "exit") return undefined;
    const t = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.documentElement.classList.remove("welcome-loading");
      setVisible(false);
      setPhase("gone");
      onDone?.();
    }, reduceMotion ? 320 : 1100);
    return () => clearTimeout(t);
  }, [phase, onDone, reduceMotion]);

  if (!visible && phase === "gone") return null;

  const exiting = phase === "exit";
  const timecode = `00:00:${String(Math.min(count, 99)).padStart(2, "0")}:${String(tick % 24).padStart(2, "0")}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-[#050505] text-white"
          role="status"
          aria-live="polite"
          aria-label="Loading Nuam Technologies"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ——— Atmosphere layer ——— */}
          <div className="pointer-events-none absolute inset-0">
            {/* Soft cinematic wash */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 55% at 50% 42%, rgba(107,138,255,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 90%, rgba(107,138,255,0.1) 0%, transparent 50%), #050505",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: [0.85, 1, 0.9] }
              }
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Drifting light orbs */}
            <motion.div
              className="absolute left-[-10%] top-[15%] h-[55vmax] w-[55vmax] rounded-full bg-[var(--accent)]/25 blur-[140px]"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, 40, -10, 0], y: [0, 20, -15, 0], scale: [1, 1.12, 0.96, 1] }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-15%] right-[-5%] h-[45vmax] w-[45vmax] rounded-full bg-[#4a6cff]/20 blur-[120px]"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, -30, 15, 0], y: [0, -25, 10, 0] }
              }
              transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Giant watermark */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 0.045 }}
              transition={{ duration: 1.2, ease }}
            >
              <motion.span
                className="font-display select-none text-[min(42vw,22rem)] font-extrabold leading-none tracking-[-0.07em] text-white"
                animate={reduceMotion ? undefined : { x: ["-2%", "2%", "-2%"] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              >
                NUAM
              </motion.span>
            </motion.div>

            {/* Perspective floor grid */}
            <div
              className="absolute inset-x-0 bottom-0 h-[45%] opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 0%, rgba(107,138,255,0.15) 100%), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.12) 60px), repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.1) 60px)",
                transform: "perspective(600px) rotateX(58deg)",
                transformOrigin: "center bottom",
                maskImage: "linear-gradient(to top, black 10%, transparent 90%)",
              }}
            />

            {/* Film grain */}
            <div className="noise-overlay absolute inset-0 opacity-[0.38]" />

            {/* Scanline */}
            {!reduceMotion && (
              <motion.div
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.72) 100%)",
              }}
            />
          </div>

          {/* ——— Film frame corners ——— */}
          <div className="pointer-events-none absolute inset-5 z-20 md:inset-8 lg:inset-10">
            {[
              "left-0 top-0 border-l border-t",
              "right-0 top-0 border-r border-t",
              "left-0 bottom-0 border-l border-b",
              "right-0 bottom-0 border-r border-b",
            ].map((pos) => (
              <motion.span
                key={pos}
                className={`absolute h-8 w-8 border-white/25 md:h-11 md:w-11 ${pos}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: exiting ? 0 : 1, scale: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
              />
            ))}
          </div>

          {/* ——— Top HUD ——— */}
          <div className="relative z-10 flex items-start justify-between px-8 pt-9 md:px-14 md:pt-12 lg:px-16">
            <div>
              <motion.p
                className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/30 md:text-[0.65rem]"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: exiting ? 0 : 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease }}
              >
                Nuam Technologies
              </motion.p>
              <motion.p
                className="mt-1.5 text-[0.65rem] tracking-[0.18em] text-white/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: exiting ? 0 : 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Pvt Ltd · Corporate · 2026
              </motion.p>
            </div>

            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: exiting ? 0 : 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease }}
            >
              <p className="font-display text-[0.65rem] font-semibold tracking-[0.28em] text-[var(--accent)]">
                REC
                <motion.span
                  className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-red-500 align-middle"
                  animate={reduceMotion ? undefined : { opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                />
              </p>
              <p className="mt-1.5 font-mono text-[0.65rem] tabular-nums tracking-wider text-white/35">
                {timecode}
              </p>
            </motion.div>
          </div>

          {/* ——— Center stage ——— */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
            <motion.div
              className="flex flex-col items-center"
              animate={
                exiting
                  ? { scale: 1.12, opacity: 0, filter: "blur(12px)" }
                  : { scale: 1, opacity: 1, filter: "blur(0px)" }
              }
              transition={{ duration: reduceMotion ? 0.35 : 0.85, ease: easeCinema }}
            >
              {/* Brand mark with draw + glow ring */}
              <div className="relative mb-10 md:mb-12">
                <motion.div
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/20 md:h-36 md:w-36"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.1, ease }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/40 md:h-36 md:w-36"
                  animate={
                    reduceMotion
                      ? undefined
                      : { rotate: 360, scale: [1, 1.04, 1] }
                  }
                  transition={{
                    rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    borderStyle: "dashed",
                    borderWidth: 1,
                  }}
                />
                <motion.svg
                  viewBox="0 0 64 72"
                  className="relative h-16 w-16 text-[var(--accent)] drop-shadow-[0_0_28px_rgba(107,138,255,0.55)] md:h-[4.5rem] md:w-[4.5rem]"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease }}
                  aria-hidden
                >
                  <motion.path
                    d="M32 4L56 28H49L32 13L15 28H8L32 4Z"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25, ease }}
                  />
                  <motion.path
                    d="M32 24L56 48H49L32 33L15 48H8L32 24Z"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.4, ease }}
                  />
                  <motion.path
                    d="M32 52L42 62L32 72L22 62L32 52Z"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55, ease }}
                  />
                </motion.svg>
              </div>

              {/* Wordmark — masked cinematic rise */}
              <div className="relative flex items-baseline justify-center gap-[0.06em]">
                {letters.map((letter, i) => (
                  <div key={letter} className="overflow-hidden pb-1">
                    <motion.span
                      className="font-display block text-[clamp(4.75rem,17vw,10.5rem)] font-extrabold leading-[0.85] tracking-[-0.065em]"
                      style={{
                        textShadow: "0 0 60px rgba(107,138,255,0.25)",
                      }}
                      initial={{ y: "120%", rotateX: 40, opacity: 0 }}
                      animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                      transition={{
                        duration: reduceMotion ? 0.3 : 1.05,
                        delay: reduceMotion ? 0 : 0.45 + i * 0.1,
                        ease,
                      }}
                    >
                      {letter}
                    </motion.span>
                  </div>
                ))}
              </div>

              {/* Underscore light sweep */}
              <motion.div
                className="relative mt-6 h-[2px] w-[min(16rem,55vw)] overflow-hidden rounded-full bg-white/10 md:mt-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease }}
              >
                <motion.div
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                  animate={reduceMotion ? undefined : { left: ["-40%", "120%"] }}
                  transition={{ duration: 1.6, delay: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }}
                />
              </motion.div>

              <motion.p
                className="mt-6 max-w-sm text-center text-[0.7rem] font-medium uppercase leading-relaxed tracking-[0.34em] text-white/40 md:mt-7 md:text-[0.75rem]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0.15 : 1.05, duration: 0.8, ease }}
              >
                Corporate technology
                <span className="mx-2 text-[var(--accent)]/70">·</span>
                Est. 2025
              </motion.p>
            </motion.div>
          </div>

          {/* ——— Bottom progress HUD ——— */}
          <div className="relative z-10 px-8 pb-10 md:px-14 md:pb-12 lg:px-16">
            <div className="mb-4 flex items-end justify-between gap-6">
              <div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={status}
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/40"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: exiting ? 0 : 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                  >
                    {status}
                  </motion.p>
                </AnimatePresence>
                <motion.p
                  className="mt-2 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] text-white"
                  style={{ opacity: exiting ? 0 : 1 }}
                >
                  {String(count).padStart(3, "0")}
                  <span className="ml-1 text-[0.35em] font-semibold tracking-[0.2em] text-[var(--accent)]">
                    %
                  </span>
                </motion.p>
              </div>

              <motion.div
                className="hidden text-right sm:block"
                animate={{ opacity: exiting ? 0 : 1 }}
              >
                <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/25">
                  Sequence
                </p>
                <p className="mt-1 font-display text-sm font-bold tracking-wide text-white/55">
                  01 / INTRO
                </p>
              </motion.div>
            </div>

            {/* Dual progress rail */}
            <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
                style={{ width: progressWidth, opacity: progressGlow }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-white/40 blur-[6px]"
                style={{ width: progressWidth }}
              />
            </div>

            <div className="mt-3 flex justify-between text-[0.55rem] uppercase tracking-[0.2em] text-white/20">
              <span>0</span>
              <span>Experience online</span>
              <span>100</span>
            </div>
          </div>

          {/* ——— Exit: accent flash + alternating blinds ——— */}
          {exiting && (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0 z-[25] bg-[var(--accent)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.55, times: [0, 0.28, 1], ease }}
              />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={`blind-${i}`}
                  className="pointer-events-none absolute left-0 z-[26] w-full bg-[#050505]"
                  style={{
                    top: `${(i / 6) * 100}%`,
                    height: `${100 / 6 + 0.35}%`,
                    transformOrigin: i % 2 === 0 ? "left center" : "right center",
                  }}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{
                    duration: reduceMotion ? 0.28 : 0.8,
                    delay: reduceMotion ? 0 : 0.08 + i * 0.06,
                    ease: easeCinema,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeLoader;
