/****************************
*
*   Mainloop
*
****************************/
function run()
{
   // stats.begin();
    switch(state)
    {
        case "LOADING":
        break;
        case "PAUSE":
            pause();
        break;
        case "SET_TILES":
            setTiles();
        break;
        case "SELEC_PERSO":
            teamMaking();
        break;
        case "IN_GAME":
            gameloop();
        break;
    }
//	stats.end();
    requestAnimFrame(run);
}

/******************************
*
*   Boucle in game
*
******************************/
function gameloop()
{
    for(var i = 0;i<gameObjects[2].length;i++)
    {
        gameObjects[2][i].constructMap(mouseVars.mapPosWithoutCamX,mouseVars.mapPosWithoutCamY);
        gameObjects[2][i].renderMap();
    }
    gameObjects[0][0].loop(context);
    gameObjects[1][0].loop(context);

    for(var i=0; i<gameObjects[3].length; i++)
    {
        gameObjects[3][i].update();        
    }

	frame++;
}

function drawMyPath(){  //A changer d'endroit
    if(path)
    {
        var x;
        var y;
        var compare;
            compare=path.length;
        for(var i =0; i < compare;i++)
        {
            x=path[i][0];
            y=path[i][1];
            context.fillRect((x-mapParams.viewX)*mapParams.tileSize,(y-mapParams.viewY)*mapParams.tileSize,65,65);
        }
    }
}

function findCaseWithCamera(x,y){   //A changer d'endroit
    var mapCase = mouse.findCase(x,y);
    return {x:mapCase.x+mapParams.viewX, y:mapCase.y+mapParams.viewY}
}

/********************************
*
*   Boucle de chargement
*
********************************/
function loading(nb,target){    
    var pour = nb/target *100
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = '#ffffff';
    context.font="30px Verdana";
    context.fillText('Loading :',canvas.width/2-context.measureText("Loading").width,canvas.height/2);
    context.fillText(Math.floor(pour)+"%",canvas.width/2-context.measureText(Math.floor(pour)+"%").width,canvas.height/2+50);
}

/********************************
*
*   Boucle pose des cases
*   layer == quel layer
*   x == caseX
*   y == caseY
*   insert == true=setLobstacle false=removeLobstacle
*
********************************/
function manageTiles(layer,x,y,insert)
{   
    if(insert)
        map[layer][y][x] = 1;
    else
        map[layer][y][x] = 0;
}

function checkTiles(layer,x,y)
{
    return map[layer][y][x];
}

/********************************
*
*   Ecran pause
*
********************************/
function pause()
{
    //Petit gris
    context.fillStyle = "rgba(220, 220, 220, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Text
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.font="30px Verdana";
    context.fillText("PAUSE", canvas.width/2 - 50, canvas.height/2);
}
/********************************
*   Boucle de création des équipes
*
********************************/
function teamMaking()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0;i<gameObjects[2].length;i++)
    {
        gameObjects[2][i].constructMap(mouseVars.mapPosX,mouseVars.mapPosY);
        gameObjects[2][i].renderMap();
    }

    if(currentPlayerTurn === "Player1"){
        gameObjects[0][0].loop(context);
    }
    else if(currentPlayerTurn === "Player2"){
        gameObjects[1][0].loop(context);
    }
}
/*********************************
*
*   Set des tiles
*
*********************************/
function setTiles()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0;i<gameObjects[2].length;i++)
    {
        gameObjects[2][i].constructMap(mouseVars.mapPosX,mouseVars.mapPosY);
        gameObjects[2][i].renderMap();
    }
}
