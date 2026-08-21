import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { weddingData } from "../data/weddingData";
import ScratchReveal from "./ScratchReveal";

export default function InvitationCard() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const rotateX  = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const y        = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity  = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.7, 1]);
  const scale    = useTransform(scrollYProgress, [0, 1], [0.93, 1]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 [perspective:1200px] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />

      <motion.div
        style={{ rotateX, y, opacity, scale, maxWidth: "min(720px,96vw)" }}
        className="relative w-full [transform-style:preserve-3d] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden gold-card rounded-2xl text-center"
      >
        {/* Inner padding responds to screen width */}
        <div className="p-6 sm:p-10 md:p-14">
          <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-30" />
          <div className="absolute inset-2 sm:inset-4 border border-[var(--color-champagne-gold)]/30 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 sm:inset-5 border border-[var(--color-champagne-gold)]/15 rounded-lg pointer-events-none" />

          {/* Corner brackets */}
          <div className="absolute top-5 left-5 text-[var(--color-champagne-gold)] opacity-60 text-base leading-none">&#9556;</div>
          <div className="absolute top-5 right-5 text-[var(--color-champagne-gold)] opacity-60 text-base leading-none">&#9559;</div>
          <div className="absolute bottom-5 left-5 text-[var(--color-champagne-gold)] opacity-60 text-base leading-none">&#9562;</div>
          <div className="absolute bottom-5 right-5 text-[var(--color-champagne-gold)] opacity-60 text-base leading-none">&#9565;</div>

          {/* Cross badge */}
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--color-champagne-gold)] flex items-center justify-center bg-[#1F1710] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <span className="text-[var(--color-champagne-gold)] text-xl font-serif">&#10013;</span>
            </div>
          </div>

          <p className="tracking-[0.25em] uppercase text-[var(--color-champagne-gold)] mb-4 font-medium"
            style={{ fontSize: "clamp(0.6rem,2.2vw,0.8rem)" }}>
            In The Presence of God &amp; Loved Ones
          </p>

          <p className="font-serif italic text-[var(--color-warm-cream)]/80 mb-6 mx-auto leading-relaxed"
            style={{ fontSize: "clamp(0.8rem,2.8vw,1rem)", maxWidth: "32rem" }}>
            &ldquo;Two souls united in covenant, walking together in faith, hope, and everlasting love.&rdquo;
          </p>

          <h2 className="font-serif gold-gradient-text mb-1"
            style={{ fontSize: "clamp(2rem,8vw,3.5rem)" }}>
            {weddingData.groom.name}
          </h2>
          <span className="font-script text-[var(--color-champagne-gold)] my-1 block opacity-90"
            style={{ fontSize: "clamp(1.6rem,6vw,2.5rem)" }}>
            and
          </span>
          <h2 className="font-serif gold-gradient-text mb-8"
            style={{ fontSize: "clamp(2rem,8vw,3.5rem)" }}>
            {weddingData.bride.name}
          </h2>

          <div className="flex flex-col items-center justify-center space-y-5 pt-4">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent opacity-60" />

            <ScratchReveal hint="Scratch To Reveal The Date">
              <p className="uppercase tracking-[0.25em] text-[var(--color-champagne-gold)] mb-3 font-semibold"
                style={{ fontSize: "clamp(0.55rem,2vw,0.7rem)" }}>
                Save The Date
              </p>
              <p className="font-serif gold-gradient-text mb-2"
                style={{ fontSize: "clamp(1.5rem,6vw,2.5rem)", textShadow: "0 2px 12px rgba(212,175,55,0.3)" }}>
                November 15, 2026
              </p>
              <p className="text-[var(--color-warm-cream)]/80 mb-2"
                style={{ fontSize: "clamp(0.75rem,2.5vw,0.875rem)" }}>
                10:30 AM
              </p>
              <div className="h-px w-10 bg-[var(--color-champagne-gold)]/30 mx-auto my-2" />
              <p className="text-[var(--color-champagne-gold)]/60 font-serif italic"
                style={{ fontSize: "clamp(0.65rem,2vw,0.75rem)" }}>
                Infant Jesus Church
              </p>
            </ScratchReveal>

            <p className="font-serif italic opacity-90 text-[var(--color-warm-cream)]"
              style={{ fontSize: "clamp(1rem,4vw,1.4rem)" }}>
              {weddingData.wedding.time}
            </p>

            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent opacity-40" />

            <div className="text-[var(--color-soft-ivory)]">
              <p className="font-serif text-[var(--color-warm-cream)] mb-1"
                style={{ fontSize: "clamp(1rem,3.5vw,1.4rem)" }}>
                {weddingData.wedding.church}
              </p>
              <p className="tracking-[0.12em] uppercase text-[var(--color-champagne-gold)] opacity-70"
                style={{ fontSize: "clamp(0.6rem,2vw,0.8rem)" }}>
                {weddingData.wedding.location}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
