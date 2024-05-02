const g = 1; // Gravity
const jump = 20; // Jump power
const ground = 20;
const size = 20;










//////////////////////////////////      Фон

var bg;

function preload(){
    bg = loadImage(" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS-7Qyu3uyYCdDQiZMiJijcCcXXbfa9oOqg95gw4ojrQ&s  ")
}

function setup() {
    createCanvas(614,355)
  player = new Player(width/2, height/2);
  y = height - ground - size / 2;
  vy = 0;

                                              }

function draw() {
 
    background(bg)
  player.update();
  player.draw();
  
}

///////////////////////////////////////////////////////////



















/////////////////////////////////////////////// Вперед назад

let player;

let pressedKeys = {};




function keyPressed() {
  pressedKeys[key] = true;
}

function keyReleased() {
  delete pressedKeys[key];
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 4;
  }

  update() {
    let mvmt = createVector(0, 0);

    if(pressedKeys.a) {
      mvmt.x -= 1;
    }
    if(pressedKeys.d) {
      mvmt.x += 1;
    }
    if(pressedKeys.w) {
      mvmt.y -= 1;
    }
    if(pressedKeys.s) {
      mvmt.y += 1;
    }

    mvmt.setMag(this.speed);

    this.x += mvmt.x;
    this.y += mvmt.y;
  }

  draw() {
    fill(255, 0, 0);
    square(this.x, this.y, 30);
  }
}