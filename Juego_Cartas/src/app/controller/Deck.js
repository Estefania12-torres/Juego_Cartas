// Importación de las clases necesarias
import Card from "../models/Card";
import TypeCards from "../models/TypeCards";

/**
 * Clase que maneja la baraja de cartas del juego
 * Implementa la lógica de creación, mezcla y manipulación de las cartas
 * @class Deck
 */
class Deck {
    /** @property {Card[]} red_hearts - Arreglo de cartas de corazones */
    red_hearts = [];
    /** @property {Card[]} clovers - Arreglo de cartas de tréboles */
    clovers = [];
    /** @property {Card[]} spades - Arreglo de cartas de espadas */
    spades = [];
    /** @property {Card[]} diamonds - Arreglo de cartas de diamantes */
    diamonds = [];
    /** @property {Card[]} decks - Arreglo con todas las cartas mezcladas */
    decks = [];

    /**
     * Constructor de la clase Deck
     * Inicializa la baraja llamando al método de creación de cartas
     */
    constructor() {
        this.createTypesCard();
    }

    /**
     * Crea una nueva carta blanca (comodín o tapa)
     * @returns {Card} Nueva carta con tipo WHITE
     */
    createNewCard() {
        var card = new Card((0).toString(), TypeCards.WHITE, "tapa.jpg");
        return card;
    }

    /**
     * Crea todas las cartas del mazo y las inicializa
     * Genera 13 cartas para cada palo y las mezcla
     */
    createTypesCard() {
        // Crear las 13 cartas de cada palo
        for (var i = 0; i < 13; i++) {
            // Crear carta de corazones
            var card_red = new Card((i + 1).toString(), TypeCards.RED_HEARTS, (i + 1).toString() + "_" + TypeCards.RED_HEARTS.toString().toLowerCase() + ".png");
            this.red_hearts[i] = card_red;

            // Crear carta de tréboles
            var card_clover = new Card((i + 1).toString(), TypeCards.CLOVERS, (i + 1).toString() + "_" + TypeCards.CLOVERS.toString().toLowerCase() + ".png");
            this.clovers[i] = card_clover;

            // Crear carta de espadas
            var card_spad = new Card((i + 1).toString(), TypeCards.SPADES, (i + 1).toString() + "_" + TypeCards.SPADES.toString().toLowerCase() + ".png");
            this.spades[i] = card_spad;

            // Crear carta de diamantes
            var card_diamond = new Card((i + 1).toString(), TypeCards.DIAMONDS, (i + 1).toString() + "_" + TypeCards.DIAMONDS.toString().toLowerCase() + ".png");
            this.diamonds[i] = card_diamond;
        }

        // Mezclar cada palo individualmente
        var red_hearts_aux = this.mix(this.red_hearts);
        var clovers_aux = this.mix(this.clovers);
        var diamonds_aux = this.mix(this.diamonds);
        var spades_aux = this.mix(this.spades);

        // Combinar todos los palos en un solo mazo
        for (var i = 0; i < 13; i++) {
            this.decks.push(red_hearts_aux[i]);
            this.decks.push(clovers_aux[i]);
            this.decks.push(diamonds_aux[i]);
            this.decks.push(spades_aux[i]);
        }

        // Realizar el corte final y mezcla
        this.decks = this.shuffleCut();

        // Mostrar el mazo final en consola
        for (var i = 0; i < this.decks.length; i++) {
            console.log(this.decks[i]);
        }
    }

    /**
     * Mezcla un arreglo de cartas usando el algoritmo Fisher-Yates
     * @param {Card[]} array - Arreglo de cartas a mezclar
     * @returns {Card[]} Arreglo mezclado
     */
    mix(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generar índice aleatorio
            [array[i], array[j]] = [array[j], array[i]];   // Intercambiar elementos
        }
        return array;
    }

    /**
     * Corta el mazo en dos mitades
     * @param {Card[]} decks - Mazo completo a cortar
     * @returns {[Card[], Card[]]} Array con las dos mitades del mazo
     */
    cut_deck(decks) {
        const cut = Math.floor(22 + Math.random() * 8); // Punto de corte aleatorio entre 22 y 30
        const half1 = decks.slice(0, cut);              // Primera mitad
        const half2 = decks.slice(cut);                 // Segunda mitad
        return [half1, half2];
    }

    /**
     * Realiza una mezcla tipo cascada (riffle shuffle) con dos mitades del mazo
     * @param {Card[]} half1 - Primera mitad del mazo
     * @param {Card[]} half2 - Segunda mitad del mazo
     * @returns {Card[]} Mazo mezclado
     */
    riffleShuffle(half1, half2) {
        const decksMix = [];

        // Mientras queden cartas en alguna mitad
        while (half1.length || half2.length) {
            // Tomar aleatoriamente de una mitad u otra
            if (half1.length && (!half2.length || Math.random() > 0.5)) {
                decksMix.push(half1.shift());
            } else if (half2.length) {
                decksMix.push(half2.shift());
            }
        }

        return decksMix;
    }

    /**
     * Realiza un corte y mezcla completa del mazo
     * @returns {Card[]} Mazo cortado y mezclado
     */
    shuffleCut() {
        const [half1, half2] = this.cut_deck(this.decks);  // Cortar el mazo
        return this.riffleShuffle(half1, half2);           // Mezclar las mitades
    }

}
export default Deck;