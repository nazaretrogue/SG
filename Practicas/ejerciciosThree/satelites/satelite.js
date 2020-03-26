class Satelite extends THREE.Object3D{
  constructor(gui,titleGui){
    super();

    this.createGUI(gui,titleGui);

    var geometria = new THREE.SphereGeometry(2, 32, 32);
    var textura = new THREE.TextureLoader().load('../imgs/balloony.jpg');
    var material = new THREE.MeshPhongMaterial({map: textura});

    this.mercurio_rotacion = new THREE.Mesh(geometria, material);
    this.mercurio_traslacion = new THREE.Object3D();
    this.mercurio = new THREE.Object3D();

    this.venus_rotacion = new THREE.Mesh(geometria, material);
    this.venus_traslacion = new THREE.Object3D();
    this.venus = new THREE.Object3D();

    this.marte_rotacion = new THREE.Mesh(geometria, material);
    this.marte_traslacion = new THREE.Object3D();
    this.marte = new THREE.Object3D();

    this.mercurio_rotacion.position.y = 2.5;
    this.venus_rotacion.position.y = 2.5;
    this.marte_rotacion.position.y = 2.5;

    this.mercurio_traslacion.add(this.mercurio_rotacion);
    this.venus_traslacion.add(this.venus_rotacion);
    this.marte_traslacion.add(this.marte_rotacion);

    this.mercurio.add(this.mercurio_traslacion);
    this.venus.add(this.venus_traslacion);
    this.marte.add(this.marte_traslacion);

    this.add(this.mercurio);
    this.add(this.venus);
    this.add(this.marte);
  }

  createGUI(gui,titleGui){
    this.guiControls = new function(){
      this.velocidad_traslacion = 0.0;

      this.rotacion_mercurio = 0.0;
      this.rotacion_venus = 0.0;
      this.rotacion_marte = 0.0;
    }
  }

  update(){
    this.guiControls.velocidad_traslacion += 0.01;
    this.guiControls.rotacion_mercurio -= 0.01;
    this.guiControls.rotacion_venus -= 0.02;
    this.guiControls.rotacion_marte -= 0.03;

    this.mercurio_rotacion.rotation.y = this.guiControls.velocidad_traslacion;
    this.mercurio_traslacion.position.x = 8;
    this.mercurio_traslacion.rotation.y = this.guiControls.rotacion_mercurio+Math.PI;
    this.mercurio.rotation.y = this.guiControls.velocidad_traslacion;

    this.venus_rotacion.rotation.y = this.guiControls.velocidad_traslacion;
    this.venus_traslacion.position.x = 14;
    this.venus_traslacion.rotation.y = this.guiControls.rotacion_venus;
    this.venus.rotation.y = this.guiControls.velocidad_traslacion;

    this.marte_rotacion.rotation.y = this.guiControls.velocidad_traslacion;
    this.marte_traslacion.position.x = 20;
    this.marte_traslacion.rotation.y = this.guiControls.rotacion_marte;
    this.marte.rotation.y = this.guiControls.velocidad_traslacion;
  }
}
