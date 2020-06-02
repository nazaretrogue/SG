class Ichigo extends Personaje {
  constructor(archivo, puntos_vida) {
    // Creamos el personaje con el constructor de la superclase
    super(archivo, puntos_vida);
  }

  // toString para saber el personaje y su vida
  toString(){
    return "Kurosaki Ichigo\nVida: " + this.vida.toString();
  }
}
