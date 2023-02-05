var config={
    type: Phaser.WEBGL,
    width : window.innerWidth,
    height : window.innerHeight,
    backgroundColor : "black",
    scene : [startMenu,Game,endMenu,pauseMenu]
}
window.onload = function (){
    var game = new Phaser.Game(config);

}