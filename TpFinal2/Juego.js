class Juego {
  constructor() {
    this.hamster = new Hamster(); // CAMBIO: Nuevo jugador Hamster
    this.portales = []; // CAMBIO: Nuevos enemigos Portales
    this.fondo = new Fondo();  
    this.nivel = 1;
    this.juegoTerminado = false;
    this.juegoGanado = false;
    this.botones = new Botones(this);  
    this.botonvolver = createButton('Volver al Menú'); 
    this.botonvolver.size(100, 40);
    this.botonvolver.position(width / 2 - 50, height / 2 + 100); 
    this.botonvolver.mousePressed(() => this.volverAlMenu());  
    this.botonvolver.hide();  
    this.sonidoReproducidoGolpe = false;
    this.sonidoReproducidoGanaste = false; 
  }

  generarPortales() { // CAMBIO: Nombre de función
    if (frameCount % 60 === 0) {
      this.portales.push(new Portal(this.nivel)); // CAMBIO: Nueva clase Portal
      console.log("Portal generado: ", this.portales); 
    }
  }

  actualizar() {
    if (this.juegoTerminado || this.juegoGanado) {
      return;  
    }
    this.fondo.mostrar();

    this.botones.moverJugador();  
    this.hamster.mover(); // CAMBIO: Referencia a hamster
    this.generarPortales(); // CAMBIO: Función renombrada

    for (let i = this.portales.length - 1; i >= 0; i--) { // CAMBIO: Iterar sobre portales
      this.portales[i].mover();
      this.portales[i].mostrar();

      if (this.portales[i].choca(this.hamster)) { // CAMBIO: Colisión con hamster
        this.juegoTerminado = true;
      }
      if (this.portales[i].x < 0) {
        this.portales.splice(i, 1);
      }
    }

    if (this.fondo.alcanzada(this.hamster)) { // CAMBIO: Fondo alcanzado por hamster
      this.nivel++;
      if (this.nivel > 5) {
        this.juegoGanado = true;  
        this.botonvolver.show(); 
      }
      this.reiniciar(); 
    }
    this.hamster.mostrar(); // CAMBIO: Mostrar hamster
  }

  reiniciar() {
    this.hamster.x = 100; // CAMBIO: Reiniciar hamster
    this.hamster.y = height / 2;
    this.portales = []; // CAMBIO: Reiniciar portales
    this.fondo.x = width - 20;  
    this.juegoTerminado = false;
    this.sonidoReproducidoGolpe = false;
    this.sonidoReproducidoGanaste = false;
  }

  mostrarPantallaGanada() {
    fill(0, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GANASTE", width / 2, height / 2 - 50);
    sonidoJuego.stop();
    if (!this.sonidoReproducidoGanaste) {
      sonidoGanaste.play();
      this.sonidoReproducidoGanaste = true;
    }
  }
  volverAlMenu() {
    menu.volverAlMenu();
    this.botonvolver.hide();
    this.botones.botonReiniciar.hide(); 
    juego = null;
  }
  mostrar() {
    if (this.juegoTerminado) {
      fill(255, 0, 0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height / 2);
      this.botones.gestionarBotones();  
      sonidoJuego.stop();
      if (!this.sonidoReproducidoGolpe) {
        sonidoGolpe.play();
        this.sonidoReproducidoGolpe = true; 
      }
    } else if (this.juegoGanado) {
      this.mostrarPantallaGanada();  
      this.botones.gestionarBotones();  
      this.botonvolver.show();
    } else {
      fill(255);
      textSize(16);
      textAlign(LEFT, TOP);
      text("Nivel: " + this.nivel, 10, 10);
    }
  }
  
}
