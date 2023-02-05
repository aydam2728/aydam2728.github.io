class pauseMenu extends Phaser.Scene {
    constructor() {
        super("pauseMenu");
    }
    preload(){

    }

    create(){
        this.input.keyboard.on('keydown-' + 'P', function (event) {
            console.log("dsd");
            this.scene.resume("Game");
            this.scene.stop("pauseMenu");
        }, this);
    }
}