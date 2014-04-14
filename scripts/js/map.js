var Map = function(matrice){
	this.matrice = matrice;
	this.x=0;
	this.y=0;
	this.constructMap=function(mouseX,mouseY){
		if(mouseX>12 && frame>=10)
		{
			frame=0;
		console.log(mouseX)
			this.x+=1;
		}
		if(mouseY>9 && frame>=10 )
		{
			frame=0;
			console.log(mouseY)
			this.y+=1;
		}
		for (var i = this.y; i < 10+this.y; i++) {
			for (var j = this.x; j < 13+this.x; j++) {
				if(matrice[i][j]==1)
				{
					context.fillStyle="rgb(255,0,0)";
				}
				else
				{
					context.fillStyle="rgb(255,255,255)";
				}
				context.fillRect((j-this.x)*66,(i-this.y)*66,65,65);
			};
		};
	}
}