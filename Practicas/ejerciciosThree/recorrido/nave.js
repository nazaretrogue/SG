class Nave extends THREE.Object3D{
  constructor(gui, titleGui){
    super();

    this.createGUI(gui, titleGui);
    var geometria = new THREE.ConeGeometry(1, 4, 3);
    var textura = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var material = new THREE.MeshPhongMaterial({map: textura});

    var recorrido = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, -3, -5),
                     new THREE.Vector3(25, 0, 0), new THREE.Vector3(10, 3, 5),
                     new THREE.Vector3(0, 0, 0), new THREE.Vector3(-10, -3, -5),
                     new THREE.Vector3(-25, 0, 0), new THREE.Vector3(-10, 3, 5),
                     new THREE.Vector3(0, 0, 0)];

    this.curva = new THREE.CatmullRomCurve3(recorrido);

    var puntos = this.curva.getPoints(50);
    var geometry = new THREE.BufferGeometry().setFromPoints(puntos);
    var material_8 = new THREE.LineBasicMaterial({color: 0x000000});

    var spline = new THREE.Line(geometry, material_8);
    this.nave_girada = new THREE.Mesh(geometria, material);
    this.nave = new THREE.Object3D();

    this.nave_girada.rotation.x = Math.PI/2;

    this.nave.add(this.nave_girada);
    this.add(this.nave);
    this.add(spline);
  }

  createGUI(gui, titleGui){
    this.guiControls = new function(){
      this.bucle_izdo = true;
    }
  }

  update(){
    var tiempo = Date.now();
    var tiempo_recorrido = 4000;
    var t = (tiempo%tiempo_recorrido)/tiempo_recorrido;
    var pos = this.curva.getPointAt(t);
    var tangente = this.curva.getTangentAt(t);

    if(this.guiControls.bucle_izdo){
      tiempo_recorrido *= 2;
      t = (tiempo%tiempo_recorrido)/tiempo_recorrido;
      pos = this.curva.getPointAt(t);
      tangente = this.curva.getTangentAt(t);
    }

    this.nave.position.copy(pos);

    pos.add(tangente);
    this.nave.lookAt(pos);
  }
}
