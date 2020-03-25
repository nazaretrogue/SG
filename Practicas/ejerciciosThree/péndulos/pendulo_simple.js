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

      this.animacion = 0.0;
      this.lim_superior = false;
      this.lim_inferior = false;
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

  update_animacion(longitud_pendulo_rojo, velocidad){
    this.long_pend_rojo = longitud_pendulo_rojo;

    var posY = 2+(this.long_pend_rojo*this.guiControls.pos_pend)+this.guiControls.longitud_pend/10;

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

    this.position.set(0.0, -posY, 0.0);
    this.rotation.set(0.0, 0.0, this.guiControls.animacion);
    this.scale.set(1.0, this.guiControls.longitud_pend/10, 1.0);
  }
}
