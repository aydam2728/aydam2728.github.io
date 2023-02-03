class Game extends Phaser.Scene{
    constructor() {
        super("Game");
    }

    preload(){
        this.load.image('bugs', 'assets/bugs.jpg');
    }
    create(){
        var img = this.add.image(100,100,"bugs");
        img.setScale(0.2, 0.2);
        this.tweens.add({
            targets: img,
            x: 400,
            y: 300,
            duration: 2000,
            ease: 'Linear'
        });
    }
}