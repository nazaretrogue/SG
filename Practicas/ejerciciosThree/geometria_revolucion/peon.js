
class Peon extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    this.setPuntos();

    // Un Mesh se compone de geometría y material
    var peon_geom = new THREE.LatheGeometry(this.puntos, 12, 0, 2*Math.PI);

    // Como material se crea uno a partir de un color
    var peon_material = new THREE.MeshNormalMaterial();
    peon_material.flatShading = true;
    peon_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.peon = new THREE.Mesh(peon_geom, peon_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.peon);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.peon.position.y = Math.abs(this.puntos[0].getComponent(1) - this.puntos[this.puntos.length-1].getComponent(1))/2;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.segments = 12;
      this.angulo = 2*Math.PI;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'segments', 4, 64, 2).name('Resolución: ').onChange(function(value){that.nuevaGeometria()});
    folder.add(this.guiControls, 'angulo', 0, 2*Math.PI, Math.PI/4).name('Ángulo: ').onChange(function(value){that.nuevaGeometria()});

    //folder.add(this.guiControls, 'reset').name('[Reset]');
  }

  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    // No se hace nada
  }

  nuevaGeometria(){
    // Para cambiar la resolución hay que reconstruir la geometría entera
    var peon_geom = new THREE.LatheGeometry(this.puntos, this.guiControls.segments, 0, this.guiControls.angulo);
    this.peon.geometry = peon_geom;
    this.peon.position.y = Math.abs(this.puntos[0].getComponent(1) - this.puntos[this.puntos.length-1].getComponent(1))/2;
  }

  setPuntos(){
    // Puntos del peón extraídos de un ply
    this.puntos = [];

    this.puntos.push(new THREE.Vector3(0.0, -1.4, 0.0));
    this.puntos.push(new THREE.Vector3(1.0, -1.4, 0.0));
    this.puntos.push(new THREE.Vector3(1.0, -1.1, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, -0.7, 0.0));
    this.puntos.push(new THREE.Vector3(0.4, -0.4, 0.0));
    this.puntos.push(new THREE.Vector3(0.4, 0.5, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, 0.6, 0.0));
    this.puntos.push(new THREE.Vector3(0.3, 0.6, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, 0.8, 0.0));
    this.puntos.push(new THREE.Vector3(0.55, 1.0, 0.0));
    this.puntos.push(new THREE.Vector3(0.5, 1.2, 0.0));
    this.puntos.push(new THREE.Vector3(0.3, 1.4, 0.0));
    this.puntos.push(new THREE.Vector3(0.0, 1.4, 0.0));
  }

  getLinea(){
    // Creamos la geometría para la línea
    var linea_geom = new THREE.Geometry();
    linea_geom.vertices = this.puntos;

    var linea_material = new THREE.MeshPhongMaterial({color: 0x000000});

    // Se crea la línea
    this.linea = new THREE.Line(linea_geom, linea_material);

    return this.linea;
  }
}
