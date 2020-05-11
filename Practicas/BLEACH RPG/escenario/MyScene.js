class MyScene extends Physijs.Scene {
  constructor(myCanvas) {
    Physijs.scripts.worker = '../libs/physijs_worker.js';
    Physijs.scripts.ammo = '../libs/ammo.js';

    super();

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    this.setGravity(new THREE.Vector3(0, -10, 0));

    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper(5);
    this.add(this.axis);

    // Modelos
    this.escenario = new Escenario();
    this.add(this.escenario);

    this.ichigo = new Ichigo();
    this.add(this.ichigo);

    this.alma = new Alma();
    this.alma.position.set(55, 0, 30);
    this.add(this.alma);

    // this.caja_ichigo = new Physijs.BoxMesh(new THREE.BoxGeometry(8,7,11.5),   // Caja de Three
    //   Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0xFFFFFF * Math.random(), wireframe: true}), 0.0, 0.0), 70.0);
    //
    // // Lo situamos por encima del suelo porque si no salta
    // //this.caja_ichigo.position.y = 3.5;
    //
    // //this.caja_ichigo.add(this.ichigo);
    // this.caja_ichigo.colisionable = true;
    // this.add(this.caja_ichigo);
    // this.ichigo.position.y = -3.5;
    // this.caja_ichigo.add(this.ichigo);

    this.grimmjow = new Grimmjow();
    this.grimmjow.position.set(50, 0, 30);
    this.grimmjow.rotation.y = -Math.PI/2;
    this.add(this.grimmjow);

    this.juego_fin = false;

    // this.aizen = new Aizen();
    // this.aizen.position.z = 10;
    // this.add(this.aizen);
    //
    // this.ulquiorra = new Ulquiorra();
    // this.ulquiorra.position.x = -10;
    // this.add(this.ulquiorra);

    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI();

    // Elementos necesarios en la escena
    this.createLights();
    this.createGround();

    // Creamos la cámara al final porque su posición depende del personaje
    this.createCamera();
  }

  createCamera() {
    // Vamos a crear una cámara en tercera persona que siga al personaje. Indicamos
    // El ángulo del campo de visión en grados sexagesimales, el ratio ancho/alto
    // y los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);

    // Se coloca cerca del hombro del personaje principal
    this.camera.position.set(this.ichigo.position.x-10, this.ichigo.position.y+7, this.ichigo.position.z-30);

    // Y mira más allá del personaje
    var look = new THREE.Vector3(this.ichigo.position.x, this.ichigo.position.y+7, this.ichigo.position.z);
    this.camera.lookAt(look);
    this.add(this.camera);
  }

  createGround() {
    // Vamos a crear un suelo físico

    var geometria = new THREE.BoxGeometry(110,0.2,110);
    var mat_transparente = new THREE.MeshNormalMaterial({opacity:0.0,transparent:true})
    var matf = Physijs.createMaterial(mat_transparente, 0.9, 0.3);

    // Ya se puede construir el Mesh físico
    var ground = new Physijs.BoxMesh(geometria, matf, 0);

    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;

    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add(ground);
  }

  createGUI() {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();
    var that = this;

    // La escena le va a añadir sus propios controles.
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
      this.vida_ichigo = that.ichigo.vida;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder('Luz y Ejes');

    // Se le añade un control para la intensidad de la luz
    folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');

    // Y otro para mostrar u ocultar los ejes
    folder.add(this.guiControls, 'axisOnOff').name('Mostrar ejes : ');

    var personajes = gui.addFolder('Personajes');

    personajes.add(this.guiControls, 'vida_ichigo', 0, this.ichigo.vida, 0).name('Kurosaki Ichigo: ');

    return gui;
  }

  createLights() {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add(ambientLight);

    // La luz focal de la escena no es blanca, sino violeta muy claro, ya que
    // el escenario está ambientado en un lugar rocoso con luz de cristales morados
    // y los reflejos que da por tanto no pueden ser blancos
    this.spotLight = new THREE.SpotLight(0xD9B3FF, this.guiControls.lightIntensity);
    this.spotLight.position.set(60, 60, 40);
    this.add(this.spotLight);
  }

  createRenderer(myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  getCamera() {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  setCameraAspect(ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }

  cameraUpdate(){
    // Actualizamos la posición cuando el personaje se mueve
    this.camera.position.set(this.ichigo.position.x-10, this.ichigo.position.y+7, this.ichigo.position.z-30);
    var look = new THREE.Vector3(this.ichigo.position.x, this.ichigo.position.y+7, this.ichigo.position.z);

    //this.camera.position.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.4//));
    this.camera.lookAt(look);
  }

  onWindowResize() {
    // Este método es llamado cada vez que el usuario modifica el tamaño de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect(window.innerWidth/window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  update() {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.

    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(()=>this.update())

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;

    // Se muestran o no los ejes según lo que idique la GUI
    this.axis.visible = this.guiControls.axisOnOff;

    // Se actualiza la posición de la cámara según su controlador
    this.cameraUpdate();
    // this.updateCajasFisicas();

    // Se actualiza el resto del modelo

    this.alma.update();
    var vida_restada = this.grimmjow.update(this.ichigo.position);
    //console.log(vida_restada);

    this.ichigo.disminuirVida(vida_restada);

    if(!this.juego_fin && this.ichigo.vida <= 0){
      alert("¡Has perdido!");
      this.juego_fin = true;
    }

    else if(!this.juego_fin && this.grimmjow.vida <= 0){
      alert("¡ENHORABUENA! ¡Has ganado! Has recuperado tu alma");
      this.juego_fin = true;
    }

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
    //this.simulate();
  }

  // updateCajasFisicas(){
  //   this.caja_ichigo.position.set(this.ichigo.position.x, this.ichigo.position.y+7, this.ichigo.position.z);
  // }
}

/// La función   main
$(function() {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener("resize", ()=>scene.onWindowResize());
  window.addEventListener('keypress', (event)=>scene.ichigo.update(event));
  window.addEventListener('mousedown', (event)=>scene.ichigo.update(event));

  // Que no se nos olvide, la primera visualización.
  scene.update();
});
