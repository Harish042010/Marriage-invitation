import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

function GoldName({ text, delay = 0 }) {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex justify-center flex-wrap"
    >
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          variants={child}
          className="inline-block gold-gradient-text font-serif tracking-tight"
          style={{ fontSize: "clamp(2.4rem,9vw,6.5rem)" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function NameReveal() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14)_0%,rgba(12,10,9,0.95)_70%)] pointer-events-none" />

      {/* Arch decorations — hidden on very small screens, sized safely */}
      <div className="absolute pointer-events-none hidden sm:block"
        style={{
          width: "min(700px,90vw)", height: "min(750px,110vw)",
          border: "1px solid rgba(212,175,55,0.12)",
          borderRadius: "50% 50% 0 0 / 55% 55% 0 0",
          top: "clamp(30px,6vw,64px)", left: "50%", transform: "translateX(-50%)",
        }}
      />
      <div className="absolute pointer-events-none hidden sm:block"
        style={{
          width: "min(660px,86vw)", height: "min(730px,107vw)",
          border: "1px solid rgba(212,175,55,0.07)",
          borderRadius: "50% 50% 0 0 / 55% 55% 0 0",
          top: "clamp(46px,8vw,80px)", left: "50%", transform: "translateX(-50%)",
        }}
      />

      <div className="text-center z-10 w-full max-w-4xl flex flex-col items-center gap-4">
        {/* Monogram badge */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="mb-2"
        >
          <div className="w-16 h-16 rounded-full border border-[var(--color-champagne-gold)]/50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.25)]">
            <span className="text-[var(--color-champagne-gold)] text-[10px] tracking-widest font-cinzel">V &amp; E</span>
            <span className="text-[var(--color-bright-gold)] text-base">&#10013;</span>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="text-[var(--color-champagne-gold)] tracking-[0.3em] uppercase font-medium mb-2"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.8rem)" }}
        >
          Together With Their Families
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="flex items-center gap-3 opacity-70"
        >
          <div className="h-px bg-gradient-to-r from-transparent to-[var(--color-champagne-gold)]"
            style={{ width: "clamp(32px,6vw,100px)" }} />
          <span className="text-[var(--color-champagne-gold)] text-sm">&#10022;</span>
          <div className="h-px bg-gradient-to-l from-transparent to-[var(--color-champagne-gold)]"
            style={{ width: "clamp(32px,6vw,100px)" }} />
        </motion.div>

        <GoldName text={weddingData.groom.name} delay={0} />

        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="font-script text-[var(--color-bright-gold)] opacity-90 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          style={{ fontSize: "clamp(2.5rem,9vw,5rem)" }}
        >
          &amp;
        </motion.div>

        <GoldName text={weddingData.bride.name} delay={0.3} />

        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="flex items-center gap-3 mt-2 opacity-70"
        >
          <div className="h-px bg-gradient-to-r from-transparent to-[var(--color-champagne-gold)]"
            style={{ width: "clamp(32px,6vw,100px)" }} />
          <span className="text-[var(--color-champagne-gold)] text-sm">&#10022;</span>
          <div className="h-px bg-gradient-to-l from-transparent to-[var(--color-champagne-gold)]"
            style={{ width: "clamp(32px,6vw,100px)" }} />
        </motion.div>

        <motion.p
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="text-[var(--color-warm-cream)] tracking-[0.2em] uppercase font-light opacity-90 text-center"
          style={{ fontSize: "clamp(0.6rem,2.5vw,0.9rem)" }}
        >
          Request The Honour of Your Presence
        </motion.p>
      </div>
    </section>
  );
}
