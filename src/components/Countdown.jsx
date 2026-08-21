import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "../data/weddingData";

/* ── Parse target ── */
function getTarget() {
  const m = weddingData.wedding.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let h = m ? parseInt(m[1], 10) : 10;
  const mins = m ? m[2] : "30";
  const mer  = m ? m[3].toUpperCase() : "AM";
  if (mer === "PM" && h < 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return new Date(
    `${weddingData.wedding.date}T${String(h).padStart(2, "0")}:${mins}:00`
  ).getTime();
}

/* ══════════════════════════════════════════════════
   Glass tile with sliding number + progress bar
══════════════════════════════════════════════════ */
function GlassTile({ value, max, label, accent, delay }) {
  const display  = String(value).padStart(2, "0");
  const progress = max > 0 ? value / max : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      className="relative flex flex-col items-center"
      style={{ width: "clamp(70px, 17vw, 112px)" }}
    >
      {/* ── Glass card ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "clamp(82px, 20vw, 130px)",
          borderRadius: "clamp(10px,2vw,16px)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(212,175,55,0.28)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.6), " +
            "inset 0 1px 0 rgba(255,255,255,0.06), " +
            `0 0 0 1px rgba(0,0,0,0.3), 0 0 28px ${accent}22`,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Accent glow top edge */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: 0.7,
          }}
        />

        {/* Reflection sheen */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
          }}
        />

        {/* Sliding number */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
              animate={{ y: "0%",   opacity: 1, filter: "blur(0px)" }}
              exit={{    y:  "60%", opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.32, 0, 0.18, 1] }}
              className="font-serif tabular-nums leading-none select-none"
              style={{
                fontSize: "clamp(2rem, 7.5vw, 3.6rem)",
                background: `linear-gradient(160deg, #fff9f0 0%, ${accent} 55%, #aa771c 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: `drop-shadow(0 0 10px ${accent}88)`,
              }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Heartbeat pulse ring on seconds (value changes every 1s) */}
        <motion.div
          key={display + "-pulse"}
          initial={{ opacity: 0.5, scale: 0.85 }}
          animate={{ opacity: 0, scale: 1.18 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ border: `1px solid ${accent}`, borderRadius: "inherit" }}
        />
      </div>

      {/* ── Progress bar ── */}
      <div
        className="w-full mt-2 overflow-hidden"
        style={{
          height: 3,
          borderRadius: 99,
          background: "rgba(212,175,55,0.1)",
        }}
      >
        <motion.div
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${accent}88, ${accent})`,
            borderRadius: 99,
            boxShadow: `0 0 6px ${accent}`,
          }}
        />
      </div>

      {/* Label */}
      <p
        className="mt-2 tracking-[0.3em] uppercase font-semibold text-center"
        style={{
          color: "rgba(212,175,55,0.5)",
          fontSize: "clamp(0.42rem, 1.4vw, 0.56rem)",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

/* ── Thin vertical separator ── */
function VSep() {
  return (
    <div
      className="flex flex-col gap-1.5 self-center pb-8 opacity-25"
      aria-hidden="true"
    >
      <div className="w-1 h-1 rounded-full bg-[var(--color-champagne-gold)]" />
      <div className="w-1 h-1 rounded-full bg-[var(--color-champagne-gold)]" />
    </div>
  );
}

/* ── Central cross ornament ── */
function CrossOrnament() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-7 relative flex items-center justify-center"
      style={{ width: 52, height: 52 }}
    >
      {/* Breathing outer ring */}
      <div
        className="absolute inset-0 rounded-full border border-[var(--color-champagne-gold)]/25"
        style={{ animation: "breathe 3s ease-in-out infinite" }}
      />
      <div className="w-10 h-10 rounded-full border border-[var(--color-champagne-gold)]/40
                      bg-black/50 backdrop-blur-sm flex items-center justify-center
                      shadow-[0_0_24px_rgba(212,175,55,0.22)]">
        <span
          className="text-[var(--color-champagne-gold)] font-serif"
          style={{ fontSize: "1.15rem", lineHeight: 1 }}
        >
          ✝
        </span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const target = getTarget();
    const tick = () => {
      const d = target - Date.now();
      if (d <= 0) { setIsToday(true); return; }
      setTimeLeft({
        days:    Math.floor(d / 86400000),
        hours:   Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000)  / 60000),
        seconds: Math.floor((d % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Unique accent colour per unit */
  const accents = ["#d4af37", "#c8a44a", "#e8c97a", "#f3e5ab"];

  return (
    <section
      className="relative py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #080509 0%, #12080f 50%, #080509 100%)",
      }}
    >
      {/* ── Deep radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(161,38,51,0.14) 0%, transparent 65%)",
        }}
      />

      {/* ── Soft particle shimmer layer ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 55%)",
        }}
      />

      {/* ── Horizontal accent lines ── */}
      {["-20%", "120%"].map((top, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(212,175,55,0.12),transparent)",
          }}
        />
      ))}

      <div
        className="relative z-10 text-center w-full"
        style={{ maxWidth: "min(860px, 96vw)" }}
      >
        {/* Cross ornament */}
        <CrossOrnament />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="tracking-[0.42em] uppercase text-[var(--color-champagne-gold)] mb-2 font-semibold"
          style={{ fontSize: "clamp(0.56rem, 1.9vw, 0.7rem)" }}
        >
          The Day Draws Near
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.05, delay: 0.08 }}
          className="font-serif gold-gradient-text text-letterpress mb-2"
          style={{ fontSize: "clamp(1.65rem, 5.5vw, 3.3rem)" }}
        >
          Counting Down to Forever
        </motion.h2>

        {/* Script date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.05, delay: 0.18 }}
          className="font-script text-[var(--color-bright-gold)] mb-8 opacity-72"
          style={{ fontSize: "clamp(1.15rem, 3.8vw, 1.9rem)" }}
        >
          {weddingData.wedding.dateDisplay}
        </motion.p>

        {/* Divider */}
        <div className="h-px w-28 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto mb-12 opacity-55" />

        {/* ── Tiles ── */}
        {!isToday ? (
          <>
            <div className="flex items-start justify-center gap-2 sm:gap-3 flex-wrap">
              <GlassTile value={timeLeft.days}    max={365} label="Days"    accent={accents[0]} delay={0}    />
              <VSep />
              <GlassTile value={timeLeft.hours}   max={24}  label="Hours"   accent={accents[1]} delay={0.08} />
              <VSep />
              <GlassTile value={timeLeft.minutes} max={60}  label="Minutes" accent={accents[2]} delay={0.16} />
              <VSep />
              <GlassTile value={timeLeft.seconds} max={60}  label="Seconds" accent={accents[3]} delay={0.24} />
            </div>

            {/* Verse */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, delay: 0.5 }}
              className="mt-12 font-serif italic text-[var(--color-warm-cream)]/60 mx-auto leading-relaxed"
              style={{
                fontSize: "clamp(0.76rem, 2.1vw, 0.95rem)",
                maxWidth: "min(400px, 90vw)",
              }}
            >
              &ldquo;This is the day the Lord has made;&nbsp;
              let us rejoice and be glad in it.&rdquo;
              <span
                className="block mt-2 not-italic tracking-[0.32em] uppercase text-[var(--color-champagne-gold)]/38"
                style={{ fontSize: "clamp(0.44rem, 1.3vw, 0.54rem)" }}
              >
                Psalm 118 : 24
              </span>
            </motion.p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="gold-card rounded-xl mx-auto text-center"
            style={{
              padding: "clamp(2rem, 6vw, 3rem)",
              maxWidth: "min(500px, 94vw)",
            }}
          >
            <p
              className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-3 font-semibold"
              style={{ fontSize: "clamp(0.56rem, 1.8vw, 0.7rem)" }}
            >
              The Blessed Day Has Come
            </p>
            <h2
              className="font-serif gold-gradient-text mb-4"
              style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}
            >
              Today, Two Become One
            </h2>
            <p
              className="font-serif italic text-[var(--color-warm-cream)]/80"
              style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}
            >
              Welcome to the celebration of our Holy Matrimony.
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes breathe {
          0%,100% { transform: scale(1);    opacity: 0.5; }
          50%     { transform: scale(1.18); opacity: 1;   }
        }
      `}</style>
    </section>
  );
}
