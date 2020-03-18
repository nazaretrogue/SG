class PenduloSimple extends THREE.Object3D{
  constructor(gui,titleGui){
    super();

    this.createGUI(gui,titleGui);

    var geometria = new THREE.BoxGeometry(1, 10, 1);
    var material = new THREE.MeshPhongMaterial({color: 0x0000FF});

    geometria.translate(0, -4, -1);

    this.long_pend_rojo = 5;

    this.pendulo = new THREE.Mesh(geometria, material);
    this.add(this.pendulo);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){
      this.longitud_pend = 10;
      this.pos_pend = 0.1;
      this.giro_pend = 0;
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, 'longitud_pend', 10, 20, 1).name('Longitud: ').listen();
    folder.add(this.guiControls, 'pos_pend', 0.1, 0.9, 0.1).name('Posición: ').listen();
    folder.add(this.guiControls, 'giro_pend', -Math.PI/4, Math.PI/4, 0.1).name('Giro: ').listen();
  }

  update(longitud_pendulo_rojo){
    this.long_pend_rojo = longitud_pendulo_rojo;

    var posY = 2+(this.long_pend_rojo*this.guiControls.pos_pend)+this.guiControls.longitud_pend/10;

    this.position.set(0.0, -posY, 0.0);
    this.rotation.set(0.0, 0.0, this.guiControls.giro_pend);
    this.scale.set(1.0, this.guiControls.longitud_pend/10, 1.0);
  }
}
