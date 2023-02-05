var timerValue=0;
class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.audio('hit', 'assets/hit.wav');

        this.load.image('bugs', 'assets/bugs.jpg');
        this.load.image('bugs_1', 'assets/bugs_1.png');
        this.load.image('bugs_2', 'assets/bugs_2.png');
        this.load.image('taille1', 'assets/racine.png');
        this.load.image('taille2', 'assets/taille2.png');
        this.load.image('taille3', 'assets/taille3.png');
        this.load.image('taille4', 'assets/taille4.png');
        this.load.image('taille5', 'assets/taille5.png');
        this.load.image('taille6', 'assets/taille6.png');
        this.load.image('heart', 'assets/8bitheart.png');
        this.load.image('daisy', 'assets/daisy.png');
        this.load.image("splash",'assets/splash.png');
        this.load.image("fond",'assets/fond.png');
        this.score=0;
        this.targetPoint = {x:0,y:0};
        this.upKey;
        this.downKey;
        this.leftKey;
        this.rightKey;
        this.list = [];
        this.test;
        this.timeCheck=this.time.now;
        this.timeCheck2=this.time.now;
        this.size=1;
        this.hitbox;
        this.listSplash=[];
        //this.triggerTimer = Phaser.Time.TimerEvent;
    }

    create(){
        this.hit = this.sound.add('hit',{loop : false});
        //  Health ATH
        this.data.set('lives', 3);
        this.daisy=this.add.image(500,500,"daisy");
        this.daisy.setScale(0.1,0.1);
        this.daisy.depth=50;
        this.heart = this.add.image(110, 165,"heart");
        this.heart.setOrigin(0.5,1)
        this.heart.setScale(0.04,0.04);
        this.heart.depth=50;

        this.hp = this.add.text(200, 100, "X " + this.data.get("lives"), { font: '40px Courier', fill: '#ec2f06' });
        this.hp.depth=50;
        //fond ecran
        let background = this.add.sprite(0, 0, 'fond');
        background.setOrigin(0, 0);
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;


        // creating our root
         this.test = this.add.image(window.innerWidth / 2, window.innerHeight,"taille1");
         this.test.setScale(0.5,0.5);
         this.test.setOrigin(0.5, 1);
         this.hitbox = this.add.rectangle(window.innerWidth / 2, window.innerHeight, (this.test.width*0.5)/3, (this.test.height*0.5)-50, 0x6666ff);
        this.hitbox.setOrigin(0.5,1);
        this.hitbox.alpha = 0;

        this.targetPoint=this.test.getTopCenter() ;
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
        this.interval = setInterval(function () {
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
            timerValue=timer.text;
        }, 100);


        //backspace key implementation
        this.input.keyboard.on('keydown-' + 'BACKSPACE', function (event) {
            clearInterval(this.interval);
            this.scene.stop("Game");
            this.scene.start('startMenu');

        }, this);

        this.input.keyboard.on('keydown-' + 'A', function (event) {
            spawnBugs(this);
        }, this);

        this.input.keyboard.on('keydown-' + 'ESC', function (event) {
            clearInterval(this.interval);
            this.scene.pause("Game");
            this.scene.run("pauseMenu");
        }, this);


        //dev game over switch key implementation test
        var inputString = '';

        this.input.keyboard.on('keydown', function (event) {
            inputString += event.key;

            if (inputString.toLowerCase().includes('loose')) {
                GameOver(this);
            }
        }, this);

        this.upKey = this.input.keyboard.addKey("UP");
        this.downKey = this.input.keyboard.addKey("DOWN");
        this.leftKey = this.input.keyboard.addKey("LEFT");
        this.rightKey = this.input.keyboard.addKey("RIGHT");


    //this.physics.add.overlap(this.graphics, spawnBugs(this), this.collisionHandler, null, this);
    }

    update(){
        if (this.data.get("lives") == 0){
            GameOver(this);
            return "";
        }
        if(this.listSplash.length > 0){
            for (var i=0;i<this.listSplash.length;i++){
                if(this.listSplash[i] != undefined){
                    if(this.time.now - this.listSplash[i][1] >500){
                        this.listSplash[i][0].destroy();
                        delete this.listSplash[i];
                    }
                }
            }
        }

        if (this.time.now - this.timeCheck > 500){
            this.timeCheck=this.time.now;
            spawnBugs(this);
        }

        if (this.upKey.isDown && this.size<6 && this.size>0 && this.time.now - this.timeCheck2 > 200)
        {
            //this.targetPoint.y-=10;
            this.size++;
            this.test.setTexture("taille"+this.size);
            // console.log(this.test.height*0.5,this.hitbox.size);
            this.hitbox.displayWidth =(this.test.width*0.5)/3;
            this.hitbox.displayHeight = (this.test.height*0.5)-50;

            //console.log(this.test.height*0.5,this.hitbox.size);
            this.timeCheck2=this.time.now;
        }
        else if (this.downKey.isDown && this.size>1 && this.time.now - this.timeCheck2 > 200)
        {
            //this.targetPoint.y+=10;
            this.size--;
            this.test.setTexture("taille"+this.size);
            this.hitbox.displayWidth =(this.test.width*0.5)/3;
            this.hitbox.displayHeight = (this.test.height*0.5)-50;
            this.timeCheck2=this.time.now;
        }

        if (this.leftKey.isDown && this.test.angle>=-60)
        {
            this.test.angle-=2;
            this.hitbox.angle-=2;
        }
        else if (this.rightKey.isDown && this.test.angle<=60)
        {
            this.test.angle+=2;
            this.hitbox.angle+=2;
        }
        this.targetPoint=this.test.getTopCenter();
        this.daisy.setPosition(this.test.getTopCenter().x,this.test.getTopCenter().y);
       // this.daisy.setPosition(this.test.x + this.test.width / 2,this.test.y - this.test.height / 2);
        if(this.list.length >0){
                // Check for overlap between the line and the bug bounding box
            for (var i=0;i<this.list.length;i++) {
                if (this.list[i] != undefined){
                   /*
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.hitbox.getBounds(), this.list[i].getBounds())) {
                    if (Phaser.Geom.Intersects.RectangleToRectangle(this.daisy.getBounds(), this.list[i].getBounds())){
                        console.log("daisy");
                        this.list[i].destroy();
                        delete this.list[i];
                        this.data.set("lives", this.data.get("lives")-1);
                        this.hp.setText(
                            "X " +this.data.get('lives'),
                        );
                        break
                    }
                    this.list[i].destroy();
                    delete this.list[i];
                    //this.scene.stop('Game');
                    // Perform the desired action, e.g. score update or bug destruction

                    //this.scene.start('endMenu');
                }*/
                    if (Phaser.Geom.Intersects.RectangleToRectangle(this.daisy.getBounds(), this.list[i].getBounds())){
                        spawnSplash(this,this.list[i].getBounds().x,this.list[i].getBounds().y)
                        this.hit.play();
                        this.list[i].destroy();
                        delete this.list[i];
                        this.data.set("lives", this.data.get("lives")-1);
                        this.hp.setText(
                            "X " +this.data.get('lives'),
                        );
                    }else if(Phaser.Geom.Intersects.RectangleToRectangle(this.hitbox.getBounds(), this.list[i].getBounds())){
                        spawnSplash(this,this.list[i].getBounds().x,this.list[i].getBounds().y)
                        this.list[i].destroy();
                        delete this.list[i];
                    }

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
    var img = Game.add.image(x1, y1, "bugs_"+(Math.round(Math.random())+1));
    img.setScale(0.2,0.2);
    Game.tweens.add({
        targets: img,
        x: x2,
        y: y2,
        duration: 5000,
        ease: 'Linear',
        onComplete: function () {
            // Set the target position for the new animation
            var x3 = x2 + (x2 - x1);
            var y3 = y2 + (y2 - y1);

            // Create the new animation
            Game.tweens.add({
                targets: img,
                x: x3,
                y: y3,
                duration: 5000,
                ease: "Linear",
                onComplete : function (){
                    img.destroy();
                }
            });
        }
    });
    Game.list.push(img);
}

function spawnSplash(game,x,y){
    image = game.add.image(x, y, "splash");
    image.setScale(0.02,0.02);
    game.listSplash.push([image,game.time.now]);
}

function GameOver(game){
    clearInterval(game.interval);
    game.scene.stop("Game");
    game.scene.start('endMenu',timerValue);
}

