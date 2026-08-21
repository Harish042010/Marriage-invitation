import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";

function PersonCard({ role, name, quote, imgUrl, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.3, ease: "easeOut", delay }}
      className="flex flex-col items-center text-center gold-card rounded-3xl"
      style={{ padding: "clamp(1.5rem,4vw,3rem)" }}
    >
      {/* Portrait */}
      <div className="relative mb-6 p-2.5 border-2 border-[var(--color-champagne-gold)]/40 rounded-t-full shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        style={{
          width: "clamp(180px,42vw,288px)",
          height: "clamp(240px,56vw,384px)",
        }}>
        <div className="w-full h-full overflow-hidden rounded-t-full bg-[#1A120E] relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-85"
            style={{ backgroundImage: `url('${imgUrl}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        <div className="absolute -bottom-2 -left-2 text-[var(--color-champagne-gold)] text-base">&#10022;</div>
        <div className="absolute -bottom-2 -right-2 text-[var(--color-champagne-gold)] text-base">&#10022;</div>
      </div>

      <p className="tracking-[0.28em] uppercase text-[var(--color-champagne-gold)] mb-2 font-semibold"
        style={{ fontSize: "clamp(0.6rem,1.8vw,0.75rem)" }}>
        {role}
      </p>
      <h3 className="font-serif text-[var(--color-soft-ivory)] mb-3"
        style={{ fontSize: "clamp(1.8rem,6vw,3rem)" }}>
        {name}
      </h3>
      <div className="h-px w-14 bg-[var(--color-champagne-gold)]/40 mb-4" />
      <p className="text-[var(--color-warm-cream)]/80 font-serif italic leading-relaxed"
        style={{ fontSize: "clamp(0.85rem,2.5vw,1.1rem)", maxWidth: "18rem" }}>
        {quote}
      </p>
    </motion.div>
  );
}

export default function CoupleSection() {
  return (
    <section className="py-24 px-4 bg-[var(--color-primary-bg)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[var(--color-champagne-gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[var(--color-champagne-gold)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-14 px-2">
        <p className="tracking-[0.3em] uppercase text-[var(--color-champagne-gold)] mb-2 font-semibold"
          style={{ fontSize: "clamp(0.6rem,2.2vw,0.75rem)" }}>
          Chosen by Grace
        </p>
        <h2 className="font-serif gold-gradient-text mb-3"
          style={{ fontSize: "clamp(1.8rem,6vw,3.5rem)" }}>
          The Groom &amp; Bride
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--color-champagne-gold)] to-transparent mx-auto opacity-70" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Ampersand — desktop only */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-20">
          <div className="w-14 h-14 rounded-full border border-[var(--color-champagne-gold)]/60 bg-[#151210] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <span className="font-script text-[var(--color-bright-gold)]" style={{ fontSize: "1.8rem" }}>&amp;</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <PersonCard
            role="The Groom"
            name={weddingData.groom.name}
            quote="A steadfast heart rooted in God\u2019s love, standing strong to lead and cherish."
            imgUrl="https://images.unsplash.com/photo-1606216494793-27ab377a0641?auto=format&fit=crop&q=80"
            delay={0}
          />
          <PersonCard
            role="The Bride"
            name={weddingData.bride.name}
            quote="A woman of grace, faith, and radiant warmth ready to embark on this blessed covenant."
            imgUrl="https://images.unsplash.com/photo-1594269986326-89d5f7d24269?auto=format&fit=crop&q=80"
            delay={0.18}
          />
        </div>

        {/* Ampersand — mobile only between cards */}
        <div className="flex md:hidden justify-center -my-2 z-20 relative">
          <div className="w-12 h-12 rounded-full border border-[var(--color-champagne-gold)]/60 bg-[#151210] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            <span className="font-script text-[var(--color-bright-gold)]" style={{ fontSize: "1.5rem" }}>&amp;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
