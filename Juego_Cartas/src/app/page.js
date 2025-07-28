"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./gamer.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const [showInput, setShowInput] = useState(false);
  const [question, setQuestion] = useState('');

  const [tipo, setTipo] = useState('');
  
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
  //pregunta juego normal
  const handleAskClick = (tipo) => {
    setTipo(tipo);
    setShowInput(true);
  };

  const handleContinue = () => {
    if (question.trim()) {
     
      if(tipo == 'H') {
        router.push('/game', { state: { question } });
      }else{
        router.push('/machine', { state: { question } });
      }
      
    }
  };

  

  return (
     <div className="game-container">
      <audio ref={audioRef} src="/assets/media/principal.mp3" loop autoPlay />
      <button className="music-button" onClick={handleMuteToggle}>
        {muted ? '🔊 Activar sonido' : '🔇 Silenciar'}
      </button>

      <motion.h1
        className="game-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Bienvenido a conocer tu destino
      </motion.h1>

      <div className="button-group">
        {!showInput ? (
          <>
            <motion.button
              className="game-button"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>handleAskClick("H")}
            >
              Descúbrelo tú mismo
            </motion.button>

            <motion.button
              className="game-button"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>handleAskClick("M")}
            >
              Que el destino decida
            </motion.button>

            <motion.button
              className="game-button"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>router.push('/cards')}
            >
              Lista de cartas
            </motion.button>
          </>
        ) : (
          <motion.div
            className="input-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Haz tu pregunta al oráculo..."
              className="question-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button className="game-button" onClick={handleContinue}>
              Continuar →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
