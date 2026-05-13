/**
 * Arte Cinético y Lumínico - Inspirado en Gyula Kosice
 * Fase 4: Cristalización de Obra Única
 */

const MADI_COLORS = [
  '#FF0055', // Rosa Neón
  '#7000FF', // Violeta Profundo
  '#FFCC00', // Amarillo Eléctrico
  '#FFFFFF', // Blanco puro
  '#00A8FF'  // Celeste Neón
];

let blocks = [];

// Variables de estado cinético global
let globalLengthMod = 1.0;
let bubbleMoveUntil = 0;

function setup() {
  createCanvas(640, 480); // Formato fijo de obra
  generarComposicion();
}

function draw() {
  background(10, 10, 12); // Lienzo negro profundo
  
  // --- LÓGICA DE INTERACCIÓN ---
  let isInteractingLength = false;
  
  // Tecla '0': Disminuir longitud (acortar cilindros)
  if (keyIsDown(48) || keyIsDown(96)) {
    globalLengthMod -= 0.025;
    if (globalLengthMod < 0.2) globalLengthMod = 0.2;
    isInteractingLength = true;
  }
  
  // Tecla '9': Recuperar/Aumentar longitud
  if (keyIsDown(57) || keyIsDown(105)) {
    globalLengthMod += 0.025;
    if (globalLengthMod > 3.0) globalLengthMod = 3.0;
    isInteractingLength = true;
  }
  
  // Recuperación Elástica (Lerp hacia 1.0) cuando se suelta la interacción
  if (!isInteractingLength) {
    globalLengthMod += (1.0 - globalLengthMod) * 0.1;
  }
  
  // Renderizar bloques con modificadores
  for (let b of blocks) {
    b.draw();
  }
}

function keyPressed() {
  // Tecla 'K' o 'k' (Movimiento por 1 segundo)
  if (key === 'k' || key === 'K') {
    bubbleMoveUntil = millis() + 1000;
  }
}

// Fisher-Yates Shuffle estandarizado para asegurar consistencia entre navegadores
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function generarComposicion() {
  // REQUISITO: Congelar la generación para que sea una ÚNICA OBRA
  // randomSeed fija el algoritmo generativo para que siempre arroje el mismo resultado
  randomSeed(1805); // Un número semilla elegante
  
  blocks = [];
  globalLengthMod = 1.0;
  
  let cols = 4; 
  let rows = 3;
  let cellW = width / cols;
  let cellH = height / rows;
  
  let numCells = cols * rows; 
  let totalTarget = 10; 
  
  let orientations = [];
  let matrixSizes = [];
  let dotSizes = []; 
  
  for (let i = 0; i < totalTarget / 2; i++) {
    orientations.push(true, false);
    matrixSizes.push(true, false);
    dotSizes.push(true, false); 
  }
  
  shuffleArray(orientations);
  shuffleArray(matrixSizes);
  shuffleArray(dotSizes);
  
  let cells = [];
  for (let i = 0; i < numCells; i++) cells.push(i);
  
  let selectedCells;
  let attempts = 0;
  while (true) {
    shuffleArray(cells);
    selectedCells = cells.slice(0, totalTarget);
    let emptyCells = cells.slice(totalTarget);
    
    let e1 = emptyCells[0];
    let e2 = emptyCells[1];
    
    let e1Col = e1 % cols;
    let e1Row = floor(e1 / cols);
    let e2Col = e2 % cols;
    let e2Row = floor(e2 / cols);
    
    let dist = abs(e1Col - e2Col) + abs(e1Row - e2Row);
    
    if (dist > 1 || attempts > 500) {
      break;
    }
    attempts++;
  }
  
  let fixedThickness = 55; 
  
  // REQUISITO: Que aparezcan TODOS los 5 colores obligatoriamente
  // Duplicamos la paleta base (5 x 2 = 10 cilindros en total) y la mezclamos
  let blockColors = [...MADI_COLORS, ...MADI_COLORS];
  shuffleArray(blockColors);
  
  for (let i = 0; i < totalTarget; i++) {
    let cellIndex = selectedCells[i];
    let col = cellIndex % cols;
    let row = floor(cellIndex / cols);
    
    let anchorX = col * cellW + cellW / 2;
    let anchorY = row * cellH + cellH / 2;
    
    let isVertical = orientations[i];
    let isLargeMatrix = matrixSizes[i];
    let hasLargeDots = dotSizes[i];
    
    let bw, bh;
    
    if (isVertical) {
       bw = fixedThickness; 
       bh = cellH * 0.90; 
    } else {
       bw = cellW * 0.90; 
       bh = fixedThickness;
    }
    
    let c = color(blockColors[i]);
    
    blocks.push(new KosiceBlock(anchorX, anchorY, bw, bh, isVertical, c, isLargeMatrix, hasLargeDots, cellW, cellH));
  }
}

class KosiceBlock {
  constructor(x, y, w, h, isVertical, col, isLargeMatrix, hasLargeDots, cellW, cellH) {
    this.x = x;
    this.y = y;
    this.baseW = w;
    this.baseH = h;
    this.isVertical = isVertical;
    this.color = col;
    this.isLargeMatrix = isLargeMatrix;
    this.hasLargeDots = hasLargeDots; 
    
    this.bubbles = [];
    let numBubbles = floor(random(6, 15));
    for (let i = 0; i < numBubbles; i++) {
        let maxDistX = (this.baseW / 2) * 0.7;
        let maxDistY = (this.baseH / 2) * 0.7;
        let bx = random(-maxDistX, maxDistX);
        let by = random(-maxDistY, maxDistY);
        let minR = this.isVertical ? this.baseW * 0.15 : this.baseH * 0.15;
        let maxR = this.isVertical ? this.baseW * 0.5 : this.baseH * 0.5;
        let br = random(minR, maxR);
        
        let speed = map(br, minR, maxR, 0.8, 2.5);
        this.bubbles.push({
          x: bx, y: by, r: br, 
          speed: speed, 
          wobbleSpeed: random(0.05, 0.15),
          wobbleOffset: random(0, TWO_PI),
          wobbleAmp: random(0.2, 0.8)
        });
    }
    
    this.pins = [];
    let pinSide = random() > 0.5 ? 1 : -1;
    let dotSpacing = 10; 
    let pinSeparation = 18; 
    let lengthMultiplier = this.isLargeMatrix ? 0.85 : 0.45;
    
    if (this.isVertical) {
       let cols = this.isLargeMatrix ? 3 : 2; 
       let rows = max(2, floor((this.baseH * lengthMultiplier) / dotSpacing) - 1); 
       
       let startY;
       if (this.isLargeMatrix) {
           startY = - (rows * dotSpacing) / 2 + dotSpacing / 2;
       } else {
           if (random() > 0.5) startY = -this.baseH/2 + dotSpacing; 
           else startY = this.baseH/2 - (rows * dotSpacing);
       }
       
       let startX = (this.baseW / 2 + pinSeparation) * pinSide;
       
       for (let i = 0; i < cols; i++) {
           for (let j = 0; j < rows; j++) {
               let px = startX + (i * dotSpacing * pinSide);
               let py = startY + (j * dotSpacing);
               this.pins.push({x: px, y: py});
           }
       }
    } else {
       let rows = this.isLargeMatrix ? 3 : 2; 
       let cols = max(2, floor((this.baseW * lengthMultiplier) / dotSpacing) - 1);
       
       let startX;
       if (this.isLargeMatrix) {
           startX = - (cols * dotSpacing) / 2 + dotSpacing / 2;
       } else {
           if (random() > 0.5) startX = -this.baseW/2 + dotSpacing;
           else startX = this.baseW/2 - (cols * dotSpacing);
       }
       
       let startY = (this.baseH / 2 + pinSeparation) * pinSide;
       
       for (let j = 0; j < rows; j++) {
           for (let i = 0; i < cols; i++) {
               let px = startX + (i * dotSpacing);
               let py = startY + (j * dotSpacing * pinSide);
               this.pins.push({x: px, y: py});
           }
       }
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    
    let currentW, currentH;
    if (this.isVertical) {
       currentW = this.baseW;
       currentH = this.baseH * globalLengthMod;
    } else {
       currentW = this.baseW * globalLengthMod;
       currentH = this.baseH;
    }
    
    let isCylindersTrembling = mouseIsPressed && mouseButton === LEFT;
    let isPinsTrembling = keyIsDown(32); 
    
    noStroke();
    fill(255);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = 'rgba(255, 255, 255, 0.9)';
    let dotRadius = this.hasLargeDots ? 4.5 : 3; 
    
    for(let p of this.pins) {
      let dx = isPinsTrembling ? random(-2.5, 2.5) : 0;
      let dy = isPinsTrembling ? random(-2.5, 2.5) : 0;
      circle(p.x + dx, p.y + dy, dotRadius);
    }
    
    drawingContext.shadowBlur = 0;
    
    push();
    if (isCylindersTrembling) {
       let ctx = random(-4, 4);
       let cty = random(-4, 4);
       translate(ctx, cty);
    }
    
    let grad;
    if (this.isVertical) {
       grad = drawingContext.createLinearGradient(-currentW/2, 0, currentW/2, 0);
    } else {
       grad = drawingContext.createLinearGradient(0, -currentH/2, 0, currentH/2);
    }
    
    let cBase = color(this.color);
    let edgeAlpha = 180;
    let rEdge = red(cBase) * 0.4;
    let gEdge = green(cBase) * 0.4;
    let bEdge = blue(cBase) * 0.4;
    let cEdgeStr = `rgba(${rEdge}, ${gEdge}, ${bEdge}, ${edgeAlpha/255})`;
    let cCenterStr = `rgba(${min(red(cBase)+100, 255)}, ${min(green(cBase)+100, 255)}, ${min(blue(cBase)+100, 255)}, 1)`;
    
    grad.addColorStop(0, cEdgeStr);
    grad.addColorStop(0.5, cCenterStr);
    grad.addColorStop(1, cEdgeStr);
    
    drawingContext.shadowBlur = 60;
    drawingContext.shadowColor = this.color.toString();
    drawingContext.fillStyle = grad;
    noStroke();
    
    rectMode(CENTER);
    rect(0, 0, currentW, currentH);
    
    drawingContext.shadowBlur = 0;
    drawingContext.save();
    rect(0, 0, currentW, currentH); 
    drawingContext.clip();
    
    let isMoving = keyIsDown(75) || millis() < bubbleMoveUntil;
    
    for(let b of this.bubbles) {
      if (isMoving) {
        if (this.isVertical) {
          b.y -= b.speed; 
          b.x += sin(frameCount * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmp;
          if (b.y < -currentH / 2 - b.r) b.y = currentH / 2 + b.r; 
        } else {
          b.x -= b.speed; 
          b.y += sin(frameCount * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmp;
          if (b.x < -currentW / 2 - b.r) b.x = currentW / 2 + b.r;
        }
      }
      
      if (this.isVertical && b.y < -currentH / 2 - b.r) b.y = currentH / 2 + b.r;
      if (!this.isVertical && b.x < -currentW / 2 - b.r) b.x = currentW / 2 + b.r;
      
      let rX = this.isVertical ? b.r : b.r * 1.3;
      let rY = this.isVertical ? b.r * 1.3 : b.r;
      
      strokeWeight(1.5);
      stroke(255, 255, 255, 200);
      noFill();
      ellipse(b.x, b.y, rX, rY);
      
      strokeWeight(3);
      stroke(255, 255, 255, 120);
      arc(b.x, b.y, rX * 0.8, rY * 0.8, 0, PI);
      
      noStroke();
      fill(255, 255, 255, 255);
      ellipse(b.x - rX * 0.25, b.y - rY * 0.25, rX * 0.25, rY * 0.25);
    }
    
    drawingContext.restore();
    pop(); 
    pop(); 
  }
}
