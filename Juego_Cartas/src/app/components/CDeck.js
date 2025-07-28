import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Deck from "../controller/Deck";
import { styled } from "@stitches/react";
import { useEffect, useRef, useState } from "react";
import {
  useSprings,
  animated,
  to as interpolate,
  useTrail,
} from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import "../style.css";
import { Card } from "react-bootstrap";
import TypeCards from "../models/TypeCards";

export default function CDeck({ type }) {
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
    height: 150,
    width: 150,
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
    backgroundColor: "#fafafa",
    border: "solid 2px #1a1a1a",
  });

  const BackBox = styled(animated.div, {
    ...SharedStyles,
    backgroundColor: "#6cab64",
    border: "solid 2px #6cab64",
    color: "#fafafa",
  });

  var deck = new Deck();
  const [items, setItems] = useState([]);
  useEffect(() => {
    var auxItems = [];
    for (var i = 0; i < deck.clovers.length; i++) {
      var aux = null;
      if (type == TypeCards.CLOVERS) {
        aux = deck.clovers[i];
      } else if (type == TypeCards.DIAMONDS) {
        aux = deck.diamonds[i];
      } else if (type == TypeCards.RED_HEARTS) {
        aux = deck.red_hearts[i];
      } else if (type == TypeCards.SPADES) {
        aux = deck.spades[i];
      }
      auxItems[i] = "/assets/images/" + aux.imagen;
    }
    setItems(auxItems);
  }, []);
  //const items = [];//useState(deck.clovers);

  const [trail, api] = useTrail(items.length, () => ({
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
    <Card style={{ padding: "20px" }}>
      <Card.Title>Baraja de {type}</Card.Title>
      <Card.Body style={{ paddingTop: "20px" }}>
        <Container onClick={handleClick}>
          {trail.map(({ rotateX }, i) => (
            <Box key={i}>
              <FrontBox
                key={items[i]}
                style={{
                  transform: rotateX.to(
                    (val) => `perspective(600px) rotateX(${val}deg)`
                  ),
                  transformStyle: "preserve-3d",
                }}
              >
                {<img src="/assets/images/tapa.jpg" />}
              </FrontBox>
              <BackBox
                style={{
                  transform: rotateX.to(
                    (val) => `perspective(600px) rotateX(${180 - val}deg)`
                  ),
                  transformStyle: "preserve-3d",
                }}
              >
                {<img src={items[i]} />}
              </BackBox>
            </Box>
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
  /*const to = (i) => ({
        x: 0,
        y: i * -4,
        scale: 1,
        rot: -10 + Math.random() * 20,
        delay: i * 100,
    })
    
    
    const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
    // This is being used down there in the view, it interpolates rotation and scale into a css transform
    const trans = (r, s) =>
        `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
    
    
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, api] = useSprings(cards.length, i => ({
        ...to(i),
        from: from(i),
    })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        api.start(i => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
            }
        })
        if (!down && gone.size === cards.length)
            setTimeout(() => {
                gone.clear()
                api.start(i => to(i))
            }, 600)
    });
    */

  /*return (
        <div className="container">
            <Container className="col-md-5 mx-auto">
    
                <Row>
                    <Row>
                    <h1>TREBOLES</h1>
                        {props.map(({ x, y, rot, scale }, i) => (
                            <animated.div className="deck" key={i} style={{ x, y }}>
                                
                                <animated.div
                                    {...bind(i)}
                                    style={{
                                        transform: interpolate([rot, scale], trans),
                                        backgroundImage: `url(${cards[i]})`,
                                    }}
                                />
                            </animated.div>
                        ))}
                    </Row>
                    <Row>
                        <h1>TREBOLES</h1>
                        {props.map(({ x, y, rot, scale }, i) => (
                            <animated.div className="deck" key={i} style={{ x, y }}>
                                
                                <animated.div
                                    {...bind(i)}
                                    style={{
                                        transform: interpolate([rot, scale], trans),
                                        backgroundImage: `url(${cards_spades[i]})`,
                                    }}
                                />
                            </animated.div>
                        ))}
                    </Row>
                    <Row>3 of 4</Row>
                    <Row>3 of 4</Row>
                </Row>
            </Container>
    
    
    
        </div>
    );*/
}
