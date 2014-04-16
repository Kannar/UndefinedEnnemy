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
    var stateSpecialTiles = {
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

    var currentPlayerTurn = "Player1"    //"player1" ou "player2"
    var currentSlot = "";

    $(".specialTile"+currentPlayerTurn).click(function(){

        currentSlot = this.id;

        $("#choiceTileType"+currentPlayerTurn).slideToggle(200, function(){

        });


        $("#specialTilePart"+currentPlayerTurn).slideToggle(200, function(){

        });

    });

    $(".selecSpecialTile"+currentPlayerTurn).click(function(){

        // $("#choiceTileType"+currentPlayerTurn).slideToggle(200, function(){

        // });


        // $("#specialTilePart"+currentPlayerTurn).slideToggle(200, function(){

        // });

        for(var _i in specialEffect_data)   //On remet les case à vide au cas ou elle était déjà selectionné
        {
            document.getElementById(specialEffect_data[_i].name + "SpeTile" + currentPlayerTurn).style.backgroundColor = "rgb(0, 0, 0)";
        }

        this.style.backgroundColor = "rgb(25, 250, 25)";    //Pour voir la selection

        var _typeName = this.id.substring(this.id.length-14, -(this.id.length-14));
        currentTileType = _typeName;
        
        console.log(currentTileType);

        document.getElementById(currentSlot).style.backgroundColor = "rgb(250, 250, 250)";  //Temporaire, normalement y mettre l'image de la case
    });
});