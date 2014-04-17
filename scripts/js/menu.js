/***********************************
*
*   Ecran titre
*
***********************************/

/***********************************
*
*   Pose des cases
*
***********************************/
$(document).ready(function(){
    stateSpecialTiles = {
        "Player1": {
            "specialTile1": false,  //True si activé (posé sur le terrain quoi)
            "specialTile2": false,
            "specialTile3": false
        },
        "Player2": {
            "specialTile1": false,
            "specialTile2": false,
            "specialTile3": false
        }
    }

    currentPlayerTurn = "Player1"    //"player1" ou "player2"
    var currentSlot = "";
    currentTileType = {type: undefined, player: "", nameSlotTile: ""};

//PLayer1
    $(".specialTilePlayer1").click(function(){
        
        if(currentPlayerTurn === "Player1")
        {
            var _tempSpeTile = this.id.substring(0, 12);

            if(stateSpecialTiles["Player1"][_tempSpeTile] === false)
            {
                currentSlot = this.id;

                currentTileType.nameSlotTile = _tempSpeTile;

                $("#choiceTileTypePlayer1").slideToggle(200, function(){

                });


                $("#specialTilePartPlayer1").slideToggle(200, function(){

                });
            }
        }
    });

    $(".selecSpecialTilePlayer1").click(function(){

        if(currentPlayerTurn === "Player1")
        {
            for(var _i in specialEffect_data)   //On remet les case à vide au cas ou elle était déjà selectionné
            {
                document.getElementById(_i + "SpeTilePlayer1").style.backgroundColor = "rgb(0, 0, 0)";
            }

            this.style.backgroundColor = "rgb(25, 250, 25)";    //Pour voir la selection

            var _typeName = this.id.substring(this.id.length-14, -(this.id.length-14));
            currentTileType = {type: _typeName, player: "Player1", nameSlotTile: currentTileType.nameSlotTile};

            document.getElementById(currentSlot).style.backgroundColor = "rgb(250, 250, 250)";  //Temporaire, normalement y mettre l'image de la case
        }
    });

//Player2
    $(".specialTilePlayer2").click(function(){
        
        if(currentPlayerTurn === "Player2")
        {
            var _tempSpeTile = this.id.substring(0, 12);

            if(stateSpecialTiles["Player2"][_tempSpeTile] === false)
            {
                currentSlot = this.id;

                currentTileType.nameSlotTile = _tempSpeTile;

                $("#choiceTileTypePlayer2").slideToggle(200, function(){

                });


                $("#specialTilePartPlayer2").slideToggle(200, function(){

                });
            }    
        }
    });

    $(".selecSpecialTilePlayer2").click(function(){

        if(currentPlayerTurn === "Player2")
        {
            for(var _i in specialEffect_data)   //On remet les case à vide au cas ou elle était déjà selectionné
            {
                document.getElementById(_i + "SpeTilePlayer2").style.backgroundColor = "rgb(0, 0, 0)";
            }

            this.style.backgroundColor = "rgb(25, 250, 25)";    //Pour voir la selection

            var _typeName = this.id.substring(this.id.length-14, -(this.id.length-14));
            currentTileType = {type: _typeName, player: "Player2", nameSlotTile: currentTileType.nameSlotTile};

            document.getElementById(currentSlot).style.backgroundColor = "rgb(250, 250, 250)";  //Temporaire, normalement y mettre l'image de la case
        }
    });
});

//Confirmation de la pose des cases
function confirmSetTiles(player)
{
    if(player === "Player1" && document.getElementById("confirmSpeTilePlayer1").style.backgroundColor == "rgb(25, 250, 25)")
    {
        currentPlayerTurn = "Player2";
        $("#specialTilePartPlayer1").slideToggle(200, function(){

        });
    }
    else if(player === "Player2" && document.getElementById("confirmSpeTilePlayer2").style.backgroundColor == "rgb(25, 250, 25)")
    {
        $("#specialTilePartPlayer2").slideToggle(200, function(){

        });

        for(var i = 0; i<gameObjects[3].length; i++)
        {
            var _pos = gameObjects[3][i].beginPos;

            gameObjects[2][0].speTiles[_pos.y][_pos.x] = 0;
        }

        currentPlayerTurn = "Player1";
        state = "SELEC_PERSO";
    }
}

/***********************************
*
*   Choix et pose des perso
*
***********************************/
$(document).ready(function(){

//Player1
    $("#")
});