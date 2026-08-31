import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import { Music, VolumeX } from "lucide-react";

const MusicControl = forwardRef(function MusicControl({ isPlaying, setIsPlaying }, ref) {
  const audioRef    = useRef(null);
  const fadeTimerRef = useRef(null);

  useEffect(() => {
    const audio = new Audio("/music/wedding-background.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play() {
      const audio = audioRef.current;
      if (!audio) return;
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      audio.play().catch(e => console.warn("Audio play failed:", e));
      audio.volume = 0;
      const target = 0.55, step = 0.03;
      fadeTimerRef.current = setInterval(() => {
        if (!audio) return;
        audio.volume = Math.min(target, audio.volume + step);
        if (audio.volume >= target) clearInterval(fadeTimerRef.current);
      }, 90);
    },
    pause() {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      audioRef.current?.pause();
    },
  }), []);

  useEffect(() => {
    if (!isPlaying) audioRef.current?.pause();
  }, [isPlaying]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className="music-btn fixed z-50 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-md"
      style={{
        background:"rgba(254,248,246,0.85)",
        border:"1px solid rgba(194,176,153,0.55)",
        color:"var(--color-ink)",
        minWidth:44, minHeight:44,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#FAF8F5";
        e.currentTarget.style.borderColor = "#C2B099";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,49,71,0.12)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(254,248,246,0.85)";
        e.currentTarget.style.borderColor = "rgba(194,176,153,0.55)";
        e.currentTarget.style.boxShadow = "";
      }}
      aria-label="Toggle Music"
    >
      {isPlaying ? <Music size={20}/> : <VolumeX size={20}/>}
    </button>
  );
});

export default MusicControl;
