class Alma extends THREE.Object3D{
  constructor(){
    super();

    // Creamos la geometría y el material del alma, una espera que emite luz (material emisivo)
    var geometria_alma = new THREE.SphereGeometry(0.5, 12, 12);
    var material_alma = new THREE.MeshLambertMaterial({color: 0x66C2FF, emissive: 0x777777});

    // Creamos la caja protectora que contiene el alma
    var geometria_caja = new THREE.BoxGeometry(3, 3, 3);
    var material_caja = new THREE.MeshBasicMaterial({color: 0x00e6e6, opacity: 0.3, transparent:true});

     // Generamos el mesh y lo colocamos un foco de luz dentro de la esfera
    var alma = new THREE.Mesh(geometria_alma, material_alma);
    var foco_alma = new THREE.SpotLight(0xFFFFFF, 0.2);
    this.protector = new THREE.Mesh(geometria_caja, material_caja);

    // Situamos la caja protectora
    this.protector.position.y = 3;

    // Añadimos el foco al alma, el alma al protector y el protector a la escena
    alma.add(foco_alma);
    this.protector.add(alma);
    this.add(this.protector);
  }

  update(){
    // Giro en el eje x y z para que de vueltas sobre sí misma
    this.protector.rotation.x += 0.01;
    this.protector.rotation.z += 0.01;
  }
}
