let pantallas = [];
let pantallaActual = 0;

function setup() {
  createCanvas(400, 400);

  pantallas.push(new Pantalla("Pantalla 1", "Prueba"));
  pantallas.push(new Pantalla("Pantalla 2", "¡Prueba"));
  pantallas.push(new Pantalla("Pantalla 3", "Prueba."));
}

function draw() {
  background(220);

  pantallas[pantallaActual].mostrar();

  fill(100, 200, 100);
  rect(width - 100, height - 50, 80, 30);
  fill(0);
  textSize(12);
  text("Avanzar", width - 90, height - 30);
}

function mousePressed() {

  if (mouseX > width - 100 && mouseX < width - 20 && mouseY > height - 50 && mouseY < height - 20) {
    avanzarPantalla();
  }
}

function avanzarPantalla() {

  pantallaActual++;


  if (pantallaActual >= pantallas.length) {
    pantallaActual = 0;
  }
}

class Pantalla {
  constructor(titulo, contenido) {
    this.titulo = titulo;
    this.contenido = contenido;
  }

  mostrar() {
    fill(0);
    textSize(20);
    text(this.titulo, 20, 50);
    textSize(14);
    text(this.contenido, 20, 100);
  }
}
