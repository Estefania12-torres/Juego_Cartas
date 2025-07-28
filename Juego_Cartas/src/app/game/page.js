// Indicar que este es un componente del lado del cliente
"use client";

// Importaciones de bibliotecas y componentes
import { styled } from "@stitches/react";          // Para estilos
import Deck from "../controller/Deck";             // Controlador del mazo
import { Card } from "react-bootstrap";            // Componente Card de Bootstrap
import { useEffect, useRef, useState } from "react";  // Hooks de React
import CDeckShowCardsHide from "../components/CDeckShowCardsHide";  // Componente para mostrar cartas
import "../gamer.css";                            // Estilos del juego
import "../style.css";                            // Estilos generales
import { AnimatePresence, motion } from "framer-motion";  // Para animaciones
import GameAlert from "../components/GameAlert";   // Componente de alerta del juego

// Importaciones para animaciones de spring
import {
  useSprings,    // Hook para múltiples animaciones spring
  animated,      // Componente animado
  to as interpolate,  // Función de interpolación
  useSpring,     // Hook para una animación spring
  a,             // Alias para animated
  useTrail,      // Hook para animaciones en secuencia
} from "@react-spring/web";
import Baraja from "../components/CBarajado";      // Componente de barajado

/**
 * Genera un subconjunto de cartas del mazo principal
 * @param {number} i - Índice inicial
 * @param {number} j - Índice final
 * @param {Array} decks - Mazo completo de cartas
 * @returns {Array} Subconjunto de cartas seleccionadas
 */
function generate(i, j, decks) {
  var aux = [];      // Array auxiliar para almacenar las cartas seleccionadas
  var cont = 0;      // Contador para el índice del array auxiliar
  // Recorrer el rango especificado del mazo
  for (var i1 = i; i1 <= j; i1++) {
    aux[cont] = decks[i1];  // Copiar la carta al array auxiliar
    cont++;                 // Incrementar el contador
  }
  return aux;    // Devolver el subconjunto de cartas
}

/**
 * Componente principal de la vista del juego
 * Maneja la lógica y la interfaz del juego de cartas
 */
export default function Game_view() {
  // Estados para la pantalla de carga
  const [isLoading, setIsLoading] = useState(true);  // Controla la pantalla de carga inicial

  // Estados para el resultado del juego y audio
  const [result, setResult] = useState(null);        // Estado del juego: 'win' | 'lose' | null
  const audioRef = useRef(null);                     // Referencia al elemento de audio
  const [muted, setMuted] = useState(false);         // Estado del sonido (silenciado/no silenciado)
  const [hasPlayed, setHasPlayed] = useState(false); // Control de reproducción inicial

  // Estados para el manejo de cartas
  var [cardSelected, setCardSelected] = useState(null); // Carta seleccionada actualmente
  var [cont, setCont] = useState(1);                   // Contador general

  /**
   * Efecto para controlar la pantalla de carga
   * Se ejecuta al montar el componente y muestra la pantalla de carga por 8.5 segundos
   */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 8500);
    // Limpiar el temporizador al desmontar
    return () => clearTimeout(timer);
  }, []);

  /**
   * Efecto para manejar la reproducción del audio
   * Intenta reproducir el audio automáticamente y maneja los clics para reproducción manual
   */
  useEffect(() => {
    // Función para intentar reproducir el audio
    const playAudio = () => {
      if (audioRef.current && !hasPlayed) {
        audioRef.current.volume = 0.5;  // Establecer volumen al 50%
        audioRef.current
          .play()
          .then(() => {
            setHasPlayed(true);  // Marcar como reproducido si tiene éxito
          })
          .catch(() => {
            setHasPlayed(false); // Mantener como no reproducido si falla
          });
      }
    };

    // Intentar reproducir el audio inicialmente
    playAudio();
    // Agregar listener para reproducir en clic del usuario
    window.addEventListener("click", playAudio);
    // Limpiar el listener al desmontar
    return () => window.removeEventListener("click", playAudio);
  }, [hasPlayed]);

  /**
   * Función para alternar el estado de silencio del audio
   */
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;  // Cambiar estado de silencio
      setMuted(!muted);                 // Actualizar estado en React
    }
  };

  /**
   * Manejador del botón de silencio
   * Alterna el estado de silencio del audio
   */
  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;  // Cambiar estado de silencio
      setMuted(!muted);                 // Actualizar estado en React
    }
  };

  // Estados para los grupos de cartas (del 1 al 13)
  // Cada grupo representa un conjunto de cartas del mismo número
  const [c1, setC1] = useState([]);     // Grupo de Ases
  const [c2, setC2] = useState([]);     // Grupo de Dos
  const [c3, setC3] = useState([]);     // Grupo de Tres
  const [c4, setC4] = useState([]);     // Grupo de Cuatros
  const [c5, setC5] = useState([]);     // Grupo de Cincos
  const [c6, setC6] = useState([]);     // Grupo de Seises
  const [c7, setC7] = useState([]);     // Grupo de Sietes
  const [c8, setC8] = useState([]);     // Grupo de Ochos
  const [c9, setC9] = useState([]);     // Grupo de Nueves
  const [c10, setC10] = useState([]);   // Grupo de Dieces
  const [c11, setC11] = useState([]);   // Grupo de Jotas
  const [c12, setC12] = useState([]);   // Grupo de Reinas
  const [c13, setC13] = useState([]);   // Grupo de Reyes

  /**
   * Efecto que inicializa el juego distribuyendo las cartas en grupos
   * Se ejecuta una sola vez al montar el componente
   */
  useEffect(() => {
    // Crear una nueva baraja
    var deck = new Deck();
    var decks = deck.decks;

    // Distribuir las cartas en grupos de 4
    setC1(generate(0, 3, decks));     // Grupo de Ases (1-4)
    setC2(generate(4, 7, decks));     // Grupo de Doses (5-8)
    setC3(generate(8, 11, decks));    // Grupo de Treses (9-12)
    setC4(generate(12, 15, decks));   // Grupo de Cuatros (13-16)
    setC5(generate(16, 19, decks));   // Grupo de Cincos (17-20)
    setC6(generate(20, 23, decks));   // Grupo de Seises (21-24)
    setC7(generate(24, 27, decks));   // Grupo de Sietes (25-28)
    setC8(generate(28, 31, decks));   // Grupo de Ochos (29-32)
    setC9(generate(32, 35, decks));   // Grupo de Nueves (33-36)
    setC10(generate(36, 39, decks));  // Grupo de Dieces (37-40)
    setC11(generate(40, 43, decks));  // Grupo de Jotas (41-44)
    setC12(generate(44, 47, decks));  // Grupo de Reinas (45-48)

    // Voltear y seleccionar la primera carta del grupo de reyes
    decks[48].estado = true;
    setCard(decks[48]);
    
    // Establecer el grupo de Reyes (49-52)
    setC13(generate(48, 51, decks));
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
  /**
   * Obtiene la posición de la primera carta no volteada en un grupo
   * @param {Array} c - Grupo de cartas a verificar
   * @returns {number} Posición de la primera carta no volteada o -1 si no hay
   */
  function getPost(c) {
    var cont = -1;
    for (var i = 1; i < c.length; i++) {
      if (!c[i].estado) {  // Si la carta no está volteada
        cont = i;          // Guardar su posición
        break;
      }
      return cont;
    }
  }

  /**
   * Verifica si se han completado las 4 cartas del mismo número
   * @param {Array} c - Grupo de cartas a verificar
   * @param {string} name - Número de carta a buscar
   * @returns {boolean} True si hay 4 cartas volteadas del mismo número
   */
  function verify(c, name) {
    var cont = 0;
    // Contar cartas volteadas del número especificado
    for (var i = 0; i < c.length; i++) {
      if (c[i].estado && c[i].name == name) {
        cont++;
      }
    }
    return cont == 4;  // Verificar si se completaron las 4 cartas
  }

  /**
   * Verifica si se han completado los 4 reyes
   * @returns {boolean} True si se han completado los 4 reyes
   */
  function verifyKing() {
    var cont = 0;
    // Contar reyes volteados
    for (var i = 0; i < c13.length; i++) {
      if (c13[i].estado && c13[i].name == "13") {
        cont++;
      }
    }
    return cont == 4;  // Verificar si se completaron los 4 reyes
  }
  /**
   * Maneja el clic en una carta
   * @param {Object} origen - Carta origen que fue clicada
   * @param {number} container - Número del contenedor donde se hizo clic (1-13)
   */
  const handleClick = (origen, container) => {
    // Verificar si se completaron los reyes
    if (verifyKing()) {
      // Si se completaron los reyes, verificar si se ganó el juego
      if (
        // Verificar si se completaron todos los grupos de cartas
        verify(c1, "1") &&   // Ases
        verify(c2, "2") &&   // Doses
        verify(c3, "3") &&   // Treses
        verify(c4, "4") &&   // Cuatros
        verify(c5, "5") &&   // Cincos
        verify(c6, "6") &&   // Seises
        verify(c7, "7") &&   // Sietes
        verify(c8, "8") &&   // Ochos
        verify(c9, "9") &&   // Nueves
        verify(c10, "10") && // Dieces
        verify(c11, "11") && // Jotas
        verify(c12, "12")    // Reinas
      ) {
        setResult("win");    // Victoria si se completaron todos los grupos
      } else {
        setResult("lose");   // Derrota si faltó completar algún grupo
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

  /**
   * Agrega una carta al grupo correspondiente según su número
   * @param {Card} card - Carta a agregar
   */
  function addCard(card) {
    // Verificar si se completaron los reyes primero
    if (verifyKing()) {
      // Si los reyes están completos, verificar victoria
      if (
        // Verificar si todos los grupos están completos
        verify(c1, "1") &&   // Grupo de Ases
        verify(c2, "2") &&   // Grupo de Doses
        verify(c3, "3") &&   // Grupo de Treses
        verify(c4, "4") &&   // Grupo de Cuatros
        verify(c5, "5") &&   // Grupo de Cincos
        verify(c6, "6") &&   // Grupo de Seises
        verify(c7, "7") &&   // Grupo de Sietes
        verify(c8, "8") &&   // Grupo de Ochos
        verify(c9, "9") &&   // Grupo de Nueves
        verify(c10, "10") && // Grupo de Dieces
        verify(c11, "11") && // Grupo de Jotas
        verify(c12, "12")    // Grupo de Reinas
      ) {
        setResult("win");    // Victoria si todo está completo
      } else {
        setResult("lose");   // Derrota si falta algún grupo
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

  /**
   * Componente que renderiza una carta según su posición y estado
   * @param {Object} props - Propiedades del componente
   * @param {number} props.i - Índice de la carta en el grupo
   * @param {Card} props.data - Datos de la carta
   * @param {number} props.container - Número del contenedor al que pertenece
   * @returns {JSX.Element} Elemento JSX que representa la carta
   */
  function Condicion({ i, data, container }) {
    if (i == 0) {  // Si es la primera carta del grupo
      if (!data.estado) {  // Si la carta no está volteada
        return (
          <div className={"superpuesto" + (i + 1)}>
            <CDeckShowCardsHide card={data} />
          </div>
        );
      } else {  // Si la carta está volteada
        return (
          <div
            className={"superpuesto" + (i + 1)}
            onClick={() => handleClick(data, container)}  // Permitir clic
          >
            <CDeckShowCardsHide card={data} />
          </div>
        );
      }
    } else {  // Para el resto de cartas del grupo
      return (
        <div className={"superpuesto" + (i + 1)}>
          <CDeckShowCardsHide card={data} />
        </div>
      );
    }
  }

  /**
   * Establece la carta seleccionada actualmente
   * @param {Card} card - Carta a seleccionar
   */
  function setCard(card) {
    setCardSelected(card);  // Actualizar el estado de la carta seleccionada
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
