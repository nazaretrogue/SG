class Grimmjow extends THREE.Object3D {
  constructor() {
    super();

    this.puntos = 30;
    this.atacar = false;

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

  async update(pos_enemigo){
    var damage = 0;

    if(Math.abs(pos_enemigo.x-this.position.x) <= 1.0 ||
       Math.abs(pos_enemigo.z-this.position.z) <= 1.0){
         damage = Math.floor(Math.random()*(+4 - +1))+1;
    }

    await new Promise(r => setTimeout(r, 5000));

    return damage;
  }
}
