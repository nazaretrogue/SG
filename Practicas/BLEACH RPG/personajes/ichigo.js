class Ichigo extends Personaje {
  constructor(archivo, puntos_vida) {
    super(archivo, puntos_vida);
  }

  update(event){
    console.log(this.vida);TWEEN.update();

    // Tecla a: movimiento hacia la derecha
    if(event.keyCode == "97"){
      this.position.x += 0.25;
      this.rotation.set(0, Math.PI/2, 0);
    }

    // Tecla w: hacia abajo
    else if(event.keyCode == "119"){
      this.position.z += 0.25;
      this.rotation.set(0, 0, 0);
    }

    // Tecla d: hacia la izquierda
    else if(event.keyCode == "100"){
      this.position.x -= 0.25;
      this.rotation.set(0, -Math.PI/2, 0);
    }

    // Tecla s: hacia arriba
    else if(event.keyCode == "115"){
      this.position.z -= 0.25;
      this.rotation.set(0, Math.PI, 0);
    }
  }
}
