import React from 'react';
import "../alert.css";
import { useRouter } from 'next/navigation';
export default function GameAlert({ result, onClose }) {
     const router = useRouter();
  const isWin = result === 'win';
    const handleReplay = () => {
    router.push('/');
  };
  return (
    <div className="game-alert-overlay">
      <div className={`game-alert-box ${isWin ? 'win' : 'lose'}`}>
        <h2>{isWin ? '🎉 ¡Has vencido al destino! 🎉' : '💀 !Oh No 💀'}</h2>
        <p>{isWin ? '¡Felicidades, tu sueño se hara realizad!' : 'El destino te ha derrotado... Intenta de nuevo.'}</p>
        <button onClick={handleReplay}>Volver a jugar</button>
      </div>
    </div>
  );
}