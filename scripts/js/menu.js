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
    document.getElementById("Player1").style.backgroundColor = "rgb(250, 250, 250)";
    var currentSlot = "";
    currentTileType = {type: undefined, player: "", nameSlotTile: ""};

    var tileSkin = {
        "resistance": "images/Zones bonus malus/effet invulnerable.png",
        "forceMelee": "images/Zones bonus malus/effet melee.png",
        "forceDist": "images/Zones bonus malus/effet arc.png",
        "forceMag": "images/Zones bonus malus/effet magie.png",
        "hp": "images/Zones bonus malus/effet regeneration.png",
        "atk": "images/Zones bonus malus/effet combat X2.png",
        "priorite": "images/Zones bonus malus/effet initiative.png",
        "precision": "images/Zones bonus malus/effet prevoyance.png"
    }

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
                document.getElementById(_i + "SpeTilePlayer1").style.border = "solid 0px white";
            }


            this.style.border = "solid 1px white";    //Pour voir la selection

            var _typeName = this.id.substring(this.id.length-14, -(this.id.length-14));
            currentTileType = {type: _typeName, player: "Player1", nameSlotTile: currentTileType.nameSlotTile};

            console.log(currentSlot);

            document.getElementById(currentSlot).style.backgroundImage = "url('"+tileSkin[_typeName]+"')";//Image
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
        document.getElementById("Player2").style.backgroundColor = "rgb(250, 250, 250)";
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

        $("#selecUnitPlayer1").slideToggle(200, function(){    //On cache la selec tile

        });

        $("#selecUnitPlayer2").slideToggle(200, function(){    //On cache la selec tile

        });

        document.getElementById("Player1").style.backgroundColor = "rgb(250, 250, 250)";

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

    var currentButtonActive = {
        "Player1": "",
        "Player2": ""
    }

    player1Skins = {
        "archerUnitPlayer1": {
            "grey": "images/menu/skins_grey/Archer_1.png",
            "colored": "images/Heros/Archer2.png",
            "unit": Archer
        },
        "priestUnitPlayer1": {
            "grey": "images/menu/skins_grey/Priest_2.png",
            "colored": "images/Heros/Priest2.png",
            "unit": Priest
        },
        "guerrierUnitPlayer1": {
            "grey": "images/menu/skins_grey/Knight_2.png",
            "colored": "images/Heros/Knight2.png",
            "unit": Knight
        },
        "mageUnitPlayer1": {
            "grey": "images/menu/skins_grey/Mage_1.png",
            "colored": "images/Heros/Mage2.png",
            "unit": Mage
        },
        "thiefUnitPlayer1": {
            "grey": "images/menu/skins_grey/Thief_1.png",
            "colored": "images/Heros/Thief2.png",
            "unit": Thief
        },
        "dragonUnitPlayer1": {
            "grey": "images/menu/skins_grey/Dragon.png",
            "colored": "images/Heros/Dragon2.png",
            "unit": Dragon
        }
    }
    player2Skins = {
        "archerUnitPlayer2": {
            "grey": "images/menu/skins_grey/Archer_1.png",
            "colored": "images/Heros/Archer1.png",
            "unit": Archer
        },
        "priestUnitPlayer2": {
            "grey": "images/menu/skins_grey/Priest_2.png",
            "colored": "images/Heros/Priest1.png",
            "unit": Priest
        },
        "guerrierUnitPlayer2": {
            "grey": "images/menu/skins_grey/Knight_2.png",
            "colored": "images/Heros/Knight1.png",
            "unit": Knight
        },
        "mageUnitPlayer2": {
            "grey": "images/menu/skins_grey/Mage_1.png",
            "colored": "images/Heros/Mage1.png",
            "unit": Mage
        },
        "thiefUnitPlayer2": {
            "grey": "images/menu/skins_grey/Thief_1.png",
            "colored": "images/Heros/Thief1.png",
            "unit": Thief
        },
        "dragonUnitPlayer2": {
            "grey": "images/menu/skins_grey/Dragon.png",
            "colored": "images/Heros/Dragon1.png",
            "unit": Dragon
        }
    }

//Player1
    $(".selecUnitPlayer1").click(function(){

        if(currentPlayerTurn === "Player1")
        {
            if(currentButtonActive["Player1"] != "")    //Si un bouton est déjà séléctionné
            {
                //On le deselectionne
                document.getElementById(currentButtonActive["Player1"]).style.border = "solid 0px white";

                //On regrise l'ancien
                document.getElementById(currentButtonActive["Player1"]).style.backgroundImage = "url('"+player1Skins[currentButtonActive["Player1"]]["grey"]+"')";

                //On selectionne le nouveau
                this.style.border = "solid 1px white";

                //On change l'icone
                this.style.backgroundImage = "url('"+player1Skins[this.id]["colored"]+"')";

                //On stock le nouvel id
                currentButtonActive["Player1"] = this.id;

                currentUnit.id = this.id;
                currentUnit.obj = new player1Skins[this.id]["unit"](0, 0, "Player1", gameObjects[0][0]);
            }
            else
            {
                //On le selectionne
                this.style.border = "solid 1px white";

                //On change l'icone
                this.style.backgroundImage = "url('"+player1Skins[this.id]["colored"]+"')";

                //On stock l'id
                currentButtonActive["Player1"] = this.id;

                currentUnit.id = this.id;
                currentUnit.obj = new player1Skins[this.id]["unit"](0, 0, "Player1", gameObjects[0][0]);
            }            
        }
    });


//Player2
    $(".selecUnitPlayer2").click(function(){

        if(currentPlayerTurn === "Player2")
        {
            if(currentButtonActive["Player2"] != "")    //Si un bouton est déjà séléctionné
            {
                //On le deselectionne
                document.getElementById(currentButtonActive["Player2"]).style.border = "solid 0px white";

                //On regrise l'ancien
                document.getElementById(currentButtonActive["Player2"]).style.backgroundImage = "url('"+player2Skins[currentButtonActive["Player2"]]["grey"]+"')";

                //On selectionne le nouveau
                this.style.border = "solid 1px white";

                //On change l'icone
                this.style.backgroundImage = "url('"+player2Skins[this.id]["colored"]+"')";

                //On stock le nouvel id
                currentButtonActive["Player2"] = this.id;

                currentUnit.id = this.id;
                currentUnit.obj = new player2Skins[this.id]["unit"](0, 0, "Player2", gameObjects[1][0]);
            }
            else
            {
                //On le selectionne
                this.style.border = "solid 1px white";

                //On change l'icone
                this.style.backgroundImage = "url('"+player2Skins[this.id]["colored"]+"')";

                //On stock l'id
                currentButtonActive["Player2"] = this.id;

                currentUnit.id = this.id;
                currentUnit.obj = new player2Skins[this.id]["unit"](0, 0, "Player2", gameObjects[1][0]);
                            
            }            
        }
    });
});

/*********************************
*
*   Feedback etat team
*
*********************************/
$(document).ready(function(){

});

//Une fois les teams build on assign des slots pour voir les stats
function assignTeamStatSlot()
{

}