
class Corazon extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Creamos la figura primero
    var corazon_shape = new THREE.Shape();

    corazon_shape.moveTo(1, 1);
    corazon_shape.bezierCurveTo(1, 1, 4/5, 0, 0, 0);
    corazon_shape.bezierCurveTo(-6/5, 0, -6/5, 7/5, -6/5, 7/5);
    corazon_shape.bezierCurveTo(-6/5, 11/5,-3/5, 15.4/5, 1, 19/5);
    corazon_shape.bezierCurveTo(12/5, 15.4/5, 16/5, 11/5, 16/5, 7/5);
    corazon_shape.bezierCurveTo(16/5, 7/5, 16/5, 0, 2, 0);
    corazon_shape.bezierCurveTo(7/5, 0, 1, 1, 1, 1);

    // Para el barrido añadimos la configuración
    var extrusion = {curveSegments: 30, steps: 1, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}

    // Como material se crea uno a partir de un color
    var corazon_material = new THREE.MeshPhongMaterial({color: 0xFF0000});

    // Creamos la geometría
    var corazon_geom = new THREE.ExtrudeBufferGeometry(corazon_shape, extrusion);

    // Ya podemos construir el Mesh
    this.corazon = new THREE.Mesh(corazon_geom, corazon_material);
    this.corazon_giro_y = new THREE.Object3D();
    this.corazon_giro_z = new THREE.Object3D();

    // Y añadirlo como hijo del Object3D (el this)
    this.corazon_giro_y.add(this.corazon);
    this.corazon_giro_z.add(this.corazon_giro_y);
    this.add(this.corazon_giro_z);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.corazon.rotation.z = Math.PI;
    this.corazon.position.x = 1;
    this.corazon.position.y = 2;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.posX = 10.0;

      this.rotY = 0.0;
      this.rotZ_sobre_si = 0.0;
      this.rotZ_circular = 0.0;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);

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

    this.corazon_giro_y.rotation.y = this.guiControls.rotY;
    this.corazon_giro_z.position.x = 10;
    this.corazon_giro_z.rotation.z = this.guiControls.rotZ_sobre_si;
    this.rotation.z = this.guiControls.rotZ_circular;
  }
}
