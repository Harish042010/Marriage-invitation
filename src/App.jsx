import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import ChurchDoor from "./components/ChurchDoor";
import MusicControl from "./components/MusicControl";
import NameReveal from "./components/NameReveal";
import InvitationCard from "./components/InvitationCard";
import BibleVerse from "./components/BibleVerse";
import JourneySection from "./components/JourneySection";
import CoupleSection from "./components/CoupleSection";
import WeddingDetails from "./components/WeddingDetails";
import Countdown from "./components/Countdown";
import VenueSection from "./components/VenueSection";
import FinalBlessing from "./components/FinalBlessing";
import GoldDust from "./components/GoldDust";

function App() {
  const [phase, setPhase] = useState("loading"); // 'loading', 'doors', 'main'
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicRef = useRef(null);

  const handleLoadingComplete = () => {
    setPhase("doors");
  };

  useEffect(() => {
    if (phase === "doors") {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [phase]);

  const handleDoorsOpen = () => {
    setMusicPlaying(true);
    // Start music synchronously inside the click gesture so autoplay is allowed
    musicRef.current?.play();
    // After doors animation completes, switch to main scene
    setTimeout(() => {
      setPhase("main");
    }, 5500);
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-primary-bg)] text-[var(--color-ink)] overflow-x-hidden">

      <ScrollProgress />

      <MusicControl ref={musicRef} isPlaying={musicPlaying} setIsPlaying={setMusicPlaying} />

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {phase === "doors" && (
        <ChurchDoor onEnter={handleDoorsOpen} />
      )}

      {/* Main scrolling experience */}
      {phase === "main" && (
        <main className="relative z-10 w-full">

          {/* Lightweight ivory & gold ambient background */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <GoldDust />
          </div>

          <div className="relative z-10">
            <NameReveal />
            <InvitationCard />
            <BibleVerse />
            <JourneySection />
            <CoupleSection />
            <WeddingDetails />
            <Countdown />
            <VenueSection />
            <FinalBlessing />
          </div>

        </main>
      )}
    </div>
  );
}

export default App;
