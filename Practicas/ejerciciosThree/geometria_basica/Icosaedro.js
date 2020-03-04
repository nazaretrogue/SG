
class Icosaedro extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var ico_geom = new THREE.IcosahedronGeometry(1, 0);

    // Como material se crea uno a partir de un color
    var ico_material = new THREE.MeshNormalMaterial();
    ico_material.flatShading = true;
    ico_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.ico = new THREE.Mesh(ico_geom, ico_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.ico);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.ico.position.y = 1;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.radio = 1.0;
      this.detalle = 0;

      this.rotY = 0.0;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'radio', 0.1, 5.0, 0.1).name('Radio: ').listen();
    folder.add(this.guiControls, 'detalle', 0, 5, 1).name('Detalle: ').onChange(function(value){that.nuevaGeometria()});

    //folder.add(this.guiControls, 'reset').name('[Reset]');
  }

  update() {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.guiControls.rotY += 0.01;
    this.rotation.set(0.0, this.guiControls.rotY, 0.0);
    this.scale.set(this.guiControls.radio, this.guiControls.radio,  this.guiControls.radio);
  }

  nuevaGeometria(){
    // Para cambiar la resolución hay que reconstruir la geometría entera
    var ico_geom = new THREE.IcosahedronGeometry(this.guiControls.radio, this.guiControls.detalle);
    this.ico.geometry = ico_geom;
    this.ico.position.y = this.guiControls.radio;
    this.scale.set(this.guiControls.radio, this.guiControls.radio, this.guiControls.radio);
  }
}
