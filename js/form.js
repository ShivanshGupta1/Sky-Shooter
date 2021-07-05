class Form{
    constructor(){
        this.input = createInput("Name");
        this.button = createButton("PLAY!");
        this.greeting = createElement("h3");
        this.reset = createButton("RESET!")
    }
    display(){
        let title = createElement("h2");
        title.html("Sky Shooter v1.0.1");
        title.position((windowWidth/2)-30,10);
        this.input.position((windowWidth/2)-30,windowHeight/2-100);
        this.button.position((windowWidth/2)+20,windowHeight/2-60);
        this.reset.position((windowWidth)-150,20)
        this.reset.mousePressed(()=>{
                game.update(0)
                player.updateCount(0)
                database.ref("/").update({"players":null})
                database.ref("isWin").set({status:false, playerName:"" });
                player.updateMonster(-100,-100)
                location.reload();
 
        })
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount+=1;
            player.index = playerCount;
            player.updateCount(playerCount);
            player.update();
            this.greeting.html("Welcome "+ player.name);
            this.greeting.position((windowWidth/2)-30,10);
            title.hide();
        })
    }
    hide(){
        this.greeting.hide();
    }


}