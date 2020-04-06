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
    this.bola = new THREE.Mesh(geom_bola, mat_bola);

    this.cilindro.position.y = 1.5;
    this.bola.position.set(3, 1.5, 0);

    this.add(this.cilindro);
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
    var spline = this.crearSpline();
    this.cilindro.scale.x = this.guiControls.radio_cil/5;

    var tiempo = Date.now();
    var tiempo_giro = 4000;
    var t = (tiempo%tiempo_giro)/tiempo_giro;
    var pos = spline.getPointAt(t);
    var tangente = spline.getTangentAt(t);

    this.bola.position.copy(pos);
    pos.add(tangente);
    this.bola.lookAt(pos);
  }

  crearSpline(){
    var puntos = [];
    for(let i=0; i<2*Math.PI; i+=0.1){
      let x = this.guiControls.radio_cil*Math.cos(i);
      let y = 5*Math.sin(i);
      puntos.push(new THREE.Vector3(x, 1.5, y));
    }

    var spline = new THREE.CatmullRomCurve3(puntos);

    return spline;
  }
}
