// Importar las dependencias necesarias de React
import React, { useRef, useState } from "react";
// Importar componentes y hooks de react-spring para animaciones
import {
  useSprings,  // Hook para múltiples animaciones
  animated,    // Componente que puede ser animado
  to as interpolate,  // Función para interpolar valores
  useSpring,   // Hook para una sola animación
  a,           // Alias para animated
  useTrail,    // Hook para animaciones en secuencia
} from "@react-spring/web";
// Importar hook para gestos táctiles y de ratón
import { useDrag } from "react-use-gesture";
// Importar utilidad de estilos
import { styled } from "@stitches/react";
// Importar estilos CSS
import "../style.css";

/**
 * Extrae la ruta de la imagen de la carta según su estado
 * @param {Object} data1 - Datos de la carta
 * @returns {string} Ruta de la imagen a mostrar
 */
function extractImagen(data1) {
  // Si la carta está volteada (estado true), mostrar la imagen frontal
  if (data1.estado) {
    return "/assets/images/" + data1.imagen;
  } else {
    // Si la carta está boca abajo, mostrar el reverso
    return "/assets/images/" + data1.imagen_desactivo;
  }
}

/**
 * Componente que muestra una carta con animación de volteo
 * @component CDeckShowCardsHide
 * @param {Object} props - Propiedades del componente
 * @param {Card} props.card - Carta a mostrar
 */
export default function CDeckShowCardsHide({ card }) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const AppContainer = styled("div", {
    width: "200vw",
    height: "200vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const Container = styled("div", {
    display: "flex",
    gap: 10,
    marginBottom: 80,
  });

  const Box = styled("div", {
    position: "relative",
    height: 100,
    width: 100,
  });

  const SharedStyles = {
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Helvetica",
    fontWeight: 800,
    backfaceVisibility: "hidden",
  };

  const FrontBox = styled(animated.div, {
    ...SharedStyles,
    backgroundColor: "linear-gradient(145deg, #a104a9, #4f0262)",
    border: "solid 2px #1a1a1a",
  });

  const BackBox = styled(animated.div, {
    ...SharedStyles,
    backgroundColor: "#6cab64",
    border: "solid 2px #6cab64",
    color: "#fafafa",
  });

  const [trail, api] = useTrail(1, () => ({
    rotateX: 0,
  }));
  const isFlipped = useRef(false);
  const handleClick = () => {
    if (isFlipped.current) {
      api.start({
        rotateX: 0,
      });
      isFlipped.current = false;
    } else {
      api.start({
        rotateX: 180,
      });
      isFlipped.current = true;
    }
  };

  return (
    <div>
      <Container>
        {trail.map(({ rotateX }, i) => (
          <Box key={i}>
            <FrontBox
              key={1}
              style={{
                transform: rotateX.to(
                  (val) => `perspective(600px) rotateX(${val}deg)`
                ),
                transformStyle: "preserve-3d",
              }}
            >
              {<img style={{background:"linear-gradient(145deg, #a104a9, #4f0262)", border: "3px solid #4f0262", boxShadow: "0px 10px 4px rgba(0, 0, 0, 0.1)"}} src={extractImagen(card)} />}
            </FrontBox>
          </Box>
        ))}
      </Container>
    </div>
  );
}
