class Reloj extends THREE.Object3D{
  constructor(gui, titleGui){
    super();

    this.createGUI(gui, titleGui);

    var geometria = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshPhongMaterial({color: 0x00FF00});
    var mat_rojo = new THREE.MeshPhongMaterial({color: 0xFF0000});

    this.minutero = new THREE.Mesh(geometria, mat_rojo);
    this.minutero_giro = new THREE.Object3D();

    var h12 = new THREE.Mesh(geometria, material);
    var h1 = new THREE.Mesh(geometria, material);
    var h2 = new THREE.Mesh(geometria, material);
    var h3 = new THREE.Mesh(geometria, material);
    var h4 = new THREE.Mesh(geometria, material);
    var h5 = new THREE.Mesh(geometria, material);
    var h6 = new THREE.Mesh(geometria, material);
    var h7 = new THREE.Mesh(geometria, material);
    var h8 = new THREE.Mesh(geometria, material);
    var h9 = new THREE.Mesh(geometria, material);
    var h10 = new THREE.Mesh(geometria, material);
    var h11 = new THREE.Mesh(geometria, material);

    this.minutero.position.set(0, 0, -7.5);

    h12.position.z = -10;
    h1.position.set(4.9, 0.0, -8.7);
    h2.position.set(8.8, 0.0, -4.6);
    h3.position.x = 10;
    h4.position.set(8.8, 0.0, 4.6);
    h5.position.set(4.9, 0.0, 8.7);
    h6.position.z = 10;
    h7.position.set(-4.9, 0.0, 8.7);
    h8.position.set(-8.8, 0.0, 4.6);
    h9.position.x = -10;
    h10.position.set(-8.8, 0.0, -4.6);
    h11.position.set(-4.9, 0.0, -8.7);

    this.minutero_giro.add(this.minutero);
    this.add(this.minutero_giro);

    this.add(h12);
    this.add(h1);
    this.add(h2);
    this.add(h3);
    this.add(h4);
    this.add(h5);
    this.add(h6);
    this.add(h7);
    this.add(h8);
    this.add(h9);
    this.add(h10);
    this.add(h11);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){
      this.rotY = 0.0;
      this.velocidad = 1;
    }

    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'velocidad', -4, 4, 1).name('Velocidad: ').listen();
  }

  update(){
    this.guiControls.rotY += 0.01*this.guiControls.velocidad;
    this.minutero_giro.rotation.y = this.guiControls.rotY;
  }
}
