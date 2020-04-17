class Nave extends THREE.Object3D{
  constructor(gui, titleGui){
    super();

    this.createGUI(gui, titleGui);

    // Nave espacial
    var geometria = new THREE.ConeGeometry(1, 4, 3);
    var textura = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var material = new THREE.MeshPhongMaterial({map: textura});

    this.nave_girada = new THREE.Mesh(geometria, material);
    this.nave = new THREE.Object3D();

    this.nave_girada.rotation.x = Math.PI/2;

    // Recorrido en forma de 8
    var recorrido = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, -3, -5),
                     new THREE.Vector3(25, 0, 0), new THREE.Vector3(10, 3, 5),
                     new THREE.Vector3(0, 0, 0), new THREE.Vector3(-10, -3, -5),
                     new THREE.Vector3(-25, 0, 0), new THREE.Vector3(-10, 3, 5),
                     new THREE.Vector3(0, 0, 0)];

    this.curva = new THREE.CatmullRomCurve3(recorrido);

    var puntos = this.curva.getPoints(50);
    var geometry = new THREE.BufferGeometry().setFromPoints(puntos);

    // Para pintar el recorrido
    var material_8 = new THREE.LineBasicMaterial({color: 0x000000});
    var spline = new THREE.Line(geometry, material_8);

    // Añadimos todo a la escena
    this.nave.add(this.nave_girada);
    this.add(this.nave);
    this.add(spline);

    // Bucle rápido, 4 segundos en recorrerse
    var origen1 = {p: 0};
    var dest1 = {p: 0.5};

    var bucle_rapido = new TWEEN.Tween(origen1).to(dest1, 4000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen1.p);
        this.nave.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen1.p);
        pos.add(tangente);

        this.nave.lookAt(pos);
    });

    var origen2 = {p: 0.5};
    var dest2 = {p: 1};

    var bucle_lento = new TWEEN.Tween(origen2).to(dest2, 8000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen2.p);
        this.nave.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen2.p);
        pos.add(tangente);

        this.nave.lookAt(pos);
    }).onComplete(()=>{bucle_rapido.start();});

    bucle_rapido.chain(bucle_lento);
    bucle_rapido.start();
  }

  createGUI(gui, titleGui){
    this.guiControls = new function(){
      this.bucle_izdo = true;
    }
  }

  update(){
    TWEEN.update();
  }
}
