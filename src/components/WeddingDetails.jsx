import { motion } from "framer-motion";
import { Cross, Heart, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";
import TiltCard from "./TiltCard";

export default function WeddingDetails() {
  const events = [
    { title:"Holy Matrimony Service", subtitle:"The Church Ceremony & Exchange of Vows",
      date:weddingData.wedding.dateDisplay, time:weddingData.wedding.time,
      venue:weddingData.wedding.church + ", " + weddingData.wedding.location, icon: Cross },
    { title:"Wedding Reception", subtitle:"Heartfelt Celebrations",
      date:weddingData.wedding.dateDisplay, time:"Follows the wedding ceremony",
      venue:"Infant Jesus Community Hall, " + weddingData.wedding.location, icon: Heart },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden"
      style={{ background:"linear-gradient(180deg,#E0DCE6 0%,#F5E4E0 50%,#E0DCE6 100%)" }}>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none blur-3xl"
        style={{ width:"min(600px,90vw)", height:"min(600px,90vw)",
          background:"radial-gradient(circle,rgba(194,176,153,0.07) 0%,transparent 70%)" }}/>

      <div className="mx-auto text-center mb-14 relative z-10 px-2"
        style={{ maxWidth:"min(840px,96vw)" }}>
        <p className="tracking-[0.3em] uppercase font-semibold mb-2"
          style={{ fontSize:"clamp(0.6rem,2.2vw,0.75rem)", color:"#C2B099" }}>
          Order of Events
        </p>
        <h2 className="font-serif mb-3"
          style={{ fontSize:"clamp(1.8rem,6vw,3.5rem)", color:"var(--color-ink)" }}>
          The Blessed Celebration
        </h2>
        <div className="h-px w-20 mx-auto opacity-70"
          style={{ background:"linear-gradient(to right,transparent,#C2B099,transparent)" }}/>
      </div>

      <div className="relative z-10 mx-auto" style={{ maxWidth:"min(900px,96vw)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          {events.map((event, idx) => {
            const EventIcon = event.icon;

            return (
              <TiltCard key={idx}
                delay={idx*0.15}
                className="gold-card rounded-2xl relative"
                style={{ padding:"clamp(0.5rem,4vw,2.5rem)", overflow:"hidden" }}>
                <div className="flex flex-col justify-between h-full w-full relative">

                <div className="flex flex-col items-center text-center">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                    style={{ border:"1px solid rgba(194,176,153,0.6)", background:"linear-gradient(135deg, rgba(255,255,255,0.9), rgba(242,233,227,0.82))",
                      boxShadow:"0 10px 22px rgba(194,176,153,0.18), inset 0 1px 0 rgba(255,255,255,0.8)" }}>
                    <EventIcon size={19} strokeWidth={1.8} color="#A8864A" />
                  </div>
                <p className="uppercase tracking-[0.22em] font-medium mb-1"
                  style={{ fontSize:"clamp(0.55rem,1.8vw,0.7rem)", color:"rgba(194,176,153,0.8)" }}>
                  Event 0{idx+1}
                </p>
                <h3 className="font-serif mb-1"
                  style={{ fontSize:"clamp(1.1rem,3.5vw,1.7rem)", color:"var(--color-ink)", textWrap:"balance" }}>
                  {event.title}
                </h3>
                <p className="font-serif italic mb-5"
                  style={{ fontSize:"clamp(0.75rem,2vw,0.9rem)", color:"rgba(59,49,71,0.55)", textWrap:"balance" }}>
                  {event.subtitle}
                </p>
              </div>
              <div className="space-y-4 pt-4 flex flex-col items-center text-center"
                style={{ borderTop:"1px solid rgba(194,176,153,0.18)" }}>
                {[
                  { label:"Date & Time", val:`${event.date} · ${event.time}` },
                  { label:"Location",    val:event.venue },
                ].map((row,i)=>(
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <Sparkles size={12} strokeWidth={1.8} color="#A8864A" />
                    <div>
                      <p className="uppercase tracking-wider font-semibold mb-0.5"
                        style={{ fontSize:"clamp(0.52rem,1.5vw,0.65rem)", color:"rgba(194,176,153,0.8)" }}>
                        {row.label}
                      </p>
                      <p className="font-serif" style={{ fontSize:"clamp(0.8rem,2.5vw,1rem)", color:"#3B3147", textWrap:"balance" }}>
                        {row.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
