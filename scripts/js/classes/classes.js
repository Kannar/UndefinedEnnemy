//====================================================================
//   CLASSE HEROS MERE DES HERO (ici toutes les fonctions communes)  ||
//====================================================================
var Heros = function(x,y,player){
	manageTiles('players',x,y,true);
	this.player = player;
	this.pos = {x : x, y : y};
	this.image = images[this.name+''+this.player];
	this.status = '';
	this.moveSpeed = 0.07;
	this.hasMoved = false;
	this.hasAttacked = false;
	this.canBeSelected = false;
	this.isSelected = false;
	this.isMoving = false;
	this.path;
	this.config = animsConfig[this.name+'AnimConfig'];
	this.config.frameWidth = this.image.width/this.config.nbFrameMax;
	this.config.frameHeight = this.image.height/this.config.nbRows;
	//Write Stuff here
};
Heros.prototype.constructor = Heros;

Heros.prototype.checEnnemiInRange=function(){
    for(var i=-this.attackRange;i<=this.attackRange;i++)
    {
        for(var j=-this.attackRange;j<=this.attackRange;j++)
        {
        	if(Math.abs(i)+Math.abs(j)<=this.attackRange)
            {
            	//if()
            }
        }
    }
}
//Contient toutes les variables relatives aux effets de cases
Heros.prototype.variableEffects = {

	"invincible": false,	//done
	"multiplicatorDgtTook": 1,	//done
	"multiplicatorDgtDealt": 1,	//done
	"canAtk": true,	//done
	"hpGain": 0,
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
				manageTiles('players',this.pos.x,this.pos.y,false);
				this.path = path;
				// this.pos.x = path[path.length-1][0];
				// this.pos.y = path[path.length-1][1];
				// this.CheckCase();
				this.isMoving = true;
				this.hasMoved = true;
				this.changeAnim('walk')
			}
		}
		this.deselected();
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
				manageTiles('players',this.pos.x,this.pos.y,true);
				this.path;
				this.changeAnim('normal');
				this.isMoving = false;
			}
		}
	}
};
Heros.prototype.changeAnim = function (name){
	this.config.animation = name;
	this.config.animFrame = 0;
	this.config.currentFrame = 0;
	//checklacase si y a bonus/malus.
};

Heros.prototype.CheckCase = function (){
	//checklacase si y a bonus/malus.
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
	this.hasAttacked = false;
	this.canBeSelected = true;
};

Heros.prototype.EndTurn = function (){
	this.hasMoved = true;
	this.hasAttacked = true;
	this.isSelected= false;
	this.canBeSelected = false;
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
			target.life -= this.damage*this.variableEffects.multiplicatorDgtDealt*target.variableEffects.multiplicatorDgtTook;
			//Insert animation prise de dégât defenseur
		}
		else
		{
			//Insert animation de block ou quoi

			if(this.variableEffects.takeDgts)
				this.life -= this.damage*this.variableEffects.multiplicatorDgtDealt;
				//Insert anim de prend chère
		}
		
		if(this.variableEffects.atkTwice)
		{
			//Insert animation d'attaque

			if(!target.variableEffects.invincible && !this.variableEffects.takeDgts)
			{	
				target.life -= this.damage*this.variableEffects.multiplicatorDgtDealt*target.variableEffects.multiplicatorDgtTook;
				//Insert animation prise de dégât defenseur
			}
			else
			{
				//Insert animation de block

				if(this.variableEffects.takeDgts)
					this.life -= this.damage*this.variableEffects.multiplicatorDgtDealt;
					//Insert anim de prend chère
			}
		}
	}
	this.hasAttacked=true;
};
Heros.prototype.pushSomeone = function(target){
	this.hasAttacked=true;
};

//Dessine le Hero
Heros.prototype.render = function(context){
	this.config.animFrame++;
	if (this.config.animFrame % Math.floor(60 / this.config.currentAnimation[this.config.animation].fps) == 0){
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
Heros.prototype.attack = function(){
};

//==========================================
//              CLASSE ARCHER              ||
//==========================================
var Archer = function(x,y,player,parent){
	this.parent = parent;
	this.name = 'Archer';
	this.width = 66;
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
		if(this.hasAttacked && this.hasMoved){
			this.EndTurn();
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
	this.hp = 12;
	this.damage = 4;
	this.magic = 2;
	this.Resist = 3;
	this.magicResist = 4;
	this.accuracy = 5;
	this.movePoint = 6;
	this.attackRange=2;

	this.loop = function(){
		if(this.hasAttacked && this.hasMoved){
			this.EndTurn();
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
	this.width = 66;
	this.height = 66;
	this.hp = 20;
	this.damage = 6;
	this.magic = 2;
	this.Resist = 6;
	this.magicResist = 5;
	this.accuracy = 4;
	this.movePoint = 3;
	this.attackRange=1;

	this.loop = function(){
		if(this.hasAttacked && this.hasMoved){
			this.EndTurn();
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
		if(this.hasAttacked && this.hasMoved){
			this.EndTurn();
		}
		if(this.isMoving){
			this.move();
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
	this.width = 66;
	this.height = 66;
	this.hp = 20;
	this.damage = 3;
	this.magic = 3;
	this.Resist = 4;
	this.magicResist = 4;
	this.accuracy = 3;
	this.movePoint = 3;
	this.attackRange=1;

	this.loop = function(){
		if(this.hasAttacked && this.hasMoved){
			this.EndTurn();
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
	this.width = 66;
	this.height = 66;
	this.hp = 10;
	this.damage = 1;
	this.magic = 5;
	this.Resist = 5;
	this.magicResist = 5;
	this.accuracy = 3;
	this.movePoint = 4;
	this.attackRange=2;

	this.loop = function(){
		if(this.hasAttacked && this.hasMoved){
			this.EndTurn();
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

