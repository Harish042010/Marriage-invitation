import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";
import churchPhoto from "../assets/maxresdefault.jpg";

export default function VenueSection() {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    weddingData.wedding.church + " " + weddingData.wedding.location
  )}`;

  return (
    <section className="min-h-screen bg-[var(--color-primary-bg)] flex flex-col md:flex-row items-stretch relative overflow-hidden">

      {/* Photo — full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 relative overflow-hidden group"
        style={{ minHeight: "clamp(260px,52vw,55vh)" }}>
        <motion.div
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${churchPhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]" />
        <div className="absolute top-5 left-5 p-2.5 rounded-full border border-[var(--color-champagne-gold)]/40 bg-black/50 backdrop-blur-md text-[var(--color-champagne-gold)] text-lg">
          ✝
        </div>
      </div>

      {/* Info card */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative z-10"
        style={{ padding: "clamp(2rem,6vw,5rem) clamp(1rem,4vw,3rem)" }}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.3 }}
          className="w-full gold-card rounded-2xl"
          style={{
            maxWidth: "min(520px,96vw)",
            padding: "clamp(1.5rem,5vw,3rem)",
          }}
        >
          <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-2 font-semibold"
            style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}>
            Holy Sanctuary
          </p>
          <h2 className="font-serif gold-gradient-text mb-5 leading-tight"
            style={{ fontSize: "clamp(1.5rem,5vw,3rem)" }}>
            {weddingData.wedding.church}
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-[var(--color-champagne-gold)] to-transparent opacity-60 mb-7" />

          <div className="text-[var(--color-warm-cream)] mb-8 space-y-5">
            <div>
              <p className="uppercase tracking-wider text-[var(--color-champagne-gold)] font-semibold mb-1"
                style={{ fontSize: "clamp(0.55rem,1.8vw,0.7rem)" }}>
                City &amp; State
              </p>
              <p className="font-serif text-[var(--color-soft-ivory)]"
                style={{ fontSize: "clamp(1rem,3vw,1.25rem)" }}>
                {weddingData.wedding.location}
              </p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-[var(--color-champagne-gold)] font-semibold mb-1"
                style={{ fontSize: "clamp(0.55rem,1.8vw,0.7rem)" }}>
                Schedule
              </p>
              <p className="font-serif italic text-[var(--color-bright-gold)] opacity-90"
                style={{ fontSize: "clamp(0.9rem,2.8vw,1.15rem)" }}>
                {weddingData.wedding.dateDisplay || weddingData.wedding.date}
                {" "}&bull;{" "}
                {weddingData.wedding.time}
              </p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center border border-[var(--color-champagne-gold)] text-[var(--color-champagne-gold)] tracking-[0.22em] uppercase font-semibold rounded-xl transition-all duration-300 hover:bg-[var(--color-champagne-gold)] hover:text-black"
            style={{
              padding: "clamp(0.75rem,2.5vw,1rem) clamp(1rem,4vw,2rem)",
              fontSize: "clamp(0.6rem,1.8vw,0.75rem)",
            }}
          >
            📍 View on Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
