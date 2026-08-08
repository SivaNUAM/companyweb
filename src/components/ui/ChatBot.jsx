import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

const quickReplies = [
  "Tell me about services",
  "View our works",
  "Talk to the team",
  "Dance!",
];

const botReply = (text) => {
  const t = text.toLowerCase();
  if (t.includes("dance") || t.includes("party")) {
    return "Yesss — watch me go! 🕺 Hit Dance again anytime.";
  }
  if (t.includes("hi") || t.includes("hello") || t.includes("hey")) {
    return "Hiiii! I’m Nuam Bot — smile mode ON. What are we building today?";
  }
  if (t.includes("service")) {
    return "We offer product engineering, experience design, mobile, cloud, brand systems, and growth. Peek at /services!";
  }
  if (t.includes("work") || t.includes("portfolio")) {
    return "Selected case studies live on /portfolio — tell me your industry and I’ll vibe-check a fit.";
  }
  if (t.includes("talk") || t.includes("contact") || t.includes("team")) {
    return "Let’s gooo — hello@nuam.tech or Contact page. We reply within one business day.";
  }
  return "Got it! Share a bit about your project and I’ll point you next — or email hello@nuam.tech.";
};

/** Interactive SVG mascot — moods: idle | hi | dance | smile | think | happy */
const BotFace = ({ mood = "idle", size = 64 }) => {
  const dancing = mood === "dance";
  const waving = mood === "hi";
  const smiling = mood === "smile" || mood === "happy" || mood === "hi" || dancing;
  const thinking = mood === "think";

  return (
    <motion.div
      className="relative select-none"
      style={{ width: size, height: size }}
      animate={
        dancing
          ? {
              rotate: [0, -14, 14, -10, 10, -6, 6, 0],
              y: [0, -8, 0, -10, 0, -6, 0],
              scale: [1, 1.06, 1, 1.08, 1],
            }
          : waving
            ? { y: [0, -3, 0] }
            : mood === "idle"
              ? { y: [0, -5, 0], rotate: [0, 2, -2, 0] }
              : { y: 0, rotate: 0 }
      }
      transition={
        dancing
          ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
          : waving
            ? { duration: 0.7, repeat: 2, ease: "easeInOut" }
            : mood === "idle"
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.35, ease }
      }
    >
      <svg
        viewBox="0 0 140 120"
        width={size}
        height={size}
        aria-hidden
        className="overflow-visible drop-shadow-[0_8px_20px_rgba(107,138,255,0.45)]"
      >
        {/* Antenna */}
        <motion.g
          animate={
            dancing
              ? { rotate: [0, 18, -18, 0] }
              : { rotate: [0, 6, -6, 0] }
          }
          transition={{ duration: dancing ? 0.5 : 2.2, repeat: Infinity }}
          style={{ transformOrigin: "60px 18px" }}
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

        {/* Right ear + waving robot arm (replaces emoji hand) */}
        <rect x="102" y="48" width="10" height="16" rx="4" fill="#6b8aff" />
        <motion.g
          style={{ transformOrigin: "112px 56px" }}
          animate={
            waving
              ? { rotate: [-25, 35, -20, 40, -10, 30, -25] }
              : dancing
                ? { rotate: [-15, 20, -15] }
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
          {/* Upper arm */}
          <rect
            x="108"
            y="52"
            width="22"
            height="9"
            rx="4.5"
            fill="#6b8aff"
          />
          {/* Elbow joint */}
          <circle cx="130" cy="56.5" r="5" fill="#8ba3ff" />
          {/* Forearm + palm */}
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
            {/* Palm */}
            <rect
              x="123"
              y="40"
              width="15"
              height="12"
              rx="5"
              fill="#8ba3ff"
            />
            {/* Fingers */}
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
  const [mood, setMood] = useState("idle");
  const [showHi, setShowHi] = useState(true);
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
  const openRef = useRef(open);
  openRef.current = open;

  const setMoodTemp = useCallback((next, ms = 2200) => {
    clearTimeout(moodTimer.current);
    setMood(next);
    moodTimer.current = setTimeout(
      () => setMood(openRef.current ? "smile" : "idle"),
      ms,
    );
  }, []);

  // Periodic hi + dance tease when closed
  useEffect(() => {
    if (open) return undefined;

    setShowHi(true);
    setMoodTemp("hi", 2800);

    const hiLoop = setInterval(() => {
      setShowHi(true);
      setMoodTemp("hi", 2600);
      setTimeout(() => setShowHi(false), 3200);
    }, 9000);

    const danceLoop = setInterval(() => {
      setMoodTemp("dance", 2400);
    }, 16000);

    const hideHi = setTimeout(() => setShowHi(false), 3500);

    return () => {
      clearInterval(hiLoop);
      clearInterval(danceLoop);
      clearTimeout(hideHi);
      clearTimeout(moodTimer.current);
    };
  }, [open, setMoodTemp]);

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
      if (v) setMood("idle");
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
                    <BotFace mood={typing ? "think" : mood} size={56} />
                  </button>
                  <div>
                    <p className="font-display text-base font-bold tracking-tight">
                      Nuam Bot
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[0.7rem] text-white/50">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                        <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
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
                      <BotFace mood="smile" size={28} />
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
                  <BotFace mood="think" size={28} />
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-white/55"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.55,
                          repeat: Infinity,
                          delay: i * 0.12,
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
              initial={{ opacity: 0, x: 12, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              className="site-chat-hi whitespace-nowrap"
            >
              <div className="relative rounded-2xl rounded-br-sm bg-white px-3.5 py-2 font-display text-sm font-bold text-ink shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                Hi!
                <span className="absolute -bottom-1 right-2 h-2.5 w-2.5 rotate-45 bg-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={toggle}
          onMouseEnter={() => {
            if (!open) setMoodTemp("smile", 1400);
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            if (!open) setMoodTemp("dance", 2600);
          }}
          className="site-chat-fab outline-none ring-offset-2 transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label={open ? "Close chat" : "Open Nuam bot"}
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
          whileHover={!open ? { rotate: [0, -4, 4, 0] } : undefined}
        >
          {open ? (
            <motion.span
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]"
            >
              <X size={22} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <BotFace mood={mood} size={58} />
          )}

          {!open && (
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#0b0b0b] bg-emerald-400" />
            </span>
          )}
        </motion.button>

        {!open && (
          <p className="site-chat-hint pointer-events-none">
            double-tap = dance
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
