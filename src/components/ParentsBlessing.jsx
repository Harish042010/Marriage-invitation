import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";
import TiltCard from "./TiltCard";

function CrossIcon({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="10.5" y="2" width="3" height="20" rx="1.5" fill={color}/>
      <rect x="2" y="8" width="20" height="3" rx="1.5" fill={color}/>
    </svg>
  );
}
function MaleIcon({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}
function FemaleIcon({ size=22, color="currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4"/><path d="M12 11v10M9 18h6"/>
    </svg>
  );
}

function PersonRow({ icon, name, title, delay }) {
  return (
    <motion.div initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}}
      viewport={{once:true}} transition={{duration:0.8,ease:[0.22,1,0.36,1],delay}}
      className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{border:"1px solid rgba(194,176,153,0.4)",background:"rgba(254,248,246,0.9)",
          color:"#C2B099",boxShadow:"0 1px 6px rgba(59,49,71,0.07)"}}>
        {icon}
      </div>
      <div>
        <p className="tracking-[0.18em] uppercase font-semibold leading-none mb-0.5"
          style={{fontSize:"clamp(0.46rem,1.3vw,0.56rem)",color:"rgba(194,176,153,0.7)"}}>
          {title}
        </p>
        <p className="font-serif leading-tight"
          style={{fontSize:"clamp(0.95rem,3vw,1.2rem)",color:"var(--color-ink)"}}>
          {name}
        </p>
      </div>
    </motion.div>
  );
}

function ParentCard({ side, fatherName, motherName, siblingName, label, delay }) {
  return (
    <TiltCard delay={delay}
      className="gold-card rounded-2xl relative overflow-hidden flex-1"
      style={{padding:"clamp(0.5rem,3.5vw,2rem)"}}>
      <div className="flex flex-col gap-4 h-full w-full">

      <div className="flex items-center gap-2">
        <CrossIcon size={13} color="rgba(168,93,106,0.65)"/>
        <p className="tracking-[0.28em] uppercase font-semibold"
          style={{fontSize:"clamp(0.5rem,1.5vw,0.62rem)",color:"rgba(168,93,106,0.7)"}}>
          {label}
        </p>
      </div>
      <PersonRow icon={<MaleIcon size={14} color="currentColor"/>}
        name={fatherName} title="Father" delay={delay+0.15}/>
      <div className="flex items-center gap-2 opacity-25">
        <div className="flex-1 h-px" style={{background:"#C2B099"}}/>
        <CrossIcon size={7} color="rgba(194,176,153,0.8)"/>
        <div className="flex-1 h-px" style={{background:"#C2B099"}}/>
      </div>
      <PersonRow icon={<FemaleIcon size={14} color="currentColor"/>}
        name={motherName} title="Mother" delay={delay+0.28}/>
      
      {siblingName && (
        <>
          <div className="flex items-center gap-2 opacity-25">
            <div className="flex-1 h-px" style={{background:"#C2B099"}}/>
            <CrossIcon size={7} color="rgba(194,176,153,0.8)"/>
            <div className="flex-1 h-px" style={{background:"#C2B099"}}/>
          </div>
          <PersonRow 
            icon={siblingName.toLowerCase().includes("sister") ? <FemaleIcon size={14} color="currentColor"/> : <MaleIcon size={14} color="currentColor"/>}
            name={siblingName.includes(":") ? siblingName.split(":")[1].trim() : siblingName} 
            title={siblingName.includes(":") ? siblingName.split(":")[0].trim() : "Sibling"} 
            delay={delay+0.41}/>
        </>
      )}

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-px"
        style={{background:"linear-gradient(to right,transparent,rgba(194,176,153,0.4),transparent)"}}/>
      </div>
    </TiltCard>
  );
}

export default function ParentsBlessing() {
  return (
    <section className="relative py-24 px-4 overflow-hidden"
      style={{background:"linear-gradient(180deg,#E0DCE6 0%,#F5E4E0 100%)"}}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{width:"min(500px,80vw)",height:"min(500px,80vw)",
          background:"radial-gradient(circle,rgba(168,93,106,0.07) 0%,transparent 70%)",
          filter:"blur(60px)"}}/>
      <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
        viewport={{once:true}} transition={{duration:1.1}}
        className="text-center relative z-10 mx-auto mb-14"
        style={{maxWidth:"min(640px,96vw)"}}>
        <p className="tracking-[0.35em] uppercase font-semibold mb-3"
          style={{fontSize:"clamp(0.6rem,2.2vw,0.75rem)",color:"#C2B099"}}>
          With Their Blessings
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{fontSize:"clamp(1.8rem,6vw,3.5rem)"}}>
          Blessed by Our Parents
        </h2>
        <div className="h-px w-20 mx-auto opacity-65 mb-5"
          style={{background:"linear-gradient(to right,transparent,#C2B099,transparent)"}}/>
        <p className="font-serif italic leading-relaxed"
          style={{fontSize:"clamp(0.85rem,2.5vw,1.05rem)",color:"rgba(59,49,71,0.65)"}}>
          &ldquo;Children are a heritage from the Lord, offspring a reward from him.&rdquo;
          <span className="block mt-1 not-italic tracking-widest uppercase"
            style={{fontSize:"clamp(0.5rem,1.4vw,0.62rem)",color:"rgba(194,176,153,0.6)"}}>
            — Psalm 127 : 3
          </span>
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto flex flex-row items-stretch justify-center gap-3 sm:gap-6"
        style={{maxWidth:"min(860px,96vw)"}}>
        <ParentCard side="left" label="Groom's Parents"
          fatherName={weddingData.groom.father} motherName={weddingData.groom.mother} siblingName={weddingData.groom.sibling} delay={0}/>
        <motion.div initial={{opacity:0,scale:0.5}} whileInView={{opacity:1,scale:1}}
          viewport={{once:true}} transition={{duration:0.7,delay:0.15}}
          className="flex justify-center items-center z-20 shrink-0 self-center">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
            style={{border:"1px solid rgba(194,176,153,0.4)",background:"#FAF8F5",
              color:"#C2B099",boxShadow:"0 2px 10px rgba(59,49,71,0.07)"}}>
            <CrossIcon size={14} color="currentColor"/>
          </div>
        </motion.div>
        <ParentCard side="right" label="Bride's Parents"
          fatherName={weddingData.bride.father} motherName={weddingData.bride.mother} siblingName={weddingData.bride.sibling} delay={0.1}/>
      </div>
    </section>
  );
}
