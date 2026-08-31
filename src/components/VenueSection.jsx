import { motion } from "framer-motion";
import { weddingData } from "../data/weddingData";
import churchPhoto from "../assets/maxresdefault.jpg";

export default function VenueSection() {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    weddingData.wedding.church + " " + weddingData.wedding.location
  )}`;

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-stretch relative overflow-hidden"
      style={{ background:"#E0DCE6" }}>

      {/* Photo */}
      <div className="w-full md:w-1/2 relative overflow-hidden group"
        style={{ minHeight:"clamp(260px,52vw,55vh)" }}>
        <motion.div
          initial={{ scale:1.12 }} whileInView={{ scale:1 }}
          transition={{ duration:2, ease:"easeOut" }} viewport={{ once:true }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage:`url(${churchPhoto})`, opacity:0.75 }}/>
        <div className="absolute inset-0"
          style={{ background:"linear-gradient(to top,rgba(59,49,71,0.55) 0%,transparent 55%)" }}/>
        <div className="absolute inset-0 md:hidden"
          style={{ background:"linear-gradient(to bottom,transparent 40%,#E0DCE6 100%)" }}/>
        <div className="absolute inset-0 hidden md:block"
          style={{ background:"linear-gradient(to right,transparent 55%,#E0DCE6 100%)" }}/>
        <div className="absolute top-5 left-5 p-2.5 rounded-full"
          style={{ border:"1px solid rgba(194,176,153,0.5)", background:"rgba(254,248,246,0.85)",
            backdropFilter:"blur(6px)", color:"var(--color-ink)", fontSize:"1.1rem",
            boxShadow:"0 2px 10px rgba(59,49,71,0.1)" }}>✝</div>
      </div>

      {/* Info */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative z-10"
        style={{ padding:"clamp(0.75rem,6vw,5rem) clamp(0.5rem,4vw,3rem)" }}>
        <motion.div
          initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true, margin:"-80px" }} transition={{ duration:1.3 }}
          className="w-full gold-card rounded-2xl"
          style={{ maxWidth:"min(520px,96vw)", padding:"clamp(0.75rem,5vw,3rem)" }}>
          <p className="tracking-[0.3em] uppercase font-semibold mb-2"
            style={{ fontSize:"clamp(0.6rem,2.2vw,0.75rem)", color:"#C2B099" }}>
            Holy Sanctuary
          </p>
          <h2 className="font-serif gold-gradient-text mb-5 leading-tight"
            style={{ fontSize:"clamp(1.5rem,5vw,3rem)" }}>
            {weddingData.wedding.church}
          </h2>
          <div className="h-px w-16 mb-7 opacity-60"
            style={{ background:"linear-gradient(to right,#C2B099,transparent)" }}/>

          <div className="mb-8 space-y-5">
            {[
              { label:"City & State", val:weddingData.wedding.location },
              { label:"Schedule",     val:`${weddingData.wedding.dateDisplay} · ${weddingData.wedding.time}`, italic:true },
            ].map((row,i)=>(
              <motion.div key={i}
                initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.8, delay: 0.4 + i*0.1 }}>
                <p className="uppercase tracking-wider font-semibold mb-1"
                  style={{ fontSize:"clamp(0.55rem,1.8vw,0.7rem)", color:"rgba(194,176,153,0.85)" }}>
                  {row.label}
                </p>
                <p className={`font-serif${row.italic?" italic":""}`}
                  style={{ fontSize:"clamp(0.95rem,3vw,1.2rem)", color: row.italic?"#a3917a":"var(--color-ink)" }}>
                  {row.val}
                </p>
              </motion.div>
            ))}
          </div>

          <a href={mapsUrl} target="_blank" rel="noreferrer"
            className="w-full inline-flex items-center justify-center tracking-[0.22em] uppercase font-semibold rounded-xl transition-all duration-300"
            style={{
              padding:"clamp(0.75rem,2.5vw,1rem) clamp(1rem,4vw,2rem)",
              fontSize:"clamp(0.6rem,1.8vw,0.75rem)",
              border:"1px solid #C2B099", color:"#a3917a",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.background="#C2B099"; e.currentTarget.style.color="#E0DCE6"; }}
            onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#a3917a"; }}>
            📍 View on Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
