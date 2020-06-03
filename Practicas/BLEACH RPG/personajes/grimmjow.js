class Grimmjow extends Personaje {
  constructor(archivo, puntos_vida) {
    // Creamos el personaje con el constructor de la superclase
    super(archivo, puntos_vida);
  }

  atacaEnemigo(pos, pos_enemigo, rotacion_enemigo){
    var damage = 0;

    // Si el enemigo está en el rango de ataque
    if(Math.abs(pos_enemigo.x-pos.x) <= 5.0 &&
       Math.abs(pos_enemigo.z-pos.z) <= 5.0){

        // El personaje rota según por dónde debe atacar
        this.rotation.y = Math.PI-rotacion_enemigo-Math.PI/2;

        // El daño hecho es un número aleatorio entre 1 y 3 ambos inclusive
        damage = Math.floor(Math.random()*(+4 - +1))+1;
    }

    return damage;
  }

  // toString para saber el personaje y su vida
  toString(){
    return "Grimmjow Jaegerjaquez\nVida: " + this.vida.toString();
  }
}
