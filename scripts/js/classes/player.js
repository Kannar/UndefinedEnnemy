var Player = function(canvas,name,spawn,heros){
	this.name = name;
	this.images = images;
	this.spawn = spawn;
	this.heros = heros
	document.getElementById(this.name).visible = true;
	this.timerBox = document.getElementById('countdown');
	this.army = [];
	this.spawnHeros();
	this.status = '';
	this.isDoingAttack = false;
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
		this.army.push(new this.heros[i](this.spawn[i][0],this.spawn[i][1],this.name,this))
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
		if(this.isDoingAttack){
			context.fillStyle = 'red';
			context.drawImage(images['boutonPush'],this.targetSelected.pos.x*mapParams.tileSize,this.targetSelected.pos.y*mapParams.tileSize+mapParams.tileSize/2,mapParams.tileSize/2,mapParams.tileSize/2);
			context.fillStyle = 'blue';
			context.drawImage(images['boutonAttack'],this.targetSelected.pos.x*mapParams.tileSize+mapParams.tileSize/2,this.targetSelected.pos.y*mapParams.tileSize+mapParams.tileSize/2,mapParams.tileSize/2,mapParams.tileSize/2);
		}
	}
	else{
		for (var i = this.army.length - 1; i >= 0; i--){
			if(this.army[i].isMoving){
				this.army[i].move();
			}
		}
	}
	

//BOUCLES A RENDER \\
	for (var i = 0; i < this.otherPlayer.army.length; i++) {
		this.otherPlayer.army[i].render(context);
	};
};

Player.prototype.onclick = function(x,y){
 var caseSelected = findCaseWithCamera(x,y);
 if(!this.isDoingAttack){
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
    if(this.army[i].CheckCase(caseSelected) == 'move'){
     this.army[i].move();
    }
    if(this.army[i].CheckCase(caseSelected) == 'player'){
     this.isDoingAttack = true;
    }
   }
  };
 }
 else{
  var caseSelected = mouse.findCase(x,y);
  if( (caseSelected.xoff>this.targetSelected.pos.x*mapParams.tileSize && caseSelected.xoff<=this.targetSelected.pos.x*mapParams.tileSize+mapParams.tileSize/2) && 
    (caseSelected.yoff>this.targetSelected.pos.y*mapParams.tileSize+mapParams.tileSize/2 && caseSelected.yoff<this.targetSelected.pos.y*mapParams.tileSize+mapParams.tileSize) ){
   console.log(caseSelected)
caseSelected.x-=1;
   var enemy = this.targetSelected.checkEnnemiInRangeForPush(caseSelected);
   this.targetSelected.pushSomeone(enemy);
   this.isDoingAttack = false;
  }
  if( (caseSelected.xoff>this.targetSelected.pos.x*mapParams.tileSize+mapParams.tileSize/2 && caseSelected.xoff<this.targetSelected.pos.x*mapParams.tileSize+mapParams.tileSize) && 
    (caseSelected.yoff>this.targetSelected.pos.y*mapParams.tileSize+mapParams.tileSize/2 && caseSelected.yoff<this.targetSelected.pos.y*mapParams.tileSize+mapParams.tileSize) ){
   var enemy = this.targetSelected.checkEnnemiInRange(caseSelected);
   if(enemy){
   	console.log(caseSelected)
    this.targetSelected.attack(enemy);
    this.targetSelected.targetAvaible = [];
   }
   this.isDoingAttack=false;
  }
  else{
   this.isDoingAttack = false;
  }
 }
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
