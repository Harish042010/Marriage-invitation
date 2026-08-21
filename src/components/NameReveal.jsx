import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { weddingData } from "../data/weddingData";

/* ══════════════════════════════════════════
   STAR FIELD — fixed-position tiny sparks
══════════════════════════════════════════ */
function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 0.8 + Math.random() * 2.2,
      dur: 2.5 + Math.random() * 4,
      delay: Math.random() * 5,
      bright: Math.random() > 0.7,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map(st => (
        <div key={st.id} style={{
          position: "absolute",
          left: `${st.x}%`,
          top:  `${st.y}%`,
          width:  st.s,
          height: st.s,
          borderRadius: "50%",
          background: st.bright
            ? "rgba(255,245,210,0.95)"
            : "rgba(212,175,55,0.55)",
          boxShadow: st.bright
            ? `0 0 ${st.s * 3}px rgba(255,235,160,0.8)`
            : "none",
          animation: `starTwinkle ${st.dur}s ease-in-out ${st.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   BOKEH — large soft glows
══════════════════════════════════════════ */
function Bokeh() {
  const orbs = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: 5  + Math.random() * 90,
      y: 5  + Math.random() * 90,
      r: 120 + Math.random() * 220,
      dur:   8 + Math.random() * 8,
      delay: Math.random() * 6,
      opacity: 0.18 + Math.random() * 0.22,
      color: i % 3 === 0
        ? `212,175,55`
        : i % 3 === 1
        ? `180,100,40`
        : `140,60,80`,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {orbs.map(o => (
        <div key={o.id} style={{
          position: "absolute",
          left: `${o.x}%`, top: `${o.y}%`,
          width: o.r, height: o.r,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${o.color},${o.opacity}) 0%, transparent 68%)`,
          transform: "translate(-50%,-50%)",
          animation: `bokehPulse ${o.dur}s ease-in-out ${o.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   GOTHIC CROSS — replaces rotating rose window
══════════════════════════════════════════ */
function GothicCross() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="mx-auto mb-5 flex items-center justify-center"
      style={{ width: "clamp(72px,15vw,108px)", height: "clamp(72px,15vw,108px)" }}
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
        {/* Outer ring */}
        <circle cx="50" cy="50" r="47" stroke="rgba(212,175,55,0.35)" strokeWidth="0.8"
          style={{ animation: "breatheRing 3.5s ease-in-out infinite" }}/>
        {/* Inner ring */}
        <circle cx="50" cy="50" r="38" stroke="rgba(212,175,55,0.18)" strokeWidth="0.5"/>
        {/* Cross vertical */}
        <rect x="46.5" y="18" width="7" height="64" rx="2"
          fill="url(#crossGrad)"/>
        {/* Cross horizontal */}
        <rect x="22" y="40" width="56" height="7" rx="2"
          fill="url(#crossGrad)"/>
        {/* Serif ends */}
        <rect x="43" y="17" width="14" height="3" rx="1.5" fill="rgba(212,175,55,0.7)"/>
        <rect x="43" y="80" width="14" height="3" rx="1.5" fill="rgba(212,175,55,0.7)"/>
        <rect x="20" y="37" width="3" height="13" rx="1.5" fill="rgba(212,175,55,0.7)"/>
        <rect x="77" y="37" width="3" height="13" rx="1.5" fill="rgba(212,175,55,0.7)"/>
        {/* Centre glow gem */}
        <circle cx="50" cy="43.5" r="4.5" fill="rgba(255,245,180,0.6)"
          stroke="rgba(212,175,55,0.8)" strokeWidth="0.6"
          style={{ animation: "breatheRing 2.5s ease-in-out infinite" }}/>
        <defs>
          <linearGradient id="crossGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,245,200,0.9)"/>
            <stop offset="40%"  stopColor="rgba(212,175,55,0.95)"/>
            <stop offset="100%" stopColor="rgba(140,100,20,0.7)"/>
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   ORNATE FRAME — corner + side flourishes
══════════════════════════════════════════ */
function OrnateFrame() {
  return (
    <div className="absolute inset-4 sm:inset-8 pointer-events-none" aria-hidden="true">
      {/* Corner L-shapes */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((cls, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 + i * 0.1 }}
          className={`absolute w-10 h-10 sm:w-16 sm:h-16 ${cls} border-[rgba(212,175,55,0.35)]`}
          style={{ borderRadius: 0 }}
        />
      ))}

      {/* Top centre ornament */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.0 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1"
      >
        <div className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.5)]"/>
        <div className="w-1.5 h-1.5 rounded-full bg-[rgba(212,175,55,0.6)]" style={{ boxShadow:"0 0 6px rgba(212,175,55,0.6)" }}/>
        <div className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-[rgba(212,175,55,0.5)]"/>
      </motion.div>

      {/* Bottom centre ornament */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.0 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1"
      >
        <div className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.5)]"/>
        <div className="w-1.5 h-1.5 rounded-full bg-[rgba(212,175,55,0.6)]" style={{ boxShadow:"0 0 6px rgba(212,175,55,0.6)" }}/>
        <div className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-[rgba(212,175,55,0.5)]"/>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   LETTER-BY-LETTER animated name
══════════════════════════════════════════ */
function AnimatedName({ text, delay = 0 }) {
  const letters = text.split("");
  const container = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: delay } },
  };
  const child = {
    hidden:  { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.85 },
    visible: { opacity: 1, y: 0,  filter: "blur(0px)",  scale: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div variants={container} initial="hidden" animate="visible"
      className="flex justify-center flex-wrap">
      {letters.map((l, i) => (
        <motion.span key={i} variants={child}
          className="inline-block font-serif"
          style={{
            fontSize: "clamp(3.2rem,13vw,8rem)",
            lineHeight: 1.02,
            letterSpacing: "0.02em",
            background: "linear-gradient(160deg,#fff9f0 0%,#f3e5ab 30%,#d4af37 65%,#a87f2e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 16px rgba(212,175,55,0.5))",
          }}>
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   DATE INFO STRIP
══════════════════════════════════════════ */
function DateStrip() {
  const items = [
    { label: "Ceremony",  value: weddingData.wedding.church },
    { label: "Date",      value: weddingData.wedding.dateDisplay },
    { label: "Time",      value: weddingData.wedding.time },
    { label: "Place",     value: "Trichy, Tamil Nadu" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 1.4 }}
      className="relative w-full overflow-hidden"
      style={{
        maxWidth: "min(720px, 94vw)",
        borderTop:    "1px solid rgba(212,175,55,0.25)",
        borderBottom: "1px solid rgba(212,175,55,0.25)",
        padding: "clamp(0.8rem,2.5vw,1.2rem) clamp(0.5rem,2vw,1rem)",
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="absolute inset-0 animate-shimmer opacity-15 pointer-events-none" />
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <span className="text-[rgba(212,175,55,0.35)] text-[8px]">✦</span>}
            <div className="text-center">
              <p style={{
                fontSize: "clamp(0.42rem,1.3vw,0.55rem)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(212,175,55,0.55)",
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: 600,
                lineHeight: 1,
              }}>{item.label}</p>
              <p style={{
                fontSize: "clamp(0.75rem,2vw,0.95rem)",
                fontFamily: "'Cormorant Garamond',serif",
                color: "#e8d5bf",
                lineHeight: 1.3,
                marginTop: 2,
              }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 2 }}
      className="flex flex-col items-center gap-2 mt-5"
      aria-hidden="true"
    >
      {/* Mouse outline */}
      <div className="relative border border-[rgba(212,175,55,0.4)] rounded-full"
        style={{ width: 20, height: 32 }}>
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-2 rounded-full bg-[rgba(212,175,55,0.7)]"
          style={{ animation: "mouseScroll 1.8s ease-in-out infinite" }}/>
      </div>
      <p style={{
        fontSize: "clamp(0.38rem,1.1vw,0.5rem)",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        color: "rgba(212,175,55,0.35)",
        fontFamily: "'Montserrat',sans-serif",
      }}>Scroll</p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function NameReveal() {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const bgParallax = useTransform(scrollY, [0, 800], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5"
      style={{
        paddingTop:    "clamp(2.5rem,6vh,5rem)",
        paddingBottom: "clamp(2rem,5vh,4rem)",
        background:    "#0d080c",
      }}
    >
      {/* ── Rich layered background ── */}
      <motion.div style={{ y: bgParallax }}
        className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Central golden bloom */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 38%, rgba(212,175,55,0.22) 0%, rgba(161,38,51,0.06) 45%, transparent 72%)",
        }}/>
        {/* Deep warm vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.82) 100%)",
        }}/>
        {/* Subtle colour shifts */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 40% at 15% 85%, rgba(161,38,51,0.09) 0%, transparent 55%)",
        }}/>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 40% at 85% 15%, rgba(100,60,200,0.05) 0%, transparent 55%)",
        }}/>
      </motion.div>

      {/* ── Stars ── */}
      <StarField />

      {/* ── Bokeh ── */}
      <Bokeh />

      {/* ── Ornate frame ── */}
      <OrnateFrame />

      {/* ── Content column ── */}
      <div className="relative z-10 w-full flex flex-col items-center text-center"
        style={{ maxWidth: "min(860px,96vw)", gap: "clamp(0.5rem,1.5vh,1rem)" }}>

        {/* Gothic cross */}
        <GothicCross />

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="h-px bg-gradient-to-r from-transparent to-[rgba(212,175,55,0.6)]"
            style={{ width: "clamp(24px,6vw,72px)" }}/>
          <p style={{
            fontSize: "clamp(0.55rem,1.8vw,0.7rem)",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.75)",
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 600,
          }}>Together With Their Families</p>
          <div className="h-px bg-gradient-to-l from-transparent to-[rgba(212,175,55,0.6)]"
            style={{ width: "clamp(24px,6vw,72px)" }}/>
        </motion.div>

        {/* Groom name */}
        <AnimatedName text={weddingData.groom.name} delay={0.65} />

        {/* Cross badge — no candles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.82 }}
          className="relative mx-auto"
          style={{ width: "clamp(52px,10vw,68px)", height: "clamp(52px,10vw,68px)" }}
        >
          <div className="absolute inset-0 rounded-full border border-[rgba(212,175,55,0.2)]"
            style={{ animation: "spinSlow 20s linear infinite" }}/>
          <div className="absolute inset-[5px] rounded-full border border-[rgba(212,175,55,0.32)]"
            style={{ animation: "breatheRing 3s ease-in-out infinite" }}/>
          <div className="absolute inset-[12px] rounded-full bg-black/65 backdrop-blur-sm
            border border-[rgba(212,175,55,0.55)] flex items-center justify-center
            shadow-[0_0_24px_rgba(212,175,55,0.4),inset_0_0_10px_rgba(212,175,55,0.05)]">
            <span className="text-[rgba(212,175,55,0.95)] font-serif"
              style={{ fontSize: "clamp(1rem,2.8vw,1.4rem)", lineHeight: 1 }}>✝</span>
          </div>
          <div className="absolute inset-[-4px] rounded-full border border-[rgba(212,175,55,0.15)] animate-ping"
            style={{ animationDuration: "3s" }}/>
        </motion.div>

        {/* Bride name */}
        <AnimatedName text={weddingData.bride.name} delay={0.95} />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25 }}
          style={{
            fontSize: "clamp(0.58rem,2vw,0.82rem)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(232,213,191,0.6)",
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 300,
            marginTop: "0.25rem",
          }}
        >
          Request The Honour of Your Presence
        </motion.p>

        {/* Scroll cue */}
        <ScrollCue />
      </div>

      <style>{`
        @keyframes starTwinkle {
          0%   { opacity:0.15; transform:scale(0.7); }
          100% { opacity:1;    transform:scale(1.1); }
        }
        @keyframes bokehPulse {
          0%   { opacity:0.6; transform:translate(-50%,-50%) scale(1); }
          100% { opacity:1;   transform:translate(-50%,-50%) scale(1.18); }
        }
        @keyframes spinSlow {
          0%   { transform:rotate(0deg); }
          100% { transform:rotate(360deg); }
        }
        @keyframes breatheRing {
          0%,100% { opacity:0.35; transform:scale(0.94); }
          50%     { opacity:0.85; transform:scale(1.06); }
        }
        @keyframes mouseScroll {
          0%   { opacity:0.9; transform:translateX(-50%) translateY(0); }
          60%  { opacity:0;   transform:translateX(-50%) translateY(8px); }
          100% { opacity:0;   transform:translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
