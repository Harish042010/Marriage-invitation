import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ScratchReveal({ children, hint = "Scratch To Reveal The Date" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;

    const ctx = canvas.getContext("2d");

    const fillGoldFoil = (c, w, h) => {
      const gradient = c.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#8A6B2F");
      gradient.addColorStop(0.25, "#D4AF37");
      gradient.addColorStop(0.5, "#F3E5AB");
      gradient.addColorStop(0.75, "#C9A53D");
      gradient.addColorStop(1, "#7A5C1E");

      c.fillStyle = gradient;
      c.fillRect(0, 0, w, h);

      for (let i = 0; i < 2600; i++) {
        c.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
        c.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
      }

      for (let i = 0; i < 700; i++) {
        c.fillStyle = `rgba(40,25,5,${Math.random() * 0.12})`;
        c.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
      }

      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = "rgba(40,28,8,0.55)";
      c.font = `600 ${Math.max(12, w * 0.032)}px Montserrat, sans-serif`;
      c.fillText(hint.toUpperCase(), w / 2 + 1.5, h / 2 + 1.5);
      c.fillStyle = "rgba(255,250,235,0.92)";
      c.fillText(hint.toUpperCase(), w / 2, h / 2);

      c.fillStyle = "rgba(255,250,235,0.85)";
      c.font = `${Math.max(16, w * 0.045)}px "Great Vibes", cursive`;
      c.fillText("✦", w / 2, h / 2 - Math.max(28, h * 0.12));

      c.strokeStyle = "rgba(255,250,235,0.4)";
      c.lineWidth = 0.75;
      const midY = h / 2;
      c.beginPath();
      c.moveTo(w / 2 - Math.max(90, w * 0.22), midY);
      c.lineTo(w / 2 - Math.max(40, w * 0.1), midY);
      c.stroke();
      c.beginPath();
      c.moveTo(w / 2 + Math.max(40, w * 0.1), midY);
      c.lineTo(w / 2 + Math.max(90, w * 0.22), midY);
      c.stroke();
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      fillGoldFoil(ctx, canvas.width, canvas.height);
    };

    requestAnimationFrame(resizeCanvas);

    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(container);

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const checkRevealStatus = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      if ((transparent / (pixels.length / 4)) * 100 > 35) {
        setIsRevealed(true);
      }
    };

    const scratch = (e) => {
      if (!isDrawing.current || isRevealed) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 38, 0, Math.PI * 2);
      ctx.fill();
      checkRevealStatus();
    };

    const startDraw = (e) => {
      isDrawing.current = true;
      scratch(e);
    };
    const stopDraw = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", scratch, { passive: false });
    canvas.addEventListener("touchend", stopDraw);

    return () => {
      ro.disconnect();
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", scratch);
      canvas.removeEventListener("touchend", stopDraw);
    };
  }, [isRevealed, hint]);

  const sparkles = useMemo(() => {
    if (!isRevealed) return [];
    return Array.from({ length: 28 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 0.9,
      size: 3 + Math.random() * 7,
    }));
  }, [isRevealed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[460px] mx-auto aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-champagne-gold)]/40 shadow-[0_12px_40px_rgba(17,30,42,0.1),0_0_30px_rgba(212,175,55,0.12)]"
      style={{ cursor: "crosshair", touchAction: "none" }}
    >
      {/* Content underneath */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none select-none"
        style={{ background: "radial-gradient(circle at 50% 0%, #3B1A21 0%, #1C0B0F 100%)" }}
      >
        {children}
      </div>

      {/* Canvas overlay */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full"
        style={{ touchAction: "none" }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Gold sparkle burst on reveal */}
      {isRevealed && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {sparkles.map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                background: "radial-gradient(circle, #FFF6D8 0%, #D4AF37 60%, transparent 100%)",
                boxShadow: "0 0 8px rgba(212,175,55,0.9)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
              transition={{ delay: s.delay, duration: 1.6, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
