class Bola extends THREE.Object3D{
  constructor(gui,titleGui){
    super();

    this.createGUI(gui,titleGui);

    var geom_cil = new THREE.CylinderGeometry(5, 5, 12, 32);
    var geom_bola = new THREE.SphereGeometry(1, 32, 32);

    var mat_cil = new THREE.MeshNormalMaterial({opacity: 0.35, transparent:true});
    var mat_bola = new THREE.MeshNormalMaterial();
    mat_bola.flatShading = true;
    mat_bola.needsUpdate = true;

    this.cilindro = new THREE.Mesh(geom_cil, mat_cil);
    this.bola_salto = new THREE.Mesh(geom_bola, mat_bola);
    this.bola = new THREE.Object3D();

    this.cilindro.position.y = 6;
    this.bola_salto.position.set(5, 1.5, 0);

    this.add(this.cilindro);
    this.bola.add(this.bola_salto);
    this.add(this.bola);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){
      this.radio_cil = 5;

      this.rotacion_bola_x = this.radio_cil;
      this.posicion_bola_y = 1.5;

      this.lim_sup = false;
      this.lim_inf = true;
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, 'radio_cil', 2, 10, 1).name('Radio del cilindro: ').listen();
  }

  update(){
    this.cilindro.scale.set(this.guiControls.radio_cil/5, 1, this.guiControls.radio_cil/5);
    this.guiControls.rotacion_bola_x += 0.01;

    if(!this.guiControls.lim_sup){
      this.guiControls.posicion_bola_y += 0.1;

      if(this.guiControls.posicion_bola_y + 0.1 >= 10.5){
        this.guiControls.lim_sup = true;
        this.guiControls.lim_inf = false;
      }
    }

    else if(!this.guiControls.lim_inf){
      this.guiControls.posicion_bola_y -= 0.1;

      if(this.guiControls.posicion_bola_y - 0.1 <= 1.5){
        this.guiControls.lim_sup = false;
        this.guiControls.lim_inf = true;
      }
    }

    this.bola_salto.position.set(this.guiControls.radio_cil, this.guiControls.posicion_bola_y, 0);
    this.bola.rotation.y = this.guiControls.rotacion_bola_x;
  }
}
