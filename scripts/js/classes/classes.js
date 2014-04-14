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

//==========================================
//              CLASSE ARCHER              ||
//==========================================
function Archer(){
	this.hp = 10;
	this.movePoint = 4;
	this.damage = 2;
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
	this.hp = 20;
	this.movePoint = 4;
	this.damage = 2;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};
//Attaque Voleur
Voleur.prototype.attack = function(){
};


//Definition de l'heritage du Voleur
Voleur.prototype = Object.create(Heros.prototype); 
Voleur.prototype.constructor = Voleur;

//==========================================
//              CLASSE GUERRIER            ||
//==========================================
function Guerrier(){
	this.hp = 30;
	this.movePoint = 4;
	this.damage = 2;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};

//Attaque Guerrier
Guerrier.prototype.attack = function(){
};

//Definition de l'heritage du Guerrier
Guerrier.prototype = Object.create(Heros.prototype); 
Guerrier.prototype.constructor = Guerrier;

//==========================================
//                CLASSE MAGE              ||
//==========================================
function Mage(){
	this.hp = 10;
	this.movePoint = 4;
	this.damage = 2;
	this.currentItem = '';
  	//Write Stuff
  	Heros.call(this);
};


//Attaque Mage
Mage.prototype.attack = function(){
};

//Definition de l'heritage du Mage
Mage.prototype = Object.create(Heros.prototype); 
Mage.prototype.constructor = Mage;