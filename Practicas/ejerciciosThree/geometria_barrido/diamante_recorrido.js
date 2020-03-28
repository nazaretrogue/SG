class DiamanteRecorrido extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var diamante_shape = this.crearShape();
    var recorrido = [];

    recorrido.push(new THREE.Vector3(-10, 0, 3));
    recorrido.push(new THREE.Vector3(0, 0, 0));
    recorrido.push(new THREE.Vector3(5, -2, 4));
    recorrido.push(new THREE.Vector3(10, 0, 8));

    var curva = new THREE.CatmullRomCurve3(recorrido);
    var extrusion = {curveSegments: 30, steps: 20, extrudePath: curva, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}

    var geometria = new THREE.ExtrudeBufferGeometry(diamante_shape, extrusion);//new THREE.BufferGeometry().setFromPoints(puntos);
    var material = new THREE.MeshPhongMaterial({color: 0x55ff00});

    this.diamante_recorrido_giro_y = new THREE.Mesh(geometria, material);
    this.diamante_recorrido_giro_x = new THREE.Object3D();

    this.diamante_recorrido_giro_y.rotation.z = Math.PI/2;
    this.diamante_recorrido_giro_x.add(this.diamante_recorrido_giro_y);
    this.add(this.diamante_recorrido_giro_x);
  }

  createGUI(gui, titleGui){
    this.guiControls = new function() {
      this.rotY = 0.0;
      this.rotX = 0.0;
    }
  }

  update(){
    this.guiControls.rotY += 0.01;
    this.guiControls.rotX += 0.01;

    this.diamante_recorrido_giro_y.rotation.y = this.guiControls.rotY;
    this.diamante_recorrido_giro_y.position.x = -20;
    this.diamante_recorrido_giro_x.rotation.x = this.guiControls.rotX;
  }

  crearShape(){
    var diamante_shape = new THREE.Shape();

    diamante_shape.moveTo(0, 2);
    diamante_shape.lineTo(0, 2);
    diamante_shape.lineTo(1, 0);
    diamante_shape.lineTo(0, -2);
    diamante_shape.lineTo(-1, 0);
    diamante_shape.lineTo(0, 2);

    return diamante_shape;
  }
}
