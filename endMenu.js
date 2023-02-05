class endMenu extends Phaser.Scene {
    constructor() {
        super('endMenu');
    }

    preload() {
        this.load.audio('gameoversound', ['assets/gameoversound.wav']);
        this.load.image('block', 'assets/phaser_assets/block.png');
        this.load.image('rub', 'assets/phaser_assets/rub.png');
        this.load.image('end', 'assets/phaser_assets/end.png');
        this.load.bitmapFont('arcade', 'assets/phaser_assets/arcade.png', 'assets/phaser_assets/arcade.xml');

    }

    create(data) {
        var loose = this.sound.add('gameoversound',{loop:false});
        loose.play();
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var chars = [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
            ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>']
        ];
        var cursor = { x: 0, y: 0 };
        var name = '';

        var input = this.add.bitmapText(screenCenterX - 200, screenCenterY - 300, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);

        input.setInteractive();

        var rub = this.add.image(input.x + 430, input.y + 148, 'rub');
        var end = this.add.image(input.x + 482, input.y + 148, 'end');
        end.setInteractive();

        // Start the game when the button is clicked
        end.on('pointerdown', function () {
            this.scene.stop('endMenu')
            this.scene.start('startMenu');
        }, this);

        var block = this.add.image(input.x - 10, input.y - 2, 'block').setOrigin(0);

        var legend = this.add.bitmapText(screenCenterX - 240, screenCenterY - 90, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
        console.log('game started', data);
        var GmOv = this.add.bitmapText(screenCenterX - 350, screenCenterY - 500, 'arcade', 'GAME OVER !', 80).setTint(0x00ff00);
        var our = this.add.bitmapText(screenCenterX - 240, screenCenterY - 40, 'arcade', 'YOU   '+ data).setTint(0xff0000);
        this.add.bitmapText(screenCenterX - 240, screenCenterY + 10, 'arcade', '1ST   0:00.0   BOT').setTint(0xff8200);
        this.add.bitmapText(screenCenterX - 240, screenCenterY + 60, 'arcade', '2ND   0:00.0   BAT').setTint(0xffff00);
        this.add.bitmapText(screenCenterX - 240, screenCenterY + 110, 'arcade', '3RD   0:00.0   BET').setTint(0x00ff00);
        this.add.bitmapText(screenCenterX - 240, screenCenterY + 160, 'arcade', '4TH   0:00.0   BUT').setTint(0x00bfff);

        var playerText = this.add.bitmapText(screenCenterX + 240, screenCenterY - 40, 'arcade', name).setTint(0xff0000);

        this.input.keyboard.on('keyup', function (event) {

            if (event.keyCode === 37) {
                //  left
                if (cursor.x > 0) {
                    cursor.x--;
                    block.x -= 52;
                }
            }
            else if (event.keyCode === 39) {
                //  right
                if (cursor.x < 9) {
                    cursor.x++;
                    block.x += 52;
                }
            }
            else if (event.keyCode === 38) {
                //  up
                if (cursor.y > 0) {
                    cursor.y--;
                    block.y -= 64;
                }
            }
            else if (event.keyCode === 40) {
                //  down
                if (cursor.y < 2) {
                    cursor.y++;
                    block.y += 64;
                }
            }
            else if (event.keyCode === 13 || event.keyCode === 32) {
                //  Enter or Space
                if (cursor.x === 9 && cursor.y === 2 && name.length > 0) {
                    //  Submit
                }
                else if (cursor.x === 8 && cursor.y === 2 && name.length > 0) {
                    //  Rub
                    name = name.substr(0, name.length - 1);

                    playerText.text = name;
                }
                else if (name.length < 3) {
                    //  Add
                    name = name.concat(chars[cursor.y][cursor.x]);

                    playerText.text = name;
                }
            }

        });

        input.on('pointermove', function (pointer, x, y) {

            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
            var char = chars[cy][cx];

            cursor.x = cx;
            cursor.y = cy;

            block.x = input.x - 10 + (cx * 52);
            block.y = input.y - 2 + (cy * 64);

        }, this);

        input.on('pointerup', function (pointer, x, y) {

            var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
            var char = chars[cy][cx];

            cursor.x = cx;
            cursor.y = cy;

            block.x = input.x - 10 + (cx * 52);
            block.y = input.y - 2 + (cy * 64);

            if (char === '<' && name.length > 0) {
                //  Rub
                name = name.substr(0, name.length - 1);

                playerText.text = name;
            }
            else if (char === '>' && name.length > 0) {
                //  Submit
            }
            else if (name.length < 3) {
                //  Add
                name = name.concat(char);

                playerText.text = name;
            }

        }, this);

        var retryButton = this.add.text(screenCenterX+700 , screenCenterY+300, 'Retry', {
            fontSize: '55px',
            color : '#FF0000',
            fontWeight: 'bold',
            
        });
        retryButton.setOrigin(0.5, 0.5);
        retryButton.setInteractive();

        // Restart the game when the button is clicked
        retryButton.on('pointerdown', function () {
            this.scene.stop('endMenu')
            this.scene.start('Game');
        }, this);

        // Make the button flicker
        this.tweens.add({
            targets: retryButton,
            alpha: 0.5,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: our,
            alpha: 0.5,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        this.tweens.add({
            targets: GmOv,
            alpha: 0.3,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
        
    }
}

function loadScores() {
    /*
        var fs = require("fs");
        fs.readFile("./mytext.txt", function(text){

            var textByLine = text.split("\n")
        });
        var txtFile = "scores.txt";
        var file = new File(txtFile,"write");
        var str = JSON.stringify({ 'x': 5, 'y': 6 });

        log("opening file...");
        file.open();
        log("writing file..");
        file.writeline(str);
        file.close();*/
    //console.log(JSON.stringify({ x: 5, y: 6 });
}
