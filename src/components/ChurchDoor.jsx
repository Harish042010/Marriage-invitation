import { useState, useMemo } from "react";

/* ── Floating dust motes ── */
function DustMotes() {
  const motes = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      r: 1 + Math.random() * 2,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      dx: (Math.random() - 0.5) * 50,
      dy: -(15 + Math.random() * 50),
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {motes.map(m => (
        <div key={m.id} style={{
          position: "absolute",
          left: `${m.x}%`,
          top: `${m.y}%`,
          width: m.r,
          height: m.r,
          borderRadius: "50%",
          background: "rgba(255,230,160,0.55)",
          boxShadow: "0 0 4px 1px rgba(255,210,120,0.3)",
          animation: `moteDrift ${m.dur}s ease-in-out ${m.delay}s infinite alternate`,
          "--mx": `${m.dx}px`,
          "--my": `${m.dy}px`,
        }} />
      ))}
    </div>
  );
}

/* ── Gold dust burst ── */
function GoldDust({ active }) {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 28 + Math.random() * 44,
      y: 35 + Math.random() * 40,
      size: 1.5 + Math.random() * 3,
      delay: Math.random() * 1.6,
      dur: 2.2 + Math.random() * 2.2,
      dx: (Math.random() - 0.5) * 220,
      dy: -(60 + Math.random() * 240),
    })), []);

  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 30 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fff5a0 0%, #d4af37 55%, transparent 100%)",
          boxShadow: `0 0 ${p.size * 2.5}px rgba(212,175,55,0.9)`,
          opacity: 0,
          animation: `gdBurst ${p.dur}s ease-out ${p.delay}s forwards`,
          "--gdx": `${p.dx}px`,
          "--gdy": `${p.dy}px`,
        }} />
      ))}
    </div>
  );
}

/* ── Rose petals ── */
function Petals({ active }) {
  const petals = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 40 + Math.random() * 35,
      w: 7 + Math.random() * 10,
      delay: 0.3 + Math.random() * 2.5,
      dur: 3 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 160,
      dy: -(80 + Math.random() * 260),
      rot: Math.random() * 540 - 270,
      color: ["rgba(255,182,193,0.9)", "rgba(255,150,160,0.8)", "rgba(255,210,210,0.85)"][i % 3],
    })), []);

  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 29 }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.w,
          height: p.w * 0.58,
          borderRadius: "58% 42% 58% 42%",
          background: p.color,
          filter: "blur(0.3px)",
          opacity: 0,
          animation: `petalUp ${p.dur}s ease-out ${p.delay}s forwards`,
          "--pdx": `${p.dx}px`,
          "--pdy": `${p.dy}px`,
          "--prot": `${p.rot}deg`,
        }} />
      ))}
    </div>
  );
}

/* ── Wooden door panel SVG ── */
function WoodPanel({ side, hovered }) {
  const L = side === "left";
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 220 600"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`wd-${side}`} x1={L ? "0" : "1"} y1="0" x2={L ? "1" : "0"} y2="0">
          <stop offset="0%"   stopColor="#3a1d0c" />
          <stop offset="10%"  stopColor="#3b1f0e" />
          <stop offset="28%"  stopColor="#4e2a12" />
          <stop offset="50%"  stopColor="#5c3218" />
          <stop offset="72%"  stopColor="#4e2a12" />
          <stop offset="90%"  stopColor="#3b1f0e" />
          <stop offset="100%" stopColor="#3a1d0c" />
        </linearGradient>
        <linearGradient id={`pd-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,200,130,0.07)" />
          <stop offset="40%"  stopColor="rgba(0,0,0,0.22)" />
          <stop offset="100%" stopColor="rgba(255,200,130,0.05)" />
        </linearGradient>
        <radialGradient id={`sh-${side}`} cx={L ? "35%" : "65%"} cy="38%" r="42%">
          <stop offset="0%"   stopColor="rgba(255,210,140,0.13)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id={`hv-${side}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(212,175,55,0.09)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={`wg-${side}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.028 0.65"
            numOctaves="5" seed={L ? 2 : 7} result="n" />
          <feDiffuseLighting in="n" lightingColor="#7a4020" surfaceScale="0.9" result="l">
            <feDistantLight azimuth={L ? "200" : "340"} elevation="42" />
          </feDiffuseLighting>
          <feComposite in="l" in2="SourceGraphic"
            operator="arithmetic" k1="0.14" k2="0.86" k3="0" k4="0" />
        </filter>
      </defs>

      <rect width="220" height="600" fill={`url(#wd-${side})`} />
      <rect width="220" height="600" fill={`url(#wd-${side})`}
        filter={`url(#wg-${side})`} opacity="0.55" />
      {hovered && <rect width="220" height="600" fill={`url(#hv-${side})`} />}

      {/* Top arched panel */}
      <path d="M18 220 L18 50 Q18 20 55 20 Q110 4 165 20 Q202 20 202 50 L202 220 Z"
        fill={`url(#pd-${side})`} stroke="rgba(20,10,5,0.7)" strokeWidth="1.4" />
      <path d="M25 218 L25 54 Q25 28 57 28 Q110 14 163 28 Q195 28 195 54 L195 218 Z"
        fill="none" stroke="rgba(255,190,100,0.06)" strokeWidth="0.7" />

      {/* Cross */}
      <g stroke="rgba(212,175,55,0.3)" fill="none">
        <line x1="110" y1="44"  x2="110" y2="200" strokeWidth="1" />
        <line x1="52"  y1="118" x2="168" y2="118" strokeWidth="1" />
        <line x1="105" y1="44"  x2="115" y2="44"  strokeWidth="0.8" />
        <line x1="105" y1="200" x2="115" y2="200" strokeWidth="0.8" />
        <line x1="52"  y1="113" x2="52"  y2="123" strokeWidth="0.8" />
        <line x1="168" y1="113" x2="168" y2="123" strokeWidth="0.8" />
        <path d="M22 24 Q32 24 32 34"   strokeWidth="0.6" fill="none" />
        <path d="M198 24 Q188 24 188 34" strokeWidth="0.6" fill="none" />
        <path d="M22 216 Q32 216 32 206" strokeWidth="0.6" fill="none" />
        <path d="M198 216 Q188 216 188 206" strokeWidth="0.6" fill="none" />
      </g>

      {/* Middle rail */}
      <rect x="12" y="232" width="196" height="18" rx="2"
        fill="rgba(0,0,0,0.18)" stroke="rgba(20,10,5,0.55)" strokeWidth="1" />
      <g stroke="rgba(212,175,55,0.25)" fill="none">
        <line x1="40" y1="241" x2="94"  y2="241" strokeWidth="0.7" />
        <line x1="126" y1="241" x2="180" y2="241" strokeWidth="0.7" />
        <circle cx="110" cy="241" r="5" strokeWidth="0.8" />
        <path d="M100 241 L110 235 L120 241 L110 247 Z" strokeWidth="0.6" />
      </g>

      {/* Lower panel */}
      <rect x="18" y="260" width="184" height="318" rx="3"
        fill={`url(#pd-${side})`} stroke="rgba(20,10,5,0.7)" strokeWidth="1.4" />
      <rect x="25" y="267" width="170" height="304" rx="2"
        fill="none" stroke="rgba(255,190,100,0.05)" strokeWidth="0.7" />

      {/* Floral vine */}
      <g stroke="rgba(212,175,55,0.22)" fill="none" strokeWidth="0.75">
        <path d="M110 555 C110 530 106 505 110 460 C114 415 110 390 110 362" />
        <path d="M110 495 C90 472 74 482 78 500 C82 518 110 510 110 495" />
        <path d="M110 450 C130 428 146 438 142 456 C138 474 110 465 110 450" />
        <circle cx="110" cy="340" r="20" />
        <circle cx="110" cy="340" r="12" />
        <circle cx="110" cy="340" r="5" fill="rgba(212,175,55,0.1)" />
        <ellipse cx="86"  cy="340" rx="10" ry="6" transform="rotate(-18,86,340)" />
        <ellipse cx="134" cy="340" rx="10" ry="6" transform="rotate(18,134,340)" />
        <ellipse cx="110" cy="318" rx="10" ry="6" transform="rotate(-90,110,318)" />
      </g>

      {/* Handle */}
      <rect x={L ? "174" : "22"} y="285" width="24" height="70" rx="5"
        fill="#1a0e06" stroke="rgba(212,175,55,0.38)" strokeWidth="1.1" />
      <circle cx={L ? 186 : 34} cy="340" r="17"
        fill="none" stroke="#8a7028" strokeWidth="4" />
      <circle cx={L ? 186 : 34} cy="340" r="17"
        fill="none" stroke="rgba(255,220,100,0.18)" strokeWidth="1.2" />
      <circle cx={L ? 186 : 34} cy="296" r="5.5" fill="#b89435" />
      <circle cx={L ? 185 : 33} cy="295" r="2" fill="rgba(255,245,200,0.55)" />
      <ellipse cx={L ? 186 : 34} cy="364" rx="3" ry="4.5"
        fill="rgba(0,0,0,0.6)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6" />

      {/* Hinges */}
      {[68, 290, 520].map(hy => (
        <g key={hy}>
          <rect x={L ? "204" : "0"} y={hy - 16} width="16" height="32" rx="3"
            fill="#1a0e06" stroke="rgba(212,175,55,0.22)" strokeWidth="0.9" />
          <circle cx={L ? 212 : 8} cy={hy} r="4"
            fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="0.8" />
        </g>
      ))}

      <rect width="220" height="600" fill={`url(#sh-${side})`} />
      <rect x={L ? "216" : "0"} y="0" width="4" height="600" fill="rgba(0,0,0,0.45)" />
      <line x1={L ? "1" : "219"} y1="10" x2={L ? "1" : "219"} y2="590"
        stroke="rgba(212,175,55,0.1)" strokeWidth="1" />
    </svg>
  );
}

/* ── Door unit: arch frame + two clickable panels ── */
function ChurchDoorUnit({ opening, onDoorClick }) {
  const [leftHov,  setLeftHov]  = useState(false);
  const [rightHov, setRightHov] = useState(false);
  const cur = opening ? "default" : "pointer";

  return (
    /* Outer wrapper — width + padding respond to viewport */
    <div style={{
      position: "relative",
      width: "min(480px, 92vw)",
      paddingTop: "min(70px, 13vw)",
      filter: "drop-shadow(0 16px 60px rgba(0,0,0,0.9))",
    }}>

      {/* ── Arch top ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "min(115px, 22vw)",
        background: "linear-gradient(180deg,#2a1508 0%,#3e2010 40%,#2a1508 100%)",
        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        overflow: "hidden",
        zIndex: 5,
      }}>
        <div style={{
          position: "absolute", top: "10%", left: "8%", right: "8%", bottom: 0,
          background: "linear-gradient(180deg,#4a2a14 0%,#3a1e0e 60%,#2a1508 100%)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        }} />
        {/* Cross in arch — replaces rose window */}
        <div style={{
          position: "absolute", top: "12%", left: "50%",
          transform: "translateX(-50%)",
          width: "min(58px, 12vw)", height: "min(58px, 12vw)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }} aria-hidden="true">
            {/* Outer ring */}
            <circle cx="30" cy="30" r="28" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8"/>
            <circle cx="30" cy="30" r="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5"/>
            {/* Cross vertical */}
            <rect x="27.5" y="10" width="5" height="40" rx="1.5" fill="rgba(212,175,55,0.85)"/>
            {/* Cross horizontal */}
            <rect x="12" y="24" width="36" height="5" rx="1.5" fill="rgba(212,175,55,0.85)"/>
            {/* Serif ends */}
            <rect x="25" y="9" width="10" height="2" rx="1" fill="rgba(212,175,55,0.7)"/>
            <rect x="25" y="49" width="10" height="2" rx="1" fill="rgba(212,175,55,0.7)"/>
            <rect x="10" y="22" width="2" height="9" rx="1" fill="rgba(212,175,55,0.7)"/>
            <rect x="48" y="22" width="2" height="9" rx="1" fill="rgba(212,175,55,0.7)"/>
            {/* Centre gem */}
            <circle cx="30" cy="26.5" r="3.5" fill="rgba(255,245,180,0.7)" stroke="rgba(212,175,55,0.8)" strokeWidth="0.5"/>
          </svg>
        </div>
        {/* Keystone */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "min(28px, 5.5vw)", height: "min(20px, 4vw)",
          background: "linear-gradient(180deg,#d4af37 0%,#8a6820 100%)",
          clipPath: "polygon(20% 0%,80% 0%,100% 100%,0% 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          border: "1px solid rgba(212,175,55,0.18)",
          borderBottom: "none",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Left pillar ── */}
      <div style={{
        position: "absolute",
        top: "min(70px,13vw)", left: 0,
        width: "min(24px,4.8vw)", bottom: 0,
        background: "linear-gradient(90deg,#1e0f07 0%,#3a2010 40%,#2e1a0c 100%)",
        boxShadow: "inset -3px 0 8px rgba(0,0,0,0.4)",
        zIndex: 4,
      }}>
        <div style={{ position:"absolute", inset:0, borderRight:"1px solid rgba(212,175,55,0.12)" }} />
      </div>

      {/* ── Right pillar ── */}
      <div style={{
        position: "absolute",
        top: "min(70px,13vw)", right: 0,
        width: "min(24px,4.8vw)", bottom: 0,
        background: "linear-gradient(270deg,#1e0f07 0%,#3a2010 40%,#2e1a0c 100%)",
        boxShadow: "inset 3px 0 8px rgba(0,0,0,0.4)",
        zIndex: 4,
      }}>
        <div style={{ position:"absolute", inset:0, borderLeft:"1px solid rgba(212,175,55,0.12)" }} />
      </div>

      {/* ── Door panels container ── */}
      <div style={{
        position: "relative",
        /* Height: fills remaining viewport after top text + arch padding + threshold */
        height: "min(520px, calc(100svh - 180px))",
        minHeight: 260,
        marginLeft:  "min(24px,4.8vw)",
        marginRight: "min(24px,4.8vw)",
        display: "flex",
        perspective: "1200px",
        perspectiveOrigin: "50% 38%",
        overflow: "hidden",
        background: "#110a04",
        transition: "background 2s ease-out 0.3s",
        zIndex: 3,
      }}>
        {/* Warm light behind */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, rgba(255,240,180,0.85) 0%, rgba(212,175,55,0.4) 30%, transparent 65%)",
          opacity: opening ? 1 : 0,
          transition: "opacity 2.5s ease-out 0.2s",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Center seam */}
        {!opening && (
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: "50%",
            width: 2, transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,240,180,0.9) 20%, rgba(212,175,55,0.7) 50%, rgba(255,240,180,0.9) 80%, transparent 100%)",
            boxShadow: "0 0 16px 4px rgba(212,175,55,0.45), 0 0 50px 8px rgba(212,175,55,0.15)",
            animation: "seamPulse 2.8s ease-in-out infinite",
            zIndex: 10, pointerEvents: "none",
          }} />
        )}

        {/* LEFT DOOR */}
        <div
          onClick={() => !opening && onDoorClick()}
          onMouseEnter={() => !opening && setLeftHov(true)}
          onMouseLeave={() => setLeftHov(false)}
          style={{
            position: "relative", width: "50%", height: "100%",
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            transform: opening ? "rotateY(-115deg)" : "rotateY(0deg)",
            transition: opening ? "transform 4s cubic-bezier(0.12,0.9,0.2,1) 0.15s" : "none",
            cursor: cur, zIndex: 2,
            /* Minimum 44 px touch target width ensured by 50% of min 260px = 130px */
          }}
        >
          <WoodPanel side="left" hovered={leftHov && !opening} />
          {leftHov && !opening && (
            <div style={{
              position: "absolute", bottom: "16%", left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(212,175,55,0.7)",
              fontSize: "clamp(7px,1.8vw,10px)",
              letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "'Montserrat',sans-serif",
              whiteSpace: "nowrap",
              textShadow: "0 0 12px rgba(212,175,55,0.5)",
              pointerEvents: "none",
              animation: "hintFade 0.3s ease-out both",
            }}>push open</div>
          )}
        </div>

        {/* RIGHT DOOR */}
        <div
          onClick={() => !opening && onDoorClick()}
          onMouseEnter={() => !opening && setRightHov(true)}
          onMouseLeave={() => setRightHov(false)}
          style={{
            position: "relative", width: "50%", height: "100%",
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
            transform: opening ? "rotateY(115deg)" : "rotateY(0deg)",
            transition: opening ? "transform 4s cubic-bezier(0.12,0.9,0.2,1) 0.15s" : "none",
            cursor: cur, zIndex: 2,
          }}
        >
          <WoodPanel side="right" hovered={rightHov && !opening} />
          {rightHov && !opening && (
            <div style={{
              position: "absolute", bottom: "16%", left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(212,175,55,0.7)",
              fontSize: "clamp(7px,1.8vw,10px)",
              letterSpacing: "0.3em", textTransform: "uppercase",
              fontFamily: "'Montserrat',sans-serif",
              whiteSpace: "nowrap",
              textShadow: "0 0 12px rgba(212,175,55,0.5)",
              pointerEvents: "none",
              animation: "hintFade 0.3s ease-out both",
            }}>push open</div>
          )}
        </div>

        {/* Sill */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "min(12px,2vw)",
          background: "linear-gradient(180deg,#2a1408 0%,#1a0d04 100%)",
          borderTop: "1px solid rgba(212,175,55,0.12)",
          zIndex: 6, pointerEvents: "none",
        }} />
      </div>

      {/* Threshold */}
      <div style={{
        height: "min(14px,2.5vw)",
        marginLeft: "min(18px,3.5vw)",
        marginRight: "min(18px,3.5vw)",
        background: "linear-gradient(180deg,#3a2010 0%,#1c0e06 100%)",
        borderLeft: "1px solid rgba(212,175,55,0.1)",
        borderRight: "1px solid rgba(212,175,55,0.1)",
        borderBottom: "1px solid rgba(212,175,55,0.08)",
        borderRadius: "0 0 4px 4px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
      }} />
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function ChurchDoor({ onEnter }) {
  const [opening, setOpening] = useState(false);

  const handleDoorClick = () => {
    if (opening) return;
    setOpening(true);
    if (onEnter) onEnter();
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% 35%,#1e140a 0%,#120c05 50%,#070404 100%)",
        /* Use 100svh on mobile to account for browser chrome */
        minHeight: "100svh",
      }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.72) 100%)",
        zIndex: 1,
      }} />

      <DustMotes />

      {/* Floor glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(255,200,100,0.06) 0%, transparent 55%)",
        zIndex: 1,
      }} />

      {/* Warm fill on open */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(255,230,160,0.5) 0%, rgba(200,150,50,0.12) 40%, transparent 70%)",
        opacity: opening ? 1 : 0,
        transition: "opacity 3s ease-out 0.5s",
        zIndex: 20,
      }} />

      {/* ── Label above door ── */}
      <div style={{
        marginBottom: "clamp(8px,1.8vh,16px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(4px,1vh,8px)",
        zIndex: 15,
        opacity: opening ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        animation: !opening ? "labelRise 2s ease-out 0.5s both" : "none",
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: "center",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap: "clamp(6px,2vw,12px)" }}>
          <div style={{ width: "clamp(24px,6vw,40px)", height:1, background:"linear-gradient(to right,transparent,rgba(212,175,55,0.45))" }} />
          <span style={{
            color: "rgba(212,175,55,0.6)",
            fontSize: "clamp(7px,2vw,10px)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            fontFamily: "'Montserrat',sans-serif",
          }}>Sacred Union</span>
          <div style={{ width:"clamp(24px,6vw,40px)", height:1, background:"linear-gradient(to left,transparent,rgba(212,175,55,0.45))" }} />
        </div>

        <h2 style={{
          color: "#f5e8b8",
          fontSize: "clamp(0.95rem,4.5vw,1.6rem)",
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontWeight: 400,
          letterSpacing: "0.07em",
          margin: 0,
          textShadow: "0 0 30px rgba(212,175,55,0.5)",
          animation: !opening ? "shimmer 4s ease-in-out infinite" : "none",
        }}>
          A Blessing Unfolds
        </h2>

        <p style={{
          color: "rgba(243,229,171,0.35)",
          fontSize: "clamp(9px,2.2vw,11px)",
          fontStyle: "italic",
          fontFamily: "Georgia,serif",
          margin: 0,
          letterSpacing: "0.04em",
        }}>
          Tap the doors to enter
        </p>
      </div>

      {/* The door */}
      <div style={{ position:"relative", zIndex:10 }}>
        <ChurchDoorUnit opening={opening} onDoorClick={handleDoorClick} />
      </div>

      <GoldDust active={opening} />
      <Petals   active={opening} />

      {/* White bloom */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "rgba(255,248,220,1)", zIndex: 50, opacity: 0,
        animation: opening ? "bloomFlash 3s ease-in-out 2s forwards" : "none",
      }} />

      {/* Fade to app */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "#140a04", zIndex: 60, opacity: 0,
        animation: opening ? "fadeOut 1.2s ease-in 3.6s forwards" : "none",
      }} />

      <style>{`
        @keyframes moteDrift {
          0%   { transform:translate(0,0) scale(1);  opacity:0.5; }
          100% { transform:translate(var(--mx),var(--my)) scale(0.7); opacity:0.15; }
        }
        @keyframes seamPulse {
          0%,100% { opacity:.8;  box-shadow:0 0 14px 3px rgba(212,175,55,0.35),0 0 45px 6px rgba(212,175,55,0.1); }
          50%     { opacity:1;   box-shadow:0 0 22px 5px rgba(212,175,55,0.6),0 0 70px 12px rgba(212,175,55,0.22); }
        }
        @keyframes gdBurst {
          0%   { opacity:0;    transform:translate(0,0) scale(0.3); }
          14%  { opacity:0.95; }
          100% { opacity:0;    transform:translate(var(--gdx),var(--gdy)) scale(1.6); }
        }
        @keyframes petalUp {
          0%   { opacity:0;   transform:translate(0,0) rotate(0deg); }
          10%  { opacity:0.9; }
          100% { opacity:0;   transform:translate(var(--pdx),var(--pdy)) rotate(var(--prot)); }
        }
        @keyframes bloomFlash {
          0%   { opacity:0; }
          18%  { opacity:0.7; }
          100% { opacity:0; }
        }
        @keyframes fadeOut  { 0%{opacity:0}100%{opacity:1} }
        @keyframes labelRise {
          0%   { opacity:0; transform:translateY(12px); }
          100% { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%,100% { text-shadow:0 0 30px rgba(212,175,55,0.5); }
          50%     { text-shadow:0 0 50px rgba(212,175,55,0.85),0 0 90px rgba(212,175,55,0.2); }
        }
        @keyframes hintFade {
          0%   { opacity:0; transform:translateX(-50%) translateY(4px); }
          100% { opacity:1; transform:translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
