import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:120, damping:30, restDelta:0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{ scaleX,
        background:"linear-gradient(to right,var(--color-ink),#C2B099,#D4B483)",
        boxShadow:"0 0 8px rgba(194,176,153,0.5)" }}
    />
  );
}
