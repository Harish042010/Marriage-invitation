import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export default function FinalBlessing() {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-black px-4"
      style={{ paddingTop: "clamp(3rem,8vh,6rem)", paddingBottom: "clamp(3rem,8vh,6rem)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.18)_0%,rgba(12,10,9,1)_75%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl"
        style={{
          width: "min(500px,80vw)", height: "min(500px,80vw)",
          background: "radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)",
        }} />
      {/* Pulsing rings — desktop only to avoid mobile clutter */}
      <div className="absolute inset-0 pointer-events-none hidden sm:flex items-center justify-center opacity-25">
        <div className="w-[min(440px,70vw)] h-[min(440px,70vw)] rounded-full border border-[#D4AF37]/20 animate-pulse" />
        <div className="absolute w-[min(620px,90vw)] h-[min(620px,90vw)] rounded-full border border-[#D4AF37]/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.7, ease: "easeOut" }}
        className="relative z-10 text-center flex flex-col items-center"
        style={{ maxWidth: "min(880px,96vw)" }}
      >
        {/* Cross badge */}
        <div className="relative mb-7">
          <div className="w-14 h-14 rounded-full border border-[var(--color-champagne-gold)]/40 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <span className="text-[var(--color-champagne-gold)] font-serif" style={{ fontSize: "1.8rem" }}>✝</span>
          </div>
          <div className="absolute -inset-2 rounded-full border border-[var(--color-champagne-gold)]/20 animate-ping pointer-events-none"
            style={{ animationDuration: "4s" }} />
        </div>

        <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-3 font-medium"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.8rem)" }}>
          With Joy In Our Hearts
        </p>

        <h2 className="font-serif gold-gradient-text mb-7 drop-shadow-2xl leading-tight"
          style={{ fontSize: "clamp(1.8rem,6vw,4.5rem)" }}>
          Forever Begins in Faith &amp; Love
        </h2>

        <div className="h-px w-28 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto mb-8 opacity-70" />

        <p className="text-[var(--color-warm-cream)] font-serif italic leading-relaxed opacity-90 mb-12"
          style={{ fontSize: "clamp(0.9rem,3vw,1.35rem)", maxWidth: "min(640px,92vw)" }}>
          &ldquo;We warmly invite you to witness our holy covenant and celebrate the beginning of our blessed journey.&rdquo;
        </p>

        {/* Summary card */}
        <div className="gold-card rounded-xl w-full mb-10 relative overflow-hidden"
          style={{
            maxWidth: "min(500px,94vw)",
            padding: "clamp(1.5rem,5vw,3rem)",
          }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-1 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent" />
          <p className="uppercase tracking-[0.22em] text-[var(--color-champagne-gold)] mb-2"
            style={{ fontSize: "clamp(0.55rem,1.8vw,0.7rem)" }}>
            Holy Matrimony
          </p>
          <h3 className="font-serif text-[var(--color-soft-ivory)] mb-3 tracking-wide leading-snug"
            style={{ fontSize: "clamp(1.3rem,4.5vw,2.2rem)" }}>
            {weddingData.groom.name}{" "}
            <span className="font-script text-[var(--color-champagne-gold)] mx-1"
              style={{ fontSize: "clamp(1.5rem,5vw,2.5rem)" }}>
              &amp;
            </span>{" "}
            {weddingData.bride.name}
          </h3>
          <p className="font-serif italic text-[var(--color-bright-gold)]"
            style={{ fontSize: "clamp(0.85rem,2.8vw,1.1rem)" }}>
            {weddingData.wedding.dateDisplay || weddingData.wedding.date} &bull; {weddingData.wedding.time}
          </p>
          <p className="uppercase tracking-wider text-[var(--color-warm-cream)]/70 mt-2"
            style={{ fontSize: "clamp(0.55rem,1.8vw,0.7rem)" }}>
            {weddingData.wedding.church}, {weddingData.wedding.location}
          </p>
        </div>

        <p className="tracking-[0.28em] uppercase text-[var(--color-champagne-gold)]/80 font-serif"
          style={{ fontSize: "clamp(0.65rem,2vw,0.8rem)" }}>
          &bull; Soli Deo Gloria &bull;
        </p>
      </motion.div>

      {/* ── Footer copyright ── */}
      <div className="relative z-10 w-full mt-16 pt-6 flex flex-col items-center gap-2"
        style={{
          borderTop: "1px solid rgba(212,175,55,0.12)",
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
        }}>
        <div className="flex items-center gap-3 opacity-50">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-champagne-gold)]" />
          <span className="text-[var(--color-champagne-gold)]" style={{ fontSize: "0.6rem" }}>&#10022;</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-champagne-gold)]" />
        </div>
        <p className="text-center"
          style={{
            color: "rgba(212,175,55,0.4)",
            fontSize: "clamp(0.6rem,1.8vw,0.72rem)",
            letterSpacing: "0.22em",
            fontFamily: "'Montserrat', sans-serif",
          }}>
          &copy; {new Date().getFullYear()} Crafted with love by{" "}
          <span style={{ color: "rgba(212,175,55,0.65)", letterSpacing: "0.18em" }}>ZenXora</span>
          . All rights reserved.
        </p>
      </div>
    </section>
  );
}
