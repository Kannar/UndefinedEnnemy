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
        gameObjects[2][i].constructMap(posX,posY);
    }
    gameObjects[0][0].loop(context);
    gameObjects[1][0].loop(context);

	frame++;
}
