var Player = function(canvas,name,spawn){
	this.name = name;
	this.images = images;
	this.spawn = spawn;
	document.getElementById(this.name).visible = true;
	this.timerBox = document.getElementById('countdown');
	this.army = [];
	this.spawnHeros();
	this.status = '';
	this.isSelecting = false;
	this.targetSelected = false;
	this.turn = false;
	this.turnTimer = 60; //secondes
	this.actualTimer = 0;
	this.lastUpdate;
	this.otherPlayer;
  	//Write Stuff
};

Player.prototype.addOtherPlayer = function(otherPlayer){
	this.otherPlayer = otherPlayer;
}

Player.prototype.spawnHeros = function(){
	for (var i = 0; i < this.spawn.length; i++) {
		this.army.push(new Thief(this.spawn[i][0],this.spawn[i][1],this.name,this))
	};
}

//loop Player
Player.prototype.loop = function(context){
	if(this.turn){
		this.timerTurn(context);
		for (var i = this.army.length - 1; i >= 0; i--) {
			if(this.army[i].isSelected){
				this.army[i].loop(context);
			}
			if(this.army[i].isMoving){
				this.army[i].move();
			}
		}
	}
	

//BOUCLES A RENDER \\
	for (var i = this.army.length - 1; i >= 0; i--) {
		this.army[i].render(context);
	}
	for (var i = 0; i < this.otherPlayer.army.length; i++) {
		this.otherPlayer.army[i].render(context);
	};
};

Player.prototype.onclick = function(x,y){
	var caseSelected = findCaseWithCamera(x,y);
	for (var i = 0; i < this.army.length; i++) {
		if(this.army[i].pos.x == caseSelected.x && this.army[i].pos.y == caseSelected.y){
			if(!this.isSelecting){
				if(!this.army[i].isSelected && this.army[i].canBeSelected){
					this.army[i].selected();
					this.targetSelected = this.army[i];
				}
				else{
					this.army[i].deselected();
					this.targetSelected = false;
				}
			}
			else{
				this.targetSelected.deselected();
				this.targetSelected = false;
			}
		} 
		else if(this.army[i].isSelected) {
<<<<<<< HEAD
			this.army[i].move();
		}
		if(this.army[i].isSelected && this.army[i].checkEnnemiInRange())
		{
				this.army[i].chooseTarget(caseSelected);
=======
			if(this.army[i].CheckCase(caseSelected) == 'move'){
				this.army[i].move();
			}
			if(this.army[i].CheckCase(caseSelected) == 'player'){
				var enemy = this.army[i].checkEnnemiInRange(caseSelected);
				if(enemy){
					this.army[i].attack(enemy);
					this.army[i].targetAvaible = [];
				}
			}
>>>>>>> 7f0294f816d502ae5d888f91cc1877260bc001e9
		}
	};
}

Player.prototype.startTurn = function(){
	this.turn = true;
	this.actualTimer =   (new Date().getTime()/1000)+this.turnTimer;
	this.lastUpdate =  (new Date().getTime()/1000);
	for (var i = 0; i < this.army.length; i++){
		this.army[i].newTurn();
	}
};

Player.prototype.stopTurn = function(){
	this.turnTimer = 30;
	this.turn = false;
	for (var i = 0; i < this.army.length; i++){
		this.army[i].EndTurn();
	}
	this.otherPlayer.startTurn();
};

Player.prototype.timerTurn = function(){
	var cd = Math.floor(this.actualTimer - (new Date().getTime()/1000));
	if(cd<0 && this.turn){
		this.stopTurn();
	}
	this.timerBox.innerHTML = this.name+ " " +cd+" second left";
};
