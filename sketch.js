var backgrd, backgroundImg;
var boy, boyImg, boyEndImage;
var coin, gameLogo, gameOver, gameOverImg;
var reset, resetImg;
var track, trackImg;
var car, car1, car2, car3, car4;

var count = 0;
var timer = 0;

var END = 1;
var PLAY = 0;
var gameState = PLAY;

function preload(){
    backgroundImg = loadImage ("images/background.png");
    
    boyImg = loadAnimation ("images/boy1.png", "images/boy2.png");
    boyEndImage = loadImage ("images/boy1.png");
    
    coin = loadImage ("images/coin.png");
    gameLogo = loadImage ("images/gameLogo.png");
    gameOverImg = loadImage ("images/gameOver.png");
    
    resetImg = loadImage ("images/reset.png");
    trackImg = loadImage ("images/track.jpg");
    
    car1 = loadImage ("images/car1.png");
    car2 = loadImage ("images/car2.png");
    car3 = loadImage ("images/car3.png");
    car4 = loadImage ("images/car4.png");

    
}

function setup(){
    createCanvas (windowWidth-30,windowHeight-30);

    backgrd = createSprite (500,500);
    backgrd.addImage (backgroundImg);
    backgrd.scale = 5;

    track = createSprite (width/2,200);
    track.addImage (trackImg);
    track.scale = 1;
    track.velocityY = 5;

    boy = createSprite (width/2,height-200,20,20);
    boy.addAnimation ("boy_running", boyImg);
    boy.scale = 0.3;

    gameOver = createSprite (width/2,height/2,10,10);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

    carsGroup = new Group();
}

function draw(){
    background (0);

    if (gameState === PLAY){

    if (backgrd.y<0){
        backgrd.y = 800;
    }

    if (track.y>height){
        track.y = height/2;
    }
    image(trackImg, 0,-displayHeight*4,displayWidth, displayHeight*5);

    gameOver.visible = false;

    if (keyDown(LEFT_ARROW)){
        boy.x = boy.x - 3;
    }

    if (keyDown(RIGHT_ARROW)){
        boy.x = boy.x + 3;
    }

    spawnCars();

    if (carsGroup.isTouching(boy)){
        gameState = END;
        boy.addImage(boyEndImage);
    }
  }

  if (gameState === END){
      gameOver.visible = true;
      track.velocityY = 0;
      carsGroup.setVelocityYEach(0);

      textSize(50);
      fill(255,255,255)
      text("Game Over",width/2,height/2);
  }

    drawSprites();

    // if (frameCount%60===0){
    //     timer = convertSeconds(count++);
    // }

    // textSize(30)
    // text(timer,50,40);
}

function spawnCars(){
    rand = Math.round (random(1,4));
    if (frameCount%50 === 0){
    car = createSprite (Math.round (random(420,830)),-50,20,20);
    car.velocityY = 15;
    car.scale = 0.75;
    car.setCollider ("Rectangle",0,0,200,450)
    switch(rand){
        case 1: car.addImage (car1);
        break;
        case 2: car.addImage (car2);
        break;
        case 3: car.addImage (car3);
        break;
        case 4: car.addImage (car4);
        break;
        default:break;
    }
    carsGroup.add (car);
    car.lifetime = 500;
  }
}

function convertSeconds(s){
    var min = floor(s/60);
    var sec = s%60;
    return nf(min,2)+":"+nf(sec,2);
}