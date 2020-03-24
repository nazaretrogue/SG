
class Diamante extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Creamos la figura primero
    var diamante_shape = new THREE.Shape();

    var puntos = [];

    diamante_shape.moveTo(0, 2);
    diamante_shape.lineTo(0, 2);
    diamante_shape.lineTo(1, 0);
    diamante_shape.lineTo(0, -2);
    diamante_shape.lineTo(-1, 0);
    diamante_shape.lineTo(0, 2);

    // Para el barrido añadimos la configuración
    var extrusion = {curveSegments: 15, steps: 1, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 5}

    // Como material se crea uno a partir de un color
    var diamante_material = new THREE.MeshPhongMaterial({color: 0x000000});

    // Creamos la geometría
    var diamante_geom = new THREE.ExtrudeBufferGeometry(diamante_shape, extrusion);

    // Ya podemos construir el Mesh
    this.diamante = new THREE.Mesh(diamante_geom, diamante_material);
    this.diamante_giro_y = new THREE.Object3D();
    this.diamante_giro_z = new THREE.Object3D();

    // Y añadirlo como hijo del Object3D (el this)
    this.diamante_giro_y.add(this.diamante);
    this.diamante_giro_z.add(this.diamante_giro_y);
    this.add(this.diamante_giro_z);

    //this.diamante.position.y = -10;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.posY = 10.0;

      this.rotY = 0.0;
      this.rotZ_sobre_si = 0.0;
      this.rotZ_circular = 0.0;
    }

    // No se hace nada
  }

  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    this.guiControls.rotY += 0.01;
    this.guiControls.rotZ_sobre_si -= 0.01;
    this.guiControls.rotZ_circular += 0.01;

    this.diamante_giro_y.rotation.y = this.guiControls.rotY;
    this.diamante_giro_z.position.y = 10;
    this.diamante_giro_z.rotation.z = this.guiControls.rotZ_sobre_si;
    this.rotation.z = this.guiControls.rotZ_circular;
  }
}
