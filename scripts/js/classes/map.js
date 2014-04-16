var Map = function(matrice)
{
    this.matrice = matrice;
    this.scrollSpeed = 50;
    this.scrollCount = 0;

    this.constructMap=function(mouseX,mouseY)
    {
        if(mouseX>=mapParams.nbTileX-1 && mapParams.viewX<matrice[0].length-mapParams.nbTileX)
        {
          this.scrollCount++;
          if(this.scrollCount>=this.scrollSpeed)
            this.scroll("right");
        }
        else if(mouseY>=mapParams.nbTileY-1 && mapParams.viewY<matrice.length-mapParams.nbTileY)
        {
          this.scrollCount++;
          if(this.scrollCount>=this.scrollSpeed)
            this.scroll("bot");
        }
        else if(mouseX<=mapParams.viewX && mapParams.viewX>0)
        {
          this.scrollCount++;
          if(this.scrollCount>=this.scrollSpeed) 
            this.scroll("left");
        }
        else if(mouseY<=mapParams.viewY && mapParams.viewY>0)
        {
          this.scrollCount++; 
          if(this.scrollCount>=this.scrollSpeed)
            this.scroll("top");
        }
        else{
            this.scrollCount=0; 
        }
    }

    //Pour input clavier (tempo, le temps de mettre ce qui est plus haut au propre)
    this.scroll = function(sens)
    {
        if(sens == "left" && mapParams.viewX>0)
        {
            mapParams.viewX-=1;
        }
        if(sens == "right" && mapParams.viewX<matrice[0].length-mapParams.nbTileX)
        {
            mapParams.viewX+=1;
        }
        if(sens == "bot" && mapParams.viewY<matrice.length-mapParams.nbTileY)
        {
            mapParams.viewY+=1;
        }
        if(sens == "top" && mapParams.viewY>0)
        {
            mapParams.viewY-=1;
        }
        this.scrollCount=0;
    }
    this.renderMap = function(){     
        for (var i = mapParams.viewY; i < mapParams.nbTileY+mapParams.viewY; i++)
        {
            for (var j = mapParams.viewX; j < mapParams.nbTileX+mapParams.viewX; j++)
            {
                if(this.matrice[i][j]==1)
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
    }

    //Appliquer des effets liés au case spéciales
    this.applySpecialEffect = function()
    {

    }
}
