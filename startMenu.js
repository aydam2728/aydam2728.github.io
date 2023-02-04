class startMenu extends Phaser.Scene {
    constructor() {
        super('startMenu');
    }

    preload() {
        // Preload the background image
        this.load.spritesheet('forest', 'assets/forest_spritesheet.png', { frameWidth: 400, frameHeight: 300 });
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: function () {
                // Use the font to create a text object
                // Add a title text
                const screenCenterX_title = this.cameras.main.worldView.x + this.cameras.main.width / 2;
                const screenCenterY_title = this.cameras.main.worldView.y + this.cameras.main.height / 2 - 300;
                var title = this.add.text(screenCenterX_title, screenCenterY_title, 'Dodge Root', {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '10em',
                    fill: '#fff'
                });
                title.setOrigin(0.5, 0.5);
            }.bind(this)
        });

        // Set the background image
        this.anims.create({
            key: 'forest_anim',
            frames: this.anims.generateFrameNumbers('forest', { start: 0, end: 46 - 1 }),
            frameRate: 20,
            repeat: -1
        });

        this.add.sprite(0, 0, 'forest').setOrigin(0, 0).setDisplaySize(config.width, config.height).play('forest_anim');


        // enter keyboard implementation
        this.input.keyboard.on('keydown_ENTER', function (event) {
            console.log("toto")
            this.scene.start('Game');
        });
        
        // Add a start button
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2 + 250;
        var startButton = this.add.text(screenCenterX, screenCenterY, 'Start Game', {
            fontSize: '48px',
            fill: '#ff0',
            fontWeight: 'bold'
        });
        startButton.setOrigin(0.5, 0.5);
        startButton.setInteractive();

        // Start the game when the button is clicked
        startButton.on('pointerdown', function () {
            this.scene.start('Game');
        }, this);

        // Make the button flicker
        this.tweens.add({
            targets: startButton,
            alpha: 0.5,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        


    }
}
