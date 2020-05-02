class Escenario extends THREE.Object3D {
  constructor() {
    super();

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/escenario/escenario.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           material.side = THREE.DoubleSide;
                           modelo_loader.load('../models/escenario/escenario.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});
    this.scale.set(10, 10, 10);
  }

  update(){
    //todo
  }
}
