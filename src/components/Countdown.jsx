import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "../data/weddingData";

function getTarget() {
  const m = weddingData.wedding.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let h = m ? parseInt(m[1], 10) : 10;
  const mins = m ? m[2] : "30";
  const mer  = m ? m[3].toUpperCase() : "AM";
  if (mer === "PM" && h < 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return new Date(`${weddingData.wedding.date}T${String(h).padStart(2,"0")}:${mins}:00`).getTime();
}

function GlassTile({ value, max, label, accent, delay }) {
  const display  = String(value).padStart(2, "0");
  const progress = max > 0 ? value / max : 0;

  return (
    <motion.div
      initial={{ opacity:0, y:40, scale:0.88 }}
      whileInView={{ opacity:1, y:0, scale:1 }}
      viewport={{ once:true, margin:"-20px" }}
      transition={{ duration:1, ease:[0.22,1,0.36,1], delay }}
      className="relative flex flex-col items-center"
      style={{ width:"clamp(70px,17vw,110px)" }}
    >
      <div className="relative w-full overflow-hidden"
        style={{
          height:"clamp(82px,20vw,128px)",
          borderRadius:"clamp(10px,2vw,16px)",
          background:"linear-gradient(145deg,#FAF8F5 0%,#F9EDE8 100%)",
          border:`1px solid ${accent}55`,
          boxShadow:`0 6px 24px rgba(59,49,71,0.08),inset 0 1px 0 rgba(255,255,255,0.7),0 0 0 1px rgba(59,49,71,0.04)`,
        }}>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background:`linear-gradient(90deg,transparent,${accent},transparent)`, opacity:0.7 }}/>
        {/* Sheen */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"linear-gradient(135deg,rgba(255,255,255,0.45) 0%,transparent 55%)" }}/>
        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span key={display}
              initial={{ y:-16, opacity:0, filter:"blur(4px)" }}
              animate={{ y:0,   opacity:1, filter:"blur(0px)" }}
              exit={{   y: 16,  opacity:0, filter:"blur(4px)" }}
              transition={{ duration:0.35, ease:[0.32,0,0.18,1] }}
              className="font-serif tabular-nums leading-none select-none bg-clip-text text-transparent"
              style={{
                fontSize:"clamp(2rem,7.5vw,3.4rem)",
                backgroundImage:`linear-gradient(160deg,var(--color-ink) 0%,${accent} 55%,#a3917a 100%)`,
                textShadow:`0 1px 2px rgba(59,49,71,0.15)`,
              }}>
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* Pulse ring */}
        <motion.div key={display+"-p"}
          initial={{ opacity:0.5, scale:0.88 }}
          animate={{ opacity:0,   scale:1.16 }}
          transition={{ duration:0.55, ease:"easeOut" }}
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{ border:`1px solid ${accent}` }}/>
      </div>

      {/* Progress bar */}
      <div className="w-full mt-2 overflow-hidden"
        style={{ height:3, borderRadius:99, background:`${accent}18` }}>
        <motion.div animate={{ width:`${progress*100}%` }}
          transition={{ duration:0.8, ease:"easeOut" }}
          style={{ height:"100%", background:`linear-gradient(90deg,${accent}88,${accent})`,
            borderRadius:99, boxShadow:`0 0 5px ${accent}55` }}/>
      </div>

      <p className="mt-2 tracking-[0.3em] uppercase font-semibold text-center"
        style={{ fontSize:"clamp(0.42rem,1.4vw,0.56rem)", color:`${accent}99`,
          fontFamily:"'Montserrat',sans-serif" }}>
        {label}
      </p>
    </motion.div>
  );
}

function VSep() {
  return (
    <div className="flex flex-col gap-1.5 self-center pb-8 opacity-30" aria-hidden="true">
      <div className="w-1 h-1 rounded-full" style={{ background:"#C2B099" }}/>
      <div className="w-1 h-1 rounded-full" style={{ background:"#C2B099" }}/>
    </div>
  );
}

function CrossOrnament() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.5 }}
      whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }}
      transition={{ duration:1.2, ease:[0.22,1,0.36,1] }}
      className="mx-auto mb-7 relative flex items-center justify-center"
      style={{ width:52, height:52 }}>
      <div className="absolute inset-0 rounded-full"
        style={{ border:"1px solid rgba(194,176,153,0.28)", animation:"breathe 3s ease-in-out infinite" }}/>
      <div className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ border:"1px solid rgba(194,176,153,0.45)", background:"#FAF8F5",
          boxShadow:"0 2px 10px rgba(59,49,71,0.07)" }}>
        <span style={{ color:"var(--color-ink)", fontSize:"1.15rem", fontFamily:"serif" }}>✝</span>
      </div>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  const [isToday,  setIsToday]  = useState(false);

  useEffect(() => {
    const target = getTarget();
    const tick = () => {
      const d = target - Date.now();
      if (d <= 0) { setIsToday(true); return; }
      setTimeLeft({
        days:    Math.floor(d/86400000),
        hours:   Math.floor((d%86400000)/3600000),
        minutes: Math.floor((d%3600000)/60000),
        seconds: Math.floor((d%60000)/1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const accents = ["var(--color-ink)","#C2B099","var(--color-ink)","#C2B099"];

  return (
    <section className="relative py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
      style={{ background:"linear-gradient(180deg,#F5E4E0 0%,#E0DCE6 50%,#F5E4E0 100%)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:"radial-gradient(ellipse at 50% 55%,rgba(168,93,106,0.07) 0%,transparent 65%)" }}/>

      <div className="relative z-10 text-center w-full" style={{ maxWidth:"min(860px,96vw)" }}>
        <CrossOrnament/>

        <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.9 }}
          className="tracking-[0.42em] uppercase font-semibold mb-2"
          style={{ fontSize:"clamp(0.56rem,1.9vw,0.7rem)", color:"#C2B099" }}>
          The Day Draws Near
        </motion.p>

        <motion.h2 initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:1.05, delay:0.08 }}
          className="font-serif text-letterpress mb-2"
          style={{ fontSize:"clamp(1.65rem,5.5vw,3.3rem)", color:"var(--color-ink)" }}>
          Counting Down to Forever
        </motion.h2>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ duration:1.05, delay:0.18 }}
          className="font-script mb-8"
          style={{ fontSize:"clamp(1.15rem,3.8vw,1.9rem)", color:"rgba(59,49,71,0.85)", opacity:0.9 }}>
          {weddingData.wedding.dateDisplay}
        </motion.p>

        <div className="h-px w-28 mx-auto mb-12 opacity-55"
          style={{ background:"linear-gradient(to right,transparent,#C2B099,transparent)" }}/>

        {!isToday ? (
          <>
            <div className="flex items-start justify-center gap-2 sm:gap-3 flex-wrap">
              <GlassTile value={timeLeft.days}    max={365} label="Days"    accent={accents[0]} delay={0}   />
              <VSep/>
              <GlassTile value={timeLeft.hours}   max={24}  label="Hours"   accent={accents[1]} delay={0.08}/>
              <VSep/>
              <GlassTile value={timeLeft.minutes} max={60}  label="Minutes" accent={accents[2]} delay={0.16}/>
              <VSep/>
              <GlassTile value={timeLeft.seconds} max={60}  label="Seconds" accent={accents[3]} delay={0.24}/>
            </div>
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ duration:1.3, delay:0.5 }}
              className="mt-12 font-serif italic mx-auto leading-relaxed"
              style={{ fontSize:"clamp(0.76rem,2.1vw,0.95rem)", color:"rgba(59,49,71,0.6)",
                maxWidth:"min(400px,90vw)" }}>
              &ldquo;This is the day the Lord has made; let us rejoice and be glad in it.&rdquo;
              <span className="block mt-2 not-italic tracking-[0.32em] uppercase"
                style={{ fontSize:"clamp(0.44rem,1.3vw,0.54rem)", color:"rgba(194,176,153,0.55)" }}>
                Psalm 118 : 24
              </span>
            </motion.p>
          </>
        ) : (
          <motion.div initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:1 }}
            className="gold-card rounded-xl mx-auto text-center"
            style={{ padding:"clamp(0.75rem,6vw,3rem)", maxWidth:"min(500px,94vw)" }}>
            <p className="tracking-[0.3em] uppercase font-semibold mb-3"
              style={{ fontSize:"clamp(0.56rem,1.8vw,0.7rem)", color:"#C2B099" }}>
              The Blessed Day Has Come
            </p>
            <h2 className="font-serif gold-gradient-text mb-4"
              style={{ fontSize:"clamp(1.8rem,6vw,3rem)" }}>
              Today, Two Become One
            </h2>
            <p className="font-serif italic" style={{ fontSize:"clamp(0.85rem,2.5vw,1rem)", color:"#3B3147" }}>
              Welcome to the celebration of our Holy Matrimony.
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes breathe{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.18);opacity:.9}}
      `}</style>
    </section>
  );
}
