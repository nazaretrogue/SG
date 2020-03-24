
class Trebol extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    var pie = this.crearPie();

    // Creamos la figura primero
    var trebol_shape = new THREE.Shape();

    // Hoja inferior derecha
    trebol_shape.moveTo(2, 1);
    trebol_shape.quadraticCurveTo(1.5, 1, 1.5, 0.5);
    trebol_shape.quadraticCurveTo(1.5, 0, 2, 0);
    trebol_shape.quadraticCurveTo(2.5, 0, 2.5, 0.5);
    trebol_shape.quadraticCurveTo(2.5, 1, 2, 1);

    // Hoja inferior izquierda
    trebol_shape.moveTo(-0.5, 1);
    trebol_shape.quadraticCurveTo(-1, 1, -1, 0.5);
    trebol_shape.quadraticCurveTo(-1, 0, -0.5, 0);
    trebol_shape.quadraticCurveTo(0, 0, 0, 0.5);
    trebol_shape.quadraticCurveTo(0, 1, -0.5, 1);

    // Hoja superior
    trebol_shape.moveTo(1.25, 1);
    trebol_shape.quadraticCurveTo(1.25, 5.5);

    // Para el barrido añadimos la configuración
    var extrusion = {curveSegments: 30, steps: 1, depth: 1, bevelEnabled: true, bevelThickness: 0.5, bevelSize: 1, bevelSegments: 45}

    // Como material se crea uno a partir de un color
    var trebol_material = new THREE.MeshPhongMaterial({color: 0x000000});

    // Creamos la geometría
    var trebol_geom = new THREE.ExtrudeBufferGeometry(trebol_shape, extrusion);

    // Ya podemos construir el Mesh. Le añadimos el pie de la pica
    this.trebol = new THREE.Mesh(trebol_geom, trebol_material);
    pie.position.x = 0.75;
    pie.position.y = -2;
    pie.position.z = extrusion.depth/2;
    this.trebol.add(pie);
    this.add(this.trebol);

    this.trebol_giro_y = new THREE.Object3D();
    this.trebol_giro_z = new THREE.Object3D();

    this.trebol_giro_y.add(this.trebol);
    this.trebol_giro_z.add(this.trebol_giro_y);
    this.add(this.trebol_giro_z);

    this.trebol.position.x = -0.75;
    this.trebol.position.y = -1.25;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.posY = -10.0;

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

    this.trebol_giro_y.rotation.y = this.guiControls.rotY;
    this.trebol_giro_z.position.y = -10;
    this.trebol_giro_z.rotation.z = this.guiControls.rotZ_sobre_si;
    this.rotation.z = this.guiControls.rotZ_circular;
  }

  crearPie(){
    var puntos = [];

    puntos.push(new THREE.Vector2(0, 2));
    puntos.push(new THREE.Vector2(1, 0));
    puntos.push(new THREE.Vector2(0, 0));

    var pie_geom = new THREE.LatheGeometry(puntos);
    var pie_material = new THREE.MeshPhongMaterial({color: 0x000000});
    pie_material.side = THREE.BackSide;

    return new THREE.Mesh(pie_geom, pie_material);
  }
}
