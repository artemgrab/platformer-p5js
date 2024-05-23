let player, groundSensor, block, mech, enemies;
let blockImg, mechImg, charactersImg, enemyImg;


let canShoot = true;
let shootCooldown = 10; 

let bullet;
let bulletSpeed = 5;
let bullets = [];


let score = 0;

function preload() {
  blockImg = loadImage("block.png");
  mechImg = loadImage("mech.png");
  bg = loadImage("bg.png")
  charactersImg = loadImage("characters.png");
  enemyImg = loadImage("enemy.png");
  robotoffImg = loadImage("robot_off.png");
  tableImg = loadImage("title.png");
  robotonImg = loadImage("robot_on.png");
}

class Bullet {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  update() {
    this.x += this.direction * bulletSpeed;
  }

  display() {
    fill(111, 49, 152); 
    ellipse(this.x, this.y, 5, 5); 
  }
}



function setup() {
  new Canvas(200, 160, "pixelated x4");
  world.gravity.y = 10;
  allSprites.pixelPerfect = true;

  robot = new Sprite(20, 137, 10);
  robot.collider = "static";
  robot.addImage('off', robotoffImg);
  robot.addImage('on', robotonImg);


  block = new Group();
  block.layer = 0;
  block.collider = "static";
  block.img = blockImg;
  block.tile = "b";

  table = new Group();
  table.layer = 0;
  table.collider = "static";
  table.img = tableImg;
  table.tile = "t";

  mech = new Group();
  mech.collider = "static";
  mech.spriteSheet = mechImg;
  mech.addAni({ w: 16, h: 16, row: 0, frames: 14 });
  mech.tile = "m";


  enemies = new Group();
  enemies.collider = "static";
  enemies.spriteSheet = enemyImg;
  enemies.addAni({ w: 16, h: 16, row: 0, frames: 4 });
  enemies.tile = "e";

  new Tiles(
    [
      "  t                                                     ",
      "       e  m    e    b              e        ",
      "      bbbbbbbbbb   bb m       bbbbbbbbbbbb                   ",
      "                   bbbbbb                   b   m",
      "                                                b       ",
      "                  m                                  ",
      "                  bb                           b     ",
      "                b  b  b                      b      ",
      "               e   b         e    e m      e    ",
      "bbbbbbbbbb    bbbbbb      bbbbbbbbbbb    bbb",
    ],
    8,
    8,
    16,
    16
  );

  player = new Sprite(53, 100, 10);
  player.layer = 1;
  player.anis.w = 16;
  player.anis.h = 16;
  player.anis.offset.y = -2;
  player.anis.frameDelay = 8;
  player.spriteSheet = charactersImg;
  player.addAnis({
    idle: { w: 16, h: 16, row: 0, frames: 4 },
    knockback: { w: 16, h: 16, row: 0, frames: 1 },
    run: { w: 16, h: 16, row: 1, frames: 3 },
    jump: { w: 16, h: 16, row: 1, col: 3, frames: 2 },
  });
  player.ani = "idle";
  player.rotationLock = true;
  

  player.friction = 0;

  player.overlaps(enemies, die);
  player.overlaps(mech, collectMech);

  groundSensor = new Sprite(player.x, player.y + 6, 2, 12);
  groundSensor.rotationLock = true;
  groundSensor.visible = false;
  groundSensor.overlaps(block);
  groundSensor.overlaps(player);

  textAlign(CENTER);
  bullet = new Bullet(player.x, player.y, 1); 
}

function collectMech(player, mech) {
  mech.remove();
  score++;
}



function die(player, enemy) {
  player.x = 53;
  player.y = 100;
}



function draw() {
  
  background(bg)
  fill(255);
  
  
  text("Score: " + score, 160, 20);



    
    if (score == 5){
        robot.changeAnimation('on');


    }
    else {
      robot.changeAnimation('off');
  }
  groundSensor.moveTowards(player.x, player.y + 6, 1);

  if (player.x > 29 && player.x < 60 && score==5 && player.y == 138) {
    gameover();
  }
  if (groundSensor.overlapping(block)) {
    if (kb.presses("space")) {
      player.ani = "jump";
      player.vel.y = -4.5;
    }
  }

  if (kb.pressing("left")) {
    player.ani = "run";
    player.vel.x = -1.5;
    player.mirror.x = true;
  } else if (kb.pressing("right")) {
    player.ani = "run";
    player.vel.x = 1.5;
    player.mirror.x = false;
  } else {
    player.ani = "idle";
    player.vel.x = 0;
  }

  if (kb.pressing("shift") && canShoot) {
    let newBullet = new Bullet(player.x - camera.x + 100, player.y, player.mirror.x ? -1 : 1);
    print(player.x, player.y, camera.x);
    bullets.push(newBullet);
    canShoot = false; 
  }


  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (bullets[i].x >= enemies[j].x && bullets[i].x <= enemies[j].x + enemies[j].width &&
        bullets[i].y >= enemies[j].y && bullets[i].y <= enemies[j].y + enemies[j].height) {
        enemies[j].remove();
        bullets.splice(i, 1);
        break; 
      }
    }
  }
  if (!canShoot) {
    shootCooldown--;
    if (shootCooldown <= 0) {
      canShoot = true; 
      shootCooldown = 50;
    }
  }

  if (player.y > 400) {
    player.speed = 0;
    player.x = 48;
    player.y = 100;
  }

  camera.x = player.x + 52;
  function gameover(){
    text('U did it!', width / 2, height / 2);
    noLoop();
  }
  
}




