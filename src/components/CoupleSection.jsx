import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";
import TiltCard from "./TiltCard";

function PersonCard({ role, name, quote, imgUrl, delay }) {
  return (
    <TiltCard
      delay={delay}
      className="group gold-card rounded-3xl flex-1"
      style={{ padding:"clamp(1rem,3vw,2.5rem)" }}>
      <div className="flex flex-col items-center text-center h-full w-full">
        <div className="relative mb-5 p-2 rounded-t-full"
          style={{ width:"clamp(140px,38vw,260px)", height:"clamp(180px,50vw,346px)",
            border:"2px solid rgba(194,176,153,0.4)",
            boxShadow:"0 4px 24px rgba(59,49,71,0.1)" }}>
        <div className="w-full h-full overflow-hidden rounded-t-full relative"
          style={{ background:"#F5E4E0" }}>
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage:`url('${imgUrl}')`, opacity:0.88 }}/>
          <div className="absolute inset-0"
            style={{ background:"linear-gradient(to top,rgba(59,49,71,0.5),transparent 55%)" }}/>
        </div>
        <div className="absolute -bottom-2 -left-2 text-sm" style={{ color:"#C2B099" }}>&#10022;</div>
        <div className="absolute -bottom-2 -right-2 text-sm" style={{ color:"#C2B099" }}>&#10022;</div>
      </div>

      <p className="tracking-[0.28em] uppercase font-semibold mb-2"
        style={{ fontSize:"clamp(0.55rem,1.6vw,0.7rem)", color:"#C2B099" }}>
        {role}
      </p>
      <h3 className="font-serif mb-3" style={{ fontSize:"clamp(1.6rem,5vw,2.8rem)", color:"var(--color-ink)", textWrap: "balance" }}>
        {name}
      </h3>
      <div className="h-px w-12 mb-3" style={{ background:"rgba(194,176,153,0.4)" }}/>
      <p className="font-serif italic leading-relaxed px-2"
        style={{ fontSize:"clamp(0.82rem,2.3vw,1rem)", color:"rgba(59,49,71,0.65)", textWrap:"balance" }}>
        {quote}
      </p>
      </div>
    </TiltCard>
  );
}

function AmpersandBadge() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.6 }}
      whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }}
      transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.1 }}
      className="flex justify-center items-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
        style={{ border:"1px solid rgba(194,176,153,0.55)", background:"#FAF8F5",
          boxShadow:"0 4px 18px rgba(59,49,71,0.1)" }}>
        <span className="font-script" style={{ fontSize:"clamp(1.3rem,3.5vw,1.8rem)", color:"var(--color-ink)" }}>
          &amp;
        </span>
      </div>
    </motion.div>
  );
}

export default function CoupleSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden"
      style={{ background:"linear-gradient(180deg,#F5E4E0 0%,#E0DCE6 100%)" }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none blur-3xl"
        style={{ background:"rgba(194,176,153,0.07)" }}/>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none blur-3xl"
        style={{ background:"rgba(168,93,106,0.06)" }}/>

      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:1.1 }}
        className="text-center max-w-xl mx-auto mb-12 px-2">
        <p className="tracking-[0.3em] uppercase font-semibold mb-2"
          style={{ fontSize:"clamp(0.6rem,2.2vw,0.75rem)", color:"#C2B099" }}>
          Chosen by Grace
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{ fontSize:"clamp(1.8rem,6vw,3.5rem)" }}>
          The Groom &amp; Bride
        </h2>
        <div className="h-px w-20 mx-auto opacity-70"
          style={{ background:"linear-gradient(to right,transparent,#C2B099,transparent)" }}/>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Mobile */}
        <div className="flex flex-col gap-6 md:hidden">
          <PersonCard role="The Groom" name={weddingData.groom.name}
            quote="A steadfast heart rooted in God's love, standing strong to lead and cherish."
            imgUrl="https://images.unsplash.com/photo-1606216494793-27ab377a0641?auto=format&fit=crop&q=80"
            delay={0}/>
          <AmpersandBadge/>
          <PersonCard role="The Bride" name={weddingData.bride.name}
            quote="A woman of grace, faith, and radiant warmth ready to embark on this blessed covenant."
            imgUrl="https://images.unsplash.com/photo-1594269986326-89d5f7d24269?auto=format&fit=crop&q=80"
            delay={0}/>
        </div>
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-14 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <AmpersandBadge/>
          </div>
          <PersonCard role="The Groom" name={weddingData.groom.name}
            quote="A steadfast heart rooted in God's love, standing strong to lead and cherish."
            imgUrl="https://images.unsplash.com/photo-1606216494793-27ab377a0641?auto=format&fit=crop&q=80"
            delay={0}/>
          <PersonCard role="The Bride" name={weddingData.bride.name}
            quote="A woman of grace, faith, and radiant warmth ready to embark on this blessed covenant."
            imgUrl="https://images.unsplash.com/photo-1594269986326-89d5f7d24269?auto=format&fit=crop&q=80"
            delay={0.18}/>
        </div>
      </div>
    </section>
  );
}
