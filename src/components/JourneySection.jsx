import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "../data/weddingData";

/* ── SVG icons for each story beat ── */
function PrayerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3a3 3 0 0 0-3 3l-7 9a3 3 0 1 0 4.7 3.7L20 10a3 3 0 0 0 0-4.2A3 3 0 0 0 18 3z"/>
      <path d="M6.3 19.7a3 3 0 0 1-4.2-4.2L8 9"/>
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
    </svg>
  );
}
function HandshakeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 14.5 18 17l-1.5-1.5"/>
      <path d="m15 19-1.5-1.5L12 19l-1.5-1.5L9 19 7 17l2-2-2-2 2-2 2 2 1.5-1.5L14 11l1.5 1.5L17 11l3 3-2 2 2.5 2.5-1.5 1.5z"/>
      <path d="M3.5 14.5 6 17l1.5-1.5"/>
      <path d="M9 5 5 9l2 2"/>
      <path d="M15 5l4 4-2 2"/>
      <path d="M9 5h6"/>
    </svg>
  );
}
function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
    </svg>
  );
}

const ICONS = [PrayerIcon, HeartIcon, HandshakeIcon, CrossIcon];

/* ── Individual timeline card ── */
function StoryCard({ text, index, total }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const Icon   = ICONS[index % ICONS.length];

  return (
    <div ref={ref} className="relative flex items-start w-full"
      style={{ marginBottom: index < total - 1 ? "clamp(2rem,6vh,4rem)" : 0 }}>

      {/* ── Left col (desktop: content or spacer) ── */}
      <div className="hidden md:flex flex-1 justify-end pr-8">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="gold-card rounded-2xl relative overflow-hidden"
            style={{ maxWidth: 340, padding: "clamp(1.1rem,3vw,1.7rem)" }}
          >
            <CardContent text={text} Icon={Icon} index={index} />
          </motion.div>
        )}
      </div>

      {/* ── Centre dot on timeline ── */}
      <div className="relative flex flex-col items-center shrink-0" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="flex items-center justify-center rounded-full border-2 border-[var(--color-champagne-gold)] bg-[#120810]"
          style={{
            width: "clamp(36px,6vw,48px)",
            height: "clamp(36px,6vw,48px)",
            color: "var(--color-champagne-gold)",
            boxShadow: "0 0 20px rgba(212,175,55,0.35), 0 0 40px rgba(212,175,55,0.1)",
          }}
        >
          <Icon />
        </motion.div>
      </div>

      {/* ── Right col (desktop: content or spacer) ── */}
      <div className="hidden md:flex flex-1 justify-start pl-8">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="gold-card rounded-2xl relative overflow-hidden"
            style={{ maxWidth: 340, padding: "clamp(1.1rem,3vw,1.7rem)" }}
          >
            <CardContent text={text} Icon={Icon} index={index} />
          </motion.div>
        )}
      </div>

      {/* ── Mobile: card always below dot, full width ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="flex md:hidden flex-1 pl-4"
      >
        <div className="gold-card rounded-2xl relative overflow-hidden w-full"
          style={{ padding: "clamp(1rem,3vw,1.5rem)" }}>
          <CardContent text={text} Icon={Icon} index={index} />
        </div>
      </motion.div>
    </div>
  );
}

function CardContent({ text, index }) {
  return (
    <>
      {/* Step label */}
      <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)]/55 font-semibold mb-2"
        style={{ fontSize: "clamp(0.48rem,1.4vw,0.58rem)" }}>
        Chapter {index + 1}
      </p>
      <p className="font-serif italic text-[var(--color-warm-cream)]/85 leading-relaxed"
        style={{ fontSize: "clamp(0.85rem,2.3vw,1.02rem)" }}>
        {text}
      </p>
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-16
                      bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)]/40 to-transparent" />
    </>
  );
}

/* ── Animated vertical connector ── */
function TimelineLine({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ zIndex: 1 }}>
      {/* Track */}
      <div className="absolute inset-0 bg-[rgba(212,175,55,0.1)]" />
      {/* Fill */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="w-full h-full"
          style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.8), rgba(212,175,55,0.3))",
            boxShadow: "0 0 8px rgba(212,175,55,0.5)",
          }} />
      </motion.div>
    </div>
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
      style={{ background: "linear-gradient(180deg, #0a0608 0%, #140a10 50%, #0a0608 100%)" }}
    >
      {/* Parallax ambient glow */}
      <motion.div style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)", filter: "blur(40px)" }} />
      </motion.div>

      {/* ── Section heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="text-center relative z-10 mb-16"
        style={{ maxWidth: "min(640px,96vw)", margin: "0 auto 4rem" }}
      >
        <p className="tracking-[0.35em] uppercase text-[var(--color-champagne-gold)] mb-3 font-semibold"
          style={{ fontSize: "clamp(0.58rem,2vw,0.72rem)" }}>
          Divine Providence
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}>
          {weddingData.journey.title}
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto opacity-65 mb-5" />
        <p className="font-serif italic text-[var(--color-warm-cream)]/60 leading-relaxed"
          style={{ fontSize: "clamp(0.82rem,2.4vw,1rem)" }}>
          Two lives, one faith, one beautiful beginning written by God&rsquo;s grace.
        </p>
      </motion.div>

      {/* ── Timeline ── */}
      <div
        ref={timelineRef}
        className="relative z-10 mx-auto"
        style={{ maxWidth: "min(900px,96vw)" }}
      >
        <TimelineLine containerRef={timelineRef} />

        {story.map((line, i) => (
          <StoryCard
            key={i}
            text={line}
            index={i}
            total={story.length}
          />
        ))}

        {/* Terminal node */}
        <div className="relative flex justify-center mt-6" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-4 h-4 rounded-full border-2 border-[var(--color-champagne-gold)] bg-[#120810]
                            shadow-[0_0_16px_rgba(212,175,55,0.5)]" />
            <p className="tracking-[0.35em] uppercase text-[var(--color-champagne-gold)]/45 font-semibold"
              style={{ fontSize: "clamp(0.44rem,1.3vw,0.55rem)" }}>
              United Forever
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
