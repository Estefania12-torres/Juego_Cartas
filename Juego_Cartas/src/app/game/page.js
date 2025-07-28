"use client";
import { styled } from "@stitches/react";
import Deck from "../controller/Deck";
import { Card } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import CDeckShowCardsHide from "../components/CDeckShowCardsHide";
import "../gamer.css";
import "../style.css";
import { AnimatePresence, motion } from "framer-motion";
import GameAlert from "../components/GameAlert";

import {
  useSprings,
  animated,
  to as interpolate,
  useSpring,
  a,
  useTrail,
} from "@react-spring/web";
import Baraja from "../components/CBarajado";

function generate(i, j, decks) {
  var aux = [];
  var cont = 0;
  for (var i1 = i; i1 <= j; i1++) {
    aux[cont] = decks[i1];
    cont++;
  }
  //var deck = new Deck();
  //aux[cont] = deck.createNewCard();
  return aux;
}

export default function Game_view() {
  //loading
  const [isLoading, setIsLoading] = useState(true);
  //message
  const [result, setResult] = useState(null); // 'win' | 'lose' | null
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  var [cardSelected, setCardSelected] = useState(null);
  var [cont, setCont] = useState(1);
  //loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 8500);
    return () => clearTimeout(timer);
  }, []);
  //audio
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !hasPlayed) {
        audioRef.current.volume = 0.5;
        audioRef.current
          .play()
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
    window.addEventListener("click", playAudio);
    return () => window.removeEventListener("click", playAudio);
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
  //cartas
  const [c1, setC1] = useState([]);
  const [c2, setC2] = useState([]);
  const [c3, setC3] = useState([]);
  const [c4, setC4] = useState([]);
  const [c5, setC5] = useState([]);
  const [c6, setC6] = useState([]);
  const [c7, setC7] = useState([]);
  const [c8, setC8] = useState([]);
  const [c9, setC9] = useState([]);
  const [c10, setC10] = useState([]);
  const [c11, setC11] = useState([]);
  const [c12, setC12] = useState([]);
  const [c13, setC13] = useState([]);

  useEffect(() => {
    var deck = new Deck();
    var decks = deck.decks;
    //console.log(decks);
    setC1(generate(0, 3, decks));
    setC2(generate(4, 7, decks));
    setC3(generate(8, 11, decks));
    setC4(generate(12, 15, decks));
    setC5(generate(16, 19, decks));
    setC6(generate(20, 23, decks));
    setC7(generate(24, 27, decks));
    setC8(generate(28, 31, decks));
    setC9(generate(32, 35, decks));
    setC10(generate(36, 39, decks));
    setC11(generate(40, 43, decks));
    setC12(generate(44, 47, decks));
    decks[48].estado = true;
    setCard(decks[48]);
    setC13(generate(48, 51, decks));
    //fijar la primera carta
  }, []);

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
    backgroundColor: "#fafafa",
    border: "solid 2px #1a1a1a",
  });
  //******************** */
  function getPost(c) {
    var cont = -1;
    for (var i = 1; i < c.length; i++) {
      if (!c[i].estado) {
        cont = i;
        break;
      }
      return cont;
    }
  }
  function verify(c, name) {
    var cont = 0;
    for (var i = 0; i < c.length; i++) {
      if (c[i].estado && c[i].name == name) {
        cont++;
      }
    }

    return cont == 4;
  }
  function verifyKing() {
    var cont = 0;
    for (var i = 0; i < c13.length; i++) {
      if (c13[i].estado && c13[i].name == "13") {
        cont++;
      }
    }

    return cont == 4;
  }
  const handleClick = (origen, container) => {
    if (verifyKing()) {
      //alert("El rey se a completado");
      if (
        verify(c1, "1") &&
        verify(c2, "2") &&
        verify(c3, "3") &&
        verify(c4, "4") &&
        verify(c5, "5") &&
        verify(c6, "6") &&
        verify(c7, "7") &&
        verify(c8, "8") &&
        verify(c9, "9") &&
        verify(c10, "10") &&
        verify(c11, "11") &&
        verify(c12, "12")
      ) {
        setResult("win");
      } else {
        setResult("lose");
      }
    } else {
      var deck_aux = [];
      if (container == 1) {
        var card = c1[0];
        var cont = 0;
        for (var i = 1; i < c1.length; i++) {
          deck_aux[cont] = c1[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC1(deck_aux);
      }
      if (container == 2) {
        var card = c2[0];
        var cont = 0;
        for (var i = 1; i < c2.length; i++) {
          deck_aux[cont] = c2[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC2(deck_aux);
        //addCard(card);
      }
      if (container == 3) {
        var card = c3[0];
        var cont = 0;
        for (var i = 1; i < c3.length; i++) {
          deck_aux[cont] = c3[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC3(deck_aux);
        //addCard(card);
      }
      if (container == 4) {
        var card = c4[0];
        var cont = 0;
        for (var i = 1; i < c4.length; i++) {
          deck_aux[cont] = c4[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC4(deck_aux);
        //addCard(card);
      }
      if (container == 5) {
        var card = c5[0];
        var cont = 0;
        for (var i = 1; i < c5.length; i++) {
          deck_aux[cont] = c5[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC5(deck_aux);
        //addCard(card);
      }
      if (container == 6) {
        var card = c6[0];
        var cont = 0;
        for (var i = 1; i < c6.length; i++) {
          deck_aux[cont] = c6[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC6(deck_aux);
        //addCard(card);
      }
      if (container == 7) {
        var card = c7[0];
        var cont = 0;
        for (var i = 1; i < c7.length; i++) {
          deck_aux[cont] = c7[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC7(deck_aux);
        // addCard(card);
      }
      if (container == 8) {
        var card = c8[0];
        var cont = 0;
        for (var i = 1; i < c8.length; i++) {
          deck_aux[cont] = c8[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC8(deck_aux);
        //addCard(card);
      }
      if (container == 9) {
        var card = c9[0];
        var cont = 0;
        for (var i = 1; i < c9.length; i++) {
          deck_aux[cont] = c9[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC9(deck_aux);
        //addCard(card);
      }
      if (container == 10) {
        var card = c10[0];
        var cont = 0;
        for (var i = 1; i < c10.length; i++) {
          deck_aux[cont] = c10[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC10(deck_aux);
        //addCard(card);
      }
      if (container == 11) {
        var card = c11[0];
        var cont = 0;
        for (var i = 1; i < c11.length; i++) {
          deck_aux[cont] = c11[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC11(deck_aux);
        //addCard(card);
      }
      if (container == 12) {
        var card = c12[0];
        var cont = 0;
        for (var i = 1; i < c12.length; i++) {
          deck_aux[cont] = c12[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC12(deck_aux);
        //addCard(card);
      }
      if (container == 13) {
        var card = c13[0];
        var cont = 0;
        for (var i = 1; i < c13.length; i++) {
          deck_aux[cont] = c13[i];
          cont++;
        }
        if (container == origen.name) {
          deck_aux[0].estado = true;
          deck_aux[cont] = card;
        } else {
          addCard(card);
        }
        setC13(deck_aux);
        //addCard(card);
      }
    }
  };

  function addCard(card) {
    //alert(card.name);
    if (verifyKing()) {
      //alert("El rey se a completado");
      if (
        verify(c1, "1") &&
        verify(c2, "2") &&
        verify(c3, "3") &&
        verify(c4, "4") &&
        verify(c5, "5") &&
        verify(c6, "6") &&
        verify(c7, "7") &&
        verify(c8, "8") &&
        verify(c9, "9") &&
        verify(c10, "10") &&
        verify(c11, "11") &&
        verify(c12, "12")
      ) {
        setResult("win");
      } else {
        setResult("lose");
      }
    } else {
      let number = card.name;
      card.estado = true;

      switch (number) {
        case "1":
          c1[0].estado = true;
          c1[c1.length] = card;
          setC1(c1);
          break;
        case "2":
          c2[0].estado = true;
          c2[c2.length] = card;

          setC2(c2);
          break;
        case "3":
          c3[0].estado = true;
          c3[c3.length] = card;
          setC3(c3);
          break;
        case "4":
          c4[0].estado = true;
          c4[c4.length] = card;
          setC4(c4);
          break;
        case "5":
          c5[0].estado = true;
          c5[c5.length] = card;
          setC5(c5);
          break;
        case "6":
          c6[0].estado = true;
          c6[c6.length] = card;
          setC6(c6);
          break;
        case "7":
          c7[0].estado = true;
          c7[c7.length] = card;
          setC7(c7);
          break;
        case "8":
          c8[0].estado = true;
          c8[c8.length] = card;
          setC8(c8);
          break;
        case "9":
          c9[0].estado = true;
          c9[c9.length] = card;
          setC9(c9);
          break;
        case "10":
          c10[0].estado = true;
          c10[c10.length] = card;
          setC10(c10);
          break;
        case "11":
          c11[0].estado = true;
          c11[c11.length] = card;
          setC11(c11);
          break;
        case "12":
          c12[0].estado = true;
          c12[c12.length] = card;
          setC12(c12);
          break;
        case "13":
          c13[0].estado = true;
          c13[c13.length] = card;
          setC13(c13);
          break;
        default:
          console.log("No es ni manzana ni pera.");
      }
    }
  }

  //******************** */

  function Condicion({ i, data, container }) {
    if (i == 0) {
      if (!data.estado) {
        return (
          <div className={"superpuesto" + (i + 1)}>
            <CDeckShowCardsHide card={data} />
          </div>
        );
      } else {
        return (
          <div
            className={"superpuesto" + (i + 1)}
            onClick={() => handleClick(data, container)}
          >
            <CDeckShowCardsHide card={data} />
          </div>
        );
      }
    } else {
      return (
        <div className={"superpuesto" + (i + 1)}>
          <CDeckShowCardsHide card={data} />
        </div>
      );
    }
  }

  function setCard(card) {
    setCardSelected(card);
  }

  return (
    <div className="parent-container">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{              
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#101",
              zIndex: 1000,
            }}
          >
            <motion.div
              className="spinner"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{
                width: 60,
                height: 60,
                border: "8px solid #444",
                borderTop: "8px solid #a104a9",
                borderRadius: "50%",
                marginBottom: 20,
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: "1.5rem" }}
            >
              <span className="game-button">Barajando...</span>
              
            </motion.p>

            <Baraja />
          </motion.div>
        )}
      </AnimatePresence>

      {result && <GameAlert result={result} onClose={() => setResult(null)} />}
      {!isLoading && (
        <div className="game-container">
          <audio ref={audioRef} src="/assets/media/human.mp3" loop autoPlay />
          <button className="music-button" onClick={handleMuteToggle}>
            {muted ? "🔊 Activar sonido" : "🔇 Silenciar"}
          </button>
          <Card>
            <Card.Title className="game-button" style={{ paddingTop: "30px" }}>
              PRUEBA TU SUERTE
            </Card.Title>
            <Card.Body>
              <table align="center">
                <tbody>
                  <tr>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            1
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c1.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={1}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title className="letra">
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            2
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c2.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={2}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            3
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c3.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={3}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            4
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c4.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={4}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            12
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c12.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={12}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                    <td colSpan={2} rowSpan={2} align="center">
                      <Card>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            13
                          </motion.h1>
                        </Card.Title>
                        <Card.Body>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c13.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={13}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>

                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            5
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c5.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={5}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            11
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c11.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={11}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>

                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            6
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c6.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={6}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            10
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c10.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={10}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            9
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c9.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={9}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            8
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c8.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={8}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                    <td>
                      <Card style={{ padding: "5px" }}>
                        <Card.Title>
                          <motion.h1
                            className="game-title_number"
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                          >
                            7
                          </motion.h1>
                        </Card.Title>
                        <Card.Body style={{ paddingTop: "5px" }}>
                          <motion.div
                            className="input-container"
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2 }}
                          >
                            <div className="contenedor">
                              {c7.map(function (data, i) {
                                return (
                                  <Condicion
                                    key={i}
                                    i={i}
                                    data={data}
                                    container={7}
                                  />
                                );
                              })}
                            </div>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
