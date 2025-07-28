"use client"; // Directiva para indicar que es un componente del lado del cliente
// Ruta de la imagen del reverso de la carta
///assets/images/tapa.jpg

// Importaciones necesarias de React y Framer Motion
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Componente que representa una carta individual con animación
 * @param {Object} props - Propiedades del componente
 * @param {string} props.id - Identificador único de la carta
 * @param {Object} props.animatePosition - Posición inicial y final para la animación
 * @param {string} props.image - Ruta de la imagen de la carta
 * @param {string} props.position - Posición de la carta (left, right, center)
 */
function Carta({ id, animatePosition, image, position }) {
    // Estilos base para cada carta
  const baseStyle = {
    width: 60,          // Ancho de la carta
    height: 90,         // Alto de la carta
    borderRadius: 6,    // Bordes redondeados
    backgroundColor: "#a104a9",  // Color de fondo morado
    
    border: "1px solid #ccc",    // Borde gris claro
    display: "flex",             // Flexbox para centrar contenido
    justifyContent: "center",    // Centrar horizontalmente
    alignItems: "center",        // Centrar verticalmente
    position: "absolute",        // Posicionamiento absoluto para animación
    cursor: "default",           // Cursor por defecto
    userSelect: "none",          // Prevenir selección de texto
    fontWeight: "bold",          // Texto en negrita
    fontSize: 18,                // Tamaño de fuente
  };

  return (
    <motion.div
      style={baseStyle}
      initial={{
        opacity: 0,
        scale: 0.5,
        x: animatePosition.startX,
        y: animatePosition.startY,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: animatePosition.endX,
        y: animatePosition.endY,
        rotate: animatePosition.rotate, // Agregamos la rotación aleatoria
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.02 }} // Animación más rápida
    >
      <img src={image} alt="Card" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
    </motion.div>
  );
}

/**
 * Componente principal que maneja la animación de barajado de cartas
 * Muestra dos mazos laterales que se van moviendo al centro
 */
export default function Baraja() {
  // Imagen del reverso que se usará para todas las cartas
  const image = "/assets/images/tapa.jpg";

  // Configuración inicial de la cantidad de cartas en cada lado
  const totalLeft = 4;   // Número de cartas en el mazo izquierdo
  const totalRight = 4;  // Número de cartas en el mazo derecho

  // Estado para las cartas del mazo izquierdo
  const [leftCards, setLeftCards] = useState(
    // Crear un array con identificadores únicos para cada carta (L1, L2, etc.)
    Array.from({ length: totalLeft }, (_, i) => `L${i + 1}`)
  );
  
  // Estado para las cartas del mazo derecho
  const [rightCards, setRightCards] = useState(
    // Crear un array con identificadores únicos para cada carta (R1, R2, etc.)
    Array.from({ length: totalRight }, (_, i) => `R${i + 1}`)
  );
  
  // Estado para las cartas que se van moviendo al centro
  const [centerCards, setCenterCards] = useState([]);
  
  // Estado para alternar entre tomar cartas de la izquierda o derecha
  const [turnLeft, setTurnLeft] = useState(true);

  /**
   * Efecto que maneja la animación automática de las cartas
   * Se ejecuta cada segundo y mueve una carta alternadamente de izquierda y derecha al centro
   */
  useEffect(() => {
    // Configurar un intervalo para mover las cartas cada segundo
    const interval = setInterval(() => {
      // Si es el turno de la izquierda y aún hay cartas en ese mazo
      if (turnLeft && leftCards.length > 0) {
        // Mover carta del left al center
        setLeftCards((prev) => {
          const carta = prev[0];
          if (!carta) return prev;
          setCenterCards((centerPrev) => [
            ...centerPrev,
            {
              id: `left-${Math.random()}-${carta}-${Date.now()}`,
              position: "center",
              animatePosition: {
                startX: -180, // Empieza más cerca de la izquierda
                startY: 0,
                endX: 0, // Se mueve al centro
                endY: 0,
                rotate: Math.random() * 20 - 10, // Rotación aleatoria entre -10 y 10 grados
              },
            },
          ]);
          return prev.slice(1);
        });
      } else if (!turnLeft && rightCards.length > 0) {
        // Mover carta del right al center
        setRightCards((prev) => {
          const carta = prev[0];
          if (!carta) return prev;
          setCenterCards((centerPrev) => [
            ...centerPrev,
            {
              id: `right-${Math.random()}-${carta}-${Date.now()}`,
              position: "center",
              animatePosition: {
                startX: 180, // Empieza más cerca de la derecha
                startY: 0,
                endX: 0, // Se mueve al centro
                endY: 0,
                rotate: Math.random() * 20 - 10, // Rotación aleatoria entre -10 y 10 grados
              },
            },
          ]);
          return prev.slice(1);
        });
      }

      // Alternar entre izquierda y derecha
      setTurnLeft((prev) => !prev);

      // Si ya no quedan cartas en los lados, detener intervalo
      if (leftCards.length === 0 && rightCards.length === 0) {
        clearInterval(interval);
      }
    }, 1000); // Hacemos que la animación se mueva más rápido (1 segundo)

    return () => clearInterval(interval);
  }, [leftCards, rightCards, turnLeft]);

  /**
   * Renderiza el componente de barajado
   * @returns {JSX.Element} Elemento JSX con la animación de barajado
   */
return (
    // Contenedor principal con fondo personalizado
    <div
      style={{
        backgroundImage: `url('/assets/background/fondo2.jpg')`, // Imagen de fondo
        position: "relative",    // Posicionamiento relativo para los mazos
        width: 700,             // Ancho del área de juego
        height: 200,            // Alto del área de juego
        margin: "40px auto",    // Centrar en la página
        border: "1px solid #ddd", // Borde sutil
        borderRadius: 8,        // Bordes redondeados
        overflow: "visible",    // Permitir que las cartas sobresalgan
        userSelect: "none",     // Prevenir selección de texto
      }}
    >
      {/* Contenedor del mazo izquierdo */}
      <div
        style={{
          position: "absolute",         // Posicionamiento absoluto dentro del contenedor
          top: "50%",                  // Centrar verticalmente
          left: "30px",                // Posición desde el borde izquierdo
          transform: "translateY(-50%)", // Ajuste fino del centrado vertical
          width: 60,                   // Ancho de las cartas
          height: 90,                  // Alto de las cartas
          pointerEvents: "none",       // Deshabilitar interacción con el mouse
        }}
      >
        <AnimatePresence>
          {leftCards.map((id) => (
            <Carta
              key={`left-${id}`}
              id={id}
              position="left"
              animatePosition={{ startX: -180, startY: 0, endX: 0, endY: 0, rotate: 0 }}
              image={image}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Contenedor del mazo derecho */}
      <div
        style={{
          position: "absolute",         // Posicionamiento absoluto dentro del contenedor
          top: "50%",                  // Centrar verticalmente
          right: "30px",               // Posición desde el borde derecho
          transform: "translateY(-50%)", // Ajuste fino del centrado vertical
          width: 60,                   // Ancho de las cartas
          height: 90,                  // Alto de las cartas
          pointerEvents: "none",       // Deshabilitar interacción con el mouse
        }}
      >
        <AnimatePresence>
          {rightCards.map((id) => (
            <Carta
              key={`right-${id}`}
              id={id}
              position="right"
              animatePosition={{ startX: 180, startY: 0, endX: 0, endY: 0, rotate: 0 }}
              image={image}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Contenedor del mazo central donde se acumulan las cartas */}
      <div
        style={{
          position: "absolute",         // Posicionamiento absoluto dentro del contenedor
          top: "50%",                  // Centrar verticalmente
          left: "50%",                 // Centrar horizontalmente
          transform: "translate(-50%, -50%)", // Ajuste fino del centrado en ambos ejes
          width: 60,                   // Ancho de las cartas
          height: 90,                  // Alto de las cartas
          pointerEvents: "none",       // Deshabilitar interacción con el mouse
        }}
      >
        <AnimatePresence>
          {centerCards.map(({ id, animatePosition }) => (
            <Carta key={id} id={id} position="center" animatePosition={animatePosition} image={image} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}