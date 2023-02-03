var config={
    width : window.innerWidth,
    height : window.innerHeight,
    backgroundColor : "black",
    scene : [startMenu,Game,endMenu]
}
window.onload = function (){
    var game = new Phaser.Game(config);

}