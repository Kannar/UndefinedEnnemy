var Player = function(){
	this.army = [];
	this.status = '';
	this.turn = false;
	this.turnTimer = 1; //secondes
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
	console.log(this.turn)
	if(this.turn){	
		this.timerTurn(context);
	}
};

Player.prototype.startTurn = function(){
	this.turn = true;
	this.actualTimer = (new Date().getTime()/1000)+this.turnTimer;
	this.lastUpdate = Date.now()/1000;
};

Player.prototype.stopTurn = function(){
	this.turnTimer = 30;
	this.turn = false;
	this.otherPlayer.turn = true;
};

Player.prototype.timerTurn = function(){
	var cd = Math.floor(this.actualTimer - (new Date().getTime()/1000));
	if(this.actualTimer<0 && this.turn){
		this.stopTurn();
	}
	// context.fillText(cd+"second Left",0,0);
};