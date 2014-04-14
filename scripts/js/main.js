/****************************
*
*   Gameloop
*
****************************/

function run()
{
    stats.begin();
    switch(state)
    {
        case "SELEC_PERSO":
        break;
        case "IN_GAME":
            gameloop();
        break;
    }
	stats.end();
    requestAnimFrame(run);
}
function gameloop()
{
	frame++;
}

