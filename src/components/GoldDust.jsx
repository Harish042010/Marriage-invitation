import { motion } from "framer-motion";
import { useMemo } from "react";

const ShootingStar = ({ delay, top, left, duration = 2.4 }) => (
  <motion.div
    className="absolute w-36 h-[1.5px] rounded-full pointer-events-none"
    style={{ top, left,
      background:"linear-gradient(to right,transparent,rgba(194,176,153,0.7),transparent)" }}
    initial={{ x:0, y:0, rotate:-32, opacity:0 }}
    animate={{ x:-360, y:300, opacity:[0,0.7,0.7,0] }}
    transition={{ duration, delay, repeat:Infinity, repeatDelay:14, ease:"easeInOut" }}
  />
);

export default function GoldDust() {
  const specks = useMemo(() =>
    Array.from({length:36}).map((_,i) => ({
      id:i, x:Math.random()*100, y:Math.random()*100,
      size:Math.random()*2+0.8,
      delay:Math.random()*4.5, duration:3.5+Math.random()*4,
    })), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Subtle ambient washes */}
      <div className="absolute inset-0"
        style={{ background:"radial-gradient(ellipse at 50% 8%,rgba(194,176,153,0.07) 0%,transparent 55%)" }}/>
      <div className="absolute inset-0"
        style={{ background:"radial-gradient(ellipse at 50% 98%,rgba(168,93,106,0.06) 0%,transparent 55%)" }}/>

      {specks.map(s => (
        <div key={s.id} className="gold-dust absolute rounded-full"
          style={{ left:`${s.x}%`, top:`${s.y}%`,
            width:s.size, height:s.size,
            background:"#C2B099",
            animationDelay:`${s.delay}s`, animationDuration:`${s.duration}s`,
            boxShadow:"0 0 4px rgba(194,176,153,0.5)" }}/>
      ))}

      <ShootingStar delay={6}  top="15%" left="80%"/>
      <ShootingStar delay={16} top="45%" left="88%" duration={2.8}/>
    </div>
  );
}
