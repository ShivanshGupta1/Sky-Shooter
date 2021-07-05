class Player {
  constructor() {
    this.index = null;
    this.name = null;
    this.score = 0;
    this.distance = 0;
    this.x = 0;
    this.y = 0;
  }
  getCount() {
    database.ref("playerCount").on("value", (data) => {
      playerCount = data.val();
    });
  }
  getPlayerInfo() {
    database.ref("players").on("value", (data) => {
      allPlayers = data.val();
    });
  }

  updateMonster(x, y) {
    database.ref("monster").set({ x: x, y: y });
  }
  updateFireball(x,y){
       database.ref("fireball"+player.index).set({ x: x, y: y });
  }
  readMonster() {
    database.ref("monster").on("value", (data) => {
      
      monsterInfo = data.val();
    });
  }
  updateCount(count) {
    database.ref("/").update({ playerCount: count });
  }
  update() {
    database
      .ref("players/player" + player.index)
      .set({ name: this.name, score: this.score, x: this.x, y: this.y });
  }
}
