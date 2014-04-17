var Map = function(matrice)
{   
    this.map = matrice;
    this.matrice = matrice['collisions'];
    this.speTiles = matrice["specials"];
    this.scrollSpeed = 10;
    this.scrollSpeed = 50;
    this.scrollCount = 0;
    this.image = images['tilesSheet'];
    this.constructMap=function(mouseX,mouseY)
    {
        this.matrice = map['collisions'];
        if(mouseX>=mapParams.nbTileX-1 && mapParams.viewX<this.matrice[0].length-mapParams.nbTileX){
            this.scrollCount++;

            if(this.scrollCount>=this.scrollSpeed){
                //this.scroll("right");
            }
        }
        else if(mouseY>=mapParams.nbTileY-1 && mapParams.viewY<this.matrice.length-mapParams.nbTileY)
        {
          this.scrollCount++;
          if(this.scrollCount>=this.scrollSpeed)
          {
            // this.scroll("bot");
          }
        }
        else if(mouseX<=mapParams.viewX && mapParams.viewX>0)
        {
          this.scrollCount++;
          if(this.scrollCount>=this.scrollSpeed)
          { 
            // this.scroll("left");
          }
        }
        else if(mouseY<=mapParams.viewY && mapParams.viewY>0)
        {
          this.scrollCount++; 
          if(this.scrollCount>=this.scrollSpeed){
            // this.scroll("top");
         }
        }
        else{
            this.scrollCount=0; 
        }
    }

    //Pour input clavier (tempo, le temps de mettre ce qui est plus haut au propre)
    this.scroll = function(sens)
    {
        this.matrice = map['collisions'];
        if(sens == "left" && mapParams.viewX>0)
        {
            mapParams.viewX-=1;
        }
        if(sens == "right" && mapParams.viewX<this.matrice[0].length-mapParams.nbTileX)
        {
            mapParams.viewX+=1;
        }
        if(sens == "bot" && mapParams.viewY<this.matrice.length-mapParams.nbTileY)
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
                context.drawImage(this.image,
                    (this.map['terrains'][i][j]-1)*mapParams.tileSize,0,
                    mapParams.tileSize,mapParams.tileSize,
                    (j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,
                    65,65);
            };
        };

        if(state === "SET_TILES")
        {
            for(var i = 0; i<this.speTiles.length; i++)
            {
                for(var j=0; j<this.speTiles[i].length; j++)
                {
                    if(this.speTiles[i][j] == 1 && currentPlayerTurn === "Player1")   //Emplacement libre pour case speciale joueur 1
                    {
                        context.fillStyle = "rgb(250, 50, 50)";
                        context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                    else if(this.speTiles[i][j] == 3 && currentPlayerTurn === "Player1")   //Emplacement libre pour case speciale joueur 1
                    {
                        context.fillStyle = "rgb(50, 250, 50)";
                        context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                    else if(this.speTiles[i][j] == 2 && currentPlayerTurn === "Player2")   //Emplacement libre pour case speciale joueur 1
                    {
                        context.fillStyle = "rgb(50, 50, 250)";
                        context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                    else if(this.speTiles[i][j] == 4 && currentPlayerTurn === "Player2")   //Emplacement libre pour case speciale joueur 1
                    {
                        context.fillStyle = "rgb(50, 250, 50)";
                        context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                }
            }
        }

        if(state === "SELEC_PERSO")
        {
            for(var i=0; i<this.map.players.length; i++)
            {
                for(var j=0; j<this.map.players[i].length; j++)
                {
                    if(this.map.players[i][j] === 1 && currentPlayerTurn === "Player1")
                    {
                        context.fillStyle = "rgb(250, 50, 50)";
                        context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                    else if(this.map.players[i][j] === 2 && currentPlayerTurn === "Player2")
                    {
                        context.fillStyle = "rgb(50, 50, 250)";
                        context.fillRect((j-mapParams.viewX)*mapParams.tileSize,(i-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                }
            }
        }
    }

    //Appliquer des effets liés au case spéciales
    this.applySpecialEffect = function()
    {

    }
}
