import { motion } from "framer-motion";

const attire = [
  {
    group: "Gentlemen",
    icon: "🤵",
    palette: ["#1a1a2e", "#16213e", "#2d4059"],
    swatchLabels: ["Midnight Navy", "Deep Charcoal", "Steel Blue"],
    guide: "Formal suit or traditional veshti with a matching shirt. Tie or bow-tie in gold or ivory. Avoid casual denims.",
    accent: "rgba(100,130,200,0.6)",
  },
  {
    group: "Ladies",
    icon: "👗",
    palette: ["#8b1a4a", "#c0405a", "#e8c4b8"],
    swatchLabels: ["Deep Rose", "Blush Crimson", "Soft Blush"],
    guide: "Saree, churidar or lehenga in rich jewel tones — rose, blush, ivory or gold. Avoid pure white or black.",
    accent: "rgba(200,80,120,0.6)",
  },
  {
    group: "Children",
    icon: "🎀",
    palette: ["#f5d6a0", "#e8b87e", "#d4af37"],
    swatchLabels: ["Warm Cream", "Champagne", "Gold"],
    guide: "Ethnic wear or smart-casual in pastels and golds. Comfortable formal shoes encouraged.",
    accent: "rgba(212,175,55,0.7)",
  },
];

function SwatchRow({ colors, labels }) {
  return (
    <div className="flex gap-2 mt-4 mb-3 justify-center">
      {colors.map((c, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex flex-col items-center gap-1"
        >
          <div
            className="rounded-full border border-white/10 shadow-md"
            style={{
              width: "clamp(28px,5vw,38px)",
              height: "clamp(28px,5vw,38px)",
              background: c,
              boxShadow: `0 0 10px ${c}55`,
            }}
          />
          <span
            className="text-[var(--color-warm-cream)]/50 text-center leading-tight"
            style={{ fontSize: "clamp(0.45rem,1.3vw,0.58rem)", maxWidth: 44 }}
          >
            {labels[i]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function AttireCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className="gold-card rounded-2xl flex flex-col items-center text-center relative overflow-hidden"
      style={{ padding: "clamp(0.5rem,4vw,2.25rem)" }}
    >


      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-[var(--color-champagne-gold)]/30"
        style={{
          background: `radial-gradient(circle, ${item.accent}15 0%, rgba(255,255,255,0.7) 100%)`,
          boxShadow: `0 4px 20px rgba(17,30,42,0.08)`,
          fontSize: "clamp(1.4rem,4vw,1.8rem)",
        }}
      >
        {item.icon}
      </div>

      <p
        className="tracking-[0.28em] uppercase text-[var(--color-champagne-gold)] font-semibold mb-1"
        style={{ fontSize: "clamp(0.6rem,1.8vw,0.72rem)" }}
      >
        {item.group}
      </p>

      <SwatchRow colors={item.palette} labels={item.swatchLabels} />

      <div className="h-px w-12 bg-[var(--color-champagne-gold)]/25 mb-3" />

      <p
        className="font-serif italic text-[var(--color-warm-cream)]/75 leading-relaxed"
        style={{ fontSize: "clamp(0.8rem,2.2vw,0.95rem)" }}
      >
        {item.guide}
      </p>
    </motion.div>
  );
}

export default function WeddingDressCode() {
  return (
    <section
      className="relative py-12 md:py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1c0b0f 0%, #0a0608 50%, #1c0b0f 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(600px,90vw)",
          height: "min(600px,90vw)",
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="text-center relative z-10 mx-auto mb-14"
        style={{ maxWidth: "min(640px,96vw)" }}
      >
        <p
          className="tracking-[0.35em] uppercase text-[var(--color-champagne-gold)] mb-3 font-semibold"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}
        >
          Dress Code
        </p>
        <h2
          className="font-serif gold-gradient-text mb-3"
          style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}
        >
          What to Wear
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto opacity-70 mb-5" />
        <p
          className="font-serif italic text-[var(--color-warm-cream)]/65 leading-relaxed"
          style={{ fontSize: "clamp(0.82rem,2.4vw,1rem)" }}
        >
          Dress in celebration — honour the occasion with your finest ethnic or formal attire.
        </p>
      </motion.div>

      {/* Cards — 1 col on mobile, 3 on large */}
      <div
        className="relative z-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        style={{ maxWidth: "min(1050px,96vw)" }}
      >
        {attire.map((item, i) => (
          <AttireCard key={item.group} item={item} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-center mt-10 relative z-10"
        style={{
          color: "rgba(212,175,55,0.4)",
          fontSize: "clamp(0.6rem,1.8vw,0.72rem)",
          letterSpacing: "0.25em",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        ✦ &nbsp; Smart ethnic formal preferred &nbsp; ✦
      </motion.p>
    </section>
  );
}
