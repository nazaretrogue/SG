class Bola extends THREE.Object3D{
  constructor(gui,titleGui){
    super();

    this.createGUI(gui,titleGui);

    var geom_cil = new THREE.CylinderGeometry(5, 5, 3, 32);
    var geom_bola = new THREE.SphereGeometry(1, 32, 32);

    var mat_cil = new THREE.MeshNormalMaterial({opacity: 0.35, transparent:true});
    var mat_bola = new THREE.MeshNormalMaterial();
    mat_bola.flatShading = true;
    mat_bola.needsUpdate = true;

    this.cilindro = new THREE.Mesh(geom_cil, mat_cil);
    this.bola_elipse = new THREE.Mesh(geom_bola, mat_bola);
    this.bola = new THREE.Object3D();

    this.cilindro.position.y = 1.5;
    this.bola_elipse.position.set(3, 1.5, 0);

    this.add(this.cilindro);
    this.bola.add(this.bola_elipse);
    this.add(this.bola);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){
      this.radio_cil = 5;

      this.rotacion_bola_x = this.radio_cil;
      this.posicion_bola_y = 1.5;
      this.posicion_bola_z = 0;
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, 'radio_cil', 5, 15, 1).name('Radio del cilindro: ').listen();
  }

  update(){
    this.cilindro.scale.set(this.guiControls.radio_cil/5, 1, 1);
    this.guiControls.rotacion_bola_x += 0.01;

    this.bola_elipse.position.set(this.guiControls.radio_cil, this.guiControls.posicion_bola_y, 0);
    //this.bola.rotation.y = this.guiControls.rotacion_bola_x;
  }
}
