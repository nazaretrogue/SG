class CorazonRecorrido extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var corazon_shape = this.crearShape();
    var recorrido = [];

    recorrido.push(new THREE.Vector3(-10, 0, 3));
    recorrido.push(new THREE.Vector3(0, 0, 0));
    recorrido.push(new THREE.Vector3(5, -2, 4));
    recorrido.push(new THREE.Vector3(10, 0, 8));

    var curva = new THREE.CatmullRomCurve3(recorrido);
    var extrusion = {curveSegments: 30, steps: 20, extrudePath: curva, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}

    var geometria = new THREE.ExtrudeBufferGeometry(corazon_shape, extrusion);//new THREE.BufferGeometry().setFromPoints(puntos);
    var material = new THREE.MeshPhongMaterial({color: 0x55ff00});

    this.corazon_recorrido_giro_y = new THREE.Mesh(geometria, material);
    this.corazon_recorrido_giro_x = new THREE.Object3D();

    this.corazon_recorrido_giro_y.rotation.z = Math.PI/2;
    this.corazon_recorrido_giro_x.add(this.corazon_recorrido_giro_y);
    this.add(this.corazon_recorrido_giro_x);
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

    this.corazon_recorrido_giro_y.rotation.y = this.guiControls.rotY;
    this.corazon_recorrido_giro_y.position.x = 20;
    this.corazon_recorrido_giro_x.rotation.x = this.guiControls.rotX;
  }

  crearShape(){
    var corazon_shape = new THREE.Shape();

    corazon_shape.moveTo(1, 1);
    corazon_shape.bezierCurveTo(1, 1, 4/5, 0, 0, 0);
    corazon_shape.bezierCurveTo(-6/5, 0, -6/5, 7/5, -6/5, 7/5);
    corazon_shape.bezierCurveTo(-6/5, 11/5,-3/5, 15.4/5, 1, 19/5);
    corazon_shape.bezierCurveTo(12/5, 15.4/5, 16/5, 11/5, 16/5, 7/5);
    corazon_shape.bezierCurveTo(16/5, 7/5, 16/5, 0, 2, 0);
    corazon_shape.bezierCurveTo(7/5, 0, 1, 1, 1, 1);

    return corazon_shape;
  }
}
