import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "../data/weddingData";

export default function JourneySection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const leftPathW     = useTransform(scrollYProgress, [0, 0.25], ["0%", "50%"]);
  const rightPathW    = useTransform(scrollYProgress, [0, 0.25], ["0%", "50%"]);
  const centerH       = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);
  const crossOpacity  = useTransform(scrollYProgress, [0.2, 0.28], [0, 1]);
  const textOpacity   = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  const textScale     = useTransform(scrollYProgress, [0.12, 0.4], [0.96, 1]);

  const story = weddingData.journey.story;

  return (
    <section ref={containerRef} className="h-[130vh] relative" style={{ background: "#0a0608" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background glow */}
        <div className="absolute pointer-events-none"
          style={{
            width: "min(420px,80vw)", height: "min(420px,80vw)",
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)",
            filter: "blur(55px)",
          }} />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-8 relative z-10 px-2"
        >
          <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-2 font-semibold"
            style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}>
            Divine Providence
          </p>
          <h2 className="gold-gradient-text font-serif"
            style={{ fontSize: "clamp(1.6rem,6vw,3.5rem)" }}>
            {weddingData.journey.title}
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto mt-3 opacity-70" />
        </motion.div>

        {/* Path + card */}
        <div className="relative w-full z-10" style={{ maxWidth: "min(840px,96vw)", height: "clamp(320px,55vw,420px)" }}>
          {/* Left path */}
          <motion.div style={{ width: leftPathW }}
            className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-[var(--color-champagne-gold)] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          <div className="absolute -top-6 left-2 text-[var(--color-champagne-gold)] opacity-70 hidden sm:block"
            style={{ fontSize: "clamp(0.55rem,1.5vw,0.7rem)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Her Path
          </div>

          {/* Right path */}
          <motion.div style={{ width: rightPathW }}
            className="absolute top-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-[var(--color-champagne-gold)] to-[var(--color-champagne-gold)] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          <div className="absolute -top-6 right-2 text-[var(--color-champagne-gold)] opacity-70 hidden sm:block"
            style={{ fontSize: "clamp(0.55rem,1.5vw,0.7rem)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            His Path
          </div>

          {/* Crossroads dot */}
          <motion.div style={{ opacity: crossOpacity }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-[var(--color-champagne-gold)] bg-black flex items-center justify-center shadow-[0_0_18px_var(--color-champagne-gold)] z-10">
            <span className="text-[var(--color-champagne-gold)]" style={{ fontSize: 9 }}>&#10013;</span>
          </motion.div>

          {/* Vertical path */}
          <motion.div style={{ height: centerH }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[var(--color-champagne-gold)] via-[var(--color-champagne-gold)] to-transparent shadow-[0_0_10px_rgba(212,175,55,0.8)]" />

          {/* Story card */}
          <motion.div
            style={{ opacity: textOpacity, scale: textScale }}
            className="absolute left-1/2 -translate-x-1/2 w-full px-2"
            style={{ opacity: textOpacity, scale: textScale, top: "clamp(80px,18vw,110px)" }}
          >
            <div className="gold-card rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] mx-auto"
              style={{ maxWidth: "min(560px,94vw)", padding: "clamp(1.25rem,4vw,2.5rem)" }}>
              <p className="uppercase tracking-[0.28em] text-[var(--color-champagne-gold)] mb-3 font-semibold text-center"
                style={{ fontSize: "clamp(0.55rem,1.8vw,0.7rem)" }}>
                Our Story
              </p>
              <div className="space-y-3">
                {story.map((line, i) => (
                  <p key={i} className="text-[var(--color-warm-cream)] font-serif italic leading-relaxed text-center"
                    style={{ fontSize: "clamp(0.82rem,2.5vw,1.05rem)" }}>
                    {line}
                  </p>
                ))}
              </div>
              <div className="h-px w-14 bg-[var(--color-champagne-gold)]/40 mx-auto mt-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
