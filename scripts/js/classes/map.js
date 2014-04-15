var Map = function(matrice){
  this.matrice = matrice;
  this.viewX=0;
  this.viewY=0;
  this.constructMap=function(mouseX,mouseY){
    if(mouseX>12 && frame>=10 && this.viewX<4)
    {
      frame=0;
      console.log(this.viewX);
      this.viewX+=1;
    }
    if(mouseY>9 && frame>=10 && this.viewY<3)
    {
      frame=0;
      console.log(this.viewY);
      this.viewY+=1;
    }
    if(mouseX<=0 && frame>=10 && this.viewX>0)
    {
      frame=0;
      console.log(mouseX)
      this.viewX-=1;
    }
    if(mouseY<=0 && frame>=10 && this.viewY>0)
    {
      frame=0;
      console.log(mouseY)
      this.viewY-=1;
    }
    for (var i = this.viewY; i < mapParams.nbTileY+this.viewY; i++) {
      for (var j = this.viewX; j < mapParams.nbTileX+this.viewX; j++) {
        if(this.matrice[i][j]==1)
        {
          context.fillStyle="rgb(255,0,0)";
        }
        else
        {
          context.fillStyle="rgb(255,255,255)";
        }
      //  console.log(this.viewX)
        context.fillRect((j-this.viewX)*mapParams.tileSize,(i-this.viewY)*mapParams.tileSize,65,65);
      };
    };
  }
}