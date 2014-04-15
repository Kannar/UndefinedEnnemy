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
            context.fillStyle="rgb(255,0,0)";
            context.fillRect(0+x*66,0+y*66,65,65);
        }
    }
	frame++;
}
