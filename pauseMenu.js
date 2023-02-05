class pauseMenu extends Phaser.Scene {
    constructor() {
        super("pauseMenu");
    }
    preload(){

    }

    create(){
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        var Paused = this.add.text(screenCenterX-400, screenCenterY-400, "Game Paused !", { font: '110px', fill: '#ec2f06' });
        this.input.keyboard.on('keydown-' + 'P', function (event) {
            console.log("dsd");
            this.scene.resume("Game");
            this.scene.stop("pauseMenu");
        }, this);
        this.tweens.add({
            targets: Paused,
            alpha: 0.5,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
    }
}