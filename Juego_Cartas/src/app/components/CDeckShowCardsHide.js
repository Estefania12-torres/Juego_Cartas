import React, { useRef, useState } from "react";
import {
  useSprings,
  animated,
  to as interpolate,
  useSpring,
  a,
  useTrail,
} from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { styled } from "@stitches/react";
import "../style.css";

function extractImagen(data1) {
 
  if (data1.estado) {
    return "/assets/images/" + data1.imagen;
  } else {
    return "/assets/images/" + data1.imagen_desactivo;
  }
}

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
