var Player = function(x,y){
	this.army = [];
	this.turn = false;
	this.turnTimer = 30; //secondes
	this.lastUpdate;
  	//Write Stuff
};


//loop Player
Player.prototype.loop = function(context){
	if(this.turnTimer<0 && this.turn){
		stopTurn();
	}
	else{

	}
};

Player.prototype.startTurn = function(){
	this.turn = true;
	this.lastUpdate = Date.now()/1000;
};

Player.prototype.stopTurn = function(){
	this.turnTimer = 30;
	this.turn = false;
};

Player.prototype.timerTurn = function(){
	var now = Date.now()/1000;
	var dt = now - lastUpdate;
	this.turnTimer -= dt;
	this.lastUpdate = now;
	// context.fillText(this.turnTimer+"second Left",0,0);
};