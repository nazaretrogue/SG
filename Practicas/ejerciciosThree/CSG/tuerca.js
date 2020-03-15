class Tuerca extends THREE.Object3D{
  constructor(gui, titleGui){
    super();

    this.createGUI(gui, titleGui);

    var material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    material.needsUpdate = true;

    var agujero = this.crear_dientes();
    var esfera = new THREE.SphereGeometry(1, 32, 32);
    var caras_tuerca = new THREE.CylinderGeometry(1, 1, 0.8, 6);

    var agujero_bsp = new ThreeBSP(agujero);
    var esfera_bsp = new ThreeBSP(esfera);
    var caras_tuerca_bsp = new ThreeBSP(caras_tuerca);

    var forma_tuerca = esfera_bsp.intersect(caras_tuerca_bsp);
    var tuerca_final = forma_tuerca.subtract(agujero_bsp);

    this.tuerca = tuerca_final.toMesh(material);
    this.tuerca.geometry.computeFaceNormals();
    this.tuerca.geometry.computeVertexNormals();

    this.add(this.tuerca);
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

  crear_dientes(){
    var puntos = [];

    puntos.push(new THREE.Vector3(0, -0.7, 0));
    puntos.push(new THREE.Vector3(0.5, -0.7, 0));
    puntos.push(new THREE.Vector3(0.4, -0.65, 0));
    puntos.push(new THREE.Vector3(0.5, -0.6, 0));
    puntos.push(new THREE.Vector3(0.4, -0.55, 0));
    puntos.push(new THREE.Vector3(0.5, -0.5, 0));
    puntos.push(new THREE.Vector3(0.4, -0.45, 0));
    puntos.push(new THREE.Vector3(0.5, -0.4, 0));
    puntos.push(new THREE.Vector3(0.4, -0.35, 0));
    puntos.push(new THREE.Vector3(0.5, -0.3, 0));
    puntos.push(new THREE.Vector3(0.4, -0.25, 0));
    puntos.push(new THREE.Vector3(0.5, -0.2, 0));
    puntos.push(new THREE.Vector3(0.4, -0.15, 0));
    puntos.push(new THREE.Vector3(0.5, -0.1, 0));
    puntos.push(new THREE.Vector3(0.4, -0.05, 0));
    puntos.push(new THREE.Vector3(0.5, 0, 0));
    puntos.push(new THREE.Vector3(0.4, 0.05, 0));
    puntos.push(new THREE.Vector3(0.5, 0.1, 0));
    puntos.push(new THREE.Vector3(0.4, 0.15, 0));
    puntos.push(new THREE.Vector3(0.5, 0.2, 0));
    puntos.push(new THREE.Vector3(0.4, 0.25, 0));
    puntos.push(new THREE.Vector3(0.5, 0.3, 0));
    puntos.push(new THREE.Vector3(0.4, 0.35, 0));
    puntos.push(new THREE.Vector3(0.5, 0.4, 0));
    puntos.push(new THREE.Vector3(0.4, 0.45, 0));
    puntos.push(new THREE.Vector3(0.5, 0.5, 0));
    puntos.push(new THREE.Vector3(0, 0.5, 0));

    return new THREE.LatheGeometry(puntos, 12, 0, 2*Math.PI);
  }
}
