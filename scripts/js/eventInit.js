function eventInit(){
    //****Mouse****//
        //OnClick
    canvas.addEventListener("click", function(e){
        if(state === "SET_TILES")
        {
            var _pos = mouse.findCase(e.clientX, e.clientY);

            var _caseNb;
            var _newNb;
            if(currentPlayerTurn === "Player1")
            {
                _caseNb = 1;
                _newNb = 3;
                
            }
            else if(currentPlayerTurn === "Player2")
            {
                _caseNb = 2;
                _newNb = 4;
            }

            if(currentTileType.type != undefined)
            {
                if(gameObjects[2][0].speTiles[_pos.y+mapParams.viewY][_pos.x+mapParams.viewX] == _caseNb)
                {
                    gameObjects[3].push(new Tile({x: _pos.x, y: _pos.y, type: specialEffect_data[currentTileType.type], player: currentTileType.player}));    //Posage de la case

                    gameObjects[2][0].speTiles[_pos.y][_pos.x] = _newNb; //Une fois prise la case n'est plus dispo

                    $("#choiceTileType"+currentTileType.player).slideToggle(200, function(){    //On cache la selec tile

                    });

                    $("#specialTilePart"+currentTileType.player).slideToggle(200, function(){   //On ré-affiche la partie tile

                    });

                    // console.log(stateSpecialTiles[currentTileType.player][currentTileType.nameSlotTile]);
                    console.log(currentTileType.nameSlotTile);

                    stateSpecialTiles[currentTileType.player][currentTileType.nameSlotTile] = true;  

                    var _nbSlotFull = 0;
                    for(var _i in stateSpecialTiles[currentTileType.player])    //On enregistre le fait que le slot actuel a été attribué
                    {
                        if(stateSpecialTiles[currentTileType.player][_i] === true)
                        {                                
                            _nbSlotFull += 1;
                        }

                        if(_nbSlotFull == 3)    //Si tout les slot sont plein
                        {
                            if(currentTileType.player === "Player1")    //Si on était sur le player1
                            {
                                document.getElementById("confirmSpeTilePlayer1").style.backgroundColor = "rgb(25, 250, 25)";
                            }
                            else if(currentTileType.player === "Player2")   //Sinon
                            {
                                
                                document.getElementById("confirmSpeTilePlayer2").style.backgroundColor = "rgb(25, 250, 25)";
                            }
                        }
                    }                  

                    for(var _i in specialEffect_data)   //On remet les case à vide au cas ou elle était déjà selectionné
                    {
                        document.getElementById(_i + "SpeTile" + currentTileType.player).style.backgroundColor = "rgb(0, 0, 0)";
                    }

                    currentTileType = {type: undefined, player: "", nameSlotTile: ""};    //On RAZ la selection
                }
            }
        }
        else if(state === "SELEC_PERSO")
        {
            if(currentUnit.obj != undefined)
            {
                var _pos = mouse.findCase(e.clientX, e.clientY);
                var _freeTile = true;

                // console.log(_pos);

                if(currentPlayerTurn === "Player1" && gameObjects[2][0].map.players[_pos.y][_pos.x] === 1)
                {
                    for(var i=0; i<gameObjects[0][0].army.length; i++)
                    {
                        _freeTile = true;

                        if(gameObjects[0][0].army[i].pos.x === _pos.x && gameObjects[0][0].army[i].pos.y === _pos.y)
                        {
                            _freeTile = false;
                        }
                    }

                    if(_freeTile === true)
                    {
                        gameObjects[0][0].army.push(new player1Skins[currentUnit.id]["unit"](_pos.x+mapParams.viewX, _pos.y+mapParams.viewY, "Player1", gameObjects[0][0]));

                        //On le deselectionne
                        document.getElementById(currentUnit.id).style.border = "solid 0px white";

                        //On regrise l'ancien
                        document.getElementById(currentUnit.id).style.backgroundImage = "url('"+player1Skins[currentUnit.id]["grey"]+"')";

                        currentUnit = {id: "", obj: undefined};

                        if(gameObjects[0][0].army.length == 6)
                        {
                            currentPlayerTurn = "Player2";
                        }
                    }

                }
                else if(currentPlayerTurn === "Player2" && gameObjects[2][0].map.players[_pos.y+mapParams.viewY][_pos.x+mapParams.viewX] === 2)
                {
                    for(var i=0; i<gameObjects[1][0].army.length; i++)
                    {
                        _freeTile = true;

                        if(gameObjects[1][0].army[i].pos.x === _pos.x && gameObjects[1][0].army[i].pos.y === _pos.y)
                        {
                            _freeTile = false;
                        }
                    }

                    if(_freeTile === true)
                    {
                        gameObjects[1][0].army.push(new player2Skins[currentUnit.id]["unit"](_pos.x+mapParams.viewX, _pos.y+mapParams.viewY, "Player2", gameObjects[1][0]));

                        //On le deselectionne
                        document.getElementById(currentUnit.id).style.border = "solid 0px white";

                        //On regrise l'ancien
                        document.getElementById(currentUnit.id).style.backgroundImage = "url('"+player2Skins[currentUnit.id]["grey"]+"')";

                        currentUnit = {id: "", obj: undefined};

                        if(gameObjects[1][0].army.length == 6)
                        {
                            currentPlayerTurn = "";

                            $("#selecUnitPlayer1").slideToggle(200, function(){    //On cache la selec tile

                            });

                            $("#selecUnitPlayer2").slideToggle(200, function(){    //On cache la selec tile

                            });

                            state = "IN_GAME";
                        }
                    }
                }
            }
        }
        else if(state === "IN_GAME")
        {
            if(gameObjects[0][0].turn){
                gameObjects[0][0].onclick(e.clientX, e.clientY);
            }
            else{
                gameObjects[1][0].onclick(e.clientX, e.clientY);
            }
            endPathFinding(e);
            doPathFinding(e);
        }
    });
        //MouseMove pour déplacer le canvas
    canvas.addEventListener("mousemove", function(e){
        getMouseOnMap(e);

        if(state === "SELEC_PERSO")
        {
            // console.log(mouse.findCase(e.clientX, e.clientY));

            if(currentUnit.obj != undefined)
            {
                currentUnit.obj.pos.x = (mouse.findCase(e.clientX, e.clientY).x+mapParams.viewX);
                currentUnit.obj.pos.y = (mouse.findCase(e.clientX, e.clientY).y+mapParams.viewY);
                // currentUnit.obj.render(context);
            }
        }
    });
}

function getMouseOnMap(e){
        var getPos=findCaseWithCamera(e.clientX, e.clientY);
        var getPos2=mouse.updatePos(e.clientX, e.clientY);
        mouseVars.mapPosX=getPos.x;
        mouseVars.mapPosY=getPos.y;
        mouseVars.mapPosWithoutCamX=getPos2.x;
        mouseVars.mapPosWithoutCamY=getPos2.y;
}

function doPathFinding(e){
    if(!mouseVars.selectCase1)
    {
        mouseVars.selectCase1=mouse.findCase(e.clientX, e.clientY);
        mouseVars.selectCase1.x+=mapParams.viewX;
        mouseVars.selectCase1.y+=mapParams.viewY;
    }
}
function endPathFinding(e){
    if(mouseVars.selectCase1 && !mouseVars.selectCase2)
    {
        mouseVars.selectCase2=mouse.findCase(e.clientX, e.clientY);
        mouseVars.selectCase2.x+=mapParams.viewX;
        mouseVars.selectCase2.y+=mapParams.viewY;
        showRange=false;
    }
}
function resetClick(e){
    //if(mouse.findCase(e.clientX, e.clientY).x ||)
}

function showCharRange(case1,range,attackRange){
    var checkPath;
    attackRange=4
    for(var i=-range;i<=range;i++)
    {
        for(var j=-range;j<=range;j++)
        {
            if(Math.abs(i)+Math.abs(j)<=range)
            {
                if(j+case1.y>=0 && j+case1.y<mapParams.nbCaseMapY)
                {
                    checkPath = findPath(case1.x, case1.y, i+case1.x,j+case1.y,'collisions');
                    if(checkPath.length<=range+1 && map["collisions"][j+case1.y][i+case1.x]!=1)
                    {
                        context.fillStyle="rgba(0,0,255,0.5)";
                        context.fillRect((i+(case1.x-mapParams.viewX))*mapParams.tileSize,(j+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                }
            }
        }
    }
    for(var i=-(range+attackRange);i<=(range+attackRange);i++)
    {
        for(var j=-(range+attackRange);j<=range+attackRange;j++)
        {
            if(Math.abs(i)+Math.abs(j)>range && Math.abs(i)+Math.abs(j)<=range+attackRange)
            {
                if(j+case1.y>=0 && j+case1.y<mapParams.nbCaseMapY)
                {
                    checkPath = findPath(case1.x, case1.y, i+case1.x,j+case1.y ,'specials');
                    if(checkPath.length<=range+attackRange-1)
                    {
                        context.fillStyle="rgba(255,0,0,0.5)";
                        context.fillRect((i+(case1.x-mapParams.viewX))*mapParams.tileSize,(j+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                }
            
            }
        }
    }
}