var config={
    width : 800,
    heigth : 600,
    backgroundColor : black,
    scene : [startMenu,Game,endMenu]
}
window.onload = function (){
    var game = new Phaser.Game(config);
}