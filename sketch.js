var carrot,carrotImg;
var goldenCarrot,goldenCarrotImg;
var rabbit,rabbit_running;
var score = 0;
var ground,groundImg;

var cloud,cloudImg, cloudsGroup;

function preload(){
  rabbit_running =   loadAnimation("images/rabbit1.png","images/rabbit2.png");
  carrotImg = loadImage('images/carrot.png');
  goldenCarrotImg = loadImage('images/goldencarrot.png');
  groundImg = loadImage("images/ground.png");
  cloudImg = loadImage("images/cloud.png")
}

function setup() {
  createCanvas(600, 600);
  
  ground = createSprite(205, 600,605, 10);
  ground.addImage("ground",groundImg);
  //ground.x = ground.width/2;
  

  rabbit = createSprite(50,580,20,20);
  rabbit.addAnimation("rabbit",rabbit_running);
  rabbit.scale = 0.05;
  rabbit.debug = true;
  rabbit.setCollider("rectangle", 0, 0, 40, 250);
  
  carrotGroup = new Group();
  goldenCarrotGroup = new Group();
  
  cloudsGroup = new Group();

}
function draw() {
    background("#DDF3F5");

    ground.velocityX = -4;

    if(ground.x<0){
      ground.x = ground.width/4;
    }

    if(keyDown("space") && rabbit.y >= 159) {
      rabbit.velocityY = -12;
    }
  
    rabbit.velocityY = rabbit.velocityY + 0.8;

    spawnCarrot();
    spawngoldenCarrot();
    spawnClouds();

    if(carrotGroup.isTouching(rabbit)){
      carrotGroup.destroyEach();
    }

    if(goldenCarrotGroup.isTouching(rabbit)){
      goldenCarrotGroup.destroyEach();
    }

    rabbit.collide(ground);
    
    drawSprites();
  
}

function spawnCarrot(){
  if( frameCount% 200 === 0){
    carrot = createSprite(800,120,30,10);
    carrot.y = Math.round(random(480,520));
    carrot.addImage(carrotImg);
    carrot.scale = 0.06;
    carrot.velocityX = -3;

    //adjust the depth
    carrot.depth = rabbit.depth;
    rabbit.depth = rabbit.depth + 1;

    carrotGroup.add(carrot);
    
  }
}

function spawngoldenCarrot(){
  if( frameCount% 200 === 0){
    goldenCarrot = createSprite(800,120,30,10);
    goldenCarrot.y = Math.round(random(480,520));
    goldenCarrot.addImage(goldenCarrotImg);
    goldenCarrot.scale = 0.3;
    goldenCarrot.velocityX = -3;

    goldenCarrotGroup.add(goldenCarrot);

  }
}

function spawnClouds(){
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var cloud = createSprite(620,120,40,10);
    cloud.y = Math.round(random(20,160));
    cloud.addImage(cloudImg);
    cloud.scale = 0.15;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = rabbit.depth;
    rabbit.depth =rabbit.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}