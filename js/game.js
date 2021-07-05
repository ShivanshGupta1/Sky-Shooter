class Game {
  constructor() {}
  getState() {
    database.ref("gameState").on("value", (data) => {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({ gameState: state });
  }
  start() {
    if (gameState == 0) {
      player = new Player();
      player.getCount();
      form = new Form();
      form.display();
    }
    monster = createSprite(200, 20, 10, 10);
    monster.visible = false;
    player1 = createSprite(300, 600, 50, 50);
    player1.visible = false;
    player1.addImage(standingPlayer);
    player2 = createSprite(400, 600, 50, 50);
    player2.visible = false;
    player2.addImage(standingPlayer);
    player1.scale = 0.25
    player2.scale = 0.25;
    players = [player1, player2];
    fireball = createSprite(
              -100,-100,
              50,
              50
            );
  

    otherfireball = createSprite(
              100,100,
              50,
              50
            );
      fireball.addImage(basketball);
    otherfireball.addImage(basketball);
    fireball.scale = 0.125
    otherfireball.scale = 0.125
    monster.addImage(hoop);
    monster.scale = 0.25
   

  }
  play() {
    var index = 0;
   
    
  
   
    monster.visible = true;
    player1.visible = true;
    player2.visible = true;
    form.hide();
    player.getPlayerInfo();
    database.ref("monster").on("value", (data) => {
          monster.x = data.val().x;
        });
     database.ref("isWin").on("value", (data) => {

       
          if (data.val().status == true) {
                   player1.destroy();
                   player2.destroy();
                   monster.destroy();
                   fireball.destroy();
                   otherfireball.destroy();
            background(0);
            fill("blue");
            text(
              data.val().playerName + " has won the game!",
              350,
              350
            );
          }
    });
  if (player.index == 1){
        database.ref("fireball2").on("value", (data) => {
          otherfireball.x = data.val().x;
          otherfireball.y = data.val().y;
     
        });
  }
if (player.index == 2) {
         database.ref("fireball1").on("value", (data) => {
           
           otherfireball.x = data.val().x;
           otherfireball.y = data.val().y;
       
         });
}

   if (allPlayers != null) {

       
      for (var i in allPlayers) {
        index += 1;
        if ("player" + player.index === i) {
          

          
          player.x = players[index - 1].x
          player.update();
          fill("blue")
          text("YOU",  players[index - 1].x-10,  players[index - 1].y - 70);
       
        } else {
          
          players[index - 1].x = allPlayers[i].x;
          fill("blue");
          text(allPlayers[i].name, players[index - 1].x-20,  players[index - 1].y - 70);
        }       

       
      }

    }
    if (frameCount%300 == 0) {
      randomX = Math.round(random(100,600));

      player.updateMonster(randomX,20)
      monster.velocityY = 2
      monster.lifetime = 600;
    }
    if (monster.y>700){
       monster.y = 20;
    }

    if (keyIsDown(UP_ARROW) && isDone==true){
        fireball.x = players[player.index - 1].x
        fireball.y = players[player.index - 1].y

        fireball.visible = true;
        fireball.velocityY = -3
        isDone = false

    }
    if (fireball.y<0 ){
      fireball.visible = false;
      isDone = true
    
    }
 
    if (fireball.isTouching(monster)){
        player.updateMonster(-100, -100);
         isDone = true;
        player.score += 1;
  
        player.update();
    }
      if (otherfireball.y < 0 ) {
      otherfireball.x = -100
      otherfireball.y = -100
    
      }
      if (otherfireball.isTouching(monster)){
    player.updateMonster(-100, -100);
         otherfireball.x = -100;
         otherfireball.y = -100;
      }
        if (keyIsDown(RIGHT_ARROW)) {
          players[player.index - 1].velocityX = 1.5;
        }
    if (keyIsDown(LEFT_ARROW)) {
            players[player.index - 1].velocityX = -1.5
          }
   if (player1.x > width || player1.x < 0) {
     player1.velocityX = player1.velocityX * -1;
   }
      if (player2.x > width || player2.x < 0) {
        player2.velocityX = player2.velocityX * -1;
      }
    if (player.score>=5 && allPlayers != null){
       database.ref("isWin").set({status:true, playerName:allPlayers["player"+player.index].name });
    }

    player.updateFireball(fireball.x,fireball.y);
    createEdgeSprites();
    drawSprites();
      if (allPlayers != null ){
              text(allPlayers["player1"].name+"'s Score: "+ allPlayers["player1"].score,550,50)
      text(allPlayers["player2"].name+"'s Score: "+ allPlayers["player2"].score, 550, 100);
      }
    }
  }

