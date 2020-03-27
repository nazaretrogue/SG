class Ulquiorra extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/ulquiorra/Ulquiorra.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/ulquiorra/Ulquiorra.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});
  }

  createGUI(gui, titleGui){
    //todo
  }

  update(){
    //todo
  }
}
