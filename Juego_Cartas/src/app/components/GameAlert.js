import React from 'react';
import "../alert.css";
import { useRouter } from 'next/navigation';

/**
 * Componente que muestra una alerta al finalizar el juego
 * @component GameAlert
 * @param {Object} props - Propiedades del componente
 * @param {string} props.result - Resultado del juego ('win' o 'lose')
 * @param {Function} props.onClose - Función para cerrar la alerta
 */
/**
 * Componente de alerta para el fin del juego
 */
export default function GameAlert({ result, onClose }) {
    // Inicializar el hook de navegación
    const router = useRouter();
    
    // Determinar si el resultado es una victoria
    const isWin = result === 'win';
    
    /**
     * Manejador para reiniciar el juego
     * Navega a la página principal
     */
    const handleReplay = () => {
        router.push('/');
    };
    
    return (
        // Overlay que cubre toda la pantalla
        <div className="game-alert-overlay">
            // Contenedor de la alerta con clase condicional según resultado
            <div className={`game-alert-box ${isWin ? 'win' : 'lose'}`}>
                // Título que cambia según el resultado
                <h2>{isWin ? '🎉 ¡Has vencido al destino! 🎉' : '💀 !Oh No 💀'}</h2>
                // Mensaje que cambia según el resultado
                <p>{isWin ? '¡Felicidades, tu sueño se hara realizad!' : 'El destino te ha derrotado... Intenta de nuevo.'}</p>
                // Botón para reiniciar el juego
                <button onClick={handleReplay}>Volver a jugar</button>
            </div>
        </div>
    );
}