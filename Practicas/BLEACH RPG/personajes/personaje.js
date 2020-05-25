class Personaje extends THREE.Object3D {
  constructor(archivo, puntos_vida) {
    super();

    this.vida = puntos_vida;
    var cad_materiales = '../models/'+archivo+'.mtl';
    var cad_modelo = '../models/'+archivo+'.obj'

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load(cad_materiales,
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load(cad_modelo,
                                              function(obj){
                                                var modelo = obj;
                                                modelo.rotation.x = -Math.PI/2;
                                                that.add(modelo);
                                              },
                                              null, null);});
  }

  disminuirVida(damage){
    this.vida = this.vida - damage;

    if(this.vida <= 0){
      if(this.rotation.y == Math.PI/2)
        this.rotation.set(0, 0, Math.PI/2);

      else if(this.rotation.y == 0)
        this.rotation.set(-Math.PI/2, this.rotation.y, 0);

      else if(this.rotation.y == -Math.PI/2)
        this.rotation.set(0, 0, -Math.PI/2);

      else if(this.rotation.y == Math.PI)
        this.rotation.set(Math.PI/2, this.rotation.y, 0);

      this.position.y = 1;
    }
  }
}
