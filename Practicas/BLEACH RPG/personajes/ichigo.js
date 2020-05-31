class Ichigo extends Personaje {
  constructor(archivo, puntos_vida) {
    super(archivo, puntos_vida);
  }

  toString(){
    return "Kurosaki Ichigo\nVida: " + this.vida.toString();
  }
}
