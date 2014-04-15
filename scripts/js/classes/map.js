var Map = function(matrice)
{
    this.mapCollision = matrice["collisions"];
    this.scrollSpeed = 10;

    this.constructMap=function(mouseX,mouseY)
    {
        if(mouseX>mapParams.nbTileX-1 && frame>=this.scrollSpeed && mapParams.viewX<this.mapCollision[0].length-mapParams.nbTileX)
        {
          frame=0;
          mapParams.viewX+=1;
        }
        if(mouseY>mapParams.nbTileY-1 && frame>=this.scrollSpeed && mapParams.viewY<this.mapCollision.length-mapParams.nbTileY)
        {
          frame=0;
          mapParams.viewY+=1;
        }
        if(mouseX<=0 && frame>=this.scrollSpeed && mapParams.viewX>0)
        {
          frame=0;
          mapParams.viewX-=1;
        }
        if(mouseY<=0 && frame>=this.scrollSpeed && mapParams.viewY>0)
        {
          frame=0;
          mapParams.viewY-=1;
        }

        for (var i = mapParams.viewY; i < mapParams.nbTileY+mapParams.viewY; i++)
        {
            for (var j = mapParams.viewX; j < mapParams.nbTileX+mapParams.viewX; j++)
            {
                if(this.mapCollision[i][j]==1)
                {
                  context.fillStyle="rgb(255,0,0)";
                }
                else
                {
                  context.fillStyle="rgb(255,255,255)";
                }
                //  console.log(mapParams.viewX)
                context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
            };
        };
        for (var i = mapParams.viewY; i < mapParams.nbTileY+mapParams.viewY; i++)
        {
            for (var j = mapParams.viewX; j < mapParams.nbTileX+mapParams.viewX; j++)
            {
                if(matrice["players"][i][j]==2)
                {
                  context.fillStyle="rgb(255,0,255)";
                 context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
                }
                //  console.log(mapParams.viewX)
            };
        };
    }

    //Pour input clavier (tempo, le temps de mettre ce qui est plus haut au propre)
    this.scroll = function(sens)
    {
        if(sens == "left" && mapParams.viewX>0)
        {
            frame=0;
            mapParams.viewX-=1;
        }
        if(sens == "right" && mapParams.viewX<this.mapCollision[0].length-mapParams.nbTileX)
        {
            frame=0;
            mapParams.viewX+=1;
        }
        if(sens == "bot" && mapParams.viewY<this.mapCollision.length-mapParams.nbTileY)
        {
            frame=0;
            mapParams.viewY+=1;
        }
        if(sens == "top" && mapParams.viewY>0)
        {
            frame=0;
            mapParams.viewY-=1;
        }
    }

    //Appliquer des effets liés au case spéciales
    this.applySpecialEffect = function()
    {

    }
}
