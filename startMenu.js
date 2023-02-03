class startMenu extends Phaser.Scene {
    constructor() {
      super('startMenu');
    }
  
    preload() {
      // Preload the background image
        this.load.image('forest', 'assets/forest.gif');
    }
  
    create() {
      // Set the background image
      this.add.image(400, 300, 'forest');
  
      // Add a title text
      var title = this.add.text(400, 100, 'DodgeRoot', {
        fontSize: '32px',
        fill: '#fff'
      });
      title.setOrigin(0.5, 0.5);
  
      // Add a start button
      var startButton = this.add.text(400, 500, 'Press Enter', {
        fontSize: '24px',
        fill: '#fff'
      });
      startButton.setOrigin(0.5, 0.5);
      startButton.setInteractive();
  
      // Start the game when the button is clicked
      startButton.on('pointerdown', function () {
        this.scene.start('Game');
      }, this);
    }
  }
  