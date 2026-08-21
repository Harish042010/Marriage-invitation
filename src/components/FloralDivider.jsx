import { motion } from "framer-motion";

/**
 * A decorative animated gold floral divider used between sections.
 * Usage: <FloralDivider />
 */
export default function FloralDivider({ label = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ padding: "clamp(1.5rem,4vh,3rem) 0" }}
    >
      <svg
        viewBox="0 0 600 48"
        fill="none"
        className="w-full"
        style={{ maxWidth: "min(680px,90vw)", height: "auto" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fdg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(212,175,55,0)" />
            <stop offset="25%"  stopColor="rgba(212,175,55,0.5)" />
            <stop offset="50%"  stopColor="rgba(212,175,55,0.8)" />
            <stop offset="75%"  stopColor="rgba(212,175,55,0.5)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
        </defs>

        {/* Main horizontal rule */}
        <line x1="0" y1="24" x2="600" y2="24" stroke="url(#fdg)" strokeWidth="0.7" />

        {/* Left branch */}
        <path d="M220 24 C200 24 185 14 175 10" stroke="rgba(212,175,55,0.45)" strokeWidth="0.7" fill="none" />
        <path d="M210 24 C195 24 182 30 172 34" stroke="rgba(212,175,55,0.35)" strokeWidth="0.6" fill="none" />
        <circle cx="170" cy="9"  r="2.5" fill="rgba(212,175,55,0.5)" />
        <circle cx="168" cy="35" r="2"   fill="rgba(212,175,55,0.4)" />
        <circle cx="148" cy="17" r="1.5" fill="rgba(212,175,55,0.3)" />

        {/* Right branch (mirrored) */}
        <path d="M380 24 C400 24 415 14 425 10" stroke="rgba(212,175,55,0.45)" strokeWidth="0.7" fill="none" />
        <path d="M390 24 C405 24 418 30 428 34" stroke="rgba(212,175,55,0.35)" strokeWidth="0.6" fill="none" />
        <circle cx="430" cy="9"  r="2.5" fill="rgba(212,175,55,0.5)" />
        <circle cx="432" cy="35" r="2"   fill="rgba(212,175,55,0.4)" />
        <circle cx="452" cy="17" r="1.5" fill="rgba(212,175,55,0.3)" />

        {/* Centre rose bloom */}
        {/* Petals */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = deg * Math.PI / 180;
          const cx = 300 + Math.cos(r) * 9;
          const cy = 24  + Math.sin(r) * 9;
          return (
            <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3"
              transform={`rotate(${deg},${cx},${cy})`}
              fill="rgba(212,175,55,0.22)" stroke="rgba(212,175,55,0.45)" strokeWidth="0.5" />
          );
        })}
        <circle cx="300" cy="24" r="4.5" fill="rgba(212,175,55,0.35)" stroke="rgba(212,175,55,0.6)" strokeWidth="0.7" />
        <circle cx="300" cy="24" r="2"   fill="rgba(255,240,180,0.6)" />

        {/* Small diamonds on either side of bloom */}
        <path d="M272 24 L278 20 L284 24 L278 28 Z" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.6" />
        <path d="M316 24 L322 20 L328 24 L322 28 Z" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.6" />
      </svg>

      {label && (
        <div className="absolute" style={{
          color: "rgba(212,175,55,0.55)",
          fontSize: "clamp(0.55rem,1.8vw,0.7rem)",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          fontFamily: "'Montserrat', sans-serif",
          background: "var(--color-primary-bg)",
          padding: "0 12px",
        }}>
          {label}
        </div>
      )}
    </motion.div>
  );
}
