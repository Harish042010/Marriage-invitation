import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

function TimeCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className="relative group"
    >
      <div
        className="relative rounded-lg p-[1px] overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg,rgba(212,175,55,0.35) 0%,rgba(168,127,46,0.15) 40%,rgba(212,175,55,0.25) 100%)",
        }}
      >
        <div
          className="rounded-lg flex flex-col items-center"
          style={{
            padding: "clamp(0.9rem,3vw,2.5rem) clamp(0.75rem,2.5vw,2.5rem)",
            background:
              "linear-gradient(170deg,rgba(51,21,27,0.95) 0%,rgba(36,16,20,0.98) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(212,175,55,0.08),inset 0 -1px 0 rgba(0,0,0,0.3),0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Corner ornaments */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[var(--color-champagne-gold)]/20 rounded-tl-sm" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[var(--color-champagne-gold)]/20 rounded-tr-sm" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[var(--color-champagne-gold)]/20 rounded-bl-sm" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[var(--color-champagne-gold)]/20 rounded-br-sm" />

          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center,rgba(212,175,55,0.06) 0%,transparent 70%)" }}
          />

          <motion.span
            key={value}
            initial={{ y: -6, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-serif gold-gradient-text tabular-nums leading-none"
            style={{
              fontSize: "clamp(2rem,8vw,3.75rem)",
              textShadow: "0 2px 12px rgba(212,175,55,0.25)",
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>

          <div className="w-6 h-px bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)]/40 to-transparent mt-3 mb-2" />

          <p
            className="tracking-[0.25em] uppercase text-[var(--color-champagne-gold)]/70 font-semibold"
            style={{ fontSize: "clamp(0.5rem,1.8vw,0.65rem)" }}
          >
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const timeString = weddingData.wedding.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let targetTime = "10:30:00";
    if (timeString) {
      let hours = parseInt(timeString[1], 10);
      const mins = timeString[2];
      const meridiem = timeString[3].toUpperCase();
      if (meridiem === "PM" && hours < 12) hours += 12;
      if (meridiem === "AM" && hours === 12) hours = 0;
      targetTime = `${hours.toString().padStart(2, "0")}:${mins}:00`;
    }
    const target = new Date(`${weddingData.wedding.date}T${targetTime}`).getTime();

    const tick = () => {
      const distance = target - Date.now();
      if (distance < 0) { setIsToday(true); return; }
      setTimeLeft({
        days:    Math.floor(distance / 86400000),
        hours:   Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(161,38,51,0.22)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.3 }}
        className="relative z-10 text-center w-full"
        style={{ maxWidth: "min(960px,96vw)" }}
      >
        <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-2 font-semibold"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}>
          Anticipating The Holy Union
        </p>

        <h2 className="font-serif gold-gradient-text text-letterpress mb-5"
          style={{ fontSize: "clamp(1.6rem,5.5vw,3.5rem)" }}>
          Counting Down to Forever
        </h2>

        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto mb-10 opacity-70" />

        {!isToday ? (
          <>
            {/* 2-col on xs, 4-col from sm */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mx-auto"
              style={{ maxWidth: "min(680px,96vw)" }}>
              <TimeCard value={timeLeft.days}    label="Days"    delay={0}    />
              <TimeCard value={timeLeft.hours}   label="Hours"   delay={0.08} />
              <TimeCard value={timeLeft.minutes} label="Minutes" delay={0.16} />
              <TimeCard value={timeLeft.seconds} label="Seconds" delay={0.24} />
            </div>

            <p className="mt-10 font-serif italic text-[var(--color-warm-cream)]/85 mx-auto"
              style={{ fontSize: "clamp(0.8rem,2.5vw,0.95rem)", maxWidth: "min(400px,90vw)" }}>
              Every moment brings us closer to{" "}
              <span className="text-[var(--color-bright-gold)]">{weddingData.wedding.dateDisplay}</span>
              {" "}— and the promise of forever.
            </p>
          </>
        ) : (
          <div className="gold-card rounded-sm mx-auto"
            style={{ padding: "clamp(2rem,6vw,3rem)", maxWidth: "min(520px,94vw)" }}>
            <h2 className="font-serif gold-gradient-text mb-4 animate-pulse"
              style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}>
              Today, Two Become One!
            </h2>
            <p className="font-serif italic text-[var(--color-warm-cream)]"
              style={{ fontSize: "clamp(0.9rem,3vw,1.1rem)" }}>
              Welcome to the celebration of our Holy Matrimony.
            </p>
          </div>
        )}

        <p className="mt-12 font-serif italic tracking-wide text-[var(--color-warm-cream)]/80"
          style={{ fontSize: "clamp(0.75rem,2.2vw,0.9rem)" }}>
          &ldquo;Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
