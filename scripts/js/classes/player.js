var Player = function(canvas,name,spawn,heros){
	this.name = name;
	this.images = images;
	this.spawn = spawn;
	this.heros = heros
	document.getElementById(this.name).visible = true;
	this.logoBox = document.getElementById('countdown');
	this.logoBoxLastChilde = false;
	this.EndTurnBox = document.getElementById('EndTurnBox');
	this.StatCanvas = document.getElementById('StatsCanvas').getContext('2d');
	this.StatCanvas.font="30px Arial";
	this.StatCanvas.fillStyle="black";
	this.army = [];
	this.spawnHeros();
	this.status = '';
	this.isDoingAttack = false;
	this.isSelecting = false;
	this.targetSelected = false;
	this.turn = false;
	this.targetToAttack =false
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
	 // for (var i = 0; i < this.spawn.length; i++) {
	 // 	this.army.push(new this.heros[i](this.spawn[i][0],this.spawn[i][1],this.name,this))
	 // };
}

//loop Player
Player.prototype.loop = function(context){

	if(this.army.length<=0)
	{
		window.location.href="victoire.html"
	}
	
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
			context.drawImage(images['boutonPush'],(this.targetSelected.pos.x-mapParams.viewX)*mapParams.tileSize,(this.targetSelected.pos.y-mapParams.viewY)*mapParams.tileSize+mapParams.tileSize/2+mapParams.viewY,mapParams.tileSize/2,mapParams.tileSize/2);
			context.fillStyle = 'blue';
			context.drawImage(images['boutonAttack'],(this.targetSelected.pos.x-mapParams.viewX)*mapParams.tileSize+mapParams.tileSize/2,(this.targetSelected.pos.y-mapParams.viewY)*mapParams.tileSize+mapParams.tileSize/2,mapParams.tileSize/2,mapParams.tileSize/2);
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
      this.changeDivBox(this.targetSelected);
      this.changeStatsIn(this.targetSelected);
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
    if(this.army[i].CheckCase(caseSelected).state == 'move'){
     this.army[i].move();
    }
    if(this.army[i].CheckCase(caseSelected).state == 'player'){
     this.isDoingAttack = true; 
     this.targetToAttack = this.army[i].CheckCase(caseSelected).player;
    }
   }
  };
 }
 else{
  var caseSelected = mouse.findCase(x,y);
  if( (caseSelected.xoff>(this.targetSelected.pos.x+mapParams.viewX)*mapParams.tileSize && caseSelected.xoff<=this.targetSelected.pos.x*mapParams.tileSize+mapParams.tileSize/2) && 
    (caseSelected.yoff>(this.targetSelected.pos.y+mapParams.viewY)*mapParams.tileSize+mapParams.tileSize/2 && caseSelected.yoff<(this.targetSelected.pos.y+mapParams.viewY)*mapParams.tileSize+mapParams.tileSize) ){
   var enemy = this.targetSelected.checkEnnemiInRangeForPush(this.targetToAttack);
   if(enemy)
   {
	   this.targetSelected.pushSomeone(this.targetToAttack);
	   this.isDoingAttack = false;
	}
  }
  if( (caseSelected.xoff>(this.targetSelected.pos.x+mapParams.viewX)*mapParams.tileSize+mapParams.tileSize/2 && caseSelected.xoff<(this.targetSelected.pos.x+mapParams.viewX)*mapParams.tileSize+mapParams.tileSize) && 
    (caseSelected.yoff>(this.targetSelected.pos.y+mapParams.viewY)*mapParams.tileSize+mapParams.tileSize/2 && caseSelected.yoff<(this.targetSelected.pos.y+mapParams.viewY)*mapParams.tileSize+mapParams.tileSize) ){
  	consol.log()
   var enemy = this.targetSelected.checkEnnemiInRange(this.targetToAttack);
   if(enemy){
    this.targetSelected.attack(this.targetToAttack);
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

Player.prototype.changeDivBox = function(player){
	if(this.logoBoxLastChild){
		this.logoBox.removeChild(this.logoBoxLastChild);
		this.logoBoxLastChild = false;
	}
	var image = images[player.name+'logo'];
	image.style.zIndex = 3;
	image.style.position = 'absolute';
	image.style.left = 0 + 'px';
	image.style.top = 0 + 'px';
	this.logoBox.appendChild(image);
	this.logoBoxLastChild = image;
}

Player.prototype.changeStatsIn = function(player,value){
	this.StatCanvas.clearRect(0,0,600,600)
	if(value){
		this.StatCanvas.fillText(player.hp , 200,30);
		this.StatCanvas.fillText(player.attackRange , 30,30);
		this.StatCanvas.fillText(player.damage , 30,30);
		this.StatCanvas.fillText(player.magicResist , 30,30);
		this.StatCanvas.fillText(player.damage , 30,30);
	}
	else{

	}
}

Player.prototype.stopTurn = function(){
	this.turnTimer = 60;
	if(this.logoBoxLastChild){
		this.logoBox.removeChild(this.logoBoxLastChild);
		this.logoBoxLastChild = false;
	}
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
	this.EndTurnBox.innerHTML = this.name+ " " +cd+" second left";
};
