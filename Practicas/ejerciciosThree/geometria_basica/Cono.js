
class Cono extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var cono_geom = new THREE.ConeGeometry(1,1,8);
    // Como material se crea uno a partir de un color
    //var cono_material = new THREE.MeshPhongMaterial({color: 0xFFFF00});
    var cono_material = new THREE.MeshNormalMaterial();
    cono_material.flatShading = true;
    cono_material.needsUpdate = true;

    // Ya podemos construir el Mesh
    this.cono = new THREE.Mesh(cono_geom, cono_material);
    // Y añadirlo como hijo del Object3D (el this)
    this.add(this.cono);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.cono.position.y = 0.5;
  }

  createGUI(gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function() {
      this.radio = 1.0;
      this.altura = 1.0;
      this.segments = 8;

      this.rotY = 0.0;
    }

    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder(titleGui);
    var that = this;
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add(this.guiControls, 'radio', 0.1, 5.0, 0.1).name('Radio: ').listen();
    folder.add(this.guiControls, 'altura', 0.1, 5.0, 0.1).name('Altura: ').listen();
    folder.add(this.guiControls, 'segments', 3, 64, 1).name('Resolución: ').onChange(function(value){that.nuevaGeometria()});

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
    this.scale.set(this.guiControls.radio, this.guiControls.altura, this.guiControls.radio);
  }

  nuevaGeometria(){
    // Para cambiar la resolución hay que reconstruir la geometría entera
    var cono_geom = new THREE.ConeGeometry(this.guiControls.radio, this.guiControls.altura, this.guiControls.segments);
    this.cono.geometry = cono_geom;
    this.cono.position.y = this.guiControls.altura/2;
    this.scale.set(this.guiControls.radio, this.guiControls.altura, this.guiControls.radio);
  }
}
