class Game extends Phaser.Scene{
    constructor() {
        super("Game");
    }

    preload(){
        this.load.image('bugs', 'assets/bugs.jpg');
        this.score=0;
        this.top = 2*(window.innerHeight/3);
        this.graphics;
        this.upKey;
        this.downKey;
        this.leftKey;
        this.rightKey;
    }

    create(){
         this.graphics = this.add.graphics();

// Then, use the lineStyle() method to set the line properties (width, color, alpha, etc.)
        this.graphics.lineStyle(2, 0xff0000, 1);

// Use the moveTo() method to set the starting point of the line
        this.graphics.moveTo(window.innerWidth/2, window.innerHeight);

// Use the lineTo() method to set the end point of the line
        this.graphics.lineTo(window.innerWidth/2, this.top);

// Finally, use the stroke() method to actually draw the line
        this.graphics.stroke();
        // Add a score text
        var scoreText = this.add.text(window.innerWidth/2, 50, 'Score: ' + this.score, {
            fontSize: '32px',
            fill: '#fff'
        });

            // Update the text
            scoreText.setText('Score: ' + (this.score+10));

        /*
        for (var i=0;i<10;i++){
            var x1 =0;
            var y1=0;
            var x2=window.innerWidth/2;
            var y2=500;

            var fromTop = Math.round(Math.random()) //1 = True ; 0 = False
            if (fromTop == 1){
                x1 = Math.random() * (window.innerWidth);
            }else if(Math.round(Math.random()) == 1 ){ //par la droite
                x1 = window.innerWidth;
                y1 = Math.random() * 2* (window.innerHeight/3);
            }else{
                y1 = Math.random() * 2* (window.innerHeight/3);
            }
            var img = this.add.image(x1,y1,"bugs");
            img.setScale(0.05, 0.05);
            this.tweens.add({
                targets: img,
                x: x2,
                y: y2,
                duration: 8000,
                ease: 'Linear'
            });


        }*/
        //backspace key implementation
        this.input.keyboard.on('keydown-' + 'BACKSPACE', function (event) {
            this.scene.start('startMenu');


        },this);

        //dev game over switch key implementation test
        var inputString = '';

        this.input.keyboard.on('keydown', function (event) {
            inputString += event.key;

            if (inputString.toLowerCase().includes('loose')) {
                this.scene.start('endMenu');
              }
        }, this);

        this.upKey = this.input.keyboard.addKey("UP");
        this.downKey = this.input.keyboard.addKey("DOWN");
        this.leftKey = this.input.keyboard.addKey("LEFT");
        this.rightKey = this.input.keyboard.addKey("RIGHT");
    }
    update(){
        if (this.upKey.isDown && this.top>=(window.innerHeight)/2)
        {
            this.top=this.top-10;
            moveLine(this);
        }
        else if (this.downKey.isDown && this.top<=window.innerHeight)
        {
            this.top=this.top+10;
            moveLine(this);
        }

        if (this.leftKey.isDown)
        {

        }
        else if (this.rightKey.isDown)
        {

        }




    }

}

function moveLine(Game){
    Game.graphics.clear();
    Game.graphics.lineStyle(2, 0xff0000, 1);
    Game.graphics.moveTo(window.innerWidth / 2, window.innerHeight);
    Game.graphics.lineTo(window.innerWidth / 2, Game.top);
    Game.graphics.stroke();
}
function spawnBugs(Game){
    var x1 =0;
    var y1=0;
    var x2=window.innerWidth/2;
    var y2=Game.top;
    var fromTop = Math.round(Math.random()) //1 = True ; 0 = False
    if (fromTop == 1){
        x1 = Math.random() * (window.innerWidth);
    }else if(Math.round(Math.random()) == 1 ){ //par la droite
        x1 = window.innerWidth;
        y1 = Math.random() * 2* (window.innerHeight/3);

    }else{
        y1 = Math.random() * 2* (window.innerHeight/3);

    }
    console.log();
    var img = Game.add.image(x1,y1,"bugs");
    img.setScale(0.05, 0.05);
    Game.tweens.add({
        targets: img,
        x: x2,
        y: y2,
        duration: 5000,
        ease: 'Linear'
    });


}