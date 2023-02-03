class startMenu extends Phaser.Scene {
    constructor() {
      super('startMenu');
    }
  
    preload() {
      // Preload the background image
        this.load.image('forest', 'assets/forest.gif');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
  
    create() {
      // Set the background image
      this.add.image(0, 0, 'forest').setOrigin(0, 0).setDisplaySize(config.width, config.height);
      


      // Add a title text
      const screenCenterX_title = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const screenCenterY_title = this.cameras.main.worldView.y + this.cameras.main.height / 2 - 250;
      var title = this.add.text(screenCenterX_title, screenCenterY_title, 'DodgeRoot', {
        fontSize: '65px',
        fill: '#fff',
        fontFamily : 'Fantasy'
      });
      title.setOrigin(0.5, 0.5);
  
      // Add a start button
      const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
      const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2+ 250;
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
  