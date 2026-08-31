import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "../data/weddingData";

function HaloRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {[120,200,290].map((size,i)=>(
        <motion.div key={size}
          initial={{ opacity:0, scale:0.6 }} whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }} transition={{ duration:1.4, delay:i*0.18 }}
          className="absolute rounded-full"
          style={{
            width:`min(${size}px,${size*0.28}vw)`,
            height:`min(${size}px,${size*0.28}vw)`,
            border:`1px solid rgba(194,176,153,${0.18-i*0.05})`,
            animation:`haloBreath ${4+i}s ease-in-out infinite alternate`,
          }}/>
      ))}
    </div>
  );
}

export default function FinalBlessing() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress,[0,1],["0%","12%"]);

  return (
    <section ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        paddingTop:"clamp(2rem,8vh,6rem)", paddingBottom:"clamp(1rem,5vh,4rem)",
        background:"linear-gradient(180deg,#F5E4E0 0%,#E0DCE6 60%,#F5E4E0 100%)",
      }}>
      
      <motion.div style={{ y:bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background:"radial-gradient(ellipse at 50% 85%,rgba(194,176,153,0.14) 0%,transparent 65%)" }}/>
        <div className="absolute inset-0"
          style={{ background:"radial-gradient(ellipse at 50% 10%,rgba(168,93,106,0.09) 0%,transparent 55%)" }}/>
      </motion.div>

      <HaloRings/>

      <motion.div
        initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:"-60px" }}
        transition={{ duration:1.6, ease:[0.22,1,0.36,1] }}
        className="relative z-10 text-center flex flex-col items-center w-full mt-4"
        style={{ maxWidth:"min(840px,96vw)" }}>

        {/* Cross */}
        <div className="flex justify-center mb-8">
          <motion.div initial={{ opacity:0, scale:0.6 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:1.1, delay:0.1 }}
            className="relative">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ border:"1px solid rgba(194,176,153,0.5)", background:"rgba(254,248,246,0.9)",
                backdropFilter:"blur(6px)", boxShadow:"0 4px 20px rgba(59,49,71,0.1)" }}>
              <span style={{ color:"var(--color-ink)", fontSize:"clamp(1.6rem,5vw,2rem)", fontFamily:"serif" }}>✝</span>
            </div>
            <div className="absolute -inset-3 rounded-full animate-ping pointer-events-none"
              style={{ border:"1px solid rgba(194,176,153,0.2)", animationDuration:"3.5s" }}/>
          </motion.div>
        </div>

        <p className="tracking-[0.38em] uppercase font-medium mb-3"
          style={{ fontSize:"clamp(0.58rem,2vw,0.75rem)", color:"#C2B099" }}>
          United in His Grace
        </p>

        <h2 className="font-serif gold-gradient-text leading-tight mb-6"
          style={{ fontSize:"clamp(2rem,6.5vw,4.5rem)" }}>
          Two Hearts,<br className="md:hidden" /> One Covenant
        </h2>

        <div className="h-px w-32 mx-auto mb-8 opacity-60"
          style={{ background:"linear-gradient(to right,transparent,#C2B099,transparent)" }}/>

        <motion.p initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:1.1, delay:0.3 }}
          className="font-serif italic leading-relaxed mb-16"
          style={{ fontSize:"clamp(0.95rem,3vw,1.3rem)", color:"rgba(59,49,71,0.7)",
            maxWidth:"min(600px,92vw)" }}>
          &ldquo;With hearts full of gratitude, we joyfully invite you to witness the holy covenant
          of our marriage and celebrate this God-given blessing with us.&rdquo;
        </motion.p>

        {/* Summary card */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:1.1, delay:0.4 }}
          className="gold-card rounded-xl w-full mb-10 relative text-center"
          style={{ maxWidth:"min(460px,94vw)", padding:"clamp(1.5rem,4.5vw,3rem) clamp(1rem,4.5vw,2.5rem)" }}>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px]"
            style={{ background:"linear-gradient(to right,transparent,rgba(194,176,153,0.85),transparent)" }}/>

          <p className="uppercase tracking-[0.22em] mb-3"
            style={{ fontSize:"clamp(0.52rem,1.6vw,0.65rem)", color:"#C2B099" }}>
            Holy Matrimony
          </p>
          <h3 className="font-serif mb-4 leading-tight flex flex-col items-center justify-center gap-1.5"
            style={{ fontSize:"clamp(1.2rem,4vw,1.8rem)", color:"var(--color-ink)", textWrap:"balance" }}>
            <span>{weddingData.groom.name}</span>
            <span className="font-serif italic"
              style={{ fontSize:"clamp(1.1rem,3.5vw,1.5rem)", color:"#a3917a" }}>&amp;</span>
            <span>{weddingData.bride.name}</span>
          </h3>
          <p className="font-serif italic"
            style={{ fontSize:"clamp(0.85rem,2.6vw,1rem)", color:"#a3917a" }}>
            {weddingData.wedding.dateDisplay} &bull; {weddingData.wedding.time}
          </p>
          <p className="uppercase tracking-wider mt-2"
            style={{ fontSize:"clamp(0.5rem,1.5vw,0.62rem)", color:"rgba(59,49,71,0.45)" }}>
            {weddingData.wedding.church}, {weddingData.wedding.location}
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px"
            style={{ background:"linear-gradient(to right,transparent,rgba(194,176,153,0.4),transparent)" }}/>
        </motion.div>

        <p className="tracking-[0.3em] uppercase font-serif"
          style={{ fontSize:"clamp(0.62rem,1.8vw,0.75rem)", color:"rgba(59,49,71,0.85)", letterSpacing:"0.4em" }}>
          &bull;&nbsp; Soli Deo Gloria &nbsp;&bull;
        </p>
      </motion.div>

      {/* Footer */}
      <div className="relative z-10 w-full mt-14 pt-5 flex flex-col items-center gap-2"
        style={{ borderTop:"1px solid rgba(194,176,153,0.2)",
          paddingBottom:"max(1.5rem,env(safe-area-inset-bottom,1.5rem))",
          maxWidth:"min(760px,96vw)", margin:"3.5rem auto 0" }}>
        <div className="flex items-center gap-3 opacity-40">
          <div className="h-px w-10" style={{ background:"linear-gradient(to right,transparent,#C2B099)" }}/>
          <span style={{ color:"#C2B099", fontSize:"0.5rem" }}>&#10022;</span>
          <div className="h-px w-10" style={{ background:"linear-gradient(to left,transparent,#C2B099)" }}/>
        </div>
        <p className="text-center"
          style={{ color:"rgba(59,49,71,0.6)", fontSize:"clamp(0.58rem,1.7vw,0.7rem)",
            letterSpacing:"0.2em", fontFamily:"'Montserrat',sans-serif", fontWeight: 500 }}>
          &copy; {new Date().getFullYear()} Crafted with love by&nbsp;
          <span style={{ color:"rgba(168,93,106,0.85)", fontWeight: 600 }}>ZenXora</span>. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes haloBreath{0%{opacity:.55;transform:scale(.97)}100%{opacity:1;transform:scale(1.03)}}
      `}</style>
    </section>
  );
}
