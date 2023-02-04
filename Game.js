class Game extends Phaser.Scene{
    constructor() {
        super("Game");
    }

    preload(){
        this.load.image('bugs', 'assets/bugs.jpg');
        this.score=0;

    }
    create(){
        // Add a score text
        var scoreText = this.add.text(window.innerWidth/2, 50, 'Score: ' + this.score, {
            fontSize: '32px',
            fill: '#fff'
        });

            // Update the text
            scoreText.setText('Score: ' + (this.score+10));


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
        }
    }

}