import { motion } from "framer-motion";
import { useMemo } from "react";

const ShootingStar = ({ delay, top, left, duration = 2.4 }) => (
  <motion.div
    className="absolute w-36 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#f3e5ab] to-transparent opacity-0 pointer-events-none"
    style={{ top, left }}
    initial={{ x: 0, y: 0, rotate: -32, opacity: 0 }}
    animate={{ x: -360, y: 300, opacity: [0, 0.9, 0.9, 0] }}
    transition={{ duration, delay, repeat: Infinity, repeatDelay: 12, ease: "easeInOut" }}
  />
);

export default function GoldDust() {
  const specks = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.4 + 1,
        delay: Math.random() * 4.5,
        duration: 3.5 + Math.random() * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Soft ambient burgundy-gold wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,_rgba(212,175,55,0.10)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_95%,_rgba(161,38,51,0.18)_0%,_transparent_60%)]" />

      {/* Gold dust specks (CSS-animated, GPU-composited) */}
      {specks.map((s) => (
        <div
          key={s.id}
          className="gold-dust absolute rounded-full bg-[#d4af37]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(212,175,55,0.6)",
          }}
        />
      ))}

      {/* Rare shooting stars */}
      <ShootingStar delay={5} top="18%" left="82%" />
      <ShootingStar delay={14} top="48%" left="88%" duration={2.8} />
    </div>
  );
}
