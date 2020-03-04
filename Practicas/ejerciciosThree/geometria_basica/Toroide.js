
class Toroide extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var toro_geom = new THREE.TorusGeometry(1, 1, 8, 6);

    // Como material se crea uno a partir de un color
    var toro_material = new THREE.MeshNormalMaterial();
    toro_material.flatShading = true;
    toro_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.toro = new THREE.Mesh(toro_geom, toro_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.toro);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.toro.position.z = -2;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.radio = 1.0;
      this.grosor = 1.0;
      this.segments_radiales = 8;
      this.segments_tubulares = 6;

      this.rotZ = 0.0;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'radio', 0.1, 5.0, 0.1).name('Radio: ').listen();
    folder.add(this.guiControls, 'grosor', 0.1, 5.0, 0.1).name('Grosor: ').onChange(function(value){that.nuevaGeometria()});
    folder.add(this.guiControls, 'segments_radiales', 3, 64, 1).name('Resolución radial: ').onChange(function(value){that.nuevaGeometria()});
    folder.add(this.guiControls, 'segments_tubulares', 3, 64, 1).name('Resolución tubular: ').onChange(function(value){that.nuevaGeometria()});

    //folder.add(this.guiControls, 'reset').name('[Reset]');
  }

  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.rotZ += 0.01;
    this.rotation.set(Math.PI/2, 0.0, this.guiControls.rotZ);
    this.scale.set(this.guiControls.radio, this.guiControls.radio,  this.guiControls.radio);
  }

  nuevaGeometria(){
    // Para cambiar la resolución hay que reconstruir la geometría entera
    var toro_geom = new THREE.TorusGeometry(this.guiControls.radio, this.guiControls.grosor, this.guiControls.segments_radiales, this.guiControls.segments_tubulares);
    this.toro.geometry = toro_geom;
    this.toro.position.z = this.guiControls.radio;
    this.scale.set(this.guiControls.radio, this.guiControls.radio, this.guiControls.radio);
  }
}
