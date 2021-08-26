var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var distance;

var runner,dog,coin,dog,jungle,wood1,wood2,cloud,gameover,restart,sound;

var runnerimg,dogimg,coinimg,dogimg,jungleimg,wood1img,wood2img,gameoverimg,cloudimg,restartimg;

var wood1group,wood2group,cloudgroup,coingroup;

function preload(){

jungleimg=loadImage("Ground_PNG_Clip_Art_Image.png");
runnerimg=loadAnimation("unnamed.gif");
dogimg=loadAnimation("dog.gif");
coinimg=loadAnimation("coinb.gif");
wood1img=loadImage("woodd.png");
wood2img=loadImage("wood3.png");
cloudimg=loadImage("Daco_1189537.png");
gameoverimg=loadImage("gameover.png");
restartimg=loadImage("restart.png");

}

function setup() {
 createCanvas(1200,600);
 jungle=createSprite(600,400,10,10);
 jungle.addAnimation("jungle",jungleimg);
 jungle.scale=0.3;
 jungle.velocityX=-5;

 runner=createSprite(400,410,10,10);
 runner.addAnimation("run",runnerimg);
 runner.scale=0.4;

 dog=createSprite(150,450,10,10);
 dog.addAnimation("police",dogimg);
 dog.scale=0.8;
 

 gameover=createSprite(600,200,10,10);
 gameover.addImage(gameoverimg);
 gameover.visible=false;

 restart=createSprite(600,300,10,10);
 restart.addImage(restartimg);
 restart.visible=false;

 invisibleGround = createSprite(250,535,500,10);
 invisibleGround.visible=false;

 wood2group=new Group();
 wood1group=new Group();
 coingroup=new Group();
 cloudgroup=new Group();

 score = 0;
 distance=0;

 dog.setCollider("rectangle",0,0,dog.height,200);
 runner.setCollider("rectangle",0,0,75,runner.height);
}

function draw() {
    background(255);

    if(gameState === PLAY){

      if (jungle.x < 0){
        jungle.x=300;
      }

      distance = distance + Math.round(getFrameRate()/60);

      if (coingroup.isTouching(runner)){
        coingroup.destroyEach();
        score=score+1;
       }

      jungle.velocityX = -(4 + 2* distance/400)

      runner.velocityY = runner.velocityY + 0.8;
      dog.velocityY = dog.velocityY + 0.8;

      if (keyDown ("space")&& runner.y >=400){
        runner.velocityY=-22;
      }
      if (wood2group.isTouching(dog)||wood1group.isTouching(dog)&&dog.y>=100){
        dog.velocityY=-22;
      }

      if (wood1group.isTouching(runner)||wood2group.isTouching(runner)){
        gameState = END;
      }
      spawnclouds();
      spawnwoods2();
      spawncoins();
      spawnwoods1();
     
   }
    if (gameState === END){

    runner.visible=false;
    dog.visible=false; 
    jungle.velocityX=0;
    gameover.visible=true;
    restart.visible=true;
    runner.velocityY=0;

    wood1group.setLifetimeEach(-1);
    wood2group.setLifetimeEach(-1);
    coingroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);

    wood1group.setVelocityXEach(0);
    wood2group.setVelocityXEach(0);
    coingroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);

    wood1group.destroyEach();
    wood2group.destroyEach();
    coingroup.destroyEach();
  

  if (mousePressedOver(restart)){
    reset();
  }
  }

  runner.collide(invisibleGround);
  dog.collide(invisibleGround);

  drawSprites();
  textSize(20);
  fill(255,0,0);
  text("SCORE : "+ score,1100,50);
  textSize(20);
  fill(255,0,0);
  text("DISTANCE : "+ distance,100,50);
}

function reset(){
  gameState=PLAY;

  runner.visible=true;
  dog.visible=true;
  gameover.visible=false;
  restart.visible=false;
  jungle.velocityX=-5;

  wood1group.destroyEach();
  wood2group.destroyEach();
  coingroup.destroyEach();
  cloudgroup.destroyEach();

  score=0;
  distance=0;

}

function spawnclouds() {
  if (frameCount%150 === 0){
  var cloud = createSprite(1200,100,40,10);
    cloud.addImage(cloudimg);
    cloud.velocityX = -5;
    cloud.scale=0.2;
    cloud.lifetime=270;

    cloud.depth = runner.depth;
    runner.depth +=1;

    cloud.depth = dog.depth;
    dog.depth +=1;

    cloudgroup.add(cloud); 
 
  }
 }

function spawncoins() {
 if (frameCount%200 === 0){
   var coin = createSprite(1100,120,40,10);
   coin.y=Math.round(random(20,400));
   coin.addAnimation("bonus",coinimg);
   coin.velocityX = -5;
   coin.scale=0.2;
   coin.lifetime=270;
   coingroup.add(coin); 

 }
}
function spawnwoods2() {
  if (frameCount%250 === 0){
    var wood1 = createSprite(1100,470,40,10); 
    wood1.velocityX = -7;
    wood1.scale=0.15;
    wood1.addImage(wood1img);
    wood1.lifetime=270;
    wood1group.add(wood1); 
 
  } 
}

function spawnwoods1() {
  if (frameCount%250 === 0){
    var wood2 = createSprite(1800,470,40,10); 
    wood2.velocityX = -7;
    wood2.scale=0.04;
    wood2.addImage(wood2img);
    wood2.lifetime=270;
    wood2group.add(wood2); 
 
  } 
}
