"use client";
///assets/images/tapa.jpg


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Carta({ id, animatePosition, image, position }) {
  const baseStyle = {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: "#a104a9",
    
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    cursor: "default",
    userSelect: "none",
    fontWeight: "bold",
    fontSize: 18,
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

export default function Baraja() {
  // Imagen que usaremos para las cartas
  const image = "/assets/images/tapa.jpg"; // Reemplaza con tu URL de imagen

  // Definimos la cantidad de cartas
  const totalLeft = 4;
  const totalRight = 4;

  const [leftCards, setLeftCards] = useState(
    Array.from({ length: totalLeft }, (_, i) => `L${i + 1}`)
  );
  const [rightCards, setRightCards] = useState(
    Array.from({ length: totalRight }, (_, i) => `R${i + 1}`)
  );
  const [centerCards, setCenterCards] = useState([]);
  const [turnLeft, setTurnLeft] = useState(true); // Controla si tomamos de la izquierda o derecha

  useEffect(() => {
    // Cada 1 segundo mover una carta alternada de izquierda y derecha al centro
    const interval = setInterval(() => {
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

  return (
    <div
      style={{
        backgroundImage: `url('/assets/background/fondo2.jpg')`,
        position: "relative",
        width: 700, // Reducimos el ancho para que las cartas estén más cerca
        height: 200,
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "visible",
        userSelect: "none",
      }}
    >
      {/* Mazos izquierdo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "30px", // Reducimos el espacio en la izquierda
          transform: "translateY(-50%)",
          width: 60,
          height: 90,
          pointerEvents: "none",
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

      {/* Mazos derecho */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "30px", // Reducimos el espacio en la derecha
          transform: "translateY(-50%)",
          width: 60,
          height: 90,
          pointerEvents: "none",
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

      {/* Mazo central */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 60,
          height: 90,
          pointerEvents: "none",
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