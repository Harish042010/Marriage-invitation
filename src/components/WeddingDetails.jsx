import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

export default function WeddingDetails() {
  const events = [
    {
      title: "Holy Matrimony Service",
      subtitle: "The Church Ceremony & Exchange of Vows",
      date: weddingData.wedding.dateDisplay || weddingData.wedding.date,
      time: weddingData.wedding.time,
      venue: weddingData.wedding.church,
      icon: "✝",
    },
    {
      title: "Wedding Reception & Banquet",
      subtitle: "Dinner, Music & Heartfelt Celebrations",
      date: weddingData.wedding.dateDisplay || weddingData.wedding.date,
      time: "1:00 PM onwards",
      venue: "Grand Parish Reception Hall, " + weddingData.wedding.location,
      icon: "🥂",
    },
  ];

  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none blur-3xl"
        style={{
          width: "min(600px,90vw)", height: "min(600px,90vw)",
          background: "radial-gradient(circle,rgba(212,175,55,0.06) 0%,transparent 70%)",
        }} />

      <div className="mx-auto text-center mb-16 relative z-10 px-2"
        style={{ maxWidth: "min(840px,96vw)" }}>
        <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-2 font-semibold"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}>
          Order of Events
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}>
          The Blessed Celebration
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto opacity-70" />
      </div>

      <div className="relative z-10 mx-auto" style={{ maxWidth: "min(840px,96vw)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, delay: index * 0.15 }}
              className="gold-card rounded-2xl relative flex flex-col justify-between"
              style={{ padding: "clamp(1.25rem,4vw,2.5rem)" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent" />

              <div>
                <div className="w-12 h-12 rounded-full border border-[var(--color-champagne-gold)]/50 bg-[#1A140F] flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                  style={{ fontSize: "clamp(1rem,3.5vw,1.4rem)" }}>
                  <span className="text-[var(--color-bright-gold)]">{event.icon}</span>
                </div>
                <p className="uppercase tracking-[0.22em] text-[var(--color-champagne-gold)] font-medium mb-1"
                  style={{ fontSize: "clamp(0.55rem,1.8vw,0.7rem)" }}>
                  Event 0{index + 1}
                </p>
                <h3 className="font-serif text-[var(--color-soft-ivory)] mb-1"
                  style={{ fontSize: "clamp(1.1rem,3.5vw,1.7rem)" }}>
                  {event.title}
                </h3>
                <p className="font-serif italic text-[var(--color-warm-cream)]/70 mb-5"
                  style={{ fontSize: "clamp(0.75rem,2vw,0.9rem)" }}>
                  {event.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-5 border-t border-[var(--color-champagne-gold)]/15">
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-champagne-gold)] mt-0.5" style={{ fontSize: "0.75rem" }}>✦</span>
                  <div>
                    <p className="uppercase tracking-wider text-[var(--color-champagne-gold)] font-semibold mb-0.5"
                      style={{ fontSize: "clamp(0.55rem,1.6vw,0.7rem)" }}>
                      Date &amp; Time
                    </p>
                    <p className="font-serif text-[var(--color-warm-cream)]"
                      style={{ fontSize: "clamp(0.8rem,2.5vw,1rem)" }}>
                      {event.date} at {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-champagne-gold)] mt-0.5" style={{ fontSize: "0.75rem" }}>✦</span>
                  <div>
                    <p className="uppercase tracking-wider text-[var(--color-champagne-gold)] font-semibold mb-0.5"
                      style={{ fontSize: "clamp(0.55rem,1.6vw,0.7rem)" }}>
                      Location
                    </p>
                    <p className="font-serif text-[var(--color-warm-cream)]"
                      style={{ fontSize: "clamp(0.8rem,2.5vw,1rem)" }}>
                      {event.venue}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
