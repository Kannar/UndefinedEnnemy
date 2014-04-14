//====================================================================
//   CLASSE HEROS MERE DES HERO (ici toutes les fonctions communes) ||
//====================================================================
function Heros(){
	this.isSelected =false;
	//Write Stuff here
};
Heros.prototype.constructor = Heros;


//Move le Hero
Heros.prototype.move = function (){
	//en fonction du nombre de case de déplacement du player (movePoint)	
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

//Dessine le Hero
Heros.prototype.render = function(){
};

//Attaque Hero
Heros.prototype.attack = function(){
};


//==========================================
//              CLASSE ARCHER              ||
//==========================================
function Archer(){
	this.hp = 13;
	this.movePoint = 4;
	this.damage = 5;
	this.magic = 1;
	this.resist = 3;
	this.magicResist = 5;
	this.accuracy = 7;
	this.speed = 5;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};


//Attaque Archer
Archer.prototype.attack = function(){
};

//Definition de l'heritage du Archer
Archer.prototype = Object.create(Heros.prototype); 
Archer.prototype.constructor = Archer;

//==========================================
//               CLASSE VOLEUR             ||
//==========================================
function Voleur(){
	this.hp = 12;
	this.movePoint = 6;
	this.damage = 4;
	this.magic = 2;
	this.resist = 3;
	this.magicResist = 4;
	this.accuracy = 5;
	this.speed = 7;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};
//Compe Initiative  Voleur
Voleur.prototype.initiative = function(){
};
//Compe Double Guerrier
Voleur.prototype.double = function(){
};
//Compe Pas Rapide Guerrier
Voleur.prototype.boost = function(){
};


//Definition de l'heritage du Voleur
Voleur.prototype = Object.create(Heros.prototype); 
Voleur.prototype.constructor = Voleur;

//==========================================
//              CLASSE GUERRIER            ||
//==========================================
function Guerrier(){
	this.hp = 20;
	this.movePoint = 4;
	this.damage = 6;
	this.magic = 0;
	this.resist = 6;
	this.magicResist = 5;
	this.accuracy = 4;
	this.speed = 3;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};

//Compe Contre Guerrier
Guerrier.prototype.block = function(){
};
//Compe Snare Guerrier
Guerrier.prototype.snare = function(){
};
//Compe Bousculade Guerrier
Guerrier.prototype.bump = function(){
};

//Definition de l'heritage du Guerrier
Guerrier.prototype = Object.create(Heros.prototype); 
Guerrier.prototype.constructor = Guerrier;

//==========================================
//                CLASSE MAGE              ||
//==========================================
function Mage(){
	this.hp = 13;
	this.movePoint = 4;
	this.damage = 2;
	this.resist = 3
	this.magic = 6;
	this.magicResist = 6;
	this.accuracy = 5;
	this.speed = 2;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};

//Compe Brulure Mage
Mage.prototype.burn = function(){
};
//Compe Etourdissement Mage
Mage.prototype.stun = function(){
};

//Definition de l'heritage du Mage
Mage.prototype = Object.create(Heros.prototype); 
Mage.prototype.constructor = Mage;

//==========================================
//              CLASSE PRETRE            ||
//==========================================
function Pretre(){
	this.hp = 10;
	this.movePoint = 4;
	this.damage = 1;
	this.magic = 5;
	this.magicResist = 5;
	this.accuracy = 3;
	this.speed = 3;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};

//Compe Soin Pretre
Pretre.prototype.heal = function(){
};
//Compe Buff Pretre
Pretre.prototype.buff = function(){
};

//Definition de l'heritage du Pretre
Pretre.prototype = Object.create(Heros.prototype); 
Pretre.prototype.constructor = Pretre;

//==========================================
//              CLASSE OVNI            ||
//==========================================
function Ovni(){
	this.hp = 20;
	this.movePoint = 8;
	this.damage = 3;
	this.magic = 3;
	this.rest = 4;
	this.magicResist = 4;
	this.accuracy = 3;
	this.speed = 4;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};

//Compe Compe Ovni
Ovni.prototype.competence = function(){
};

//Definition de l'heritage du Ovni
Ovni.prototype = Object.create(Heros.prototype); 
Ovni.prototype.constructor = Ovni;