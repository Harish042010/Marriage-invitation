import { motion } from "framer-motion";

const parents = {
  groom: {
    label: "Groom's Parents",
    father: "Mr. Samuel Raj",
    mother: "Mrs. Leela Samuel",
    side: "left",
  },
  bride: {
    label: "Bride's Parents",
    father: "Mr. Daniel Prabhu",
    mother: "Mrs. Mary Daniel",
    side: "right",
  },
};

function ParentCard({ data, index }) {
  const isLeft = data.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
      className="gold-card rounded-2xl flex flex-col items-center text-center relative overflow-hidden"
      style={{ padding: "clamp(1.5rem,4vw,2.5rem)" }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-full border border-[var(--color-champagne-gold)]/50 bg-black/40 flex items-center justify-center mb-5 shadow-[0_0_18px_rgba(212,175,55,0.2)]">
        <span style={{ fontSize: "1.2rem" }}>🙏</span>
      </div>

      <p
        className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-4 font-semibold"
        style={{ fontSize: "clamp(0.55rem,1.8vw,0.7rem)" }}
      >
        {data.label}
      </p>

      {/* Father */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.15 + 0.2 }}
        className="font-serif text-[var(--color-soft-ivory)]"
        style={{ fontSize: "clamp(1rem,3.5vw,1.4rem)" }}
      >
        {data.father}
      </motion.p>

      <div className="flex items-center gap-3 my-3 opacity-50">
        <div className="h-px w-8 bg-[var(--color-champagne-gold)]" />
        <span className="text-[var(--color-champagne-gold)]" style={{ fontSize: "0.55rem" }}>✦</span>
        <div className="h-px w-8 bg-[var(--color-champagne-gold)]" />
      </div>

      {/* Mother */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.15 + 0.35 }}
        className="font-serif text-[var(--color-soft-ivory)]"
        style={{ fontSize: "clamp(1rem,3.5vw,1.4rem)" }}
      >
        {data.mother}
      </motion.p>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)]/40 to-transparent" />
    </motion.div>
  );
}

export default function ParentsBlessing() {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0608 0%, #1c0b0f 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(500px,80vw)",
          height: "min(500px,80vw)",
          background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="text-center mb-14 relative z-10"
        style={{ maxWidth: "min(640px,96vw)", margin: "0 auto 3.5rem" }}
      >
        <p
          className="tracking-[0.35em] uppercase text-[var(--color-champagne-gold)] mb-3 font-semibold"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}
        >
          With Their Blessings
        </p>
        <h2
          className="font-serif gold-gradient-text mb-3"
          style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}
        >
          Blessed by Our Parents
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto opacity-70 mb-5" />
        <p
          className="font-serif italic text-[var(--color-warm-cream)]/70 leading-relaxed"
          style={{ fontSize: "clamp(0.85rem,2.5vw,1.05rem)" }}
        >
          &ldquo;Children are a heritage from the Lord, offspring a reward from him.&rdquo;
          <span className="block mt-1 text-[var(--color-champagne-gold)]/60 not-italic tracking-widest uppercase"
            style={{ fontSize: "clamp(0.55rem,1.6vw,0.68rem)" }}>
            — Psalm 127:3
          </span>
        </p>
      </motion.div>

      {/* Parent cards */}
      <div
        className="relative z-10 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
        style={{ maxWidth: "min(760px,96vw)" }}
      >
        <ParentCard data={parents.groom} index={0} />

        {/* Cross divider — mobile: row between cards, desktop: centred overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center sm:hidden py-2"
        >
          <div className="w-10 h-10 rounded-full border border-[var(--color-champagne-gold)]/40 bg-black/50 flex items-center justify-center">
            <span className="text-[var(--color-champagne-gold)] font-serif" style={{ fontSize: "1.1rem" }}>✝</span>
          </div>
        </motion.div>

        <ParentCard data={parents.bride} index={1} />
      </div>

      {/* Desktop centred cross between the two columns */}
      <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-12 h-12 rounded-full border border-[var(--color-champagne-gold)]/40 bg-[#0a0608] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <span className="text-[var(--color-champagne-gold)] font-serif" style={{ fontSize: "1.2rem" }}>✝</span>
        </motion.div>
      </div>
    </section>
  );
}
