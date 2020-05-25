class Ichigo extends Personaje {
  constructor(archivo, puntos_vida) {
    super(archivo, puntos_vida);

    //this.rotation.x = -Math.PI/2;

    // var geo = new THREE.BoxGeometry(8, 7, 11.5);
    // var mat = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true})
    // var matf = Physijs.createMaterial(mat, 0.9, 0.3);
    // //this.caja = new THREE.Mesh(geo, mat);
    // this.caja = new Physijs.BoxMesh(geo, matf, 1.0);
    //
    // this.caja.position.z = 3.5;
    // this.caja.rotation.x = -Math.PI/2;

    // //this.caja.add(this);
    // this.add(this.caja);
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
