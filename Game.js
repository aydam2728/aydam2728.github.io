class Game extends Phaser.Scene{
    constructor() {
        super("Game");
    }

    preload(){
        this.load.image('bugs', 'assets/bugs.jpg');
    }
    create(){
        this.add.image(0,0,"bugs");
    }
}