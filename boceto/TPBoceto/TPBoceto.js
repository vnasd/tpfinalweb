let objuego

  function setup() {
  createCanvas(800, 400)
    objuego= new juego(3)
}


function draw() {
  background(25,250,80)
  fill(5,150,255)
  rect(0,0,800,350)
  
    objuego.dibujar()
}


function keyPressed() {
  objuego.teclapres(keyCode)
}
