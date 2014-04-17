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
    currentTileType = {type: undefined, player: ""};

//PLayer1
    $(".specialTilePlayer1").click(function(){
        
        if(currentPlayerTurn === "Player1")
        {
            var _tempSpeTile = this.id.substring(0, 12);

            if(stateSpecialTiles["Player1"][_tempSpeTile] === false)
            {
                currentSlot = this.id;

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
            currentTileType = {type: _typeName, player: "Player1"};

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
                console.log(_i+"SpeTilePlayer2");

                document.getElementById(_i + "SpeTilePlayer2").style.backgroundColor = "rgb(0, 0, 0)";
            }

            this.style.backgroundColor = "rgb(25, 250, 25)";    //Pour voir la selection

            var _typeName = this.id.substring(this.id.length-14, -(this.id.length-14));
            currentTileType = {type: _typeName, player: "Player2"};

            document.getElementById(currentSlot).style.backgroundColor = "rgb(250, 250, 250)";  //Temporaire, normalement y mettre l'image de la case
        }
    });
});