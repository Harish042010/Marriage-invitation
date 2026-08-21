import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

/* ── SVG icons — no emojis ── */
function CrossIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="10.5" y="2" width="3" height="20" rx="1.5" fill={color} />
      <rect x="2"    y="8" width="20" height="3" rx="1.5" fill={color} />
    </svg>
  );
}

function MaleIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function FemaleIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="7" r="4" />
      <path d="M12 11v10M9 18h6" />
    </svg>
  );
}

function PersonRow({ icon, name, title, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className="flex items-center gap-3"
    >
      <div className="w-8 h-8 rounded-full border border-[var(--color-champagne-gold)]/40
                      bg-black/40 flex items-center justify-center shrink-0
                      shadow-[0_0_10px_rgba(212,175,55,0.15)]"
        style={{ color: "var(--color-champagne-gold)" }}>
        {icon}
      </div>
      <div className="text-left">
        <p className="tracking-[0.18em] uppercase text-[var(--color-champagne-gold)]/60 font-semibold leading-none mb-0.5"
          style={{ fontSize: "clamp(0.48rem,1.4vw,0.58rem)" }}>
          {title}
        </p>
        <p className="font-serif text-[var(--color-soft-ivory)] leading-tight"
          style={{ fontSize: "clamp(0.95rem,3vw,1.2rem)" }}>
          {name}
        </p>
      </div>
    </motion.div>
  );
}

function ParentCard({ side, fatherName, motherName, label, delay }) {
  const isLeft = side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      className="gold-card rounded-2xl relative overflow-hidden flex flex-col gap-5"
      style={{ padding: "clamp(1.4rem,4vw,2.2rem)" }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px]
                      bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent" />

      {/* Card label */}
      <div className="flex items-center gap-2 mb-1">
        <div style={{ color: "var(--color-champagne-gold)", opacity: 0.7 }}>
          <CrossIcon size={14} color="currentColor" />
        </div>
        <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] font-semibold"
          style={{ fontSize: "clamp(0.52rem,1.6vw,0.65rem)" }}>
          {label}
        </p>
      </div>

      {/* Father row */}
      <PersonRow
        icon={<MaleIcon size={15} color="currentColor" />}
        name={fatherName}
        title="Father"
        delay={delay + 0.15}
      />

      {/* Thin separator */}
      <div className="flex items-center gap-2 opacity-30">
        <div className="flex-1 h-px bg-[var(--color-champagne-gold)]" />
        <CrossIcon size={8} color="rgba(212,175,55,0.8)" />
        <div className="flex-1 h-px bg-[var(--color-champagne-gold)]" />
      </div>

      {/* Mother row */}
      <PersonRow
        icon={<FemaleIcon size={15} color="currentColor" />}
        name={motherName}
        title="Mother"
        delay={delay + 0.28}
      />

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px
                      bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)]/40 to-transparent" />
    </motion.div>
  );
}

export default function ParentsBlessing() {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0a0608 0%,#1c0b0f 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(500px,80vw)", height: "min(500px,80vw)",
          background: "radial-gradient(circle,rgba(212,175,55,0.07) 0%,transparent 70%)",
          filter: "blur(60px)",
        }} />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="text-center relative z-10 mx-auto mb-14"
        style={{ maxWidth: "min(640px,96vw)" }}
      >
        <p className="tracking-[0.35em] uppercase text-[var(--color-champagne-gold)] mb-3 font-semibold"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}>
          With Their Blessings
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}>
          Blessed by Our Parents
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto opacity-70 mb-5" />
        <p className="font-serif italic text-[var(--color-warm-cream)]/70 leading-relaxed"
          style={{ fontSize: "clamp(0.85rem,2.5vw,1.05rem)" }}>
          &ldquo;Children are a heritage from the Lord, offspring a reward from him.&rdquo;
          <span className="block mt-1 text-[var(--color-champagne-gold)]/55 not-italic tracking-widest uppercase"
            style={{ fontSize: "clamp(0.52rem,1.5vw,0.65rem)" }}>
            — Psalm 127 : 3
          </span>
        </p>
      </motion.div>

      {/* Two-column parent cards */}
      <div className="relative z-10 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
        style={{ maxWidth: "min(780px,96vw)" }}>

        <ParentCard
          side="left"
          label="Groom's Parents"
          fatherName={weddingData.groom.father}
          motherName={weddingData.groom.mother}
          delay={0}
        />

        {/* Cross between cards on mobile (in flow) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center items-center sm:hidden"
        >
          <div className="w-10 h-10 rounded-full border border-[var(--color-champagne-gold)]/35
                          bg-black/50 flex items-center justify-center
                          shadow-[0_0_14px_rgba(212,175,55,0.18)]"
            style={{ color: "var(--color-champagne-gold)" }}>
            <CrossIcon size={16} color="currentColor" />
          </div>
        </motion.div>

        <ParentCard
          side="right"
          label="Bride's Parents"
          fatherName={weddingData.bride.father}
          motherName={weddingData.bride.mother}
          delay={0.1}
        />
      </div>

      {/* Cross overlay on desktop (between columns) */}
      <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="w-11 h-11 rounded-full border border-[var(--color-champagne-gold)]/35
                     bg-[#0a0608] flex items-center justify-center
                     shadow-[0_0_18px_rgba(212,175,55,0.18)]"
          style={{ color: "var(--color-champagne-gold)" }}
        >
          <CrossIcon size={16} color="currentColor" />
        </motion.div>
      </div>
    </section>
  );
}
