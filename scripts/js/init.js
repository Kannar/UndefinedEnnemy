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
var state = "LOADING";
var frame = 0;
var mapParams = {
                tileSize : 66,
                nbTileX : 13,
                nbTileY : 10,
                nbCaseMapX : 20,
                nbCaseMapY : 16,
                viewX : 0,
                viewY : 0,          
                }; 

var frame=0;
var mouse;
var c=[];
var keyboard;
var posX,posY;
var path;
var map;
var showRange=false;
var images;
var mouseVars={
    mapPosX:0,
    mapPosY:0,
    mapPosWithoutCamX:0,
    mapPosWithoutCamY:0,
    selectCase1:0,
    selectCase2:0
};
var P1hero = [];
var P2hero = [];
//player1,player2,neutre,cases spéciales
var gameObjects=[[],[],[],[]];
/*******************************
*   Variable temp menu
********************************/
var currentPlayerTurn;
//Pose des cases
var currentTileType;
var stateSpecialTiles;
//Selection et pose des unités
var currentUnit = {id: "", obj: undefined};
var player1Skins;
var player2Skins;
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
    canvas.width  = mapParams.tileSize*mapParams.nbTileX;
    canvas.height = mapParams.tileSize*mapParams.nbTileY;
    images = loadImages(imgSrc);
    run();
}

function startGame(){
    context.clearRect(0,0,canvas.width,canvas.height);
    map = initMap(map1);
    gameObjects[2].push(new Map(map));
    var P1hero = [Dragon,Thief,Archer,Priest,Mage,Knight]
    var P1spawn = [[0,0],[0,2],[1,1],[2,1],[2,0],[3,0]]
    for(var i=0; i<P1spawn.length; i++)
    {
        gameObjects[2][0].map.players[P1spawn[i][1]][P1spawn[i][0]] = 1;    //1 = emplacement de joueur libre
    }
    var P2hero = [Dragon,Thief,Archer,Priest,Mage,Knight]
    var P2spawn = [[3,3],[19,12],[18,13],[17,13],[17,14],[16,14]]
    for(var i=0; i<P2spawn.length; i++)
    {
        gameObjects[2][0].map.players[P2spawn[i][1]][P2spawn[i][0]] = 2;    //2 = emplacement de joueur libre
    }
    gameObjects[1].push(new Player(canvas,'Player2',P1spawn,P1hero));
    gameObjects[0].push(new Player(canvas,'Player1',P2spawn,P2hero));
    gameObjects[0][0].addOtherPlayer(gameObjects[1][0])
    gameObjects[1][0].addOtherPlayer(gameObjects[0][0])

    gameObjects[0][0].startTurn();
    document.getElementById("EndTurn").onclick = function(){
        if(gameObjects[0][0].turn){
            gameObjects[0][0].stopTurn();
        }
        else{
            gameObjects[1][0].stopTurn();
        }
    }

    eventInit();
    mouse = new Mouse(canvas);

    keyboard = new Keyboard({
        81: [gameObjects[2][0].scroll, "left"], //Scroll gauche
        68: [gameObjects[2][0].scroll, "right"],//Scroll droite
        90: [gameObjects[2][0].scroll, "top"],  //Scroll haut
        83: [gameObjects[2][0].scroll, "bot"],   //Scroll bas
        37: [gameObjects[2][0].scroll, "left"], //Scroll gauche
        39: [gameObjects[2][0].scroll, "right"],//Scroll droite
        38: [gameObjects[2][0].scroll, "top"],  //Scroll haut
        40: [gameObjects[2][0].scroll, "bot"]   //Scroll bas
    });

    state = 'SET_TILES';
}
