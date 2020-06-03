class MyScene extends Physijs.Scene {
  constructor(my_canvas) {
    // Scripts para el motor de físicas
    Physijs.scripts.worker = '../libs/physijs_worker.js';
    Physijs.scripts.ammo = '../libs/ammo.js';

    super();

    // Creamos el visualizador con el lienzo en el que se mostrarán las escenas renderizadas
    this.renderer = this.createRenderer(my_canvas);

    // Establecemos una gravedad de 10 (aproximadamente la gravedad real)
    this.setGravity(new THREE.Vector3(0, -10, 0));

    // Modelos. Primero cargamos el escenario
    this.escenario = new Escenario();
    this.add(this.escenario);

    /**************************************************************************/
    /************************Personaje protagonista****************************/
    /**************************************************************************/

    this.modelo_ichigo = new Ichigo('ichigo/Ichigo', 25);

    var geom_caja = new THREE.BoxGeometry(8, 7, 3);
    geom_caja.translate(0, 0, 0);

    var mat_invisible = new THREE.MeshBasicMaterial({transparent:true, opacity:0.0});
    var mat_fis = Physijs.createMaterial(mat_invisible, 1, 0);

    // Creamos una caja física transparente para simular un modelo físico
    this.ichigo = new Physijs.BoxMesh(geom_caja, mat_fis, 1.0);

    this.modelo_ichigo.position.y = -3.5;
    this.ichigo.position.set(0, 3.5, 0);

    // Debemos activar las flags de Physijs para los objetos para poder moverlos y rotarlos y que sean colisionables
    this.ichigo.__dirtyPosition = true;
    this.ichigo.__dirtyRotation = true;
    this.ichigo.colisionable = true;

    // Añadimos el modelo a la caja y la caja a la escena
    this.ichigo.add(this.modelo_ichigo);
    this.add(this.ichigo);

    /**************************************************************************/
    /**************************Personajes enemigos*****************************/
    /**************************************************************************/

    this.modelo_grimmjow = new Grimmjow('grimmjow/Grimmjow', 30);

    this.grimmjow = new Physijs.BoxMesh(geom_caja, mat_fis, 1.0);

    this.modelo_grimmjow.position.y = -3.5;
    this.grimmjow.position.set(30, 3.5, 30);
    this.grimmjow.rotation.y = -Math.PI/2;

    this.grimmjow.colisionable = true;

    this.grimmjow.add(this.modelo_grimmjow);
    this.add(this.grimmjow);

    /**************************************************************************/
    /************************Otros objetos del juego***************************/
    /**************************************************************************/

    // Añadimos el alma: es el objetivo del protagonista
    this.alma = new Alma();
    this.alma.position.set(50, 0, 50);
    this.add(this.alma);

    this.fin_juego = false

    /**************************************************************************/
    /*************************Gestión de colisiones****************************/
    /**************************************************************************/

    var enemigo = this.grimmjow;
    var modelo_enemigo = this.modelo_grimmjow;
    var tu = this.ichigo;
    var modelo_tu = this.modelo_ichigo;

    // Grimmjow ataca
    this.grimmjow.addEventListener('collision',
      function(tu){
        // Comprobamos si los personajes están en rango para atacarse
        if(Math.abs(enemigo.position.x-tu.position.x) <= 5.0 &&
           Math.abs(enemigo.position.z-tu.position.z) <= 5.0){
             // Tanto el protagonista (tú) como el enemigo se hacen daño mutuo en cada colisión
             var damage = modelo_tu.atacaEnemigo(tu.position, enemigo.position);
             modelo_enemigo.disminuirVida(damage);
             damage = modelo_enemigo.atacaEnemigo(enemigo.position, tu.position, tu.rotation.y);
             modelo_tu.disminuirVida(damage);
        }
    });

    // La GUI contará con la gestión de luces y los contadores de vida de los personajes
    this.gui = this.createGUI();

    // Elementos necesarios en la escena
    this.createLights();
    this.createGround();

    // Creamos la cámara al final porque su posición depende del protagonista
    this.createCamera();
  }

  createCamera() {
    // Vamos a crear una cámara en tercera persona que siga al personaje. Indicamos
    // el ángulo del campo de visión, el ratio ancho/alto y los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);

    // Se coloca cerca del hombro del personaje principal
    this.camera.position.set(this.ichigo.position.x-10, this.ichigo.position.y+7, this.ichigo.position.z-30);

    // Y mira más allá del personaje
    var look = new THREE.Vector3(this.ichigo.position.x, this.ichigo.position.y+7, this.ichigo.position.z);
    this.camera.lookAt(look);
    this.add(this.camera);
  }

  createGround() {
    // Vamos a crear un suelo y paredes físicas para controlar que los personajes no salgan del mapa
    var geom_suelo = new THREE.BoxGeometry(110,0.2,110);
    var geom_pared = new THREE.BoxGeometry(110, 30, 0.2);
    var mat_transparente = new THREE.MeshNormalMaterial({opacity:0.0, transparent:true})
    var matf = Physijs.createMaterial(mat_transparente, 0.9, 0.3);

    // Construimos cada parte por separado
    var ground = new Physijs.BoxMesh(geom_suelo, matf, 0);
    var wall1 = new Physijs.BoxMesh(geom_pared, matf, 1);
    var wall2 = new Physijs.BoxMesh(geom_pared, matf, 1);
    var wall3 = new Physijs.BoxMesh(geom_pared, matf, 1);
    var wall4 = new Physijs.BoxMesh(geom_pared, matf, 1);

    // Posicionamos las paredes donde corresponde
    ground.position.y = -0.1;
    wall1.position.set(0, 15, 55);
    wall2.position.set(0, 15, -55);
    wall1.colisionable = true;

    wall3.position.set(55, 15, 0);
    wall3.rotation.y = Math.PI/2;

    wall4.position.set(-55, 15, 0);
    wall4.rotation.y = Math.PI/2;

    // Unimos las paredes al suelo para crear una única figura
    ground.add(wall1);
    ground.add(wall2);
    ground.add(wall3);
    ground.add(wall4);

    // Añadimos el suelo con las paredes a la escena
    this.add(ground);
  }

  createGUI() {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();
    var that = this;

    this.guiControls = new function() {
      // Solo se podrán controlar las luces
      this.lightIntensity = 0.5;

      // La barra de vida del personaje será meramente informativa de la vida
      // restante de cada personaje en cada momento
      this.vida_ichigo = that.modelo_ichigo.vida;
      this.vida_grimmjow = that.modelo_grimmjow.vida;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder('Luces');

    // Se le añade un control para la intensidad de la luz
    folder.add(this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');

    // Sección para la barra de vida de los personajes
    var personajes = gui.addFolder('Personajes');

    personajes.add(this.guiControls, 'vida_grimmjow', 0, this.modelo_grimmjow.vida, 1).listen().name('Grimmjow Jaegerjaquez: ');
    personajes.add(this.guiControls, 'vida_ichigo', 0, this.modelo_ichigo.vida, 1).listen().name('Kurosaki Ichigo: ');
    personajes.open();

    return gui;
  }

  createLights() {
    // Se crea una luz ambiental, evita que se vean complentamente negras las
    // zonas donde no incide de manera directa una fuente de luz
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);

    // Añadimos la luz ambiental a la escena
    this.add(ambientLight);

    // La luz focal de la escena no es blanca, sino violeta muy claro, ya que
    // el escenario está ambientado en un lugar rocoso con luz de cristales morados
    // y los reflejos que da por tanto no pueden ser blancos
    this.spotLight = new THREE.SpotLight(0xD9B3FF, this.guiControls.lightIntensity);
    this.spotLight.position.set(60, 60, 40);
    this.add(this.spotLight);
  }

  createRenderer(my_canvas) {
    // Se instancia un Renderer WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render. El
    // fondo es negro ya que están en una cueva rocosa
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    // La visualización se muestra en el lienzo recibido
    $(my_canvas).append(renderer.domElement);

    return renderer;
  }

  getCamera(){
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

    // La cámara siempre mira más allá
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
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo
    requestAnimationFrame(()=>this.update())

    // Se actualizan las barras de vida de cada personaje
    this.guiControls.vida_ichigo = this.modelo_ichigo.vida;
    this.guiControls.vida_grimmjow = this.modelo_grimmjow.vida;

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz según la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;

    // Se actualiza la posición de la cámara según el movimiento del personaje
    this.cameraUpdate();

    // Hay que actualizar las flags para que se muevan los objetos porque se
    // ponen a false en cada actualización
    this.ichigo.__dirtyPosition = true;
    this.ichigo.__dirtyRotation = true;

    // Se actualiza el alma para que rote sobre sí misma
    this.alma.update();

    // Si alguno de los personajes muere, acaba el juego
    if(!this.fin_juego && this.modelo_ichigo.vida <= 0){
      alert("¡Has perdido!");
      this.fin_juego = true;
    }

    else if(!this.fin_juego && this.modelo_grimmjow.vida <= 0){
      alert("¡ENHORABUENA! ¡Has ganado! Has recuperado tu alma");
      this.fin_juego = true;
    }

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render(this, this.getCamera());

    // Simulación del escenario con motores de física
    this.simulate();
  }

  mover(event){
    // Click de ratón
    if(event.which == 1)
      this.ichigo.position.x += 0.5;

    // Tecla a: hacia la izquierda
    if(event.keyCode == "97"){
      this.ichigo.position.x += 0.25;
      this.ichigo.rotation.set(0, Math.PI/2, 0);
    }

    // Tecla w: hacia arriba
    else if(event.keyCode == "119"){
      this.ichigo.position.z += 0.25;
      this.ichigo.rotation.set(0, 0, 0);
    }

    // Tecla d: hacia la derecha
    else if(event.keyCode == "100"){
      this.ichigo.position.x -= 0.25;
      this.ichigo.rotation.set(0, -Math.PI/2, 0);
    }

    // Tecla s: hacia abajo
    else if(event.keyCode == "115"){
      this.ichigo.position.z -= 0.25;
      this.ichigo.rotation.set(0, Math.PI, 0);
    }
  }
}

// La función main
$(function(){

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación: cambio de tamaño de ventana y
  // pulsación de teclas para el movimiento
  window.addEventListener("resize", ()=>scene.onWindowResize());
  window.addEventListener('keypress', (event)=>scene.mover(event));
  window.addEventListener('mousedown', (event)=>scene.mover(event));

  // La primera visualización
  scene.update();
});
