"use client";
import "../style.css";
import CDeck from "../components/CDeck";
import TypeCards from "../models/TypeCards";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import "../gamer.css";
export default function Cards_view() {
  const audioRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    const router = useRouter();
    
      useEffect(() => {
        const playAudio = () => {
          if (audioRef.current && !hasPlayed) {
            audioRef.current.volume = 0.5;
            audioRef.current.play()
              .then(() => {
                setHasPlayed(true);
              })
              .catch(() => {
                // Navegador bloqueó autoplay
                setHasPlayed(false);
              });
          }
        };
    
        playAudio();
        window.addEventListener('click', playAudio);
        return () => window.removeEventListener('click', playAudio);
      }, [hasPlayed]);
    
      const toggleMute = () => {
        if (audioRef.current) {
          audioRef.current.muted = !muted;
          setMuted(!muted);
        }
      };
        const handleMuteToggle = () => {
        if (audioRef.current) {
          audioRef.current.muted = !muted;
          setMuted(!muted);
        }
      };
  return (
    <div style={{ padding: "10px" }}>
       <audio ref={audioRef} src="/assets/media/stefy.mp3" loop autoPlay />
      <button className="music-button" onClick={handleMuteToggle}>
        {muted ? '🔊 Activar sonido' : '🔇 Silenciar'}
      </button>
      <button className="music-button1" onClick={()=>router.push("/")}>
         VOLVER
      </button>
      <CDeck type={TypeCards.RED_HEARTS} />
      <CDeck type={TypeCards.SPADES} />
      <CDeck type={TypeCards.DIAMONDS} />
      <CDeck type={TypeCards.CLOVERS} />
    </div>
  );
}
