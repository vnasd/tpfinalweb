class juego1 {
  constructor() {
    this.cantidadobstaculos=3
      this.cantidadenemigos = 1;
    this.crearpersonaje();
    this.crearenemigos();
    this.crearobstaculos()
      this.tiempo = 20;
    this.ganar = false;
    this.perder = false;
    this.juego = true;
    this.cantidadbalas = 10;
    this.balas = [];
    this.nubes = [];
  }

  dibujar() {
    if (this.tiempo > 10) {
      fill(0);
      textSize(15);
      text("REGLAS: esquiva los obstaculos y dispara al guardia para poder ganar ", 500, 100);
    }
    if (this.personaje.vida == false) {
      this.perder = true;
      this.juego = false;
    }
    if (this.tiempo == 0 && this.personaje.vida == true) {
      this.ganar = true;
      this.juego = false;
    }

    if (this.ganar == true) {
      fill(0, 255, 0);
      textSize(30);
      text("GANASTE, pudiste volver con tu dueño!", 400, 200);
    } else if (this.perder == true) {
      fill(255, 0, 0);
      textSize(30);
      text("PERDISTE:(", 400, 200);
    }

    if (frameCount % 60 == 0 && this.personaje.vida == true && this.tiempo >= 0) {
      this.tiempo -= 1;
    }

    if (this.tiempo >= 0) {
      fill(0);
      textSize(15);
      text(this.tiempo, 200, 100);
    }

    this.personaje.dibujar();

    for (let i = 0; i < this.cantidadobstaculos; i++) {
      this.obstaculos[i].dibujar();
      this.obstaculos[i].movizq();
      if (this.colisiono(this.personaje, this.obstaculos[i])) {
        this.personaje.vida = false;
      }
    }
    if (this.tiempo<=5) {
      for (let i = 0; i < this.cantidadenemigos; i++) {
        this.enemigos[i].dibujar();
        this.enemigos[i].movizq();
        if (this.colision(this.personaje, this.enemigos[i])) {
          this.personaje.vida = false;
        }
      }
    }


    // Dibuja y mueve los proyectiles
    for (let i = this.balas.length - 1; i >= 0; i--) {
      this.balas[i].dibujar();
      this.balas[i].mover();

      // Verifica colisiones con los enemigos y elimina los enemigos

      if (this.tiempo<=5) {

        for (let j = this.enemigos.length - 1; j >= 0; j--) {
          if (this.balas[i].colision(this.enemigos[j])) {
            this.enemigos.splice(j, 1);
            this.balas.splice(i, 1);
            break;
          }
        }
      }
    }

    // Verifica si no quedan enemigos y el jugador sigue con vida
    if (this.enemigos.length === 0 && this.personaje.vida) {
      fill(0, 255, 0);
      textSize(30);
      text("GANASTE, pudiste superar a los guardias!", 400, 200);
      this.ganar = true;
      this.juego = false;
    }
  }

  crearenemigos() {
    this.enemigos = [];

    for (let i = 0; i < this.cantidadenemigos; i++) {
      this.enemigos[i] = new enemigo(800, 300, 80, 80);
    }
  }

  crearpersonaje() {
    this.personaje = new personaje(10, 300, 70, 70);
  }

  crearobstaculos() {
    this.obstaculos = [];

    for (let i = 0; i < this.cantidadobstaculos; i++) {
      this.obstaculos[i] = new obstaculo(800, 340, 40, 40);
    }
  }

  colision(personaje, enemigo) {
    return (
      personaje.posx < enemigo.posx + enemigo.ancho &&
      personaje.posx + personaje.ancho > enemigo.posx &&
      personaje.posy < enemigo.posy + enemigo.alto &&
      personaje.posy + personaje.alto > enemigo.posy
      );
  }


  colisiono(personaje, obstaculo) {
    return (
      personaje.posx < obstaculo.posx + obstaculo.ancho &&
      personaje.posx + personaje.ancho > obstaculo.posx &&
      personaje.posy < obstaculo.posy + obstaculo.alto &&
      personaje.posy + personaje.alto > obstaculo.posy
      );
  }



  teclapres(keyCode) {
    this.personaje.teclapres(keyCode);

    if (keyCode == 32 && this.personaje.vida) {
      this.disparar();
    }
  }

  disparar() {
    if (this.balas.length < this.cantidadbalas) {
      let nuevoBala = new bala(
        this.personaje.posx + this.personaje.ancho,
        this.personaje.posy + this.personaje.alto / 2,
        10,
        5
        );
      this.balas.push(nuevoBala);
    }
  }
}

class bala {
  constructor(posx, posy, ancho, alto) {
    this.posx = posx;
    this.posy = posy;
    this.ancho = ancho;
    this.alto = alto;
    this.vel = 5;
    this.micolor = color(0, 0, 255);
  }

  dibujar() {
    fill(this.micolor);
    rect(this.posx, this.posy, this.ancho, this.alto);
  }

  mover() {
    this.posx += this.vel;
  }

  colision(enemigo) {
    return (
      this.posx < enemigo.posx + enemigo.ancho &&
      this.posx + this.ancho > enemigo.posx &&
      this.posy < enemigo.posy + enemigo.alto &&
      this.posy + this.alto > enemigo.posy
      );
  }
}

class personaje {
  constructor(posx, posy, ancho, alto) {
    this.posx = posx;
    this.posy = posy;
    this.ancho = ancho;
    this.alto = alto;
    this.vel = 1;
    this.grav = 0.3;
    this.alt = -10;
    this.vida = true;

    this.micolor = color(240, 120, 0);

    this.imagen = loadImage("data/gato.png");
  }

  dibujar() {
    if (this.vida == true) {
      image(this.imagen, this.posx, this.posy, this.ancho, this.alto);
      this.vel += this.grav;
      this.posy += this.vel;
      if (this.posy > 300) {
        this.vel = 0;
        this.posy = 300;
      }
    }
  }

  saltar() {
    if (this.posy == 300) {
      this.vel += this.alt;
    }
  }

  moverder() {
    if (this.posx + this.ancho < width) {
      this.posx += 50;
    }
  }

  moverizq() {
    if (this.posx - this.ancho > 0) {
      this.posx -= 50;
    }
  }

  teclapres(keyCode) {
    if (keyCode == UP_ARROW) {
      this.saltar();
    } else if (keyCode == RIGHT_ARROW) {
      this.moverder();
    } else if (keyCode == LEFT_ARROW) {
      this.moverizq();
    }
  }
}

class enemigo {
  constructor(posx, posy, ancho, alto) {
    this.vel = random(1.5, 5);
    this.posx = posx;
    this.posy = posy;
    this.ancho = ancho;
    this.alto = alto;
    this.vida = 1;

    this.imagen = loadImage("data/guardia.png");
  }

  dibujar() {
    image(this.imagen, this.posx, this.posy, this.ancho, this.alto);
  }

  movizq() {
    this.posx -= this.vel;
    if (this.posx < -50) {
      this.posx = 800;
    }
  }
}


class obstaculo {
  constructor(posx, posy, ancho, alto) {
    this.vel = random(1.5, 5);
    this.posx = posx;
    this.posy = posy;
    this.ancho = ancho;
    this.alto = alto;
    this.vida = 1;
    
    this.imagen = loadImage("data/arbustoo.png");
  }

  dibujar() {
    image(this.imagen, this.posx, this.posy, this.ancho, this.alto);
  }

  movizq() {
    this.posx -= this.vel;
    if (this.posx < -50) {
      this.posx = 800;
    }
  }
}
