import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className, style, delay = 0, initial, whileInView, viewport, transition }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for realistic physics
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Moderate tilt angles for elegance
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  // Glare movement
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={initial || { opacity: 0, y: 50 }}
      whileInView={whileInView || { opacity: 1, y: 0 }}
      viewport={viewport || { once: true, margin: "-60px" }}
      transition={transition || { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
      className={`relative ${className || ""}`}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* The content container that receives the glare and rounded corners */}
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none z-20">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 65%)",
            mixBlendMode: "overlay",
            x: glareX,
            y: glareY,
            scale: 1.5,
          }}
        />
      </div>
      
      {/* 3D Pop container */}
      <div style={{ transform: "translateZ(25px)", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
