var Map = Class.extend({
 init:function(map){
  this.map=map;
  // this.buildmap=buildmap;
 },
 buildmap:function(map)
 {
  
 }
});
var MapVolcanique = Map.extend({
 buildmap:function(){
  for(var i =0; i < this.map.length;i++)
  {
   for(var j =0; j < this.map[i].length;j++)
   {
    if(this.map[i][j]==1)
     context.fillStyle="rgb(0,255,140)";
    else if(this.map[i][j]==3)
     context.fillStyle="rgb(255,0,140)";
    else if(this.map[i][j]==0 || this.map[i][j]==4)
     context.fillStyle="rgb(255,255,255)";
    context.fillRect(0+j*66,0+i*66,65,65);
   }
  }
 }
});