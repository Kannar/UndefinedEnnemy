//====================================================================
//   CLASSE HEROS MERE DES HERO (ici toutes les fonctions communes)  ||
//====================================================================
var Heros = function(x,y,player){
	manageTiles('players',x,y,true);
	manageTiles('collisions',x,y,true);
	this.player = player;
	this.pos = {x : x, y : y};
	this.image = images[this.name+''+this.player];
	this.status = '';
	this.moveSpeed = 0.03;
	this.hasMoved = false;
	this.hasAttacked = false;
	this.canBeSelected = false;
	this.isSelected = false;
	this.isMoving = false;
	this.path;
	this.direction="";
	this.coefDirecteur=1;
	this.targetAvaible=[];
	this.config = animsConfig[this.name+'AnimConfig'+this.player];
	this.config.frameWidth = this.image.width/this.config.nbFrameMax;
	this.config.frameHeight = this.image.height/this.config.nbRows;
	this.isPushed=false;
	//Write Stuff here
};
Heros.prototype.constructor = Heros;

Heros.prototype.checkEnnemiInRange=function(target){
    for(var i=-this.attackRange;i<=this.attackRange;i++){
        for(var j=-this.attackRange;j<=this.attackRange;j++){
        	if(Math.abs(i)+Math.abs(j)<=this.attackRange){
            	if(map["players"][this.pos.y][this.pos.x]==1){
        			for(var k=0; k<this.parent.otherPlayer.army.length;k++){
        				if(this.parent.otherPlayer.army[k].pos.x==this.pos.x+i && 
        				    this.parent.otherPlayer.army[k].pos.y==this.pos.y+j){
        					this.targetAvaible.push(this.parent.otherPlayer.army[k]);
        				}
        			}
            	}
            }
        }
    }
	if(this.targetAvaible.length>0)
	{
		for (var i = this.targetAvaible.length - 1; i >= 0; i--) {
			if (this.targetAvaible[i].pos.x == target.pos.x && this.targetAvaible[i].pos.y == target.pos.y){
				return true;
			}
		};
 	}
	return false;
}
Heros.prototype.checkEnnemiInRangeForPush=function(target){
    for(var i=-this.attackRange;i<=this.attackRange;i++){
  //   	for(var k=0; k<this.parent.army.length;k++){
	 //    	if((this.parent.army[k].pos.x==this.pos.x+i && i!=0 && this.parent.army[k].pos.y==this.pos.y) || (this.parent.army[k].pos.y==this.pos.y+i && i !=0 && this.parent.army[k].pos.x==this.pos.x))
	 //    	{
		// 		this.targetAvaible.push(this.parent.army[k]);
		// 		console.log(this.parent.army[k].pos.x,this.pos.x+i,this.parent.army[k].pos.y,this.pos.y+i);
		// 	}
		// }
    	for(var k=0; k<this.parent.otherPlayer.army.length;k++){
	    	if((target.pos.x==this.pos.x+i && i!=0 && target.pos.y==this.pos.y))
	    	{
	    		if(i<0)
	    		{
	    			this.coefDirecteur=-1;
	    		}
	    		else{
	    			this.coefDirecteur=1;
	    		}
	    		this.direction="x";
				this.targetAvaible.push(this.parent.otherPlayer.army[k]);
	    		// console.log(this.parent.otherPlayer.army[k].pos.x,this.pos.x+i,this.parent.otherPlayer.army[k].pos.y,this.pos.y+i);
			}
			if((this.parent.otherPlayer.army[k].pos.y==this.pos.y+i && i !=0 && this.parent.otherPlayer.army[k].pos.x==this.pos.x)){
	    		if(i<0)
	    		{
	    			this.coefDirecteur=-1;
	    		}
	    		else{
	    			this.coefDirecteur=1;
	    		}
	    		this.direction="y";
	    		this.targetAvaible.push(this.parent.otherPlayer.army[k]);
			}
		}
    }
	if(this.targetAvaible.length>0)
	{
		for (var i = this.targetAvaible.length - 1; i >= 0; i--) {
			if (this.targetAvaible[i].pos.x == target.pos.x && this.targetAvaible[i].pos.y == target.pos.y){
				return true;
			}
		};
 	}
	return false;
}
// Heros.prototype.chooseTarget=function(caseSelected){
// 	for(var i =0;i<this.targetAvaible.length;i++){
// 		if(caseSelected.x==this.targetAvaible[i].pos.x && 
// 		   caseSelected.y==this.targetAvaible[i].pos.y){
// 		   	console.log(this.targetAvaible);
// 		   	return this.targetAvaible[i];
// 		}
// 	}
// 	return false;
// }

Heros.prototype.CheckCase = function (caseClicked){
 for (var i = 0; i < this.parent.otherPlayer.army.length; i++) {
  enemy = this.parent.otherPlayer.army[i];
  if (enemy.pos.x==caseClicked.x && enemy.pos.y==caseClicked.y){
   return {state : 'player' , player : this.parent.otherPlayer.army[i]};
  }
 };
 if(checkTiles('collisions',caseClicked.x,caseClicked.y) == 0){
  return {state : 'move'};
 }
 return false;
};
//Contient toutes les variables relatives aux effets de cases
Heros.prototype.variableEffects = {

	"invincible": false,	//done
	"multiplicatorDgtTook": 1,	//done
	"multiplicatorDgtDealt": 1,	//done
	"canAtk": true,	//done
	"hpGain": 0,	//done
	"atkTwice": false,	//done
	"takeDgts": false,	//done
	"firstToAtk": false,
	"lastToAtk": false,	
	"accuracyMultiplicator": 1
};

//Move le Hero
Heros.prototype.move = function (){
	if(!this.hasMoved && !this.isMoving){
		if(path.length<this.movePoint+2){
			if(checkTiles('players',path[path.length-1][0],path[path.length-1][1]) == 0){

				//Desactivation de l'effet de la case sur laquelle on se trouvait
				for(var i=0; i<gameObjects[3].length; i++)
				{
					if(gameObjects[3][i].pos.x === this.pos.x && gameObjects[3][i].pos.y === this.pos.y)
					{
						if(gameObjects[3][i].player === this.player)
						{
							gameObjects[3][0].outBad(this);
						}
						else
						{
							gameObjects[3][0].outGood(this);
						}
					}
				}
				
				manageTiles('players',this.pos.x,this.pos.y,false);
				manageTiles('collisions',this.pos.x,this.pos.y,false);
				this.path = path;
				manageTiles('collisions',this.path[this.path.length-1][0],this.path[this.path.length-1][1],true);
				manageTiles('players',this.path[this.path.length-1][0],this.path[this.path.length-1][1],true);
				// this.pos.x = path[path.length-1][0];
				// this.pos.y = path[path.length-1][1];
				// this.CheckCase();
				this.isMoving = true;
				this.hasMoved = true;
				this.changeAnim('walk')
			}
		}
		//this.deselectioncted();
	}
	else if(this.isMoving){
		if(this.path[0][0]<this.pos.x-this.moveSpeed){
			this.pos.x-=this.moveSpeed;
		}
		else if(this.path[0][0]>this.pos.x+this.moveSpeed){
			this.pos.x+=this.moveSpeed;
		}
		if(this.path[0][1]<this.pos.y-this.moveSpeed){
			this.pos.y-=this.moveSpeed;
		}
		if(this.path[0][1]>this.pos.y+this.moveSpeed){	
			this.pos.y+=this.moveSpeed;
		}
		if( (this.path[0][0]>=(this.pos.x-this.moveSpeed) && this.path[0][0]<=(this.pos.x+this.moveSpeed)) && (this.path[0][1]>=(this.pos.y-this.moveSpeed) && this.path[0][1]<=(this.pos.y+this.moveSpeed)) ) {
			if(this.path.length>1){
				this.path.splice(0,1);
			}
			else{
				this.pos.x = this.path[0][0];
				this.pos.y = this.path[0][1];
				this.path;
				this.changeAnim('normal');
				this.isMoving = false;

				//Activation de l'effet de la case sur laquelle on se trouvait
				for(var i=0; i<gameObjects[3].length; i++)
				{
					if(gameObjects[3][i].pos.x === this.pos.x && gameObjects[3][i].pos.y === this.pos.y)
					{
						if(gameObjects[3][i].player === this.player)
						{
							gameObjects[3][0].onBad(this);
						}
						else
						{
							gameObjects[3][0].onGood(this);
						}
					}
				}
			}
		}
	}
};
Heros.prototype.changeAnim = function (name){
	this.config.animation = name;
	this.config.animFrame = 0;
	this.config.currentFrame = 0;
};


//Hero is selected
Heros.prototype.selected = function (){
	if(this.canBeSelected){
		this.isSelected = true;
		this.parent.isSelecting = true;
	}
};

//Hero is deselection
Heros.prototype.deselected = function (){
	this.isSelected = false;
	this.parent.isSelecting = false;
};

Heros.prototype.newTurn = function (){
	this.hasMoved = false;
	this.isSelected = false;
	this.hasAttacked = false;
	this.canBeSelected = true;
	this.changeAnim('normal');
};

Heros.prototype.EndTurn = function (){
	this.hasMoved = true;
	this.hasAttacked = true;
	this.isSelected = false;
	this.canBeSelected = false;

	this.life = this.life + this.variableEffects.hpGain;
};

Heros.prototype.findPath = function (){
	if(!this.hasMoved){
		showCharRange(this.pos,(this.movePoint),this.attackRange);
		var deplacement = findPath(this.pos.x,this.pos.y,mouseVars.mapPosX, mouseVars.mapPosY,'collisions');
		if(deplacement.length<this.movePoint+2){
			drawMyPath();
		}
	}
};

//Hero get Item
Heros.prototype.getItem = function (){
	//ramasse item
};

//Hero release Item
Heros.prototype.releaseItem = function (){
	//ramasse item
};

//Hero get Damage
Heros.prototype.getDamage = function (){
};

//Hero Attaque 
Heros.prototype.attack = function(target){	//Target => unité adverse ou mob (objet)
	if(this.variableEffects.canAtk)
	{
		//Insert animation d'attack de l'attaquant

		if(!target.variableEffects.invincible && !this.variableEffects.takeDgts)
		{
			console.log(this.damage*this.variableEffects.multiplicatorDgtDealt*target.variableEffects.multiplicatorDgtTook);
			target.hp -= this.damage*this.variableEffects.multiplicatorDgtDealt*target.variableEffects.multiplicatorDgtTook;
			//Insert animation prise de dégât defenseur
		}
		else
		{
			//Insert animation de block ou quoi

			if(this.variableEffects.takeDgts)
				this.hp -= this.damage*this.variableEffects.multiplicatorDgtDealt;
				//Insert anim de prend chère
		}
		
		if(this.variableEffects.atkTwice)
		{
			//Insert animation d'attaque

			if(!target.variableEffects.invincible && !this.variableEffects.takeDgts)
			{	
				target.hp -= this.damage*this.variableEffects.multiplicatorDgtDealt*target.variableEffects.multiplicatorDgtTook;
				//Insert animation prise de dégât defenseur
			}
			else
			{
				//Insert animation de block

				if(this.variableEffects.takeDgts)
					this.hp -= this.damage*this.variableEffects.multiplicatorDgtDealt;
					//Insert anim de prend chère
			}
		}
		if(target.hp<0)
		{
			target.death(target.parent.army,target);
			manageTiles('players',target.pos.x,target.pos.y,false);
			manageTiles('collisions',target.pos.x,target.pos.y,false);
		}
	}
	console.log(target.hp)
	this.hasAttacked=true;
};

Heros.prototype.pushSomeone = function(target){
	var tmp=0;
	var side;
	var outScreen=false;
	var damageTmp;
	console.log(target)
	if(this.direction=="x"){
		if(target.pos.x+this.damage*this.coefDirecteur>mapParams.nbCaseMapX || target.pos.x+this.damage*this.coefDirecteur<0)
		{
			outScreen=true;
			if(this.coefDirecteur>0)
			{
				damageTmp = mapParams.nbCaseMapX-target.pos.x;
			}
			else{
				
				damageTmp = target.pos.x;
			}
			console.log(damageTmp)
			var myPath=findPath(target.pos.x,target.pos.y,target.pos.x+(damageTmp*this.coefDirecteur),target.pos.y,"empty");
		}
		else
		{
			console.log(this.damage)
			var myPath=findPath(target.pos.x,target.pos.y,target.pos.x+(this.damage*this.coefDirecteur),target.pos.y,"empty");
		}
		side = mapParams.nbCaseMapX;
	}
	if(this.direction=="y"){
		if(target.pos.y+this.damage*this.coefDirecteur>mapParams.nbCaseMapY || target.pos.y+this.damage*this.coefDirecteur<0)
		{
			outScreen=true;
			if(this.coefDirecteur>0)
			{
				damageTmp = mapParams.nbCaseMapY-target.pos.y;
			}
			else{
				
				damageTmp = target.pos.y;
			}
			var myPath=findPath(target.pos.x,target.pos.y,target.pos.x,target.pos.y+(damageTmp*this.coefDirecteur),"empty");
		}
		else
			var myPath=findPath(target.pos.x,target.pos.y,target.pos.x,target.pos.y+(this.damage*this.coefDirecteur),"empty");
		side = mapParams.nbCaseMapY;
	}
	if(myPath.length>0)
	{
		manageTiles('players',target.pos.x,target.pos.y,false);
		manageTiles('collisions',target.pos.x,target.pos.y,false);
		for(var i =0;i<myPath.length;i++){
						console.log("titi")
			if(map.players[myPath[i][1]][myPath[i][0]]==1){
				for(var j =0;j<target.parent.army.length;j++){
					
					if(target.parent.army[j].pos.x==myPath[i][0] && target.parent.army[j].pos.y==myPath[i][1]){
						this.death(target.parent.army,target);
					}
				}
			}
			if(map.collisions[myPath[i][1]][myPath[i][0]] == 1)
			{
				console.log(myPath[i][1],myPath[i][0]);
				tmp=myPath.length-i;
				break;
			}

			else{
				// console.log(map.collisions[myPath[i][1]][myPath[i][0]]);	
			}
		}
	}

	console.log(this.direction,this.coefDirecteur,this.damage,this.coefDirecteur*(this.damage),tmp);
	if(outScreen)
		target.pos[this.direction] += this.coefDirecteur*(damageTmp-tmp); 
	else
		target.pos[this.direction] += this.coefDirecteur*(this.damage-tmp); 
		manageTiles('players',target.pos.x,target.pos.y,true);
	this.hasAttacked=true;
};

//Dessine le Hero
Heros.prototype.render = function(context){
	this.config.animFrame++;
	if (this.config.animFrame % Math.floor(180 / this.config.currentAnimation[this.config.animation].fps) == 0){
		this.config.currentFrame++;
		if (this.config.currentFrame == this.config.currentAnimation[this.config.animation].nbFrame){
			this.config.currentFrame = 0;
		}
	}
	context.drawImage(this.image,
		this.config.currentFrame * this.config.frameWidth, 
		this.config.currentAnimation[this.config.animation].nbRow * this.config.frameHeight,
		this.config.frameWidth, this.config.frameHeight,
		(this.pos.x-mapParams.viewX)*mapParams.tileSize, (this.pos.y-mapParams.viewY)*mapParams.tileSize, this.config.frameWidth, this.config.frameHeight);
};

//Attaque Hero
Heros.prototype.death = function(targetArmy,target){
	for(var i=0; i<targetArmy.length;i++){
			console.log(target.id,targetArmy[i].id);
		if(target.id==targetArmy[i].id)
		{
			targetArmy.splice(i,1);
			i--;
			break;
		}
	}
}

//==========================================
//              CLASSE ARCHER              ||
//==========================================
var Archer = function(x,y,player,parent){
	this.parent = parent;
	this.name = 'Archer';
	this.width = 66;
	this.id=this.name+(Math.random()*200000>>0);
	this.height = 66;
	this.hp = 13;
	this.damage = 5;
	this.magic = 1;
	this.Resist = 3;
	this.magicResist = 5;
	this.accuracy = 7;
	this.movePoint = 4;
	this.attackRange = 2;
	this.loop = function(){
		if(this.hasAttacked){
			this.EndTurn();
			this.changeAnim('deselected');
		}
		if(this.isMoving){
			this.move();
		}
		this.findPath();
	}
  	//Write Stuff
  	Heros.call(this,x,y,player);
};

//Definition de l'heritage du Archer
Archer.prototype = Object.create(Heros.prototype); 
Archer.prototype.constructor = Archer;

//==========================================
//               CLASSE VOLEUR             ||
//==========================================
var Thief = function(x,y,player,parent){
	this.parent = parent;
	this.name = 'Thief';
	this.width = 66;
	this.height = 66;
	this.id=this.name+(Math.random()*200000>>0);
	this.hp = 12;
	this.damage = 4;
	this.magic = 2;
	this.Resist = 3;
	this.magicResist = 4;
	this.accuracy = 5;
	this.movePoint = 6;
	this.attackRange=1;

	this.loop = function(){
		if(this.hasAttacked){
			this.EndTurn();
			this.changeAnim('deselected');
		}
		if(this.isMoving){
			this.move();
		}
		this.findPath();
	}
  	//Write Stuff
  	Heros.call(this,x,y,player);
};

//Definition de l'heritage du Voleur
Thief.prototype = Object.create(Heros.prototype); 
Thief.prototype.constructor = Thief;

//==========================================
//              CLASSE GUERRIER            ||
//==========================================
var Knight = function(x,y,player,parent){
	this.parent = parent;
	this.name = 'Knight';
	this.id=this.name+(Math.random()*200000>>0);
	this.width = 66;
	this.height = 66;
	this.hp = 20;
	this.damage = 2;
	this.magic = 2;
	this.Resist = 6;
	this.magicResist = 5;
	this.accuracy = 4;
	this.movePoint = 3;
	this.attackRange=1;

	this.loop = function(){
		if(this.hasAttacked){
			this.EndTurn();
			this.changeAnim('deselected');
		}
		if(this.isMoving){
			this.move();
		}
		this.findPath();
	}
  	//Write Stuff
  	Heros.call(this,x,y,player);
};

//Definition de l'heritage du Knight
Knight.prototype = Object.create(Heros.prototype); 
Knight.prototype.constructor = Knight;

//==========================================
//                CLASSE MAGE              ||
//==========================================
var Mage = function(x,y,player,parent){
	this.parent = parent;
	this.name = 'Mage';
	this.id=this.name+(Math.random()*200000>>0);
	this.width = 66;
	this.height = 66;
	this.hp = 13;
	this.damage = 2;
	this.magic = 6;
	this.Resist = 3;
	this.magicResist = 6;
	this.accuracy = 5;
	this.movePoint = 4;
	this.attackRange=2;

	this.loop = function(){
		if(this.hasAttacked){
			this.EndTurn();
			this.changeAnim('deselected');
		}
		if(this.isMoving){
			this.move();
		}
		if(this.hp<=0)
		{
			console.log("toto")
			this.death(this.parent.army,this)
		}
		this.findPath();
	}
  	//Write Stuff
  	Heros.call(this,x,y,player);
};

//Definition de l'heritage du Mage
Mage.prototype = Object.create(Heros.prototype); 
Mage.prototype.constructor = Mage;

//==========================================
//              CLASSE OVNI               ||
//==========================================
function Dragon(x,y,player,parent){
	this.parent = parent;
	this.name = 'Dragon';
	this.id=this.name+(Math.random()*200000>>0);
	this.width = 66;
	this.height = 66;
	this.hp = 20;
	this.damage = 25;
	this.magic = 3;
	this.Resist = 4;
	this.magicResist = 4;
	this.accuracy = 3;
	this.movePoint = 3;
	this.attackRange=1;

	this.loop = function(){
		if(this.hasAttacked){
			this.EndTurn();
			this.changeAnim('deselected');
		}
		if(this.isMoving){
			this.move();
		}

		this.findPath();
	}
  	//Write Stuff
  	Heros.call(this,x,y,player);
};

//Definition de l'heritage du Ovni
Dragon.prototype = Object.create(Heros.prototype); 
Dragon.prototype.constructor = Dragon;

//==========================================
//              CLASSE PRETRE                ||
//==========================================
var Priest = function(x,y,player,parent){
	this.parent = parent;
	this.name = 'Priest';
	this.id=this.name+(Math.random()*200000>>0);
	this.width = 66;
	this.height = 66;
	this.hp = 10;
	this.damage = -1;
	this.magic = 5;
	this.Resist = 5;
	this.magicResist = 5;
	this.accuracy = 3;
	this.movePoint = 4;
	this.attackRange=2;

	this.loop = function(){
		if(this.hasAttacked){
			this.EndTurn();
			this.changeAnim('deselected');
		}
		if(this.isMoving){
			this.move();
		}
		this.findPath();
	}
  	//Write Stuff
  	Heros.call(this,x,y,player);
};

//Definition de l'heritage du Pretre
Priest.prototype = Object.create(Heros.prototype); 
Priest.prototype.constructor = Priest;

