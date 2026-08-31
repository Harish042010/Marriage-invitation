import { motion } from "framer-motion";
import { Cross } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function BibleVerse() {
  return (
    <section className="py-24 px-4 flex items-center justify-center relative overflow-hidden"
      style={{background:"linear-gradient(180deg,#F5E4E0 0%,#E0DCE6 100%)"}}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{width:"min(700px,100vw)",height:"min(700px,100vw)",
          background:"radial-gradient(circle,rgba(168,93,106,0.08) 0%,transparent 70%)",filter:"blur(100px)"}}/>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full"
        style={{background:"linear-gradient(to bottom,transparent,rgba(194,176,153,0.35),transparent)"}}/>

      <div className="w-full relative z-10 gold-card rounded-2xl"
        style={{maxWidth:"min(880px,96vw)",padding:"clamp(0.75rem,5vw,3.5rem)",
          boxShadow:"0 8px 32px rgba(59,49,71,0.09)"}}>
        <motion.div initial={{opacity:0,scale:0.85}} whileInView={{opacity:1,scale:1}}
          viewport={{once:true,margin:"-80px"}} transition={{duration:1.4,ease:"easeOut"}}
          className="mb-6 flex justify-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{border:"1px solid rgba(168,93,106,0.5)",background:"#FAF8F5",
              boxShadow:"0 0 14px rgba(168,93,106,0.15)"}}>
            <Cross size={18} strokeWidth={1.8} color="var(--color-ink)" />
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,margin:"-80px"}} transition={{duration:1.1,ease:"easeOut"}}
          className="text-center">
          <h3 className="font-serif italic leading-relaxed"
            style={{fontSize:"clamp(1.3rem,5vw,3.2rem)",color:"var(--color-ink)"}}>
            &ldquo;He has made{" "}
            <span className="gold-gradient-text not-italic font-normal">everything beautiful</span>
            {" "}in its time.&rdquo;
          </h3>
        </motion.div>

        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{delay:0.6,duration:1.1}}
          className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 opacity-70"
            style={{background:"linear-gradient(to right,transparent,rgba(194,176,153,0.9))"}}/>
          <p className="tracking-[0.3em] uppercase font-semibold"
            style={{fontSize:"clamp(0.6rem,2.2vw,0.8rem)",color:"#C2B099"}}>
            {weddingData.verse.reference}
          </p>
          <div className="h-px w-12 opacity-70"
            style={{background:"linear-gradient(to left,transparent,rgba(194,176,153,0.9))"}}/>
        </motion.div>
      </div>
    </section>
  );
}
