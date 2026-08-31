import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "../data/weddingData";
import TiltCard from "./TiltCard";

function PrayerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3a3 3 0 0 0-3 3l-7 9a3 3 0 1 0 4.7 3.7L20 10a3 3 0 0 0 0-4.2A3 3 0 0 0 18 3z"/>
      <path d="M6.3 19.7a3 3 0 0 1-4.2-4.2L8 9"/>
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
    </svg>
  );
}
function HandshakeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5 5 9l2 2M15 5l4 4-2 2M9 5h6"/>
      <path d="M9 19l-2-2 2-2-2-2 2-2 2 2 1.5-1.5L14 11l1.5 1.5L17 11l3 3-2 2 2.5 2.5-1.5 1.5L18 17l-1.5 1.5L15 19z"/>
    </svg>
  );
}
function CrossIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
    </svg>
  );
}
const ICONS = [PrayerIcon, HeartIcon, HandshakeIcon, CrossIcon];

function CardInner({ text, index }) {
  return (
    <>
      <p className="tracking-[0.28em] uppercase font-semibold mb-1.5"
        style={{ fontSize:"clamp(0.46rem,1.3vw,0.56rem)", color:"rgba(194,176,153,0.7)",
          fontFamily:"'Montserrat',sans-serif" }}>
        Chapter {index + 1}
      </p>
      <p className="font-serif italic leading-relaxed"
        style={{ fontSize:"clamp(0.84rem,2.2vw,1rem)", color:"#3B3147" }}>
        {text}
      </p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-14"
        style={{ background:"linear-gradient(to right,transparent,rgba(194,176,153,0.45),transparent)" }}/>
    </>
  );
}

function StoryCard({ text, index, total }) {
  const isLeft = index % 2 === 0;
  const Icon   = ICONS[index % ICONS.length];
  const isLast = index === total - 1;

  const iconDot = (
    <motion.div
      initial={{ scale:0, opacity:0 }}
      whileInView={{ scale:1, opacity:1 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
      className="flex items-center justify-center rounded-full border-2"
      style={{
        width:38, height:38, flexShrink:0,
        borderColor:"#C2B099", background:"#FAF8F5",
        color:"var(--color-ink)", boxShadow:"0 0 14px rgba(194,176,153,0.3)",
      }}>
      <Icon/>
    </motion.div>
  );

  return (
    <div className="relative w-full"
      style={{ marginBottom: isLast ? 0 : "clamp(2.5rem,7vh,4.5rem)" }}>

      {/* Mobile */}
      <div className="flex md:hidden items-start gap-3">
        <div className="flex flex-col items-center shrink-0" style={{ paddingTop:4 }}>
          {iconDot}
        </div>
        <TiltCard
          initial={{ opacity:0, x:20, rotateX:15, scale:0.9 }}
          whileInView={{ opacity:1, x:0, rotateX:0, scale:1 }}
          transition={{ duration:0.8, ease:[0.22,1,0.36,1], delay:0.1 }}
          className="gold-card rounded-xl relative overflow-hidden flex-1"
          style={{ padding:"clamp(0.9rem,3vw,1.3rem)", minWidth:0 }}>
          <CardInner text={text} index={index}/>
        </TiltCard>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-start">
        <div className="flex-1 flex justify-end pr-8">
          {isLeft && (
            <TiltCard
              initial={{ opacity:0, x:-44, rotateX:20, scale:0.9, rotateY:15 }}
              whileInView={{ opacity:1, x:0, rotateX:0, scale:1, rotateY:0 }}
              transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.1 }}
              className="gold-card rounded-2xl relative overflow-hidden"
              style={{ maxWidth:360, width:"100%", padding:"clamp(1.1rem,2.5vw,1.7rem)" }}>
              <CardInner text={text} index={index}/>
            </TiltCard>
          )}
        </div>
        <div className="flex flex-col items-center shrink-0" style={{ zIndex:2 }}>
          <motion.div
            initial={{ scale:0, opacity:0 }}
            whileInView={{ scale:1, opacity:1 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.6, ease:[0.22,1,0.36,1], delay:0.05 }}
            className="flex items-center justify-center rounded-full border-2"
            style={{ width:48, height:48, flexShrink:0,
              borderColor:"#C2B099", background:"#FAF8F5", color:"var(--color-ink)",
              boxShadow:"0 0 20px rgba(194,176,153,0.35)" }}>
            <Icon/>
          </motion.div>
        </div>
        <div className="flex-1 flex justify-start pl-8">
          {!isLeft && (
            <TiltCard
              initial={{ opacity:0, x:44, rotateX:20, scale:0.9, rotateY:-15 }}
              whileInView={{ opacity:1, x:0, rotateX:0, scale:1, rotateY:0 }}
              transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.1 }}
              className="gold-card rounded-2xl relative overflow-hidden"
              style={{ maxWidth:360, width:"100%", padding:"clamp(1.1rem,2.5vw,1.7rem)" }}>
              <CardInner text={text} index={index}/>
            </TiltCard>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineLine({ containerRef }) {
  const { scrollYProgress } = useScroll({ target:containerRef, offset:["start 85%","end 15%"] });
  const scaleY = useTransform(scrollYProgress, [0,1], [0,1]);
  const lineStyle = {
    background:"linear-gradient(to bottom,rgba(194,176,153,0.8),rgba(194,176,153,0.3))",
    boxShadow:"0 0 6px rgba(194,176,153,0.35)",
  };
  return (
    <>
      <div className="absolute top-0 bottom-0 md:hidden" style={{ left:19, width:1, zIndex:0 }}>
        <div className="absolute inset-0" style={{ background:"rgba(194,176,153,0.12)" }}/>
        <motion.div style={{ scaleY, transformOrigin:"top" }} className="absolute inset-0">
          <div className="w-full h-full" style={lineStyle}/>
        </motion.div>
      </div>
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 hidden md:block w-px" style={{ zIndex:0 }}>
        <div className="absolute inset-0" style={{ background:"rgba(194,176,153,0.12)" }}/>
        <motion.div style={{ scaleY, transformOrigin:"top" }} className="absolute inset-0">
          <div className="w-full h-full" style={{ ...lineStyle,
            background:"linear-gradient(to bottom,rgba(194,176,153,0.85),rgba(194,176,153,0.3))"}}/>
        </motion.div>
      </div>
    </>
  );
}

export default function JourneySection() {
  const sectionRef  = useRef(null);
  const timelineRef = useRef(null);
  const story       = weddingData.journey.story;
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["0%","8%"]);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden"
      style={{ background:"linear-gradient(180deg,#E0DCE6 0%,#F5E4E0 50%,#E0DCE6 100%)" }}>
      <motion.div style={{ y:bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background:"radial-gradient(ellipse at 50% 50%,rgba(194,176,153,0.08) 0%,transparent 65%)",
          filter:"blur(40px)" }}/>
      </motion.div>

      <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:1.1 }}
        className="text-center relative z-10"
        style={{ maxWidth:"min(640px,96vw)", margin:"0 auto clamp(2.5rem,7vh,4rem)" }}>
        <p className="tracking-[0.35em] uppercase font-semibold mb-3"
          style={{ fontSize:"clamp(0.58rem,2vw,0.72rem)", color:"#C2B099" }}>
          Divine Providence
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{ fontSize:"clamp(1.8rem,6vw,3.5rem)" }}>
          {weddingData.journey.title}
        </h2>
        <div className="h-px w-20 mx-auto opacity-65 mb-4"
          style={{ background:"linear-gradient(to right,transparent,#C2B099,transparent)" }}/>
        <p className="font-serif italic leading-relaxed"
          style={{ fontSize:"clamp(0.82rem,2.4vw,1rem)", color:"rgba(59,49,71,0.6)" }}>
          Two lives, one faith, one beautiful beginning written by God&rsquo;s grace.
        </p>
      </motion.div>

      <div ref={timelineRef} className="relative z-10 mx-auto"
        style={{ maxWidth:"min(900px,96vw)" }}>
        <TimelineLine containerRef={timelineRef}/>
        {story.map((line, i) => (
          <StoryCard key={i} text={line} index={i} total={story.length}/>
        ))}

        {/* Terminal dot */}
        <div className="relative z-[2] mt-8">
          <div className="flex md:hidden items-center gap-3">
            <motion.div initial={{ opacity:0, scale:0 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.2 }}
              className="flex flex-col items-center gap-1.5" style={{ width:38, flexShrink:0 }}>
              <div className="w-4 h-4 rounded-full border-2"
                style={{ borderColor:"#C2B099", background:"#FAF8F5",
                  boxShadow:"0 0 12px rgba(194,176,153,0.4)" }}/>
            </motion.div>
            <motion.p initial={{ opacity:0, x:10 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.3 }}
              className="tracking-[0.3em] uppercase font-semibold"
              style={{ fontSize:"clamp(0.44rem,1.3vw,0.54rem)", color:"rgba(194,176,153,0.55)",
                fontFamily:"'Montserrat',sans-serif" }}>
              United Forever
            </motion.p>
          </div>
          <div className="hidden md:flex justify-center">
            <motion.div initial={{ opacity:0, scale:0 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }} transition={{ duration:0.7, delay:0.2 }}
              className="flex flex-col items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2"
                style={{ borderColor:"#C2B099", background:"#FAF8F5",
                  boxShadow:"0 0 14px rgba(194,176,153,0.45)" }}/>
              <p className="tracking-[0.35em] uppercase font-semibold"
                style={{ fontSize:"clamp(0.44rem,1.3vw,0.55rem)", color:"rgba(194,176,153,0.55)",
                  fontFamily:"'Montserrat',sans-serif" }}>
                United Forever
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
