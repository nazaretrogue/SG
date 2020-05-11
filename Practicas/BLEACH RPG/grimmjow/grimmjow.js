class Grimmjow extends THREE.Object3D {
  constructor() {
    super();

    this.vida = 30;

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    material_loader.load('../models/grimmjow/Grimmjow.mtl',
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load('../models/grimmjow/Grimmjow.obj',
                                              function(obj){
                                                var modelo = obj;
                                                modelo.rotation.x = -Math.PI/2;
                                                that.add(modelo);
                                              },
                                              null, null);});
  }

  update(pos_enemigo){
    var damage = 0;

    if(Math.abs(pos_enemigo.x-this.position.x) <= 5.0 &&
       Math.abs(pos_enemigo.z-this.position.z) <= 5.0){

        if(Math.abs(pos_enemigo.x-this.position.x) <= 3.0){
          if(pos_enemigo.z < this.position.z)
            this.rotation.y = Math.PI;

          else
            this.rotation.y = 0.0;
        }

        if(Math.abs(pos_enemigo.z-this.position.z) <= 3.0){
          if(pos_enemigo.x < this.position.x)
            this.rotation.y = -Math.PI/2;

          else
            this.rotation.y = Math.PI/2;
        }

         damage = Math.floor(Math.random()*(+4 - +1))+1;
    }

    return damage;
  }
}
