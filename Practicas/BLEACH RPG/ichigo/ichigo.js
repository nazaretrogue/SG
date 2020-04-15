class Ichigo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/ichigo/Ichigo.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/ichigo/Ichigo.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});
    this.rotation.x = -Math.PI/2;
  }

  createGUI(gui, titleGui){

  }

  update(event){
    // Tecla a: movimiento hacia la izquierda
    if(event.keyCode == "97"){
      this.position.x -= 0.1;
      this.rotation.set(-Math.PI/2, 0, -Math.PI/2);
    }

    // Tecla w: hacia arriba
    else if(event.keyCode == "119"){
      this.position.z -= 0.1;
      this.rotation.set(-Math.PI/2, 0, -Math.PI);
    }

    // Tecla d: hacia la derecha
    else if(event.keyCode == "100"){
      this.position.x += 0.1;
      this.rotation.set(-Math.PI/2, 0, Math.PI/2);
    }

    // Tecla s: hacia abajo
    else if(event.keyCode == "115"){
      this.position.z += 0.1;
      this.rotation.set(-Math.PI/2, 0, 0);
    }
  }
}
