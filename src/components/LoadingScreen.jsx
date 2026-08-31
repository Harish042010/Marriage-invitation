import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(() => onComplete(), 3500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{ background:"linear-gradient(160deg,#E0DCE6 0%,#F5E4E0 100%)" }}
      initial={{ opacity:1 }}
      exit={{ opacity:0, transition:{ duration:1.5, ease:"easeInOut" } }}
    >
      <motion.div
        initial={{ opacity:0, scale:0.85 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:1.5 }}
        className="flex flex-col items-center w-full max-w-sm"
      >


        {/* Logo */}
        <motion.img
          initial={{ opacity:0, scale:0.9, y:10 }}
          animate={{ opacity:1, scale:1, y:0 }}
          transition={{ duration:1.8, ease:"easeOut", delay:0.2 }}
          src="/logo.png"
          alt="Vivin & Evan Logo"
          className="w-56 sm:w-64 object-contain mb-6 drop-shadow-md"
        />

        <p className="tracking-[0.18em] uppercase mb-10 text-center leading-relaxed"
          style={{ fontSize:"clamp(0.65rem,2.8vw,0.875rem)", color:"rgba(59,49,71,0.6)" }}>
          Two Hearts. One Faith. One Beautiful Beginning.
        </p>

        {/* Bar */}
        <div className="w-40 relative overflow-hidden"
          style={{ height:1, background:"rgba(194,176,153,0.22)" }}>
          <motion.div className="absolute top-0 left-0 h-full"
            style={{ background:"#C2B099" }}
            initial={{ width:"0%" }}
            animate={{ width:"100%" }}
            transition={{ duration:3, ease:"easeInOut" }}/>
        </div>
      </motion.div>
    </motion.div>
  );
}
