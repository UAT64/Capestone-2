//Variables

var spaceImg, space;
var playerImg, player
var distance=0
var rock1,rock2,rock3,rock4,rock5
var rockGroup
var PLAY=1
var END=0
var gamestate=PLAY
var game_over,game_over_image
var restart,restart_image
var lazer 
var laserGroup
var rockets
var rocketsGroup

function preload(){

    spaceImg = loadImage("background.png")
    playerImg = loadImage("player_ship.png")

    rock1 = loadImage("rock1.png")
    rock2 = loadImage("rock2.png")
    rock3 = loadImage("rock3.png")
    rock4 = loadImage("rock4.png")
    rock5 = loadImage("rock5.png")

    restart_image = loadImage("Replay_BTN.png")

    game_over_image = loadImage("YouLose_Header.png")

    lazer = loadImage("player_laser.png")

    rockets = loadImage("rocket.png")

}


function setup() {
    createCanvas(600, 800);
   //make cavase small to show text
    //space = createSprite(-100,-100)
    //normal canvas
    //space = createSprite(300,300)
    //space.addImage("space",spaceImg);

    textSize(18)
    fill("red")
    text("Lightyears Travelled:"+distance,390,20)
    

    player = createSprite(300,710)
    player.addImage("player",playerImg)
    player.scale = 0.8

    rockGroup=new Group()
    laserGroup=new Group()
    rocketsGroup=new Group()

    restart = createSprite(300,400)
    restart.addImage(restart_image)
    restart.scale = 0.5


    game_over = createSprite(300,50)
    game_over.addImage(game_over_image)
    game_over.scale = 0.8
   
}

  function draw() {
    background(spaceImg)
//rock.rotation +=25
//DISTANCE IS BEING DISPLAYED BUT BEHIND CANVAS - MUST FIX
    
    textSize(18)
    fill("red")
    text("Lightyears Travelled:"+distance,390,20)
    //distance = distance + Math.round(getFrameRate()/100);
    //distance = distance + Math.round(getFrameRate());


    //text.depth = //space.depth
    //text.depth+=1  

    //rock1.rotation +=15
    

    console.log(gamestate)



    if (gamestate===PLAY){
         player.x=World.mouseX
         if(mousePressedOver(player)){
            player.y=World.mouseY
        }
         //space.velocityY = 1
         rocks()

         game_over.visible = false
         restart.visible = false

        if(keyDown("R")){
            player.y = 710
        }
         
        if(rockGroup.isTouching(player)){
            gamestate=END
            
        }

        if (keyDown("1")){
            lasers();  
          }         
        

        if (keyDown("2")){
            rockets_f()
        }

        if (laserGroup.isTouching(rockGroup)){
            rockGroup.destroyEach()
            laserGroup.destroyEach()
            rocketsGroup.destroyEach()
        }
        if (rocketsGroup.isTouching(rockGroup)){
            rockGroup.destroyEach()
            rocketsGroup.destroyEach()
            laserGroup.destroyEach()
            
        }

        textSize(18)
        fill("white")
        text("Lightyears Travelled:"+distance,390,20)
        distance+=Math.round(getFrameRate()/60)

    }

     else if (gamestate===END){
        rockGroup.setVelocityYEach (0)
        game_over.visible = true
        restart.visible = true
        player.y = 710

        textSize(18)
        fill("white")
        text("Hint:",25,470)
        text("Use '1' To launch lasers at the rocks",25,490)
        text("Use '2' To launch rockets at the rocks aswell.",25,510)
        text("Left Click on player for more mobility.",25,530)
        text("Don't get hit or its game over.",25,550)

        if(mousePressedOver(restart)){
            console.log("Game is restarting.")
            reset()
        }
        
    }
   
    //if(space.y > 500){
    //    space.y = 300
    //}
    
   
    
    if(player.x<50){
        player.x=50
    }

    if(player.x>550){
        player.x=550
    }

    player.debug = false
    restart.debug = false


    
    
    

    drawSprites()
  }
  

function rocks(){
    if(frameCount%70==0){
        rock=createSprite(300,-100,10,10)
        rock.shapeColor = 100
        //rock.addImage(rock1)
        rock.velocityY=+ (5+distance/5000)
        //rocks.rotation +=15
        rock.x=Math.round(random(50,550))
        var rockran =Math.round(random(1,5))
        switch(rockran){
            case 1:
            rock.addImage(rock1)
            

            break

            case 2:
            rock.addImage(rock2)

            break

            case 3:
            rock.addImage(rock3)
            rock.scale = 0.6
            break

            case 4:
            rock.addImage(rock4)
            rock.scale = 0.6

            break

            case 5:
            rock.addImage(rock5)
            rock.scale = 0.6
            break

            default:
                break
                
        }

        //rock.scale = 1
        
        rockGroup.add(rock)
        //rock.rotation += 180
        rock.debug = false

    }

}

function reset(){
    gamestate = PLAY
    restart.visible = false
    game_over.visible = false
    rockGroup.destroyEach()
    distance = 0
}

function lasers(){
   
    var laser= createSprite(300, 720, 10, 60);
    laser.addImage(lazer);
    laser.x = 300;
    laser.x=player.x;
    laser.y=player.y
    laser.velocityY = -4;
    laser.lifetime = 300;
    laser.scale = 0.7;

    laserGroup.add(laser)

    laser.debug = false
}

function rockets_f(){

    var rocket = createSprite(300, 720, 10, 60)
    rocket.addImage(rockets)
    rocket.x = 300
    rocket.x=player.x;
    rocket.y=player.y
    rocket.velocityY = -4;
    rocket.lifetime = 300;
    rocket.scale = 0.7;

    rocketsGroup.add(rocket)
    rocket.debug = false
}
  
  