//====================================================================
//   CLASSE HEROS MERE DES HERO (ici toutes les fonctions communes)  ||
//====================================================================
function Heros(x,y,image){
	this.pos = {x : x, y : y};
	this.image = image;
	this.status = '';
	this.isSelected = false;
	// var get = httpGetData("scripts/js/json/animConfig.json");
	// this.configImage = get[this.name];
	//Write Stuff here
};
Heros.prototype.constructor = Heros;

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
	//si l'on se trouve de base sur une case spéciale on retire l'effet de la dite case
	//en fonction du nombre de case de déplacement du player (movePoint)
	//une fois sur la case, on regarde s'il s'agit d'une case spéciale et si oui alors on applique l'effet
};

//Hero is selected
Heros.prototype.selected = function (){
	this.isSelected = true;
};
//Hero is deselection
Heros.prototype.deselected = function (){
	this.isSelected = false;
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
};

//Dessine le Hero
Heros.prototype.render = function(context){
	this.animFrame++;
	if (this.animFrame % Math.floor(60 / this.currentAnimation[this.animation].fps) == 0){
		this.currentFrame++;
		if (this.currentFrame == this.currentAnimation[this.animation].nbFrame){
			this.currentFrame = 0;
		}
	}

	context.drawImage(this.image,
		this.currentFrame * this.frameWidth, 
		this.currentAnimation[this.animation].nbRow * this.frameHeight,
		this.frameWidth, this.frameHeight,
		this.pos.x*mapParams.tileSize, this.pos.y*mapParams.tileSize, this.frameWidth, this.frameHeight);
};

//Attaque Hero
Heros.prototype.attack = function(){
};

//==========================================
//              CLASSE ARCHER              ||
//==========================================
function Archer(x,y,image){
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
  	//Write Stuff
  	Heros.call(this,x,y,image);
};


//loop Archer
Archer.prototype.loop = function(context){

	// -- Draw -- \\
	this.render(context);
};

//Definition de l'heritage du Archer
Archer.prototype = Object.create(Heros.prototype); 
Archer.prototype.constructor = Archer;

//==========================================
//               CLASSE VOLEUR             ||
//==========================================
function Voleur(x,y,image){
	this.name = 'Voleur';
	this.width = 66;
	this.height = 66;
	this.hp = 12;
	this.damage = 4;
	this.magic = 2;
	this.Resist = 3;
	this.magicResist = 4;
	this.accuracy = 5;
	this.movePoint = 6;
  	//Write Stuff
  	Heros.call(this,x,y,image);
};
//loop Voleur
Voleur.prototype.loop = function(context){

	// -- Draw -- \\
	this.render(context);
};

//Definition de l'heritage du Voleur
Voleur.prototype = Object.create(Heros.prototype); 
Voleur.prototype.constructor = Voleur;

//==========================================
//              CLASSE GUERRIER            ||
//==========================================
function Guerrier(x,y,image){
	this.name = 'Guerrier';
	this.width = 66;
	this.height = 66;
	this.hp = 20;
	this.damage = 6;
	this.magic = 2;
	this.Resist = 6;
	this.magicResist = 5;
	this.accuracy = 4;
	this.movePoint = 3;
  	//Write Stuff
  	Heros.call(this,x,y,image);
};

//loop Guerrier
Guerrier.prototype.loop = function(context){

	// -- Draw -- \\
	this.render(context);
};

//Definition de l'heritage du Guerrier
Guerrier.prototype = Object.create(Heros.prototype); 
Guerrier.prototype.constructor = Guerrier;

//==========================================
//                CLASSE MAGE              ||
//==========================================
function Mage(x,y,image){
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
  	//Write Stuff
  	Heros.call(this,x,y,image);
};


//loop Mage
Mage.prototype.loop = function(context){

	// -- Draw -- \\
	this.render(context);
};

//Definition de l'heritage du Mage
Mage.prototype = Object.create(Heros.prototype); 
Mage.prototype.constructor = Mage;

//==========================================
//              CLASSE OVNI               ||
//==========================================
function Ovni(x,y,image){
	this.name = 'Ovni';
	this.width = 66;
	this.height = 66;
	this.hp = 20;
	this.damage = 3;
	this.magic = 3;
	this.Resist = 4;
	this.magicResist = 4;
	this.accuracy = 3;
	this.movePoint = 8;
  	//Write Stuff
  	Heros.call(this,x,y,image);
};

//loop Ovni
Ovni.prototype.loop = function(context){

	// -- Draw -- \\
	this.render(context);
};

//Definition de l'heritage du Ovni
Ovni.prototype = Object.create(Heros.prototype); 
Ovni.prototype.constructor = Ovni;

//==========================================
//              CLASSE PRETRE                ||
//==========================================
function Pretre(x,y,image){
	this.name = 'Pretre';
	this.width = 66;
	this.height = 66;
	this.hp = 10;
	this.damage = 1;
	this.magic = 5;
	this.Resist = 5;
	this.magicResist = 5;
	this.accuracy = 3;
	this.movePoint = 4;
  	//Write Stuff
  	Heros.call(this,x,y,image);
};

//loop Pretre
Pretre.prototype.loop = function(context){

	// -- Draw -- \\
	this.render(context);
};

//Definition de l'heritage du Pretre
Pretre.prototype = Object.create(Heros.prototype); 
Pretre.prototype.constructor = Pretre;

