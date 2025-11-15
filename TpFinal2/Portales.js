class Portal {
  constructor(nivel) {
    this.x = width;  
    this.y = random(50, height - 50); 
    this.velocidad = 3 + nivel;  
    this.radio = 40; // Ajustado para la imagen del portal
    this.imagenPortal = loadImage('data/portal.jpg'); // Cargar la imagen del portal
  }

  mover() {
    this.x -= this.velocidad; 
  }

  mostrar() {
    // Reemplazado por la imagen del portal
    image(this.imagenPortal, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
  }

  choca(hamster) { // Referencia a Hamster
    let distanciaCirculo = dist(hamster.x, hamster.y, this.x, this.y);
    return distanciaCirculo < (hamster.tamañoCuerpo / 2) + this.radio; // Colisión más precisa
  }
}
