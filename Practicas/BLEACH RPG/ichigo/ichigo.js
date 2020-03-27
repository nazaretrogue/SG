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
    //todo
  }

  update(){
    //todo
  }
}
