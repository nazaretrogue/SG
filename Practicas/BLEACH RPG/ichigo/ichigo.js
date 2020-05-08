class Ichigo extends THREE.Object3D {
  constructor() {
    super();

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/ichigo/Ichigo.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/ichigo/Ichigo.obj',
                                              function(obj){
                                                var modelo = obj;
                                                that.add(modelo);
                                              },
                                              null, null);});

    this.rotation.x = -Math.PI/2;

    // var geo = new THREE.BoxGeometry(8, 7, 11.5);
    // var mat = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true})
    // var matf = Physijs.createMaterial(mat, 0.9, 0.3);
    // //this.caja = new THREE.Mesh(geo, mat);
    // this.caja = new Physijs.BoxMesh(geo, matf, 1.0);
    //
    // this.caja.position.z = 3.5;
    // this.caja.rotation.x = -Math.PI/2;

    // //this.caja.add(this);
    // this.add(this.caja);
    this.ataque();
  }

  ataque(){
    var recorrido = [new THREE.Vector3(this.position.x, this.position.y, this.position.z-2),
                     new THREE.Vector3(this.position.x+2, this.position.y, this.position.z),
                     new THREE.Vector3(this.position.x, this.position.y, this.position.z+2),
                     new THREE.Vector3(this.position.x, this.position.y, this.position.z)];

    this.linea_ataque = new THREE.CatmullRomCurve3(recorrido);
    var that = this;

    // Animación de ataque
    var inicio = {x: this.position.x, z: this.position.z};
    var final = {x: this.position.x, z: this.position.z};

    var anim_ataque = new TWEEN.Tween(inicio).to(final, 4000).easing(TWEEN.Easing.Elastic.Out).onUpdate(()=>{
        var pos = this.linea_ataque.getPointAt(inicio.x);
        that.position.copy(pos);
        var tangente = this.linea_ataque.getTangentAt(inicio.x);
        pos.add(tangente);

        //that.lookAt(pos);
    }).repeat(Infinity);

    anim_ataque.start();
  }

  update(event){
    //TWEEN.update();

    // Ataque con click de ratón
    if(event.which == 1){
      this.ataque();
      TWEEN.update();
    }

    // Tecla a: movimiento hacia la derecha
     if(event.keyCode == "97"){
      this.position.x += 0.25;
      this.rotation.set(-Math.PI/2, 0, Math.PI/2);
    }

    // Tecla w: hacia abajo
    else if(event.keyCode == "119"){
      this.position.z += 0.25;
      this.rotation.set(-Math.PI/2, 0, 0.0);
    }

    // Tecla d: hacia la izquierda
    else if(event.keyCode == "100"){
      this.position.x -= 0.25;
      this.rotation.set(-Math.PI/2, 0, -Math.PI/2);
    }

    // Tecla s: hacia arriba
    else if(event.keyCode == "115"){
      this.position.z -= 0.25;
      this.rotation.set(-Math.PI/2, 0, Math.PI);
    }
  }
}
