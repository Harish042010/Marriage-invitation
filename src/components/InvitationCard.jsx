import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { weddingData } from "../data/weddingData";

/* ══════════════════════════════════════════════════
   WAX SEAL — tap to break open the envelope
══════════════════════════════════════════════════ */
function WaxSeal({ onBreak, broken }) {
  return (
    <motion.button
      onClick={onBreak}
      disabled={broken}
      aria-label="Break the wax seal to reveal the invitation"
      whileHover={!broken ? { scale: 1.08 } : {}}
      whileTap={!broken   ? { scale: 0.94 } : {}}
      className="relative mx-auto block focus:outline-none"
      style={{ width: "clamp(68px,18vw,96px)", height: "clamp(68px,18vw,96px)", cursor: broken ? "default" : "pointer" }}
    >
      <AnimatePresence>
        {!broken && (
          <motion.div
            key="seal"
            exit={{ scale: 1.6, opacity: 0, rotate: 25 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {/* Outer wax circle */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 38% 32%, #c0392b 0%, #922b21 45%, #641e16 100%)",
                boxShadow: "0 4px 24px rgba(161,38,51,0.7), 0 0 0 2px rgba(212,175,55,0.4), inset 0 2px 4px rgba(255,255,255,0.12)",
              }} />
            {/* Embossed ring */}
            <div className="absolute inset-[6px] rounded-full border border-[rgba(212,175,55,0.5)]" />
            <div className="absolute inset-[10px] rounded-full border border-[rgba(212,175,55,0.25)]" />
            {/* Embossed cross */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              <span className="text-[rgba(212,175,55,0.9)] font-serif drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                style={{ fontSize: "clamp(1.1rem,3.5vw,1.6rem)", lineHeight: 1 }}>✝</span>
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: "clamp(0.36rem,1vw,0.46rem)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,55,0.75)",
                  fontFamily: "'Montserrat',sans-serif",
                  lineHeight: 1,
                }}
              >Tap</motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Broken seal remnant */}
      {broken && (
        <>
          {[[-12,-10,"-15deg"],[ 14,-8,"22deg"],[-8, 12,"8deg"],[10, 14,"-20deg"]].map(([dx,dy,rot],i) => (
            <motion.div key={i}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{ x: dx*3, y: dy*3, rotate: rot, opacity: 0 }}
              transition={{ duration: 0.7, delay: i*0.06, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                width: 22 + i*4, height: 22 + i*4,
                left: `${28+i*6}%`, top: `${28+i*5}%`,
                background: "radial-gradient(circle, #c0392b 0%, #641e16 100%)",
                boxShadow: "0 2px 8px rgba(161,38,51,0.5)",
              }} />
          ))}
        </>
      )}
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════
   ENVELOPE FLAP — top triangular flap that lifts
══════════════════════════════════════════════════ */
function EnvelopeFlap({ open }) {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden"
      style={{ height: "50%", transformOrigin: "top", zIndex: 4 }}>
      <motion.div
        initial={false}
        animate={{ rotateX: open ? -180 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: open ? 0.35 : 0 }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
      >
        {/* Flap face */}
        <svg viewBox="0 0 400 200" className="w-full" style={{ display: "block" }}>
          <defs>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a1018"/>
              <stop offset="100%" stopColor="#1a0a10"/>
            </linearGradient>
            <linearGradient id="flapEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(212,175,55,0)"/>
              <stop offset="30%"  stopColor="rgba(212,175,55,0.45)"/>
              <stop offset="70%"  stopColor="rgba(212,175,55,0.45)"/>
              <stop offset="100%" stopColor="rgba(212,175,55,0)"/>
            </linearGradient>
          </defs>
          {/* Triangle flap */}
          <path d="M0 0 L400 0 L200 190 Z" fill="url(#flapGrad)"/>
          {/* Gold edge highlight */}
          <path d="M0 0 L200 190 L400 0" fill="none" stroke="url(#flapEdge)" strokeWidth="1"/>
          {/* Inner fold line */}
          <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6"/>
        </svg>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   DATE CARD — slides up from the envelope
══════════════════════════════════════════════════ */
function DateCard({ visible }) {
  const parts = [
    { label: "The Holy Matrimony of",   value: null,           type: "heading" },
    { label: null, value: `${weddingData.groom.name}  &  ${weddingData.bride.name}`, type: "names" },
    { label: "Date",   value: weddingData.wedding.dateDisplay,  type: "detail" },
    { label: "Time",   value: weddingData.wedding.time,          type: "detail" },
    { label: "Venue",  value: weddingData.wedding.church,        type: "detail" },
    { label: "Place",  value: weddingData.wedding.location,      type: "location" },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="datecard"
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%",  opacity: 1 }}
          exit={{   y: "80%",  opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="absolute inset-x-3 sm:inset-x-6"
          style={{ top: "22%", zIndex: 3 }}
        >
          <div className="relative overflow-hidden rounded-xl text-center"
            style={{
              background: "linear-gradient(160deg, #1e0e14 0%, #140a0e 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(212,175,55,0.12)",
              padding: "clamp(0.9rem,3vw,1.8rem)",
            }}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 animate-shimmer opacity-15 pointer-events-none" />
            {/* Top gold bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px]
              bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.8)] to-transparent"/>

            {parts.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85 + i * 0.1 }}
                className={p.type === "names" ? "my-2" : "my-1"}
              >
                {p.type === "heading" && (
                  <p style={{
                    fontSize: "clamp(0.5rem,1.5vw,0.62rem)",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "rgba(212,175,55,0.55)",
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: 600,
                  }}>{p.label}</p>
                )}
                {p.type === "names" && (
                  <p style={{
                    fontSize: "clamp(1.3rem,5.5vw,2.4rem)",
                    fontFamily: "'Cormorant Garamond',serif",
                    background: "linear-gradient(135deg,#fff9f0 0%,#d4af37 50%,#aa771c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))",
                    lineHeight: 1.1,
                  }}>{p.value}</p>
                )}
                {p.type === "detail" && (
                  <div>
                    <p style={{
                      fontSize: "clamp(0.44rem,1.2vw,0.54rem)",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(212,175,55,0.45)",
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: 600,
                      lineHeight: 1,
                    }}>{p.label}</p>
                    <p style={{
                      fontSize: "clamp(0.9rem,3vw,1.3rem)",
                      fontFamily: "'Cormorant Garamond',serif",
                      color: "#f5e8b8",
                      lineHeight: 1.3,
                      marginTop: 2,
                    }}>{p.value}</p>
                  </div>
                )}
                {p.type === "location" && (
                  <p style={{
                    fontSize: "clamp(0.62rem,1.8vw,0.78rem)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(232,213,191,0.5)",
                    fontFamily: "'Montserrat',sans-serif",
                    fontWeight: 400,
                    marginTop: 4,
                  }}>{p.value}</p>
                )}
                {/* Divider after names */}
                {p.type === "names" && (
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent mx-auto mt-2" />
                )}
              </motion.div>
            ))}

            {/* Bottom gold bar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px
              bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent"/>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════
   GOLD CONFETTI burst on seal break
══════════════════════════════════════════════════ */
function Confetti({ active }) {
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: 35 + Math.random() * 30,
    y: 40 + Math.random() * 20,
    dx: (Math.random() - 0.5) * 200,
    dy: -(60 + Math.random() * 180),
    rot: Math.random() * 720 - 360,
    size: 3 + Math.random() * 5,
    dur: 0.9 + Math.random() * 0.8,
    delay: Math.random() * 0.4,
    color: ["#d4af37","#f3e5ab","#fff9f0","#c0392b","#e8c97a"][i % 5],
  }));

  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 20 }}>
      {pieces.map(p => (
        <motion.div key={p.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.5 }}
          animate={{ x: p.dx, y: p.dy, rotate: p.rot, opacity: 0, scale: 1 }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size * 0.6,
            borderRadius: 1,
            background: p.color,
            boxShadow: `0 0 4px ${p.color}`,
          }} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════ */
export default function InvitationCard() {
  const [sealed,  setSealed]  = useState(true);   // wax seal intact
  const [open,    setOpen]    = useState(false);   // envelope flap lifted
  const [showCard, setShowCard] = useState(false); // date card visible
  const [burst,   setBurst]   = useState(false);   // confetti burst

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });
  const sectionY     = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  const breakSeal = () => {
    if (!sealed) return;
    setSealed(false);
    setBurst(true);
    setTimeout(() => setBurst(false), 1200);
    setTimeout(() => setOpen(true), 500);
    setTimeout(() => setShowCard(true), 900);
  };

  return (
    <section ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      style={{ background: "linear-gradient(180deg,#0d0709 0%,#170a10 55%,#0d0709 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(212,175,55,0.09) 0%, transparent 65%)" }} />

      {/* Section heading */}
      <motion.div
        style={{ y: sectionY, opacity: sectionOpacity }}
        className="text-center mb-10 relative z-10"
      >
        <p style={{
          fontSize: "clamp(0.56rem,1.9vw,0.7rem)",
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.6)",
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}>The Wedding Invitation</p>
        <h2 style={{
          fontSize: "clamp(1.7rem,5.5vw,3.2rem)",
          fontFamily: "'Cormorant Garamond',serif",
          background: "linear-gradient(135deg,#f3e5ab 0%,#d4af37 50%,#aa771c 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          margin: 0,
        }}>A Sacred Invitation</h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.55)] to-transparent mx-auto mt-3" />
      </motion.div>

      {/* ── ENVELOPE ── */}
      <motion.div
        style={{ y: sectionY, opacity: sectionOpacity }}
        className="relative z-10"
        animate={sealed ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className="relative"
          style={{
            width:  "min(420px, 92vw)",
            height: "min(500px, 135vw)",
            perspective: "1000px",
          }}
        >
          {/* Envelope body */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg,#1e0e14 0%,#140a0e 100%)",
              border: "1px solid rgba(212,175,55,0.28)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.1)",
            }}
          >
            {/* Envelope inner fold lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              <defs>
                <linearGradient id="envLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="rgba(212,175,55,0)"/>
                  <stop offset="50%"  stopColor="rgba(212,175,55,0.2)"/>
                  <stop offset="100%" stopColor="rgba(212,175,55,0)"/>
                </linearGradient>
              </defs>
              {/* Bottom-left diagonal */}
              <line x1="0" y1="100%" x2="50%" y2="60%" stroke="url(#envLine)" strokeWidth="0.7"/>
              {/* Bottom-right diagonal */}
              <line x1="100%" y1="100%" x2="50%" y2="60%" stroke="url(#envLine)" strokeWidth="0.7"/>
              {/* Bottom base line */}
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5"/>
            </svg>

            {/* Sealed state content */}
            <AnimatePresence>
              {sealed && (
                <motion.div
                  key="sealed-content"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6"
                >
                  {/* Decorative lines — very faint, just enough to show envelope texture */}
                  <div className="w-full flex items-center gap-3 opacity-8">
                    <div className="flex-1 h-px bg-[rgba(212,175,55,0.4)]"/>
                    <span className="text-[rgba(212,175,55,0.5)]" style={{ fontSize: "0.5rem" }}>✦</span>
                    <div className="flex-1 h-px bg-[rgba(212,175,55,0.4)]"/>
                  </div>
                  <p style={{
                    fontSize: "clamp(1.8rem,7vw,3.2rem)",
                    fontFamily: "'Cormorant Garamond',serif",
                    fontStyle: "italic",
                    color: "rgba(212,175,55,0.06)",
                    lineHeight: 1.1,
                    textAlign: "center",
                    userSelect: "none",
                  }}>
                    {weddingData.groom.name}
                    <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: "1.2em" }}> &amp; </span>
                    {weddingData.bride.name}
                  </p>
                  <div className="w-full flex items-center gap-3 opacity-8">
                    <div className="flex-1 h-px bg-[rgba(212,175,55,0.4)]"/>
                    <span className="text-[rgba(212,175,55,0.5)]" style={{ fontSize: "0.5rem" }}>✦</span>
                    <div className="flex-1 h-px bg-[rgba(212,175,55,0.4)]"/>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date card slides up inside envelope */}
            <DateCard visible={showCard} />

            {/* Envelope flap */}
            <EnvelopeFlap open={open} />

            {/* Corner ornaments */}
            {[["top-3 left-3","border-t border-l"],["top-3 right-3","border-t border-r"],
              ["bottom-3 left-3","border-b border-l"],["bottom-3 right-3","border-b border-r"]].map(([pos,cls],i) => (
              <div key={i} className={`absolute ${pos} w-5 h-5 ${cls} border-[rgba(212,175,55,0.25)] pointer-events-none`}/>
            ))}
          </div>

          {/* Wax seal — centred on the fold line between flap and body */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}>
            <WaxSeal onBreak={breakSeal} broken={!sealed} />
          </div>

          {/* Confetti */}
          <Confetti active={burst} />
        </div>
      </motion.div>

      {/* Post-open instruction */}
      <AnimatePresence>
        {!sealed && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 relative z-10 text-center"
            style={{
              fontSize: "clamp(0.5rem,1.5vw,0.62rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.45)",
              fontFamily: "'Montserrat',sans-serif",
            }}
          >
            ✦ &nbsp; We look forward to celebrating with you &nbsp; ✦
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
