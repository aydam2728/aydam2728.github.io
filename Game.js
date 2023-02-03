class Game extends Phaser.Scene{
    constructor() {
        super("Game");
    }
    create(){
        this.add.image(0,0,"obj");
    }
}