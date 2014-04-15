/****************************
*
*   Gameloop
*
****************************/

function run()
{
   // stats.begin();
    switch(state)
    {
        case "LOADING":
        console.log('load')
        break;
        case "SELEC_PERSO":
        break;
        case "IN_GAME":
            gameloop();
        break;
    }
//	stats.end();
    requestAnimFrame(run);
}

function gameloop()
{
    for(var i = 0;i<gameObjects[2].length;i++)
    {
        gameObjects[2][i].constructMap(mouseVars.mapPosX,mouseVars.mapPosY);
    }
    gameObjects[0][0].loop(context);
    gameObjects[1][0].loop(context);
	frame++;
}

function drawMyPath(){
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
            // console.log(x,y);
            context.fillStyle="rgb(255,255,0)";
            context.fillRect((x-mapParams.viewX)*mapParams.tileSize,(y-mapParams.viewY)*mapParams.tileSize,65,65);
        }
    }
}

function findCaseWithCamera(x,y){
    var mapCase = mouse.findCase(x,y);
    return {x:mapCase.x+mapParams.viewX, y:mapCase.y+mapParams.viewY}
}
