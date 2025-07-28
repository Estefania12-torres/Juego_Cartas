class Card{
    name = "";
    imagen = "";
    type = "";
    estado = false;
    imagen_desactivo = "tapa.jpg";
    constructor(name, type, imagen ) {
        this.name = name;
        this.imagen = imagen;
        this.type = type;
    }
}
export default Card;