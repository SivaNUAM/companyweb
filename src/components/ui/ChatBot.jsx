import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Send, X } from "lucide-react";
import { useSimplifyMotion } from "../../hooks/useSimplifyMotion";

const ease = [0.16, 1, 0.3, 1];
const LOOK_SPRING = { stiffness: 280, damping: 22, mass: 0.35 };
const TILT_SPRING = { stiffness: 180, damping: 18, mass: 0.4 };

const quickReplies = [
  "Tell me about services",
  "View our works",
  "Talk to the team",
  "Who is Nuam?",
  "Pricing & timeline",
  "Careers at Nuam",
  "Where are you based?",
  "Product engineering",
  "Experience design",
  "Mobile apps",
  "Cloud & DevOps",
  "Brand systems",
  "Growth & marketing",
  "Start a project",
  "Dance!",
];

const hiLines = [
  "Hi! How can I help?",
  "Building something? Let’s talk.",
  "Got an idea? Ask me.",
  "Need a partner? Say hello.",
  "Curious about Nuam?",
  "Ready to ship? I’m here.",
];

const pickHiLine = (prev) => {
  if (hiLines.length < 2) return hiLines[0];
  let next = hiLines[Math.floor(Math.random() * hiLines.length)];
  while (next === prev) {
    next = hiLines[Math.floor(Math.random() * hiLines.length)];
  }
  return next;
};

const botReply = (text) => {
  const t = text.toLowerCase();
  if (t.includes("dance") || t.includes("party")) {
    return "Yesss — watch me go! 🕺 Hit Dance again anytime.";
  }
  if (t.includes("hi") || t.includes("hello") || t.includes("hey")) {
    return "Hiiii! I’m Nuam Bot — smile mode ON. What are we building today?";
  }
  if (t.includes("who is nuam") || t.includes("about") || t.includes("founded")) {
    return "Nuam Technologies Pvt Ltd — founded 2025, corporate in 2026. We partner on strategy, design, and engineering. Full story on /about.";
  }
  if (t.includes("product engineering") || t.includes("engineering")) {
    return "Product engineering is our core — architecture, build, QA, and release for web & platform products. Details on /services.";
  }
  if (t.includes("experience design") || t.includes("ux") || t.includes("ui")) {
    return "Experience design = research, flows, interfaces, and motion systems that feel sharp at corporate scale. See /services.";
  }
  if (t.includes("mobile")) {
    return "We ship iOS & Android apps — native or cross-platform — with polish users notice. Ask on /contact to scope yours.";
  }
  if (t.includes("cloud") || t.includes("devops")) {
    return "Cloud & DevOps: reliable deploys, observability, and infra that scales with your team. Happy to map a stack on /contact.";
  }
  if (t.includes("brand")) {
    return "Brand systems — identity, UI language, and assets that stay consistent across every touchpoint. Peek at /services.";
  }
  if (t.includes("growth") || t.includes("marketing")) {
    return "Growth & marketing tech — funnels, landing systems, and measurement so campaigns actually compound. Let’s talk scope on /contact.";
  }
  if (t.includes("start a project") || t.includes("start project") || t.includes("new project")) {
    return "Let’s kick it off — share your brief at nuamtechnologies@gmail.com or /contact. We’ll reply within one business day.";
  }
  if (t.includes("service")) {
    return "We offer product engineering, experience design, mobile, cloud, brand systems, and growth. Peek at /services!";
  }
  if (t.includes("work") || t.includes("portfolio")) {
    return "Selected case studies live on /portfolio — tell me your industry and I’ll vibe-check a fit.";
  }
  if (t.includes("price") || t.includes("pricing") || t.includes("timeline") || t.includes("cost") || t.includes("budget")) {
    return "Scopes vary by product depth — most builds start with a short discovery, then a clear timeline + estimate. Share your goal and we’ll map it on /contact.";
  }
  if (t.includes("career") || t.includes("job") || t.includes("hiring") || t.includes("join")) {
    return "We’re always open to sharp builders and designers. See open roles on /careers — or email nuamtechnologies@gmail.com.";
  }
  if (t.includes("where") || t.includes("based") || t.includes("location") || t.includes("office") || t.includes("kochi")) {
    return "We’re based in Kochi — Al Bushara building, Thrikkakara, Edappally. Call 8089623759 or hit /contact.";
  }
  if (t.includes("talk") || t.includes("contact") || t.includes("team") || t.includes("email") || t.includes("phone")) {
    return "Let’s gooo — nuamtechnologies@gmail.com · 8089623759 · or the Contact page. We reply within one business day.";
  }
  return "Got it! Share a bit about your project and I’ll point you next — or email nuamtechnologies@gmail.com.";
};

/** Interactive SVG mascot — moods: idle | hi | dance | smile | think | happy */
const BotFace = ({
  mood = "idle",
  size = 64,
  lively = true,
  trackCursor = false,
}) => {
  const { freezeLoops, simplify } = useSimplifyMotion();
  const wrapRef = useRef(null);
  const dancing = mood === "dance";
  const waving = mood === "hi";
  const smiling =
    mood === "smile" || mood === "happy" || mood === "hi" || dancing;
  const thinking = mood === "think";
  const canLoop = lively && !freezeLoops;
  const canTrack = trackCursor && !simplify && !dancing && !thinking;
  const [attentive, setAttentive] = useState(false);
  const tracking = canTrack && attentive;

  const lookX = useMotionValue(0);
  const lookY = useMotionValue(0);
  const tilt = useMotionValue(0);
  const leanX = useMotionValue(0);
  const leanY = useMotionValue(0);
  const near = useMotionValue(0);

  const pupilX = useSpring(lookX, LOOK_SPRING);
  const pupilY = useSpring(lookY, LOOK_SPRING);
  const headTilt = useSpring(tilt, TILT_SPRING);
  const bodyX = useSpring(leanX, TILT_SPRING);
  const bodyY = useSpring(leanY, TILT_SPRING);
  const hoverBoost = useSpring(near, { stiffness: 220, damping: 20 });

  const leftPupilCx = useTransform(pupilX, (v) => 48 + v);
  const leftPupilCy = useTransform(pupilY, (v) => 53 + v);
  const rightPupilCx = useTransform(pupilX, (v) => 76 + v);
  const rightPupilCy = useTransform(pupilY, (v) => 53 + v);
  const shineLX = useTransform(pupilX, (v) => 44 + v * 0.6);
  const shineLY = useTransform(pupilY, (v) => 49 + v * 0.6);
  const shineRX = useTransform(pupilX, (v) => 72 + v * 0.6);
  const shineRY = useTransform(pupilY, (v) => 49 + v * 0.6);
  const armReach = useTransform(pupilX, (v) => -8 + v * 1.2);
  const scaleBoost = useTransform(hoverBoost, [0, 1], [1, 1.06]);
  const antennaTilt = useTransform(headTilt, (v) => v * 0.6);

  // Glance at cursor every 5s for a short burst — not constant focus
  useEffect(() => {
    if (!canTrack) {
      setAttentive(false);
      return undefined;
    }

    const ATTEND_MS = 1600;
    const INTERVAL_MS = 5000;
    let offTimer;

    const pulse = () => {
      setAttentive(true);
      clearTimeout(offTimer);
      offTimer = setTimeout(() => setAttentive(false), ATTEND_MS);
    };

    const loop = setInterval(pulse, INTERVAL_MS);

    return () => {
      clearInterval(loop);
      clearTimeout(offTimer);
      setAttentive(false);
    };
  }, [canTrack]);

  useEffect(() => {
    if (!tracking) {
      lookX.set(0);
      lookY.set(0);
      tilt.set(0);
      leanX.set(0);
      leanY.set(0);
      near.set(0);
      return undefined;
    }

    const onMove = (e) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      lookX.set(Math.max(-3.2, Math.min(3.2, (dx / rect.width) * 5.5)));
      lookY.set(Math.max(-2.8, Math.min(2.8, (dy / rect.height) * 4.5)));
      tilt.set(Math.max(-10, Math.min(10, (dx / rect.width) * 14)));
      leanX.set(Math.max(-6, Math.min(6, (dx / rect.width) * 10)));
      leanY.set(Math.max(-5, Math.min(5, (dy / rect.height) * 8)));
      near.set(dist < 140 ? 1 : dist < 280 ? 0.45 : 0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [tracking, lookX, lookY, tilt, leanX, leanY, near]);

  return (
    <motion.div
      ref={wrapRef}
      className="relative select-none"
      style={{
        width: size,
        height: size * (150 / 140),
        x: tracking ? bodyX : 0,
        y: tracking ? bodyY : 0,
        rotate: tracking ? headTilt : 0,
        scale: tracking ? scaleBoost : 1,
      }}
      animate={
        dancing
          ? {
              rotate: [0, -14, 14, -10, 10, -6, 6, 0],
              y: [0, -8, 0, -10, 0, -6, 0],
              scale: [1, 1.06, 1, 1.08, 1],
            }
          : waving
            ? { y: [0, -3, 0] }
            : mood === "idle" && canLoop && !tracking
              ? { y: [0, -5, 0], rotate: [0, 2, -2, 0] }
              : undefined
      }
      transition={
        dancing
          ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
          : waving
            ? { duration: 0.7, repeat: 2, ease: "easeInOut" }
            : mood === "idle" && canLoop && !tracking
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.35, ease }
      }
    >
      <svg
        viewBox="0 0 140 150"
        width={size}
        height={size * (150 / 140)}
        aria-hidden
        className="overflow-visible drop-shadow-[0_8px_20px_rgba(107,138,255,0.45)]"
      >
        {/* Legs (under body) */}
        <motion.g
          style={{ transformOrigin: "42px 96px" }}
          animate={
            dancing
              ? { rotate: [12, -22, 12], y: [0, -2, 0] }
              : waving
                ? { rotate: [0, -6, 0] }
                : canLoop
                  ? { rotate: [0, -4, 0, 3, 0] }
                  : { rotate: 0 }
          }
          transition={
            dancing
              ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
              : waving
                ? { duration: 0.7, repeat: 2, ease: "easeInOut" }
                : canLoop
                  ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
          }
        >
          {/* Left thigh */}
          <rect x="36" y="94" width="12" height="24" rx="6" fill="#6b8aff" />
          {/* Left shin */}
          <rect x="37" y="114" width="10" height="16" rx="5" fill="#8ba3ff" />
          {/* Left foot */}
          <rect x="30" y="128" width="20" height="9" rx="4.5" fill="#a8baff" />
        </motion.g>

        <motion.g
          style={{ transformOrigin: "78px 96px" }}
          animate={
            dancing
              ? { rotate: [-12, 22, -12], y: [0, -2, 0] }
              : waving
                ? { rotate: [0, 6, 0] }
                : canLoop
                  ? { rotate: [0, 3, 0, -4, 0] }
                  : { rotate: 0 }
          }
          transition={
            dancing
              ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
              : waving
                ? { duration: 0.7, repeat: 2, ease: "easeInOut" }
                : canLoop
                  ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
          }
        >
          {/* Right thigh */}
          <rect x="72" y="94" width="12" height="24" rx="6" fill="#6b8aff" />
          {/* Right shin */}
          <rect x="73" y="114" width="10" height="16" rx="5" fill="#8ba3ff" />
          {/* Right foot */}
          <rect x="70" y="128" width="20" height="9" rx="4.5" fill="#a8baff" />
        </motion.g>

        {/* Antenna */}
        <motion.g
          animate={
            dancing
              ? { rotate: [0, 18, -18, 0] }
              : canLoop && !tracking
                ? { rotate: [0, 6, -6, 0] }
                : undefined
          }
          transition={
            dancing || (canLoop && !tracking)
              ? { duration: dancing ? 0.5 : 2.2, repeat: Infinity }
              : { duration: 0.2 }
          }
          style={{
            transformOrigin: "60px 18px",
            rotate: tracking ? antennaTilt : 0,
          }}
        >
          <line
            x1="60"
            y1="22"
            x2="60"
            y2="8"
            stroke="#6b8aff"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="60" cy="6" r="5" fill="#6b8aff">
            {dancing && (
              <animate
                attributeName="fill"
                values="#6b8aff;#ffffff;#6b8aff"
                dur="0.4s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </motion.g>

        {/* Head */}
        <rect
          x="18"
          y="24"
          width="84"
          height="72"
          rx="28"
          fill="#0b0b0b"
          stroke="#6b8aff"
          strokeWidth="3.5"
        />
        <rect
          x="26"
          y="32"
          width="68"
          height="48"
          rx="18"
          fill="#151820"
        />

        {/* Cheeks */}
        {(smiling || dancing) && (
          <>
            <ellipse cx="36" cy="62" rx="7" ry="4" fill="#6b8aff" opacity="0.35" />
            <ellipse cx="84" cy="62" rx="7" ry="4" fill="#6b8aff" opacity="0.35" />
          </>
        )}

        {/* Eyes */}
        <motion.g
          animate={
            thinking
              ? { y: -2 }
              : dancing
                ? { scaleY: [1, 0.2, 1, 0.2, 1] }
                : { scaleY: [1, 1, 0.15, 1] }
          }
          transition={
            dancing
              ? { duration: 0.6, repeat: Infinity }
              : {
                  duration: 3.2,
                  repeat: Infinity,
                  times: [0, 0.88, 0.92, 1],
                }
          }
          style={{ transformOrigin: "60px 52px" }}
        >
          {thinking ? (
            <>
              <path
                d="M38 52 Q46 46 54 52"
                fill="none"
                stroke="#fff"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M66 52 Q74 46 82 52"
                fill="none"
                stroke="#fff"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <circle cx="46" cy="52" r="7" fill="#fff" />
              <circle cx="74" cy="52" r="7" fill="#fff" />
              {tracking && !dancing ? (
                <>
                  <motion.circle
                    r="3.2"
                    fill="#0b0b0b"
                    cx={leftPupilCx}
                    cy={leftPupilCy}
                  />
                  <motion.circle
                    r="3.2"
                    fill="#0b0b0b"
                    cx={rightPupilCx}
                    cy={rightPupilCy}
                  />
                  <motion.circle
                    r="1.6"
                    fill="#fff"
                    opacity="0.9"
                    cx={shineLX}
                    cy={shineLY}
                  />
                  <motion.circle
                    r="1.6"
                    fill="#fff"
                    opacity="0.9"
                    cx={shineRX}
                    cy={shineRY}
                  />
                </>
              ) : (
                <>
                  <motion.circle
                    cx="48"
                    cy="53"
                    r="3.2"
                    fill="#0b0b0b"
                    animate={dancing ? { cx: [48, 50, 46, 48] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="76"
                    cy="53"
                    r="3.2"
                    fill="#0b0b0b"
                    animate={dancing ? { cx: [76, 78, 74, 76] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                  <circle cx="44" cy="49" r="1.6" fill="#fff" opacity="0.9" />
                  <circle cx="72" cy="49" r="1.6" fill="#fff" opacity="0.9" />
                </>
              )}
            </>
          )}
        </motion.g>

        {/* Mouth */}
        {smiling ? (
          <path
            d={
              dancing || mood === "happy"
                ? "M42 68 Q60 86 78 68"
                : "M44 70 Q60 82 76 70"
            }
            fill="none"
            stroke="#6b8aff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ) : thinking ? (
          <ellipse cx="60" cy="72" rx="8" ry="5" fill="#6b8aff" opacity="0.85" />
        ) : (
          <path
            d="M48 72 Q60 78 72 72"
            fill="none"
            stroke="#6b8aff"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* Left ear bolt */}
        <rect x="8" y="48" width="10" height="16" rx="4" fill="#6b8aff" />

        {/* Right ear + right arm (waves hi) */}
        <rect x="102" y="48" width="10" height="16" rx="4" fill="#6b8aff" />
        <motion.g
          style={{
            transformOrigin: "112px 56px",
            rotate: tracking && !waving && !dancing ? armReach : undefined,
          }}
          animate={
            waving
              ? { rotate: [-25, 35, -20, 40, -10, 30, -25] }
              : dancing
                ? { rotate: [-15, 20, -15] }
                : tracking
                  ? undefined
                  : { rotate: -8 }
          }
          transition={
            waving
              ? { duration: 1.1, ease: "easeInOut", repeat: 1 }
              : dancing
                ? { duration: 0.55, ease: "easeInOut", repeat: Infinity }
                : { duration: 0.35, ease }
          }
        >
          <rect
            x="108"
            y="52"
            width="22"
            height="9"
            rx="4.5"
            fill="#6b8aff"
          />
          <circle cx="130" cy="56.5" r="5" fill="#8ba3ff" />
          <motion.g
            style={{ transformOrigin: "130px 56.5px" }}
            animate={
              waving
                ? { rotate: [20, -35, 25, -40, 15] }
                : dancing
                  ? { rotate: [10, -15, 10] }
                  : { rotate: 12 }
            }
            transition={
              waving
                ? { duration: 1.1, ease: "easeInOut", repeat: 1 }
                : dancing
                  ? { duration: 0.55, ease: "easeInOut", repeat: Infinity }
                  : { duration: 0.35, ease }
            }
          >
            <rect
              x="126"
              y="48"
              width="9"
              height="20"
              rx="4.5"
              fill="#6b8aff"
            />
            <rect
              x="123"
              y="40"
              width="15"
              height="12"
              rx="5"
              fill="#8ba3ff"
            />
            <rect x="124" y="34" width="3.2" height="8" rx="1.6" fill="#a8baff" />
            <rect x="128.5" y="32" width="3.2" height="10" rx="1.6" fill="#a8baff" />
            <rect x="133" y="34" width="3.2" height="8" rx="1.6" fill="#a8baff" />
          </motion.g>
        </motion.g>
      </svg>
    </motion.div>
  );
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  /** Mood inside the open chat panel only */
  const [mood, setMood] = useState("idle");
  /** Mood on the floating toggle FAB only */
  const [fabMood, setFabMood] = useState("idle");
  const [showHi, setShowHi] = useState(true);
  const [hiLine, setHiLine] = useState(() => hiLines[0]);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "bot",
      text: "Hiii! I’m Nuam Bot from Nuam Technologies Pvt Ltd ✨ Founded 2025, corporate in 2026 — ask about services, works, or how to start.",
    },
  ]);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const moodTimer = useRef(null);
  const fabTimer = useRef(null);
  const fabMoodRef = useRef(fabMood);
  fabMoodRef.current = fabMood;

  const setMoodTemp = useCallback((next, ms = 2200) => {
    clearTimeout(moodTimer.current);
    setMood(next);
    moodTimer.current = setTimeout(() => setMood("smile"), ms);
  }, []);

  const setFabMoodTemp = useCallback((next, ms = 2800) => {
    clearTimeout(fabTimer.current);
    setFabMood(next);
    fabTimer.current = setTimeout(() => setFabMood("idle"), ms);
  }, []);

  // Hi bubble when closed — skipped while FAB is dancing
  useEffect(() => {
    if (open) return undefined;

    setHiLine((prev) => pickHiLine(prev));
    setShowHi(true);
    setFabMoodTemp("hi", 2600);

    const hiTimers = [];
    const hiLoop = setInterval(() => {
      setHiLine((prev) => pickHiLine(prev));
      setShowHi(true);
      if (fabMoodRef.current !== "dance") setFabMoodTemp("hi", 2400);
      hiTimers.push(setTimeout(() => setShowHi(false), 4200));
    }, 9000);

    const hideHi = setTimeout(() => setShowHi(false), 4500);

    return () => {
      clearInterval(hiLoop);
      clearTimeout(hideHi);
      hiTimers.forEach(clearTimeout);
    };
  }, [open, setFabMoodTemp]);

  // Auto-dance on the toggle FAB every 20s (not the open panel)
  useEffect(() => {
    if (open) {
      clearTimeout(fabTimer.current);
      setFabMood("idle");
      return undefined;
    }

    const danceOnce = () => setFabMoodTemp("dance", 3000);
    const danceLoop = setInterval(danceOnce, 20000);

    return () => {
      clearInterval(danceLoop);
      clearTimeout(fabTimer.current);
    };
  }, [open, setFabMoodTemp]);

  useEffect(() => {
    if (open) {
      setShowHi(false);
      setMoodTemp("hi", 1800);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 280);
    }
  }, [open, setMoodTemp]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  // Close chat when mobile menu opens
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      if (root.classList.contains("mobile-nav-open")) {
        setOpen(false);
        setMood("idle");
        setFabMood("idle");
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;

    const userMsg = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setMood("think");

    const wantsDance = /dance|party/i.test(text);

    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: botReply(text),
        },
      ]);
      setMoodTemp(wantsDance ? "dance" : "happy", wantsDance ? 3200 : 2000);
    }, 550);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  const toggle = () => {
    setOpen((v) => {
      if (v) {
        setMood("idle");
        setFabMood("idle");
      } else {
        setShowHi(false);
      }
      return !v;
    });
  };

  return (
    <div className="site-chat">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.94 }}
            transition={{ duration: 0.38, ease }}
            className="site-chat-panel pointer-events-auto"
            role="dialog"
            aria-label="Nuam chat assistant"
          >
            {/* Character header */}
            <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#1a2040] via-[#12141c] to-[#0b0b0b] px-4 pb-3 pt-4">
              <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[var(--accent)]/20 blur-3xl" />
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMoodTemp("dance", 2800)}
                    className="shrink-0 rounded-2xl outline-none ring-[var(--accent)]/40 transition hover:ring-2"
                    aria-label="Make bot dance"
                    title="Tap me to dance!"
                  >
                    <BotFace mood={typing ? "think" : mood} size={56} trackCursor />
                  </button>
                  <div>
                    <p className="font-display text-base font-bold tracking-tight">
                      Nuam Bot
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 text-[0.7rem] text-white/55">
                      <span
                        className="site-chat-online"
                        aria-hidden
                      >
                        <span className="site-chat-online-ping" />
                        <span className="site-chat-online-dot" />
                      </span>
                      Online · tap my face to dance
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggle}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="mb-0.5 shrink-0">
                      <BotFace mood="smile" size={28} lively={false} />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-[var(--accent)] text-[var(--accent-ink)]"
                        : "rounded-bl-md border border-white/10 bg-white/[0.07] text-white/92"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <BotFace mood="think" size={28} lively={false} />
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-white/55"
                        animate={{ opacity: [0.35, 1, 0.35] }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          delay: i * 0.14,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            <div className="site-chat-quick">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.65rem] font-semibold tracking-wide text-white/70 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/15 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1.5 pl-4 focus-within:border-[var(--accent)]/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setMoodTemp("smile", 1600)}
                  placeholder="Say hi or ask anything…"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-40"
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <Send size={15} strokeWidth={2.25} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating interactive bot toggle */}
      <div className="site-chat-fab-wrap pointer-events-auto">
        <AnimatePresence>
          {!open && showHi && (
            <motion.div
              key={hiLine}
              initial={{ opacity: 0, x: 12, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              className="site-chat-hi"
            >
              <div className="site-chat-hi-bubble">
                <p className="site-chat-hi-text">{hiLine}</p>
                <span className="site-chat-hi-tail" aria-hidden />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={toggle}
          onMouseEnter={() => {
            if (!open && fabMoodRef.current !== "dance") setFabMoodTemp("smile", 2200);
          }}
          onMouseLeave={() => {
            if (!open && fabMoodRef.current !== "dance") {
              clearTimeout(fabTimer.current);
              setFabMood("idle");
            }
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            if (!open) setFabMoodTemp("dance", 3000);
          }}
          className="site-chat-fab outline-none ring-offset-2 transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label={open ? "Close chat" : "Open Nuam bot"}
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
          data-cursor="hover"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -40, scale: 0.7, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 20, scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.22, ease }}
                className="site-chat-fab-close"
              >
                <X size={22} strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.22, ease }}
                className="site-chat-fab-bot"
              >
                <BotFace mood={fabMood} size={72} trackCursor />
              </motion.span>
            )}
          </AnimatePresence>

          {!open && (
            <span className="site-chat-fab-online" aria-hidden>
              <span className="site-chat-fab-online-ping" />
              <span className="site-chat-fab-online-dot" />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatBot;
