class Fondo {
  constructor() {
    this.x = width - 20;  
    this.y = 0;  
    this.tamaño = height;  
    this.imagenFondo = loadImage('data/fondo.jpg'); // Cargar la imagen del vecindario de Billy y Mandy
  }

  mostrar() {
    // Usamos la imagen de fondo
    image(this.imagenFondo, 0, 0, width, height);  
    
    // Dibujamos la meta/portal de escape
    fill(150, 0, 255, 180); // Color púrpura/mágico para el portal de escape
    rect(this.x, this.y, 20, this.tamaño);  
  }

  alcanzada(hamster) { // Referencia a Hamster
    return hamster.x > this.x - 20 && hamster.x < this.x + 20 && hamster.y > this.y && hamster.y < this.y + this.tamaño;
  }
}
