class Aizen extends THREE.Object3D {
  constructor() {
    super();

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/aizen/Aizen.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/aizen/Aizen.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});
    this.position.set(0, 2.2, 2.5);
    this.rotation.x = -Math.PI/2;
  }

  update(){
    //todo
  }
}
