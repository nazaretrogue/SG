class Taza extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui, titleGui);

    var cilindro_interno = new THREE.CylinderGeometry(3.5, 3.5, 10, 16);
    var asa = new THREE.TorusGeometry(3, 1, 10, 20);

    var material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    material.needsUpdate = true;

    cilindro_interno.translate(0, 1, 0);
    asa.translate(4, 0, 0);

    // Creamos las partes del sólido
    var solido_externo = new ThreeBSP(new THREE.CylinderGeometry(4, 4, 10, 16));
    var solido_interno = new ThreeBSP(cilindro_interno);
    var solido_asa = new ThreeBSP(asa);

    var jarra_llena = solido_externo.union(solido_asa);
    var taza_final = jarra_llena.subtract(solido_interno);
    this.taza = taza_final.toMesh(material);
    this.taza.geometry.computeFaceNormals();
    this.taza.geometry.computeVertexNormals();

    this.add(this.taza);
  }

  createGUI(gui, titleGui){
    this.guiControls = new function(){
      this.rotY = 0.0;
      this.rotZ = 0.0;
    }
  }

  update(giro){
    if(giro){
      this.guiControls.rotY += 0.01;
      this.guiControls.rotZ += 0.01;

      this.rotation.set(0.0, this.guiControls.rotY, this.guiControls.rotZ);
    }
  }
}
