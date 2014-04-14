var Map = function(matrice){
 this.matrice = matrice;

 this.constructMap=function(){
  for (var i = 0; i < matrice.length; i++) {
   for (var j = 0; j < matrice[i].length; j++) {
    if(matrice[i][j]==1)
    {
     context.fillStyle="rgb(255,0,0)";
    }
    else
    {
     context.fillStyle="rgb(255,255,255)";
    }
    context.fillRect(0+j*66,0+i*66,65,65);
   };
  };
 }
}