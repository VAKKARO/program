class Hamster {
  constructor() {
    this.x = 100; 
    this.y = height / 2;  
    this.tamañoCuerpo = 50; // Ajustado para la imagen
    this.imagenHamster = loadImage('data/hamster.png'); // Cargar la imagen del hámster
  }

  
  mostrar() {
    // Reemplazado por la imagen del hámster
    image(this.imagenHamster, this.x - this.tamañoCuerpo / 2, this.y - this.tamañoCuerpo / 2, this.tamañoCuerpo, this.tamañoCuerpo); 
  }
  
  mover() {
    // La lógica de movimiento y límites se mantiene
    if (this.y < this.tamañoCuerpo / 2) {
      this.y = this.tamañoCuerpo / 2;
    }
    if (this.y > height - this.tamañoCuerpo / 2) {
      this.y = height - this.tamañoCuerpo / 2;
    }
    if (this.x < this.tamañoCuerpo / 2) {
      this.x = this.tamañoCuerpo / 2;
    }
    if (this.x > width - this.tamañoCuerpo / 2) {
      this.x = width - this.tamañoCuerpo / 2;
    }
  }
}
