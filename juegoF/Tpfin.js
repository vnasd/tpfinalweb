//Felipe joaquin roldan      legajo: 95549/4



let juego;

  function setup() {
  juego = new JuegoC();
 
}

function draw() {
  juego.dibujar();
}

function mouseMoved() {
  juego.manejarMouseMovido();
}

function mousePressed() {
  juego.manejarMousePresionado();
}

function keyPressed() {
  juego.objuego.teclapres(keyCode)
  juego.objuego2.tepres(keyCode)
}
