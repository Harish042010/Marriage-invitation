import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { weddingData } from "../data/weddingData";

function Bokeh() {
  const orbs = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      r: 100 + Math.random() * 200,
      dur: 8 + Math.random() * 8,
      delay: Math.random() * 6,
      color: i % 3 === 0 ? "197,160,106" : i % 3 === 1 ? "168,93,106" : "232,201,197",
      opacity: 0.12 + Math.random() * 0.14,
    })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {orbs.map(o => (
        <div key={o.id} style={{
          position:"absolute", left:`${o.x}%`, top:`${o.y}%`,
          width:o.r, height:o.r, borderRadius:"50%",
          background:`radial-gradient(circle,rgba(${o.color},${o.opacity}) 0%,transparent 70%)`,
          transform:"translate(-50%,-50%)",
          animation:`bokehPulse ${o.dur}s ease-in-out ${o.delay}s infinite alternate`,
        }}/>
      ))}
    </div>
  );
}

function OrnateFrame() {
  return (
    <div className="absolute inset-4 sm:inset-8 pointer-events-none" aria-hidden="true">
      {["top-0 left-0 border-t border-l","top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l","bottom-0 right-0 border-b border-r"].map((cls,i) => (
        <motion.div key={i}
          initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}}
          transition={{duration:1.2,delay:0.8+i*0.1}}
          className={`absolute w-10 h-10 sm:w-16 sm:h-16 ${cls}`}
          style={{borderColor:"rgba(194,176,153,0.45)",borderRadius:0}}
        />
      ))}
      {[{dir:"top-0",y:-10,from:"to right"},{dir:"bottom-0",y:10,from:"to left"}].map((o,i)=>(
        <motion.div key={i} initial={{opacity:0,y:o.y}} animate={{opacity:1,y:0}}
          transition={{duration:1.2,delay:1}}
          className={`absolute ${o.dir} left-1/2 -translate-x-1/2 flex items-center gap-1`}>
          <div className="h-px w-8 sm:w-14" style={{background:`linear-gradient(${o.from},transparent,rgba(194,176,153,0.6))`}}/>
          <div className="w-1.5 h-1.5 rounded-full" style={{background:"rgba(194,176,153,0.7)"}}/>
          <div className="h-px w-8 sm:w-14" style={{background:`linear-gradient(${o.from==="to right"?"to left":"to right"},transparent,rgba(194,176,153,0.6))`}}/>
        </motion.div>
      ))}
    </div>
  );
}

function GothicCross() {
  return (
    <motion.div
      initial={{opacity:0,scale:0.5,y:-10}} animate={{opacity:1,scale:1,y:0}}
      transition={{duration:1.6,ease:[0.22,1,0.36,1],delay:0.2}}
      className="mx-auto mb-5 flex items-center justify-center"
      style={{width:"clamp(72px,15vw,108px)",height:"clamp(72px,15vw,108px)"}}
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="50" cy="50" r="48" stroke="rgba(194,176,153,0.3)" strokeWidth="0.5" strokeDasharray="3 3"
          style={{animation:"spinSlow 25s linear infinite"}}/>
        <circle cx="50" cy="50" r="38" stroke="rgba(168,93,106,0.2)" strokeWidth="1"
          style={{animation:"breatheRing 4s ease-in-out infinite"}}/>
        
        <path d="M 48.5 15 L 51.5 15 L 51.5 85 L 48.5 85 Z" fill="url(#crossGrad)"/>
        <path d="M 20 43.5 L 80 43.5 L 80 46.5 L 20 46.5 Z" fill="url(#crossGrad)"/>
        
        <path d="M 50 10 L 53 15 L 47 15 Z" fill="rgba(168,93,106,0.7)"/>
        <path d="M 50 90 L 53 85 L 47 85 Z" fill="rgba(168,93,106,0.7)"/>
        <path d="M 15 45 L 20 42 L 20 48 Z" fill="rgba(168,93,106,0.7)"/>
        <path d="M 85 45 L 80 42 L 80 48 Z" fill="rgba(168,93,106,0.7)"/>

        <circle cx="50" cy="45" r="5" fill="#FAF8F5" stroke="rgba(194,176,153,0.8)" strokeWidth="1.5"/>
        <circle cx="50" cy="45" r="2" fill="rgba(168,93,106,0.8)"/>

        <defs>
          <linearGradient id="crossGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(194,176,153,0.9)"/>
            <stop offset="50%"  stopColor="rgba(168,93,106,0.85)"/>
            <stop offset="100%" stopColor="rgba(194,176,153,0.9)"/>
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

function AnimatedName({ text, delay=0 }) {
  const words = text.split(" ");
  const container = {
    hidden:{opacity:0},
    visible:{opacity:1,transition:{staggerChildren:0.1,delayChildren:delay}},
  };
  const child = {
    hidden:{opacity:0,y:40,filter:"blur(10px)",scale:0.85},
    visible:{opacity:1,y:0,filter:"blur(0px)",scale:1,
      transition:{duration:1,ease:[0.22,1,0.36,1]}},
  };
  return (
    <motion.div variants={container} initial="hidden" animate="visible"
      className="flex justify-center flex-wrap gap-x-[0.3em] gap-y-2 max-w-[95vw]">
      {words.map((w,i)=>(
        <motion.span key={i} variants={child}
          className="inline-block font-serif bg-clip-text text-transparent"
          style={{
            fontSize:"clamp(2.5rem,9vw,6rem)",
            lineHeight:1.1, letterSpacing:"0.02em",
            backgroundImage:"linear-gradient(135deg, var(--color-ink) 0%, rgba(59,49,71,0.85) 100%)",
          }}>
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
}

function ScrollCue() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
      transition={{duration:1.2,delay:2}}
      className="flex flex-col items-center gap-2 mt-5" aria-hidden="true">
      <div className="relative rounded-full"
        style={{width:20,height:32,border:"1px solid rgba(194,176,153,0.5)"}}>
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-0.5 h-2 rounded-full"
          style={{background:"rgba(194,176,153,0.8)",animation:"mouseScroll 1.8s ease-in-out infinite"}}/>
      </div>
      <p style={{fontSize:"clamp(0.38rem,1.1vw,0.5rem)",letterSpacing:"0.4em",
        textTransform:"uppercase",color:"rgba(168,93,106,0.5)",
        fontFamily:"'Montserrat',sans-serif"}}>Scroll</p>
    </motion.div>
  );
}

export default function NameReveal() {
  const sectionRef = useRef(null);
  const {scrollY} = useScroll();
  const bgParallax = useTransform(scrollY,[0,800],["0%","12%"]);
  return (
    <section ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5"
      style={{
        paddingTop:"clamp(1rem,6vh,5rem)",paddingBottom:"clamp(1rem,5vh,4rem)",
        background:"linear-gradient(160deg,#E0DCE6 0%,#F5E4E0 55%,#E0DCE6 100%)",
      }}>
      <motion.div style={{y:bgParallax}}
        className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 80% 60% at 50% 35%,rgba(168,93,106,0.1) 0%,transparent 65%)"}}/>
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 60% 40% at 15% 80%,rgba(194,176,153,0.08) 0%,transparent 55%)"}}/>
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 50% 50%,transparent 35%,rgba(232,201,197,0.35) 100%)"}}/>
      </motion.div>
      <Bokeh/>
      <OrnateFrame/>
      <div className="relative z-10 w-full flex flex-col items-center text-center"
        style={{maxWidth:"min(860px,96vw)",gap:"clamp(0.5rem,1.5vh,1rem)"}}>
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
          transition={{duration:1,delay:0.6}} className="flex items-center gap-3">
          <div className="h-px" style={{width:"clamp(24px,6vw,72px)",background:"linear-gradient(to right,transparent,rgba(194,176,153,0.7))"}}/>
          <p style={{fontSize:"clamp(0.55rem,1.8vw,0.7rem)",letterSpacing:"0.42em",
            textTransform:"uppercase",color:"rgba(168,93,106,0.75)",
            fontFamily:"'Montserrat',sans-serif",fontWeight:600}}>
            Together With Their Families
          </p>
          <div className="h-px" style={{width:"clamp(24px,6vw,72px)",background:"linear-gradient(to left,transparent,rgba(194,176,153,0.7))"}}/>
        </motion.div>
        <AnimatedName text={weddingData.groom.name} delay={0.65}/>
        <motion.div initial={{opacity:0,scale:0.5,rotate:-12}}
          animate={{opacity:1,scale:1,rotate:0}}
          transition={{duration:1.4,ease:[0.22,1,0.36,1],delay:0.82}}
          className="relative mx-auto"
          style={{width:"clamp(52px,10vw,68px)",height:"clamp(52px,10vw,68px)"}}>
          <div className="absolute inset-0 rounded-full"
            style={{border:"1px solid rgba(194,176,153,0.28)",animation:"spinSlow 20s linear infinite"}}/>
          <div className="absolute inset-[5px] rounded-full"
            style={{border:"1px solid rgba(168,93,106,0.38)",animation:"breatheRing 3s ease-in-out infinite"}}/>
          <div className="absolute inset-[12px] rounded-full flex items-center justify-center"
            style={{background:"transparent",border:"1px solid rgba(168,93,106,0.5)",boxShadow:"0 0 18px rgba(168,93,106,0.18)"}}>
            <span style={{color:"rgba(168,93,106,0.9)",fontFamily:"'Great Vibes', cursive",fontSize:"clamp(1.8rem,4vw,2.2rem)",lineHeight:1,marginTop:"2px"}}>&amp;</span>
          </div>
          <div className="absolute inset-[-4px] rounded-full animate-ping pointer-events-none"
            style={{border:"1px solid rgba(194,176,153,0.18)",animationDuration:"3s"}}/>
        </motion.div>
        <AnimatedName text={weddingData.bride.name} delay={0.95}/>
        <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          transition={{duration:1,delay:1.25}}
          style={{fontSize:"clamp(0.58rem,2vw,0.82rem)",letterSpacing:"0.24em",
            textTransform:"uppercase",color:"rgba(59,49,71,0.5)",
            fontFamily:"'Montserrat',sans-serif",fontWeight:300,marginTop:"0.25rem"}}>
          Request The Honour of Your Presence
        </motion.p>
        <ScrollCue/>
      </div>
      <style>{`
        @keyframes bokehPulse{0%{transform:translate(-50%,-50%) scale(1)}100%{transform:translate(-50%,-50%) scale(1.18)}}
        @keyframes spinSlow{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes breatheRing{0%,100%{opacity:.4;transform:scale(.95)}50%{opacity:.9;transform:scale(1.05)}}
        @keyframes mouseScroll{0%{opacity:.9;transform:translateX(-50%) translateY(0)}60%{opacity:0;transform:translateX(-50%) translateY(8px)}100%{opacity:0;transform:translateX(-50%) translateY(8px)}}
      `}</style>
    </section>
  );
}
