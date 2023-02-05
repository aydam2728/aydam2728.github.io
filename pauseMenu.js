class pauseMenu extends Phaser.Scene {
    constructor() {
        super("pauseMenu");
    }
    preload(){

    }

    create(){
        this.rect = this.add.rectangle(0,0, window.innerWidth, window.innerHeight, "#ffffff");
        this.rect.setOrigin(0,0);
        this.rect.alpha = 0.5;

        this.input.keyboard.on('keydown-' + 'ESC', function (event) {
            console.log("dsd");
            this.scene.resume("Game");
            this.scene.stop("pauseMenu");
        }, this);
    }
}