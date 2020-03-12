class Coche extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/porsche911/911.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/porsche911/Porsche_911_GT2.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});
  }

  createGUI(gui, titleGui){
    this.guiControls = new function(){
      this.rotY = 0.0;
      this.giro = false;
    }

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'giro').name('Giro automático: ');
  }

  update(){
    if(this.guiControls.giro){
      this.guiControls.rotY += 0.01;
      this.rotation.y = this.guiControls.rotY;
    }
  }
}
