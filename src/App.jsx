import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import LoadingScreen    from "./components/LoadingScreen";
import ScrollProgress   from "./components/ScrollProgress";
import ChurchDoor       from "./components/ChurchDoor";
import MusicControl     from "./components/MusicControl";
import GoldDust         from "./components/GoldDust";
import FloralDivider    from "./components/FloralDivider";

import NameReveal       from "./components/NameReveal";
import InvitationCard   from "./components/InvitationCard";
import BibleVerse       from "./components/BibleVerse";
import ParentsBlessing  from "./components/ParentsBlessing";


import WeddingDetails   from "./components/WeddingDetails";
import Countdown        from "./components/Countdown";
import VenueSection     from "./components/VenueSection";
import FinalBlessing    from "./components/FinalBlessing";

function App() {
  const [phase, setPhase] = useState("loading"); // 'loading' | 'doors' | 'main'
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicRef = useRef(null);

  const handleLoadingComplete = () => setPhase("doors");

  useEffect(() => {
    if (phase === "doors") {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [phase]);

  const handleDoorsOpen = () => {
    setMusicPlaying(true);
    musicRef.current?.play();
    setTimeout(() => setPhase("main"), 5500);
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

      {phase === "doors" && <ChurchDoor onEnter={handleDoorsOpen} />}

      {phase === "main" && (
        <main className="relative z-10 w-full">
          {/* Ambient gold dust canvas */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <GoldDust />
          </div>

          <div className="relative z-10">
            <NameReveal />
            <FloralDivider />

            <InvitationCard />
            <FloralDivider />

            <BibleVerse />
            <FloralDivider />

            <ParentsBlessing />
            <FloralDivider />



            <WeddingDetails />
            <FloralDivider />

            <Countdown />
            <FloralDivider />

            <VenueSection />
            <FloralDivider />

            <FinalBlessing />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
