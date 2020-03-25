class PenduloCompuesto extends THREE.Object3D{
  constructor(gui,titleGui){
    super();

    this.createGUI(gui,titleGui);

    var geometria_movil = new THREE.BoxGeometry(1, 5, 1);
    var geometria_fija1 = new THREE.BoxGeometry(1, 4, 1);
    var geometria_fija2 = new THREE.BoxGeometry(1, 4, 1);

    var material_verde = new THREE.MeshPhongMaterial({color: 0x00FF00});
    var material_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000});

    this.pend_sup = new THREE.Mesh(geometria_fija1, material_verde);
    this.pend_inf = new THREE.Mesh(geometria_fija2, material_verde);
    this.pendulo = new THREE.Mesh(geometria_movil, material_rojo);

    this.add(this.pend_sup);
    this.add(this.pend_inf);
    this.add(this.pendulo);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){
      this.longitud_pend = 5;
      this.giro_pend = 0;
      this.animacion = 0.0;

      this.lim_superior = false;
      this.lim_inferior = false;
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, 'longitud_pend', 5, 10, 1).name('Longitud: ').listen();
    folder.add(this.guiControls, 'giro_pend', -Math.PI/4, Math.PI/4, 0.1).name('Giro: ').listen();
  }

  update(){
    let rotacion = this.guiControls.animacion + this.guiControls.giro_pend;

    this.pendulo.position.set(0.0, -2-this.guiControls.longitud_pend/2, 0.0);
    this.pend_inf.position.set(0.0, -4-this.guiControls.longitud_pend, 0.0);
    this.rotation.set(0.0, 0.0, rotacion);
    this.pendulo.scale.y = this.guiControls.longitud_pend/5;
  }

  update_animacion(velocidad){
    if(!this.guiControls.lim_superior){
      this.guiControls.animacion += 0.01*velocidad;

      let aux = this.guiControls.animacion + 0.01*velocidad;

      if(aux >= Math.PI/4){
        this.guiControls.lim_superior = true;
        this.guiControls.lim_inferior = false;
      }
    }

    else if(!this.guiControls.lim_inferior){
      this.guiControls.animacion -= 0.01*velocidad;

      let aux = this.guiControls.animacion - 0.01*velocidad;

      if(aux <= -Math.PI/4){
        this.guiControls.lim_inferior = true;
        this.guiControls.lim_superior = false;
      }
    }

    this.pendulo.position.set(0.0, -2-this.guiControls.longitud_pend/2, 0.0);
    this.pend_inf.position.set(0.0, -4-this.guiControls.longitud_pend, 0.0);
    this.rotation.set(0.0, 0.0, this.guiControls.animacion);
    this.pendulo.scale.y = this.guiControls.longitud_pend/5;
  }

  getLongitudRoja(){
    return this.guiControls.longitud_pend;
  }
}
