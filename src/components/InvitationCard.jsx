import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Cross, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

/* ── Wax seal ── */
function WaxSeal({ onBreak, broken }) {
  return (
    <motion.button
      onClick={onBreak}
      disabled={broken}
      aria-label="Break the wax seal to reveal the invitation"
      whileHover={!broken ? { scale:1.08 } : {}}
      whileTap={!broken  ? { scale:0.94 } : {}}
      className="relative mx-auto block focus:outline-none"
      style={{ width:"clamp(68px,18vw,96px)", height:"clamp(68px,18vw,96px)",
        cursor: broken ? "default" : "pointer" }}
    >
      <AnimatePresence>
        {!broken && (
          <motion.div key="seal"
            exit={{ scale:1.1, opacity:0, rotate:15 }}
            transition={{ duration:0.4 }}
            className="absolute inset-0">
            <div className="absolute inset-0 rounded-full"
              style={{
                background:"radial-gradient(circle at 38% 32%,#c9855c 0%,var(--color-ink) 45%,#7a3545 100%)",
                boxShadow:"0 4px 18px rgba(59,49,71,0.35),0 0 0 1.5px rgba(194,176,153,0.5),inset 0 2px 4px rgba(255,255,255,0.18)",
              }}/>
            <div className="absolute inset-[6px] rounded-full border border-[rgba(194,176,153,0.55)]"/>
            <div className="absolute inset-[10px] rounded-full border border-[rgba(194,176,153,0.28)]"/>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              <Cross size={24} strokeWidth={1.7} color="rgba(255,245,220,0.95)" />
              <motion.p animate={{ opacity:[0.45,1,0.45] }} transition={{ duration:2, repeat:Infinity }}
                style={{ fontSize:"clamp(0.36rem,1vw,0.46rem)", letterSpacing:"0.22em",
                  textTransform:"uppercase", color:"rgba(255,240,200,0.8)",
                  fontFamily:"'Montserrat',sans-serif", lineHeight:1 }}>
                Tap
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {broken && (
        [[-18,-12,"-25deg"],[20,-10,"35deg"],[-10,18,"12deg"],[14,20,"-28deg"]].map(([dx,dy,rot],i)=>(
          <motion.div key={i}
            initial={{ x:0, y:0, rotate:0, opacity:1 }}
            animate={{ x:dx*3, y:dy*3, rotate:rot, opacity:0 }}
            transition={{ duration:0.65, delay:i*0.05, ease:"easeOut" }}
            className="absolute rounded-full"
            style={{ width:20+i*4, height:20+i*4, left:"28%", top:"28%",
              background:"radial-gradient(circle,#c9855c 0%,#7a3545 100%)",
              boxShadow:"0 2px 6px rgba(59,49,71,0.3)" }}/>
        ))
      )}
    </motion.button>
  );
}

/* ── Envelope flap ── */
function EnvelopeFlap({ open }) {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none"
      style={{ height:"50%", zIndex:4 }}>
      <motion.div
        initial={false}
        animate={{ rotateX: open ? -180 : 0 }}
        transition={{ duration:1.1, ease:[0.22,1,0.36,1], delay: open ? 0.35 : 0 }}
        className="relative w-full h-full"
        style={{ transformOrigin:"top center", transformStyle:"preserve-3d" }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility:"hidden" }}>
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none" style={{ display:"block" }}>
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FAF8F5"/>
                <stop offset="100%" stopColor="#F0DDD8"/>
              </linearGradient>
              <linearGradient id="flapEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="rgba(194,176,153,0)"/>
                <stop offset="30%"  stopColor="rgba(194,176,153,0.55)"/>
                <stop offset="70%"  stopColor="rgba(194,176,153,0.55)"/>
                <stop offset="100%" stopColor="rgba(194,176,153,0)"/>
              </linearGradient>
            </defs>
            <path d="M0 0 L400 0 L200 190 Z" fill="url(#flapGrad)"/>
            <path d="M0 0 L200 190 L400 0" fill="none" stroke="url(#flapEdge)" strokeWidth="1"/>
            <line x1="0" y1="0" x2="400" y2="0" stroke="rgba(194,176,153,0.25)" strokeWidth="0.7"/>
          </svg>
        </div>
        
        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility:"hidden", transform:"rotateX(180deg)" }}>
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none" style={{ display:"block" }}>
            <defs>
              <linearGradient id="flapBackGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0DCE6"/>
                <stop offset="100%" stopColor="#FAF8F5"/>
              </linearGradient>
            </defs>
            <path d="M0 0 L400 0 L200 190 Z" fill="url(#flapBackGrad)"/>
            <path d="M0 0 L200 190 L400 0" fill="none" stroke="rgba(194,176,153,0.2)" strokeWidth="3"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Date card ── */
function DateCard({ visible }) {
  const rows = [
    { type:"heading", label:"The Holy Matrimony of" },
    { type:"names",   groom:weddingData.groom.name, bride:weddingData.bride.name },
    { type:"detail",  label:"Date",  value:weddingData.wedding.dateDisplay },
    { type:"detail",  label:"Time",  value:weddingData.wedding.time },
    { type:"detail",  label:"Venue", value:weddingData.wedding.church },
    { type:"location",value:weddingData.wedding.location },
  ];
  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="datecard"
          initial={{ y:"60%", opacity:0 }}
          animate={{ y:"0%",  opacity:1 }}
          exit={{   y:"80%",  opacity:0 }}
          transition={{ duration:1.1, ease:[0.22,1,0.36,1], delay:0.7 }}
          className="absolute inset-x-3 sm:inset-x-6"
          style={{ top:"15%", zIndex:3 }}>
          <div className="relative overflow-hidden rounded-xl text-center"
            style={{ background:"#FAF8F5", border:"1px solid rgba(194,176,153,0.35)",
              boxShadow:"0 6px 28px rgba(59,49,71,0.1),inset 0 1px 0 rgba(255,255,255,0.8)",
              padding:"clamp(0.6rem,2vw,1.2rem)" }}>
            <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none"/>

            {rows.map((r,i)=>(
              <motion.div key={i}
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.65, delay:0.85+i*0.1 }}
                className={r.type==="names"?"my-1":"my-0.5"}>
                {r.type==="heading" && (
                  <p style={{ fontSize:"clamp(0.48rem,1.4vw,0.6rem)", letterSpacing:"0.3em",
                    textTransform:"uppercase", color:"rgba(194,176,153,0.75)",
                    fontFamily:"'Montserrat',sans-serif", fontWeight:600 }}>{r.label}</p>
                )}
                {r.type==="names" && (
                  <div className="flex flex-col items-center justify-center gap-0.5">
                    <p className="gold-gradient-text" style={{
                      fontSize: "clamp(1.1rem,4.5vw,1.6rem)",
                      fontFamily: "'Cormorant Garamond',serif",
                      textShadow: "0 0 8px rgba(194,176,153,0.3)",
                      lineHeight: 1.1,
                      textWrap: "balance",
                    }}>{r.groom}</p>
                    <span className="font-serif italic" style={{
                      fontSize: "clamp(1rem,3.5vw,1.4rem)",
                      color: "#C2B099"
                    }}>&amp;</span>
                    <p className="gold-gradient-text" style={{
                      fontSize: "clamp(1.1rem,4.5vw,1.6rem)",
                      fontFamily: "'Cormorant Garamond',serif",
                      textShadow: "0 0 8px rgba(194,176,153,0.3)",
                      lineHeight: 1.1,
                      textWrap: "balance",
                    }}>{r.bride}</p>
                    <div className="h-px w-14 mx-auto mt-2"
                      style={{ background:"linear-gradient(to right,transparent,rgba(194,176,153,0.45),transparent)" }}/>
                  </div>
                )}
                {r.type==="detail" && (
                  <div>
                    <p style={{ fontSize:"clamp(0.42rem,1.1vw,0.52rem)", letterSpacing:"0.28em",
                      textTransform:"uppercase", color:"rgba(194,176,153,0.7)",
                      fontFamily:"'Montserrat',sans-serif", fontWeight:600, lineHeight:1 }}>{r.label}</p>
                    <p style={{ fontSize:"clamp(0.85rem,3vw,1.2rem)", fontFamily:"'Cormorant Garamond',serif",
                      color:"#3B3147", lineHeight:1.3, marginTop:2 }}>{r.value}</p>
                  </div>
                )}
                {r.type==="location" && (
                  <p style={{ fontSize:"clamp(0.58rem,1.7vw,0.72rem)", letterSpacing:"0.1em",
                    textTransform:"uppercase", color:"rgba(59,49,71,0.45)",
                    fontFamily:"'Montserrat',sans-serif", marginTop:2 }}>{r.value}</p>
                )}
              </motion.div>
            ))}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-px"
              style={{ background:"linear-gradient(to right,transparent,rgba(194,176,153,0.4),transparent)" }}/>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Confetti ── */
function Confetti({ active }) {
  const pieces = Array.from({length:28},(_,i)=>({
    id:i, x:35+Math.random()*30, y:38+Math.random()*22,
    dx:(Math.random()-0.5)*200, dy:-(60+Math.random()*180),
    rot:Math.random()*720-360, size:3+Math.random()*5,
    dur:0.9+Math.random()*0.8, delay:Math.random()*0.4,
    color:["#C2B099","#E8C9C5","var(--color-ink)","var(--color-ink)","#D4B483"][i%5],
  }));
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex:20 }}>
      {pieces.map(p=>(
        <motion.div key={p.id}
          initial={{ x:0, y:0, rotate:0, opacity:1, scale:0.5 }}
          animate={{ x:p.dx, y:p.dy, rotate:p.rot, opacity:0, scale:1.2 }}
          transition={{ duration:p.dur, delay:p.delay, ease:"easeOut" }}
          style={{ position:"absolute", left:`${p.x}%`, top:`${p.y}%`,
            width:p.size, height:p.size*0.6, borderRadius:1,
            background:p.color, boxShadow:`0 0 4px ${p.color}` }}/>
      ))}
    </div>
  );
}

/* ── Main ── */
export default function InvitationCard() {
  const [sealed,   setSealed]   = useState(true);
  const [open,     setOpen]     = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [burst,    setBurst]    = useState(false);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start end","center center"] });
  const sY  = useTransform(scrollYProgress,[0,1],[60,0]);
  const sOp = useTransform(scrollYProgress,[0,0.35],[0,1]);

  const breakSeal = () => {
    if (!sealed) return;
    setSealed(false); setBurst(true);
    setTimeout(()=>setBurst(false), 1200);
    setTimeout(()=>setOpen(true), 500);
    setTimeout(()=>setShowCard(true), 900);
  };

  return (
    <section ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10 md:py-20"
      style={{ background:"linear-gradient(180deg,#E0DCE6 0%,#F5E4E0 55%,#E0DCE6 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at 50% 45%,rgba(194,176,153,0.12) 0%,transparent 65%)" }}/>

      {/* Heading */}
      <motion.div style={{ y:sY, opacity:sOp }} className="text-center mb-10 relative z-10">
        <p style={{ fontSize:"clamp(0.56rem,1.9vw,0.7rem)", letterSpacing:"0.42em",
          textTransform:"uppercase", color:"rgba(194,176,153,0.7)",
          fontFamily:"'Montserrat',sans-serif", fontWeight:600, marginBottom:"0.5rem" }}>
          The Wedding Invitation
        </p>
        <h2 style={{ fontSize:"clamp(1.7rem,5.5vw,3.2rem)", fontFamily:"'Cormorant Garamond',serif",
          color:"var(--color-ink)", margin:0 }}>
          A Sacred Invitation
        </h2>
        <div className="h-px w-20 mx-auto mt-3"
          style={{ background:"linear-gradient(to right,transparent,rgba(194,176,153,0.6),transparent)" }}/>
      </motion.div>

      {/* Envelope */}
      <motion.div style={{ y:sY, opacity:sOp }} className="relative z-10"
        animate={sealed ? {} : { y:[0,-8,0] }}
        transition={{ duration:0.5, ease:"easeOut" }}>
        <div className="relative mx-auto"
          style={{ width:"min(540px,92vw)", height:"min(420px,75vw)", perspective:"1000px" }}>

          {/* Body */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ background:"#FAF8F5",
              border:"1px solid rgba(194,176,153,0.35)",
              boxShadow:"0 20px 60px rgba(59,49,71,0.14),0 4px 14px rgba(59,49,71,0.07),inset 0 1px 0 rgba(255,255,255,0.9)" }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="envLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="rgba(194,176,153,0)"/>
                  <stop offset="50%"  stopColor="rgba(194,176,153,0.22)"/>
                  <stop offset="100%" stopColor="rgba(194,176,153,0)"/>
                </linearGradient>
              </defs>
              <line x1="0" y1="100%" x2="50%" y2="60%" stroke="url(#envLine)" strokeWidth="0.7"/>
              <line x1="100%" y1="100%" x2="50%" y2="60%" stroke="url(#envLine)" strokeWidth="0.7"/>
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(194,176,153,0.14)" strokeWidth="0.5"/>
            </svg>

            {/* Corner ornaments */}
            {[["top-3 left-3","border-t border-l"],["top-3 right-3","border-t border-r"],
              ["bottom-3 left-3","border-b border-l"],["bottom-3 right-3","border-b border-r"]].map(([pos,cls],i)=>(
              <div key={i} className={`absolute ${pos} w-5 h-5 ${cls} pointer-events-none`}
                style={{ borderColor:"rgba(194,176,153,0.28)" }}/>
            ))}

            {/* Sealed content */}
            <AnimatePresence>
              {sealed && (
                <motion.div key="sealed-content"
                  exit={{ opacity:0 }} transition={{ duration:0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  {/* Clean elegant envelope back — no text to clash with seal */}
                </motion.div>
              )}
            </AnimatePresence>

            <DateCard visible={showCard}/>
            <EnvelopeFlap open={open}/>
          </div>

          {/* Wax seal */}
          <div style={{ position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)", zIndex:10 }}>
            <WaxSeal onBreak={breakSeal} broken={!sealed}/>
          </div>

          <Confetti active={burst}/>
        </div>
      </motion.div>

      <AnimatePresence>
        {!sealed && (
          <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0 }} transition={{ duration:0.8, delay:1.2 }}
            className="mt-8 relative z-10 text-center flex items-center justify-center gap-3"
            style={{ fontSize:"clamp(0.5rem,1.5vw,0.62rem)", letterSpacing:"0.3em",
              textTransform:"uppercase", color:"rgba(194,176,153,0.55)",
              fontFamily:"'Montserrat',sans-serif" }}>
            <Sparkles size={12} strokeWidth={1.8} />
            <span>We look forward to celebrating with you</span>
            <Sparkles size={12} strokeWidth={1.8} />
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
