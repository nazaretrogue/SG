class Escuadra extends THREE.Object3D{
  constructor(gui, titleGui){
    super();

    this.createGUI(gui, titleGui);

    var material = new THREE.MeshNormalMaterial();
    material.flatShading = true;
    material.needsUpdate = true;

    var figura = this.creaEscuadra();
    var cono_sup = new THREE.ConeGeometry(0.2, 1, 8);
    var cono_inf = new THREE.ConeGeometry(0.2, 1, 8);

    cono_sup.rotateZ(Math.PI/2);
    cono_sup.translate(0.2, 0.8, 0.5);

    cono_inf.rotateZ(Math.PI);
    cono_inf.translate(1.6, -0.8, 0.5);

    var escuadra_solido = new ThreeBSP(figura);
    var cono_sup_sol = new ThreeBSP(cono_sup);
    var cono_inf_sol = new ThreeBSP(cono_inf);

    var escuadra_1_agujero = escuadra_solido.subtract(cono_sup_sol);
    var escuadra_final = escuadra_1_agujero.subtract(cono_inf_sol);

    this.escuadra = escuadra_final.toMesh(material);
    this.escuadra.geometry.computeFaceNormals();
    this.escuadra.geometry.computeVertexNormals();

    this.add(this.escuadra);
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

  creaEscuadra(){
    var escuadra_shape = new THREE.Shape();

    escuadra_shape.moveTo(0, -1);
    escuadra_shape.lineTo(0, 1);
    escuadra_shape.lineTo(0.1, 1);
    escuadra_shape.lineTo(0.1, 0);
    escuadra_shape.quadraticCurveTo(0.1, -0.9, 1, -0.9);
    escuadra_shape.lineTo(2, -0.9);
    escuadra_shape.lineTo(2, -1);
    escuadra_shape.lineTo(0, -1);

    var extrusion = {curveSegments: 15, steps: 1, depth: 1, bevelEnabled: false};

    return new THREE.ExtrudeGeometry(escuadra_shape, extrusion);
  }
}
