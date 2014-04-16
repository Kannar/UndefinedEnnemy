var Player = function(canvas,name){
	this.name = name;
	this.images = images;
	document.getElementById(this.name).visible = true;
	this.timerBox = document.getElementById('countdown')
	this.army = [];
	this.army.push(new Dragon(3,4,this.name))
	this.status = '';
	this.turn = false;
	this.turnTimer = 30; //secondes
	this.actualTimer = 0;
	this.lastUpdate;
	this.otherPlayer;
  	//Write Stuff
};

Player.prototype.addOtherPlayer = function(otherPlayer){
	this.otherPlayer = otherPlayer;
}
//loop Player
Player.prototype.loop = function(context){
	if(this.turn){
		this.timerTurn(context);
		for (var i = this.army.length - 1; i >= 0; i--) {
			if(this.army[i].isSelected){
				this.army[i].loop(context);
			}
		this.army[i].render(context);
		}
	}
	else{
		for (var i = this.army.length - 1; i >= 0; i--) {
			this.army[i].render(context);
		}
	}
};

Player.prototype.onclick = function(x,y){
	if(this.turn){
		var caseSelected = findCaseWithCamera(x,y);
		for (var i = 0; i < this.army.length; i++) {
			if(this.army[i].pos.x == caseSelected.x && this.army[i].pos.y == caseSelected.y){
				if(!this.army[i].isSelected){
					this.army[i].selected();
				}
			} 
			else if(this.army[i].isSelected) {
				this.army[i].move();
				this.army[i].isSelected = false;
			}
		};
	}
}

Player.prototype.startTurn = function(){
	this.turn = true;
	this.actualTimer =   (new Date().getTime()/1000)+this.turnTimer;
	this.lastUpdate =  (new Date().getTime()/1000);
};

Player.prototype.stopTurn = function(){
	this.turnTimer = 30;
	this.turn = false;
	this.otherPlayer.startTurn();
};

Player.prototype.timerTurn = function(){
	var cd = Math.floor(this.actualTimer - (new Date().getTime()/1000));
	if(cd<0 && this.turn){
		this.stopTurn();
	}
	this.timerBox.innerHTML = this.name+ " " +cd+" second left";
};
