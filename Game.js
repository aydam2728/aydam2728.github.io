class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.image('bugs', 'assets/bugs.jpg');
        this.load.image('test', 'assets/racine.png');
        this.score=0;
        this.targetPoint = {x:0,y:0};
        this.upKey;
        this.downKey;
        this.leftKey;
        this.rightKey;
        this.list = [];
        this.test;
    }

    create(){
         this.test = this.add.image(1000, window.innerHeight,"test");
         this.test.setScale(0.5,0.5);
         this.test.setOrigin(0.5, 1);

        this.targetPoint.y=this.test.getTopCenter().y ;
        // Add a score text
        var timer = this.add.text(
            (this.game.config.width / 2) +100,
            100,
            '0:00.00',
            { fontSize: '50px', fill: '#fff' }
        );
        timer.setOrigin(0.5, 0);
        var time = this.add.text(
            (this.game.config.width / 2) - 100 ,
            100,
            'Time : ',
            { fontSize: '45px', fill: '#fff' }
        );
        time.setOrigin(0.5, 0);
        // Initialize the timer variables
        var minutes = 0;
        var seconds = 0;
        var milliseconds = 0;

        // Start the timer
        var interval = setInterval(function () {
            milliseconds += 100;

            // Increase seconds if milliseconds reach 1000
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
            }

            // Increase minutes if seconds reach 60
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }

            // Update the timer text
            timer.setText(minutes + ':' + (seconds < 10 ? '0' : '') + seconds + '.' + (milliseconds / 100).toFixed(0));

        }, 100);



        /* Spawn tout plein de bugs
        for (var i=0;i<10;i++){
            spawnBugs(this);

        }*/


        //backspace key implementation
        this.input.keyboard.on('keydown-' + 'BACKSPACE', function (event) {
            this.scene.start('startMenu');

        }, this);

        this.input.keyboard.on('keydown-' + 'A', function (event) {
            spawnBugs(this);
        }, this);

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
        //this.physics.add.overlap(this.graphics, spawnBugs(this), this.collisionHandler, null, this);
    }
    update(){
        if (this.upKey.isDown && this.targetPoint.y>=(window.innerHeight)/2)
        {
            this.targetPoint.y-=10;
        }
        else if (this.downKey.isDown && this.targetPoint.y<=window.innerHeight)
        {
            this.targetPoint.y+=10;
        }

        if (this.leftKey.isDown)
        {
            this.test.angle-=2;
        }
        else if (this.rightKey.isDown)
        {
                this.test.angle+=2;
        }
        this.targetPoint=this.test.getTopCenter() ;

        if(this.list.length >0){
                // Check for overlap between the line and the bug bounding box
            for (var i=0;i<this.list.length;i++) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.test.getBounds(), this.list[i].getBounds())) {
                    // Perform the desired action, e.g. score update or bug destruction
                    this.list[i].destroy();
                    //this.scene.start('endMenu');
                }
            }
        }


    }

}

function moveLine(Game) {
    Game.graphics.clear();
    Game.graphics.lineStyle(2, 0xff0000, 1);
    Game.graphics.moveTo(window.innerWidth / 2, window.innerHeight);
    Game.graphics.lineTo(window.innerWidth / 2, Game.top);
    Game.graphics.stroke();
}
function spawnBugs(Game){
    var x1 =0;
    var y1=0;
    var x2=Game.targetPoint.x
    var y2=Game.targetPoint.y;
    var fromTop = Math.round(Math.random()) //1 = True ; 0 = False
    if (fromTop == 1) {
        x1 = Math.random() * (window.innerWidth);
    }
    else if (Math.round(Math.random()) == 1) { //par la droite
        x1 = window.innerWidth;
        y1 = Math.random() * 2 * (window.innerHeight / 3);

    }
    else {
        y1 = Math.random() * 2 * (window.innerHeight / 3);

    }
    console.log();
    var img = Game.add.image(x1, y1, "bugs");
    img.setScale(0.05, 0.05);
    Game.tweens.add({
        targets: img,
        x: x2,
        y: y2,
        duration: 5000,
        ease: 'Linear'
    });
    Game.list.push(img);
}


