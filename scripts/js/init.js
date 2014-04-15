//Fonctions de synchronisation d'affichage
window.requestAnimFrame =     (
    function(){
        return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 5);
        };
    }
)();

/*******************************
*
*   Globals
*
*******************************/
var state = "IN_GAME";
var frame = 0;
var mapParams = {
                tileSize : 66,
                nbTileX : 13,
                nbTileY : 10
                }; 

var frame=0;
var mouse;
var mouseVars={
    mapPosX:0,
    mapPosY:0,
    selectCase1:0,
    selectCase2:0
};
var matrix = [
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
];
//player1,player2,neutre
var gameObjects=[[],[],[]];
/*******************************
*
*   Varibles d'UI
*
*******************************/
    /**********************
    *   Générale
    **********************/

  
    /**********************
    *   InGame
    **********************/

/******************************
*
*   Game Init
*
******************************/
window.onload = init;

function init() //Init général
{
    window.canvas  = document.getElementById("mainCanvas");
    window.context = canvas.getContext("2d");
    gameObjects[2].push(new Map(matrix))
    canvas.width  = mapParams.tileSize*mapParams.nbTileX;
    canvas.height = mapParams.tileSize*mapParams.nbTileY;
    eventInit();
    mouse = new Mouse(canvas);   
    run();
}
