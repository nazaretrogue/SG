class Ichigo extends THREE.Object3D {
  constructor() {
    super();

    this.vida = 500;

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    this.avance = true;
    var that = this;

    material_loader.load('../models/ichigo/Ichigo.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/ichigo/Ichigo.obj',
                                              function(obj){
                                                var modelo = obj;
                                                modelo.rotation.x = -Math.PI/2;
                                                that.add(modelo);
                                              },
                                              null, null);});

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

  disminuirVida(damage){
    this.vida = this.vida - damage;

    if(this.vida <= 0){
      if(this.rotation.y == Math.PI/2)
        this.rotation.set(0, 0, Math.PI/2);

      else if(this.rotation.y == 0)
        this.rotation.set(-Math.PI/2, this.rotation.y, 0);

      else if(this.rotation.y == -Math.PI/2)
        this.rotation.set(0, 0, -Math.PI/2);

      else if(this.rotation.y == Math.PI)
        this.rotation.set(Math.PI/2, this.rotation.y, 0);

      this.position.y = 1;
    }
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
