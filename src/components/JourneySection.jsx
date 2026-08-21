import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "../data/weddingData";

/* ── SVG Icons ── */
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

/* ════════════════════════════════════════════
   MOBILE layout  — left rail, all cards right
   DESKTOP layout — alternating left / right
════════════════════════════════════════════ */
function StoryCard({ text, index, total }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;   // desktop: even cards go left
  const Icon   = ICONS[index % ICONS.length];
  const isLast = index === total - 1;

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ marginBottom: isLast ? 0 : "clamp(2.5rem,7vh,4.5rem)" }}
    >
      {/* ════════════════════
          MOBILE  ( < md )
          Icon left-rail, card to the right
      ════════════════════ */}
      <div className="flex md:hidden items-start gap-3">
        {/* Icon dot */}
        <div className="flex flex-col items-center shrink-0" style={{ paddingTop: 4 }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center rounded-full border-2 border-[var(--color-champagne-gold)] bg-[#120810]"
            style={{
              width: 38, height: 38,
              color: "var(--color-champagne-gold)",
              boxShadow: "0 0 16px rgba(212,175,55,0.35)",
              flexShrink: 0,
            }}
          >
            <Icon />
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="gold-card rounded-xl relative overflow-hidden flex-1"
          style={{ padding: "clamp(0.9rem,3vw,1.3rem)", minWidth: 0 }}
        >
          <CardInner text={text} index={index} />
        </motion.div>
      </div>

      {/* ════════════════════
          DESKTOP  ( ≥ md )
          Alternating left / centre dot / right
      ════════════════════ */}
      <div className="hidden md:flex items-start">
        {/* Left slot */}
        <div className="flex-1 flex justify-end pr-8">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -44 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="gold-card rounded-2xl relative overflow-hidden"
              style={{ maxWidth: 360, width: "100%", padding: "clamp(1.1rem,2.5vw,1.7rem)" }}
            >
              <CardInner text={text} index={index} />
            </motion.div>
          )}
        </div>

        {/* Centre icon */}
        <div className="flex flex-col items-center shrink-0" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="flex items-center justify-center rounded-full border-2 border-[var(--color-champagne-gold)] bg-[#120810]"
            style={{
              width: 48, height: 48,
              color: "var(--color-champagne-gold)",
              boxShadow: "0 0 22px rgba(212,175,55,0.38), 0 0 44px rgba(212,175,55,0.1)",
              flexShrink: 0,
            }}
          >
            <Icon />
          </motion.div>
        </div>

        {/* Right slot */}
        <div className="flex-1 flex justify-start pl-8">
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 44 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="gold-card rounded-2xl relative overflow-hidden"
              style={{ maxWidth: 360, width: "100%", padding: "clamp(1.1rem,2.5vw,1.7rem)" }}
            >
              <CardInner text={text} index={index} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function CardInner({ text, index }) {
  return (
    <>
      <p
        className="tracking-[0.28em] uppercase font-semibold mb-1.5"
        style={{
          fontSize: "clamp(0.46rem,1.3vw,0.56rem)",
          color: "rgba(212,175,55,0.5)",
          fontFamily: "'Montserrat',sans-serif",
        }}
      >
        Chapter {index + 1}
      </p>
      <p
        className="font-serif italic leading-relaxed"
        style={{
          fontSize: "clamp(0.84rem,2.2vw,1rem)",
          color: "rgba(232,213,191,0.88)",
        }}
      >
        {text}
      </p>
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-14
                      bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.38)] to-transparent" />
    </>
  );
}

/* ── Scroll-driven vertical line ──
   Mobile:  positioned at left rail (left = 19px = half of 38px icon)
   Desktop: centred between two columns (left-1/2)
── */
function TimelineLine({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Mobile line — aligns with 38px icon centre (19px from left) */}
      <div className="absolute top-0 bottom-0 md:hidden" style={{ left: 19, width: 1, zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: "rgba(212,175,55,0.1)" }} />
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <div className="w-full h-full" style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.75), rgba(212,175,55,0.25))",
            boxShadow: "0 0 6px rgba(212,175,55,0.45)",
          }} />
        </motion.div>
      </div>

      {/* Desktop line — centred */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 hidden md:block w-px" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: "rgba(212,175,55,0.1)" }} />
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <div className="w-full h-full" style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.8), rgba(212,175,55,0.3))",
            boxShadow: "0 0 8px rgba(212,175,55,0.5)",
          }} />
        </motion.div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════ */
export default function JourneySection() {
  const sectionRef  = useRef(null);
  const timelineRef = useRef(null);
  const story       = weddingData.journey.story;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0a0608 0%,#140a10 50%,#0a0608 100%)" }}
    >
      {/* Ambient parallax glow */}
      <motion.div style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)",
          filter: "blur(40px)",
        }} />
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="text-center relative z-10"
        style={{ maxWidth: "min(640px,96vw)", margin: "0 auto clamp(2.5rem,7vh,4rem)" }}
      >
        <p className="tracking-[0.35em] uppercase text-[var(--color-champagne-gold)] mb-3 font-semibold"
          style={{ fontSize: "clamp(0.58rem,2vw,0.72rem)" }}>
          Divine Providence
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}>
          {weddingData.journey.title}
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto opacity-65 mb-4" />
        <p className="font-serif italic text-[var(--color-warm-cream)]/60 leading-relaxed"
          style={{ fontSize: "clamp(0.82rem,2.4vw,1rem)" }}>
          Two lives, one faith, one beautiful beginning written by God&rsquo;s grace.
        </p>
      </motion.div>

      {/* Timeline container */}
      <div
        ref={timelineRef}
        className="relative z-10 mx-auto"
        style={{ maxWidth: "min(900px,96vw)" }}
      >
        <TimelineLine containerRef={timelineRef} />

        {story.map((line, i) => (
          <StoryCard key={i} text={line} index={i} total={story.length} />
        ))}

        {/* Terminal dot — single implementation, aligns to rail on mobile, centred on desktop */}
        <div className="relative z-[2] mt-8">
          {/* Mobile: sits on the left rail, centred on the 38px icon column */}
          <div className="flex md:hidden items-center gap-3" style={{ paddingLeft: 0 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center gap-1.5"
              style={{ width: 38, flexShrink: 0 }}
            >
              <div className="w-4 h-4 rounded-full border-2 border-[var(--color-champagne-gold)] bg-[#120810]
                              shadow-[0_0_14px_rgba(212,175,55,0.5)]" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="tracking-[0.3em] uppercase font-semibold"
              style={{ fontSize: "clamp(0.44rem,1.3vw,0.54rem)", color: "rgba(212,175,55,0.45)", fontFamily: "'Montserrat',sans-serif" }}
            >
              United Forever
            </motion.p>
          </div>

          {/* Desktop: centred below both columns */}
          <div className="hidden md:flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full border-2 border-[var(--color-champagne-gold)] bg-[#120810]
                              shadow-[0_0_16px_rgba(212,175,55,0.5)]" />
              <p className="tracking-[0.35em] uppercase font-semibold"
                style={{ fontSize: "clamp(0.44rem,1.3vw,0.55rem)", color: "rgba(212,175,55,0.45)", fontFamily: "'Montserrat',sans-serif" }}>
                United Forever
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
