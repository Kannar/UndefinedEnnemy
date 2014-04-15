var Player = function(x,y){
	this.army = [];
	this.turn = false;
	this.turnTimer = 30; //secondes
	this.actualTimer = 0;
	this.lastUpdate;
  	//Write Stuff
};


//loop Player
Player.prototype.loop = function(context){
	if(this.turn){
		stopTurn();
};

Player.prototype.startTurn = function(){
	this.turn = true;
	this.actualTimer = (new Date().getTime()/1000)+this.turnTimer;
	this.lastUpdate = Date.now()/1000;
};

Player.prototype.stopTurn = function(){
	this.turnTimer = 30;
	this.turn = false;
};

Player.prototype.timerTurn = function(){
	var cd = Math.floor(timerCD - (new Date().getTime()/1000));
	if(this.actualTimer<0 && this.turn){
		stopTurn();
	// context.fillText(this.turnTimer+"second Left",0,0);
};