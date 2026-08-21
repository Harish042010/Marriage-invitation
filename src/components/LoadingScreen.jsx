import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-primary-bg)] text-[var(--color-champagne-gold)] px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col items-center w-full max-w-sm"
      >
        {/* Cross */}
        <div className="relative mb-6 text-[clamp(2rem,8vw,2.5rem)] font-serif text-[var(--color-bright-gold)] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
          ✝
        </div>

        {/* Monogram */}
        <h1 className="font-serif mb-5 tracking-widest text-[var(--color-champagne-gold)]"
          style={{ fontSize: "clamp(2rem,10vw,3.5rem)" }}>
          V <span className="opacity-70 mx-2" style={{ fontSize: "clamp(1.2rem,5vw,1.8rem)" }}>&amp;</span> E
        </h1>

        <p className="tracking-[0.18em] uppercase opacity-80 mb-10 text-[var(--color-warm-cream)] text-center leading-relaxed"
          style={{ fontSize: "clamp(0.65rem,2.8vw,0.875rem)" }}>
          Two Hearts. One Faith. One Beautiful Beginning.
        </p>

        {/* Loading bar */}
        <div className="w-40 h-[1px] bg-[#d4af37]/25 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[var(--color-champagne-gold)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
