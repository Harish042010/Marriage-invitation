import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "../data/weddingData";

/* Candle SVG — no emoji */
function CandleSVG({ flip = false }) {
  return (
    <svg
      width="28" height="72"
      viewBox="0 0 28 72"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
      aria-hidden="true"
    >
      {/* Flame glow */}
      <ellipse cx="14" cy="10" rx="7" ry="9" fill="rgba(255,220,100,0.15)" />
      {/* Flame */}
      <path d="M14 2 C10 6 8 10 11 14 C12 16 14 17 14 17 C14 17 16 16 17 14 C20 10 18 6 14 2Z"
        fill="url(#flameG)" />
      <defs>
        <linearGradient id="flameG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#fff8c0" />
          <stop offset="50%" stopColor="#ffb830" />
          <stop offset="100%" stopColor="#e05a00" />
        </linearGradient>
      </defs>
      {/* Wick */}
      <line x1="14" y1="17" x2="14" y2="21" stroke="#3a2a10" strokeWidth="1.2" strokeLinecap="round" />
      {/* Body */}
      <rect x="9" y="20" width="10" height="46" rx="2"
        fill="url(#candleBody)" />
      <defs>
        <linearGradient id="candleBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#f5e6c8" />
          <stop offset="40%"  stopColor="#fff9f0" />
          <stop offset="100%" stopColor="#d4b88a" />
        </linearGradient>
      </defs>
      {/* Drip */}
      <path d="M12 24 Q10 28 10 32 Q10 35 13 35 Q14 30 14 24" fill="rgba(255,245,225,0.7)" />
      {/* Base */}
      <rect x="7" y="66" width="14" height="4" rx="2" fill="#8a6820" />
      <rect x="6" y="69" width="16" height="2" rx="1" fill="#6a5010" />
    </svg>
  );
}

/* Animated candle flame flicker */
function AnimatedCandle({ flip, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay }}
      style={{ animation: `candleFlicker ${1.1 + delay * 0.3}s ease-in-out infinite alternate` }}
    >
      <CandleSVG flip={flip} />
    </motion.div>
  );
}

/* Ring of light behind cross */
function HaloRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {[120, 200, 290].map((size, i) => (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: i * 0.18 }}
          className="absolute rounded-full border"
          style={{
            width: `min(${size}px,${size * 0.28}vw)`,
            height: `min(${size}px,${size * 0.28}vw)`,
            borderColor: `rgba(212,175,55,${0.14 - i * 0.04})`,
            animation: `haloBreath ${4 + i}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export default function FinalBlessing() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-black px-4"
      style={{ paddingTop: "clamp(3rem,8vh,6rem)", paddingBottom: "clamp(2rem,5vh,4rem)" }}
    >
      {/* Parallax radial gradient floor */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 85%,rgba(212,175,55,0.18) 0%,rgba(12,10,9,1) 65%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 10%,rgba(161,38,51,0.1) 0%,transparent 55%)" }} />
      </motion.div>

      {/* Halo rings behind cross */}
      <HaloRings />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center flex flex-col items-center w-full"
        style={{ maxWidth: "min(840px,96vw)" }}
      >
        {/* Candles + cross row */}
        <div className="flex items-end justify-center gap-4 sm:gap-8 mb-8">
          <AnimatedCandle flip={false} delay={0.2} />

          {/* Cross */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="relative mb-3"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-champagne-gold)]/40
                            flex items-center justify-center bg-black/50 backdrop-blur-sm
                            shadow-[0_0_40px_rgba(212,175,55,0.35),0_0_80px_rgba(212,175,55,0.12)]">
              <span className="text-[var(--color-champagne-gold)] font-serif"
                style={{ fontSize: "clamp(1.6rem,5vw,2rem)" }}>✝</span>
            </div>
            <div className="absolute -inset-3 rounded-full border border-[var(--color-champagne-gold)]/15
                            animate-ping pointer-events-none"
              style={{ animationDuration: "3.5s" }} />
          </motion.div>

          <AnimatedCandle flip={true} delay={0.35} />
        </div>

        {/* Eyebrow */}
        <p className="tracking-[0.38em] uppercase text-[var(--color-champagne-gold)] mb-3 font-medium"
          style={{ fontSize: "clamp(0.58rem,2vw,0.75rem)" }}>
          United in His Grace
        </p>

        {/* Main heading — new */}
        <h2 className="font-serif gold-gradient-text drop-shadow-2xl leading-tight mb-5"
          style={{ fontSize: "clamp(1.9rem,6.5vw,4.8rem)" }}>
          Two Hearts, One Covenant
        </h2>

        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto mb-8 opacity-65" />

        {/* Invitation quote */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="text-[var(--color-warm-cream)] font-serif italic leading-relaxed opacity-88 mb-10"
          style={{ fontSize: "clamp(0.92rem,3vw,1.3rem)", maxWidth: "min(600px,92vw)" }}
        >
          &ldquo;With hearts full of gratitude, we joyfully invite you to witness the holy covenant
          of our marriage and celebrate this God-given blessing with us.&rdquo;
        </motion.p>

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="gold-card rounded-xl w-full mb-10 relative overflow-hidden text-center"
          style={{ maxWidth: "min(480px,94vw)", padding: "clamp(1.4rem,4.5vw,2.5rem)" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[2px]
                          bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent" />

          <p className="uppercase tracking-[0.22em] text-[var(--color-champagne-gold)] mb-2"
            style={{ fontSize: "clamp(0.52rem,1.6vw,0.65rem)" }}>
            Holy Matrimony
          </p>

          <h3 className="font-serif text-[var(--color-soft-ivory)] mb-3 tracking-wide leading-snug"
            style={{ fontSize: "clamp(1.25rem,4.5vw,2rem)" }}>
            {weddingData.groom.name}
            <span className="font-script text-[var(--color-champagne-gold)] mx-2"
              style={{ fontSize: "clamp(1.4rem,5vw,2.2rem)" }}>
              &amp;
            </span>
            {weddingData.bride.name}
          </h3>

          <p className="font-serif italic text-[var(--color-bright-gold)]"
            style={{ fontSize: "clamp(0.82rem,2.6vw,1rem)" }}>
            {weddingData.wedding.dateDisplay} &bull; {weddingData.wedding.time}
          </p>
          <p className="uppercase tracking-wider text-[var(--color-warm-cream)]/60 mt-2"
            style={{ fontSize: "clamp(0.52rem,1.6vw,0.65rem)" }}>
            {weddingData.wedding.church}, {weddingData.wedding.location}
          </p>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-px
                          bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)]/35 to-transparent" />
        </motion.div>

        <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)]/70 font-serif"
          style={{ fontSize: "clamp(0.62rem,1.8vw,0.75rem)" }}>
          &bull;&nbsp; Soli Deo Gloria &nbsp;&bull;
        </p>
      </motion.div>

      {/* Footer */}
      <div className="relative z-10 w-full mt-14 pt-5 flex flex-col items-center gap-2"
        style={{
          borderTop: "1px solid rgba(212,175,55,0.1)",
          paddingBottom: "max(1.5rem,env(safe-area-inset-bottom,1.5rem))",
          maxWidth: "min(760px,96vw)",
          margin: "3.5rem auto 0",
        }}>
        <div className="flex items-center gap-3 opacity-40">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-champagne-gold)]" />
          <span className="text-[var(--color-champagne-gold)]" style={{ fontSize: "0.5rem" }}>&#10022;</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-champagne-gold)]" />
        </div>
        <p className="text-center"
          style={{
            color: "rgba(212,175,55,0.38)",
            fontSize: "clamp(0.58rem,1.7vw,0.7rem)",
            letterSpacing: "0.2em",
            fontFamily: "'Montserrat',sans-serif",
          }}>
          &copy; {new Date().getFullYear()} Crafted with love by&nbsp;
          <span style={{ color: "rgba(212,175,55,0.62)", letterSpacing: "0.16em" }}>ZenXora</span>.
          All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes haloBreath {
          0%   { opacity:0.6; transform:scale(0.97); }
          100% { opacity:1;   transform:scale(1.03); }
        }
      `}</style>
    </section>
  );
}
