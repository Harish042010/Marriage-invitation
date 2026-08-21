import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export default function BibleVerse() {
  const lines = weddingData.verse.text.split(", ");

  return (
    <section className="py-24 px-4 flex items-center justify-center relative overflow-hidden bg-black/70">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: "min(800px,100vw)", height: "min(800px,100vw)",
          background: "radial-gradient(circle,rgba(212,175,55,0.12) 0%,transparent 70%)",
          filter: "blur(120px)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-champagne-gold)]/40 to-transparent" />

      <div className="w-full relative z-10 gold-card rounded-2xl backdrop-blur-xl border border-[var(--color-champagne-gold)]/20 shadow-[0_20px_70px_rgba(0,0,0,0.8)]"
        style={{ maxWidth: "min(880px,96vw)", padding: "clamp(1.5rem,5vw,3.5rem)" }}>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <div className="w-10 h-10 mx-auto rounded-full border border-[var(--color-champagne-gold)]/50 flex items-center justify-center bg-black/50 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="text-[var(--color-champagne-gold)] text-lg font-serif">✝</span>
          </div>
        </motion.div>

        <h3 className="font-serif text-[var(--color-soft-ivory)] italic drop-shadow-[0_4px_25px_rgba(212,175,55,0.25)] text-center leading-relaxed"
          style={{ fontSize: "clamp(1.25rem,5vw,3.5rem)" }}>
          &ldquo;{lines[0]},<br />
          <span className="gold-gradient-text not-italic font-normal">{lines[1]}</span>&rdquo;
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1.1 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-champagne-gold)] opacity-70" />
          <p className="text-[var(--color-bright-gold)] tracking-[0.3em] uppercase font-semibold"
            style={{ fontSize: "clamp(0.6rem,2.2vw,0.8rem)" }}>
            {weddingData.verse.reference}
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-champagne-gold)] opacity-70" />
        </motion.div>
      </div>
    </section>
  );
}
