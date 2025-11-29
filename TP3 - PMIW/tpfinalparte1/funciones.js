function dibujarBoton(x, y, w, h, texto) {
  let isHover = mouseDentro(x, y, w, h);
  fill(isHover ? color(128, 0, 100) : color(128, 0, 32));
  rect(x, y, w, h, 8);
  push();
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(texto, x + w / 2, y + h / 2);
  pop();
}

function obtenerTextosOpciones(n) {
    let indiceEncontrado = -1;
    //Recorre el arreglo ESCENAS_CON_OPCIONES para buscar la escena 'n'
    for (let i = 0; i < ESCENAS_CON_OPCIONES.length; i++) {
        // Si el valor del arreglo en la posición 'i' es igual a la escena actual 'n'
        if (ESCENAS_CON_OPCIONES[i] === n) {
            // Guarda la posición (el índice 'i')
            indiceEncontrado = i;
        }
    }
    // Si encontró el índice (no es -1)
    if (indiceEncontrado !== -1) {
        // Accede al arreglo de textos en la misma posición (índice)
        const textos = TEXTOS_DE_OPCIONES[indiceEncontrado];
        return { 
            A: textos[0], 
            B: textos[1] 
        };
    } else {
        return { A: "Opción A", B: "Opción B" };
    }
}

function dibujarDialogo(n) {
  // Solo se ejecuta si el texto para la escena 'n' existe (índice 0 a 22)
  if (n >= 0 && n < textos.length) { 
    let dialogo = textos[n]; 
    let boxX = 20;
    let boxY = 20; // Posición arriba de la pantalla
    let boxW = width - 40;
    let boxH = 100;
    // Configuración y dibujo del texto
    push();
    fill(255); // Color de texto: Blanco
    textSize(16);
    textAlign(LEFT, TOP);
    stroke(0); 
    strokeWeight(3); 
    text(dialogo, boxX, boxY, boxW, boxH); 
    pop();
  }
}

function pantallaInicio() {
  if (imgInicio && imgInicio.width > 0) {
      image(imgInicio, 0, 0, width, height);    
}
  fill(255);
  push();
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(255,255,255);
  stroke(0);
  strokeWeight(3);
  text("LAS SOMBRÍAS AVENTURAS DE BILLY Y MANDY", width / 2, height / 4);
  dibujarBoton(width/2 - 75, height/2 - 20, 150, 40, "INICIAR"); 
  dibujarBoton(width/2 - 75, height/2 + 40, 150, 40, "CRÉDITOS");
}

function pantallaCreditos() {
  tint(255, 77);
  image(creditos, 0, 0, width, height); 
  noTint();
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CRÉDITOS", width/2, height/4);
  textSize(20);
  text("Alumnos: Luciano Aversa y Valeria Rocchio", width/2, height/2 + 50);
  pop();
  dibujarBoton(width/2 - 75, height - 80, 150, 40, "Volver al inicio");
}

function pantallaFinal(escenaFinal) {
    let indiceFinal = -1;
    let detalleFinal = null;
    for (let i = 0; i < FINAL_IDS.length; i++) {
        if (FINAL_IDS[i] === escenaFinal) {
            indiceFinal = i;
            // Obtenemos el detalle usando el índice encontrado
            detalleFinal = FINAL_DETALLES[i]; 
        }
    }
    let imagenActual = finalImagenes[escenaFinal]; // Esto no cambia, ya lo tienes en preload
    
    if (imagenActual) {
        image(imagenActual, 0, 0, width, height);
    } else {
        background(100, 20, 20); 
    }
    if (detalleFinal) {
        push();
        textAlign(LEFT, TOP);
        textSize(28); 
        fill(255); 
        stroke(0); 
        strokeWeight(3);
        text(detalleFinal, 20, 50, 600, 150);
        pop();
    }
    
    dibujarBoton(width/2 - 75, height - 80, 150, 40, "Volver al inicio");
}

function dibujarOpciones() {
  let textos = obtenerTextosOpciones(escena); 
  dibujarBoton(width/2 - BUTTON_W/2, 300, BUTTON_W, BUTTON_H, textos.A); 
  dibujarBoton(width/2 - BUTTON_W/2, 360, BUTTON_W, BUTTON_H, textos.B);
}

function dibujarFlecha() {
  let x = width - 60;
  let y = height - 60;
  let w = 50;
  let h = 50;
  dibujarBoton(x, y, w, h, "→");
}

function mouseDentro(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function hayBotonHover() {
  if (escena === -1) {
    return mouseDentro(width/2 - 75, height/2 - 20, 150, 40) || mouseDentro(width/2 - 75, height/2 + 40, 150, 40);
  } else if (escena === 99 || (escena >= 100 && escena <= 102)) {
    return mouseDentro(width/2 - 75, height - 80, 150, 40);
  }
  else if (escena >= 0 && escena < totalImages) {
    if (esBifurcacion(escena)) {
      return mouseDentro(width/2 - BUTTON_W/2, 300, BUTTON_W, BUTTON_H) || mouseDentro(width/2 - BUTTON_W/2, 360, BUTTON_W, BUTTON_H);
    } else if (tieneFlecha(escena)) {
      return mouseDentro(width - 60, height - 60, 50, 50);
    }
  }
  return false;
}

function esBifurcacion(n) {
  // El ciclo for reemplaza la funcionalidad de .includes()
  for (let i = 0; i < ESCENAS_BIFURCACION.length; i++) {
    if (ESCENAS_BIFURCACION[i] === n) {
      return true;
    }
  }
  return false;
}

function tieneFlecha(n) {
  // El ciclo for reemplaza la funcionalidad de .includes()
  for (let i = 0; i < ESCENAS_CON_FLECHA.length; i++) {
    if (ESCENAS_CON_FLECHA[i] === n) {
      return true;
    }
  }
  return false;
}
