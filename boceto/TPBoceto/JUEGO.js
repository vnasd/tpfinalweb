class juego {
  constructor(cantenemigos) {
    this.cantidadenemigos=cantenemigos
      this.crearpersonaje()                       //objetos
      
      
  }
  inicar() {
  }

  dibujar() {

    this.personaje.dibujar()

      
    
   
    
  }
 
  
  
  
  crearpersonaje() {
    this.personaje =new personaje(10, 300,50,50)
  }
  estadojuego() {
  }
  
  
  
   
  

  teclapres(keyCode) {
    this.personaje.teclapres(keyCode)
  }
}
