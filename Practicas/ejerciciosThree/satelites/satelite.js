class Satelite extends THREE.Object3D{
  constructor(gui,titleGui){
    super();

    this.createGUI(gui,titleGui);

    var geometria = new THREE.SphereGeometry(2, 32, 32);
    var textura = new THREE.TextureLoader().load('../imgs/balloony.jpg');
    var material = new THREE.MeshPhongMaterial({map: textura});

    this.mercurio = new THREE.Mesh(geometria, material);
    this.venus = new THREE.Mesh(geometria, material);
    this.marte = new THREE.Mesh(geometria, material);

    // this.mercurio.position.set(-8, 2.5, 0);
    // this.venus.position.set(-14, 2.5, 0);
    // this.marte.position.set(-20, 2.5, 0);

    this.add(this.mercurio);
    this.add(this.venus);
    this.add(this.marte);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){

    }
  }

  update(){

  }
}
