/**********************************************
*
*   Garbage collector:
*
*       table => tableau de gameObjects,
*                chaque gameobject doit avoir une variable
*                toDestroy afin de vérifier s'il l'objet
*                doit être détruit ou pas
**********************************************/
function garbageCollector(table)    //Basique, à élaborer si besoin
{
    for(var i = 0; i<table.length; i++)
    {
        for(var j=0; j<table[i].length; j++)
        {
            if(table[i][j].toDestroy === true)
            {
                table[i].splice(j, 1);

                j--;
            }
        }
    }
}