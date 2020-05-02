class Grimmjow extends THREE.Object3D {
  constructor() {
    super();

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/grimmjow/Grimmjow.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/grimmjow/Grimmjow.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});

    this.rotation.x = -Math.PI/2;
  }

  update(){
    if(this.guiControls.giro){
      this.guiControls.rotY += 0.01;
      this.rotation.y = this.guiControls.rotY;
    }
  }
}
