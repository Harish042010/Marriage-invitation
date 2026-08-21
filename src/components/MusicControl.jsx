import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import { Music, VolumeX } from "lucide-react";

const MusicControl = forwardRef(function MusicControl({ isPlaying, setIsPlaying }, ref) {
  const audioRef = useRef(null);
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
      audio.play().catch((e) => console.warn("Audio play failed:", e));
      audio.volume = 0;
      const target = 0.55;
      const step = 0.03;
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
      className="music-btn fixed z-50 p-3 rounded-full bg-[#241014]/80 border border-[#d4af37]/60 text-[#f3e5ab] hover:text-[#fff9f0] hover:border-[#d4af37] backdrop-blur-md transition-all duration-300 shadow-lg"
      style={{ minWidth: 44, minHeight: 44 }}
      aria-label="Toggle Music"
    >
      {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
    </button>
  );
});

export default MusicControl;
