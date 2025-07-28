/**
 * Clase que representa una carta del juego
 * @class Card
 */
class Card{
    /** @property {string} name - Nombre o valor de la carta */
    name = "";
    /** @property {string} imagen - Ruta de la imagen de la carta */
    imagen = "";
    /** @property {string} type - Tipo de la carta (espadas, corazones, etc) */
    type = "";
    /** @property {boolean} estado - Estado de la carta (volteada/no volteada) */
    estado = false;
    /** @property {string} imagen_desactivo - Imagen del reverso de la carta */
    imagen_desactivo = "tapa.jpg";

    /**
     * Crea una nueva instancia de carta
     * @param {string} name - Nombre o valor de la carta
     * @param {string} type - Tipo de la carta
     * @param {string} imagen - Ruta de la imagen de la carta
     */
    constructor(name, type, imagen ) {
        this.name = name;
        this.imagen = imagen;
        this.type = type;
    }
}
export default Card;