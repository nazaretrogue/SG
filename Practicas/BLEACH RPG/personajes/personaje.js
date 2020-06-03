class Personaje extends THREE.Object3D{
  constructor(archivo, puntos_vida) {
    super();

    // Puntos de vida del personaje
    this.vida = puntos_vida;

    // Archivo con materiales y modelo
    var cad_materiales = '../models/'+archivo+'.mtl';
    var cad_modelo = '../models/'+archivo+'.obj'

    var modelo_loader = new THREE.OBJLoader();
    var material_loader = new THREE.MTLLoader();

    var that = this;

    // Cargamos el modelo
    material_loader.load(cad_materiales,
                         function(material){
                           modelo_loader.setMaterials(material);
                           modelo_loader.load(cad_modelo,
                                              function(obj){
                                                var modelo = obj;
                                                // Debemos ponerlo de pie porque está tumbado
                                                modelo.rotation.x = -Math.PI/2;
                                                that.add(modelo);
                                              },
                                              null, null);});
  }

  // Método para disminuir la vida del personaje y procesar la muerte si llega a 0
  disminuirVida(damage){
    // Restamos el daño hecho por el enemigo
    this.vida = this.vida - damage;

    // Si la vida llega a 0 el personaje cae al suelo con una orientación que depende de hacia donde mire
    if(this.vida <= 0){
      if(Math.abs(this.rotation.y-Math.PI/2) <= 2.0)
        this.rotation.set(0, 0, Math.PI/2);

      else if(Math.abs(this.rotation.y-0) <= 2.0)
        this.rotation.set(-Math.PI/2, this.rotation.y, 0);

      else if(Math.abs(this.rotation.y+Math.PI/2) <= 2.0)
        this.rotation.set(0, 0, -Math.PI/2);

      else if(Math.abs(this.rotation.y-Math.PI) <= 2.0)
        this.rotation.set(Math.PI/2, this.rotation.y, 0);

      // Debemos bajar al personaje al -2.5 porque al estar dentro de las cajas quedan flotando
      this.position.y = -2.5;
    }
  }

  atacaEnemigo(pos, pos_enemigo){
    var damage = 0;

    // Si el enemigo está en el rango de ataque
    if(Math.abs(pos_enemigo.x-pos.x) <= 5.0 &&
       Math.abs(pos_enemigo.z-pos.z) <= 5.0)
        // El daño hecho es un número aleatorio entre 1 y 3 ambos inclusive
        damage = Math.floor(Math.random()*(+4 - +1))+1;

    return damage;
  }
}
