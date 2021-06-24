var PLAY =1;
var END =0;
var gameState = PLAY;

var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var bellSound;


var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  restartImg = loadImage("images/restart2.png")
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  biker = loadImage("images/cycler2.png");
  
  bell = loadSound("sound/bell.mp3");
 
}


function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

mainCyclist.setCollider("rectangle",0,0,mainCyclist.height,mainCyclist.width);

  
  restart = createSprite(250,150,40,40);
  restart.addImage(restartImg);
  restart.visible = false;
  
  cycler = new Group();
  
distance= 0;
  
}

function draw() {
  background(0);
  
  
  
 
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
    createCycler2();
    
    path.velocityX = -(5 + 2*distance/100);
    cycler.velocityX = -(5 + 2*distance/100);
    
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
   distance = distance + Math.round(getFrameRate()/60);
    
    if(distance>0 && distance%100 === 0){
      bell.play() 
    }
    
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2.2;
  }
    
    if(mainCyclist.isTouching(cycler)){
      gameState = END;
      
    }
  }
   else if(gameState===END){
      
      mainCyclist.changeAnimation(mainRacerImg2);
      mainCyclist.velocityY = 0;
      path.velocityY = 0;
      cycler.velocityY = 0;
     restart.visible = true; 
     
    }
  
  
 drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);

}

function createCycler2(){
  if(frameCount%200 === 0){
    var cycler = createSprite(500,50,30,50);
    cycler.y = Math.round(random(20,250));
    cycler.addImage(biker);
    cycler.velocityX = -5
    cycler.scale = 0.25;
    cycler.lifetime=400;
  }
  
}