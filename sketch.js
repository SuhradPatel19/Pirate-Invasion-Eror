const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var myTower;
var MyCanon, MycanonBall;
var myGround
var backgroundImage, towerImage
var Myboat
var balls = []
var boats = []
var boatAnimation = []
var boatJsonData, boatSpriteSheet
var brokenAnimation = []
var waterAnimation = []
var brokenJsonData, brokenSpritesheet
var waterJsonData, waterSpritesheet
var backgroundMusic, PirateLaugh, explosion
var isGameOver = false



function preload() {
  // I am displaying myTower
  backgroundImage = loadImage("../C27-Ta-v4--main/assets/background.gif")
  //towerImage = loadImage("../C27-Ta-v4--main/assets/tower.png")
  boatJsonData = loadJSON("../C27-Ta-v4--main/assets/boat/boat.json")
  boatSpriteSheet = loadImage("../C27-Ta-v4--main/assets/boat/boat.png")
  brokenJsonData = loadJSON("../C27-Ta-v4--main/assets/boat/broken_boat.json")
  brokenSpritesheet = loadImage("../C27-Ta-v4--main/assets/boat/broken_boat.png")
  backgroundMusic = loadSound("../C27-Ta-v4--main/assets/background_music.mp3")
  PirateLaugh = loadSound("../C27-Ta-v4--main/assets/pirate_laugh.mp3")
  explosion = loadSound("../C27-Ta-v4--main/assets/cannon_explosion.mp3")
  waterJsonData = loadJSON("../C27-Ta-v4--main/assets/water_splash/water_splash.json")
  waterSpritesheet = loadImage("../C27-Ta-v4--main/assets/water_splash/water_splash.png")


}


function setup() {
  createCanvas(1000, 500);

  engine = Engine.create();
  world = engine.world;

  myTower = new Tower(120, 275, 150, 300)
  var angle = -PI / 4
  MyCanon = new Canon(180, 110, 200, 200, angle)
  myGround = new Ground(500, 500, width, 30)

  var boatFrames = boatJsonData.frames
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h)
    boatAnimation.push(img)
    //console.log(img)
  }

  var brokenFrames = brokenJsonData.frames
  for (var i = 0; i < brokenFrames.length; i++) {
    var pos = brokenFrames[i].position
    var img = brokenSpritesheet.get(pos.x, pos.y, pos.w, pos.h)
    brokenAnimation.push(img)
  }

}




function draw() {
  background(backgroundImage);
  Engine.update(engine);

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play()
    backgroundMusic.setVolume(0.4)

  }

  myTower.display()
  MyCanon.display()
  myGround.display()
  showBoat()

  for (var i = 0; i < balls.length; i++) {
    showBalls(balls[i], i)
    for (var j = 0; j < boats.length; j++) {

      if (boats[j] !== undefined && balls[i] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body)
        if (collision.collided) {
          boats[j].remove(j)
          Matter.World.remove(world, balls[i].body)
          balls.splice(i, 1)
          i--
        }
      }
    }
  }
  // MycanonBall.display()


}
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    MycanonBall = new Canonball(MyCanon.x+12, MyCanon.y-30, 40)
    Matter.Body.setAngle(MycanonBall.body,MyCanon.angle)
    MycanonBall.trajectry=[]
    balls.push(MycanonBall)
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot()
    explosion.play()
    explosion.setVolume(0.2)

  }
}


function showBalls(ball, index) {
  ball.display()
  ball.animate()

  if (ball.body.position.x >= width || ball.body.position.y >= height - 55) {
    if(!ball.isSink){
      World.remove(world, ball)
      ball.remove(index)
      // balls.splice(index, 1)
    }
   
  }

}

function showBoat() {
  // if condition will work only one boat should be inside the boat array
  if (boats.length > 0) {
    if (boats.length < 4 && boats[boats.length - 1].body.position.x < width - 100) {

      var position = [-30, -80, -60, -50]
      var randomPosition = random(position)

      Myboat = new Boat(width - 10, 450, 100, 100, randomPosition, boatAnimation)
      boats.push(Myboat)
    }

    for (var i = 0; i < boats.length; i++) {
      boats[i].display()
      boats[i].animate()
      Matter.Body.setVelocity(boats[i].body, { x: -1, y: 0 })
      var collision = Matter.SAT.collides(boats[i].body, myTower.body)
      if (collision.collided) {
        isGameOver = true
        gameOver()
      }

    }
  }
  else {
    Myboat = new Boat(width - 10, 450, 100, 100, -40, boatAnimation)
    boats.push(Myboat)

  }
}

function gameOver() {
  swal({
    title: "Game Over!", text: "Thanks for Playing!",
    imageUrl: "https:raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Play Again"
  },
    function (isConfirmed) {
      if (isConfirmed) {
        window.location.reload()


      }

    }

  )




  //console.log("Game Over!")

}


