class Grimmjow extends Personaje {
  constructor(archivo, puntos_vida) {
    super(archivo, puntos_vida);
  }

  toString(){
    return "Grimmjow Jaegerjaquez\nVida: " + this.vida.toString();
  }
}
