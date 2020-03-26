class Tierra extends THREE.Object3D{
  constructor(gui,titleGui){
    super();

    this.createGUI(gui,titleGui);

    var geometria = new THREE.SphereGeometry(3, 32, 32);
    var textura = new THREE.TextureLoader().load('../imgs/tierra.jpg');
    var material = new THREE.MeshPhongMaterial({map: textura});

    this.tierra = new THREE.Mesh(geometria, material);

    this.tierra.position.y = 3;

    this.add(this.tierra);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){
      this.rotacion = 0.0;
    }
  }

  update(){
    this.guiControls.rotacion += 0.01;

    this.tierra.rotation.y = this.guiControls.rotacion;
  }
}
