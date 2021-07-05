var database;
var gameState = 0;
var playerCount = 0;
var form, player, game;
var allPlayers;
var monsterInfo;
var players;
var fireball;
var isDone = true;
var randomX, randomY;
var otherfireball;
var isWin;
var standingPlayer,basketball,hoop;

//create the ball, playerPaddle and computerPaddle as sprite objects
var ball;
var player1;
var player2;
var monster;
function preload(){
  standingPlayer = loadImage("images/man_standing.png")
  basketball = loadImage("images/basketball.png");
  hoop = loadImage("images/hoop.png")
}

function setup(){
  database = firebase.database();

  createCanvas(700,700);
  game = new Game();
  game.getState();
  game.start();

  
}

function draw(){
  background("white");


  if (playerCount===2){
    game.update(1);
    game.getState();
  }
  
 
  
  if (gameState==1){
game.play()
 

  
}
}


