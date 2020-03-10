
class Pica extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    var pie = this.crearPie();

    // Creamos la figura primero
    var pica_shape = new THREE.Shape();

    pica_shape.moveTo(1, 1);
    pica_shape.bezierCurveTo(1, 1, 4/5, 0, 0, 0);
    pica_shape.bezierCurveTo(-6/5, 0, -6/5, 7/5, -6/5, 7/5);
    pica_shape.bezierCurveTo(-6/5, 11/5,-3/5, 15.4/5, 1, 19/5);
    pica_shape.bezierCurveTo(12/5, 15.4/5, 16/5, 11/5, 16/5, 7/5);
    pica_shape.bezierCurveTo(16/5, 7/5, 16/5, 0, 2, 0);
    pica_shape.bezierCurveTo(7/5, 0, 1, 1, 1, 1);

    // Para el barrido añadimos la configuración
    var extrusion = {curveSegments: 30, steps: 1, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}

    // Como material se crea uno a partir de un color
    var pica_material = new THREE.MeshPhongMaterial({color: 0xFF0000});

    // Creamos la geometría
    var pica_geom = new THREE.ExtrudeBufferGeometry(pica_shape, extrusion);

    // Ya podemos construir el Mesh. Le añadimos el pie de la pica
    this.pica = new THREE.Mesh(pica_geom, pica_material);
    pie.position.x = 1;
    pie.position.y = -2;
    pie.position.z = extrusion.depth/2;
    this.pica.add(pie);

    this.pica_giro_y = new THREE.Object3D();
    this.pica_giro_z = new THREE.Object3D();

    // Y añadirlo como hijo del Object3D (el this)
    this.pica_giro_y.add(this.pica);
    this.pica_giro_z.add(this.pica_giro_y);
    this.add(this.pica_giro_z);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.pica.position.x = -1;
    this.pica.position.y = -1;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.posX = -10.0;

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

    this.pica_giro_y.rotation.y = this.guiControls.rotY;
    this.pica_giro_z.position.x = -10;
    this.pica_giro_z.rotation.z = this.guiControls.rotZ_sobre_si;
    this.rotation.z = this.guiControls.rotZ_circular;
  }

  crearPie(){
    var puntos = [];

    puntos.push(new THREE.Vector2(0, 2));
    puntos.push(new THREE.Vector2(1, 0));
    puntos.push(new THREE.Vector2(0, 0));

    var pie_geom = new THREE.LatheGeometry(puntos);
    var pie_material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    pie_material.side = THREE.BackSide;

    return new THREE.Mesh(pie_geom, pie_material);
  }
}
