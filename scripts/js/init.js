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
var state = "SELEC_PERSO";
var frame=0;

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

/******************************//******************************
*
*   Game Init
*
******************************/
window.onload = init;

function init() //Init général
{
    window.canvas  = document.getElementById("mainCanvas");
    window.context = canvas.getContext("2d");

    canvas.width  = 66*13;
    canvas.height = 660;
    run();
}
