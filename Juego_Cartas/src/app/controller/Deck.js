import Card from "../models/Card";
import TypeCards from "../models/TypeCards";

class Deck {
    red_hearts = [];
    clovers = [];
    spades = [];
    diamonds = [];
    decks = [];
    constructor() {
        this.createTypesCard();
    }

    createNewCard() {
        var card = new Card((0).toString(), TypeCards.WHITE, "tapa.jpg");
        return card;
    }

    createTypesCard() {
        for (var i = 0; i < 13; i++) {
            var card_red = new Card((i + 1).toString(), TypeCards.RED_HEARTS, (i + 1).toString() + "_" + TypeCards.RED_HEARTS.toString().toLowerCase() + ".png");
            this.red_hearts[i] = card_red;

            var card_clover = new Card((i + 1).toString(), TypeCards.CLOVERS, (i + 1).toString() + "_" + TypeCards.CLOVERS.toString().toLowerCase() + ".png");
            this.clovers[i] = card_clover;

            var card_spad = new Card((i + 1).toString(), TypeCards.SPADES, (i + 1).toString() + "_" + TypeCards.SPADES.toString().toLowerCase() + ".png");
            this.spades[i] = card_spad;

            var card_diamond = new Card((i + 1).toString(), TypeCards.DIAMONDS, (i + 1).toString() + "_" + TypeCards.DIAMONDS.toString().toLowerCase() + ".png");
            this.diamonds[i] = card_diamond;

        }
        var red_hearts_aux = this.mix(this.red_hearts);
        var clovers_aux = this.mix(this.clovers);
        var diamonds_aux = this.mix(this.diamonds);
        var spades_aux = this.mix(this.spades);
        for (var i = 0; i < 13; i++) {
            this.decks.push(red_hearts_aux[i]);
            this.decks.push(clovers_aux[i]);
            this.decks.push(diamonds_aux[i]);
            this.decks.push(spades_aux[i]);
        }
        this.decks = this.shuffleCut();
        //
        for (var i = 0; i < this.decks.length; i++) {
            console.log(this.decks[i]);
        }
    }

    /**
     * Metodo que permite mezclar la baraja
     * @param {*} array 
     * @returns la baraja mezclada
     */
    mix(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // índice aleatorio entre 0 e i
            [array[i], array[j]] = [array[j], array[i]];   // intercambio
        }
        return array;
    }

    cut_deck(decks) {
        const cut = Math.floor(22 + Math.random() * 8); // corte entre 22 y 30
        const half1 = decks.slice(0, cut);
        const half2 = decks.slice(cut);
        return [half1, half2];
    }

    riffleShuffle(half1, half2) {
        const decksMix = [];

        while (half1.length || half2.length) {
            if (half1.length && (!half2.length || Math.random() > 0.5)) {
                decksMix.push(half1.shift());
            } else if (half2.length) {
                decksMix.push(half2.shift());
            }
        }

        return decksMix;
    }

    shuffleCut() {

        const [half1, half2] = this.cut_deck(this.decks);
        return this.riffleShuffle(half1, half2);
    }

}
export default Deck;