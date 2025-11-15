class Botones {
  constructor(juego) {
    this.juego = juego;
    this.botonReiniciar = createButton('Reiniciar');

    this.botonReiniciar.position(width / 2 - 50, height / 2 + 30);
    this.botonReiniciar.size(100, 40);

    this.botonReiniciar.mousePressed(() => this.reiniciarJuego());
    this.botonReiniciar.hide();  

    
    this.sonidoJuego = loadSound('data/SONIDAZO.mp3'); 
    this.sonidoGolpe = loadSound('data/PERDISTE.mp3'); 
    this.sonidoGanaste = loadSound('data/GANASTE.mp3'); 
  }

  gestionarBotones() {
    if (this.juego.juegoTerminado && !this.juego.juegoGanado) {
      this.botonReiniciar.show();
    } else if (this.juego.juegoGanado) {
      
    }
  }

  reiniciarJuego() {
    this.juego.nivel = 1;
    this.juego.reiniciar();
    this.juego.juegoGanado = false;
    this.botonReiniciar.hide();  
    if (!sonidoJuego.isPlaying()) {
      sonidoJuego.play();
    }
  }

  moverJugador() {
    if (keyIsDown(UP_ARROW)) {
      this.juego.hamster.y -= 5; // CAMBIO: Referencia a hamster
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.juego.hamster.y += 5; // CAMBIO: Referencia a hamster
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.juego.hamster.x += 5; // CAMBIO: Referencia a hamster
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.juego.hamster.x -= 5; // CAMBIO: Referencia a hamster
    }
  }
}
