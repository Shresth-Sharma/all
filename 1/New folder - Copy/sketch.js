const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var img;
var Birds = 2 ;
function preload() {
    getTime();
     img=loadImage=("sprites/bg2.png")
}

function setup(){
    var canvas = createCanvas(1360,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(680,height,1360,20);
    platform = new Ground(150, 510, 300, 170);
    //box1 = new Box(700,500,200,200)
    box2 = new Box(700,325,150,150)
    box3 = new Box(700,200,100,100)
    box4 = new Box(700,125,50,50)
    box5 = new Box(700,90,20,20)
    log1 = new Log(635,500,170,PI)
    log2 = new Log(765,500,170,PI)
    log3 = new Log(700,590,160,PI/2)
    pig1 = new Pig(700,550)

    bird = new Bird(200,250);
    
     
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:250});
}

function draw(){
    background("blue")
    
    
    Engine.update(engine);
    //strokeWeight(4);
    textSize(40);
    text("Birds Left : "+Birds,50,55);
    ground.display();
   
    //box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    log1.display();
    log2.display();
    log3.display();
    pig1.display();

    bird.display();
    
    console.log(bird.body.speed);
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
}
function keyPressed(){
    if(keyCode===32 && Birds>=1){
        Birds = Birds-1;
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body,{x:200,y:266});
    slingshot.attach(bird.body);
    }
}

async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
console.log(responseJSON)
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(datetime);
    console.log(hour);
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
}
