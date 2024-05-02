const g = 1.4; // Gravity
const jump = 20; // Jump power
const ground = 40;
const size = 57;


let x, y, vy;








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
  let gy = height - ground;
  line(0, gy, width, gy);
  

    y += vy;


    if(y < height - ground - size / 2){ // in the air
      vy += g;
    }
    else{
      vy = 0;
      y = height - ground - size / 2;
    }
  }

  function mousePressed(){
    if(y >= height - ground - size / 2){ // on the ground
      vy = -jump;     
    }
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
    square(this.x, y, 30);
  }
}