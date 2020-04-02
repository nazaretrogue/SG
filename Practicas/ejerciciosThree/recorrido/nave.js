class Nave extends THREE.Object3D{
  constructor(gui, titleGui){
    super();

    this.createGUI(gui, titleGui);
    var geometria = new THREE.ConeGeometry(1, 4, 3);
    var textura = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    var material = new THREE.MeshPhongMaterial({map: textura});

    var recorrido = [new THREE.Vector3(-6, 0, 6), new THREE.Vector3(-5, 5, 5),
                     new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, -2, 5),
	                   new THREE.Vector3(10, 0, 10), new THREE.Vector3(7, 1, 1),
                     new THREE.Vector3(5, 0, 0), new THREE.Vector3(-8, -4, 6),
                     new THREE.Vector3(-6, 0, 6)];

    var curva = new THREE.CatmullRomCurve3(recorrido);

    var puntos = curva.getPoints(50);
    var geometry = new THREE.BufferGeometry().setFromPoints(puntos);
    var material_8 = new THREE.LineBasicMaterial({color: 0x0000 });

    var spline = new THREE.Line(geometry, material_8);

    this.nave = new THREE.Mesh(geometria, material);

    this.nave.position.y = 2;

    this.add(this.nave);
    this.add(spline);
  }

  createGUI(gui, titleGui){
    this.guiControls = new function(){

    }
  }

  update(){

  }
}
