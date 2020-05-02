class Aaroniero extends THREE.Object3D {
  constructor() {
    super();

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/aaroniero/AaronieroResurrection.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/aaroniero/AaronieroResurrection.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});
    this.scale.set(0.3, 0.3, 0.3);
    this.rotation.x = -Math.PI/2;
  }
  
  update(){
    //todo
  }
}
