//====================================================================
//   CLASSE HEROS MERE DES HERO (ici toutes les fonctions communes) ||
//====================================================================
function Heros(){
<<<<<<< HEAD
	this.isSelected =false;
=======

>>>>>>> e81c6bf0ec51584e04810b1742dc0cb2ec862409
	//Write Stuff here
};
Heros.prototype.constructor = Heros;


//Move le Hero
Heros.prototype.move = function (){	
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
};

//Dessine le Hero
Heros.prototype.render = function(){
};

//==========================================
//              CLASSE ARCHER              ||
//==========================================
function Archer(){
<<<<<<< HEAD
	this.hp = 10;
	this.movePoint = 4;
	this.damage = 2;
  	//Write Stuff
  	Heros.call(this);
};
=======

  //Write Stuff
  Heros.call(this);
}
>>>>>>> e81c6bf0ec51584e04810b1742dc0cb2ec862409

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
<<<<<<< HEAD
	this.hp = 20;
	this.movePoint = 4;
	this.damage = 2;
  	//Write Stuff
  	Heros.call(this);
};
=======

  //Write Stuff
  Heros.call(this);
}
>>>>>>> e81c6bf0ec51584e04810b1742dc0cb2ec862409

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
<<<<<<< HEAD
	this.hp = 30;
	this.movePoint = 4;
	this.damage = 2;
  	//Write Stuff
  	Heros.call(this);
};
=======

  //Write Stuff
  Heros.call(this);
}
>>>>>>> e81c6bf0ec51584e04810b1742dc0cb2ec862409

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
<<<<<<< HEAD
	this.hp = 10;
	this.movePoint = 4;
	this.damage = 2;
  	//Write Stuff
  	Heros.call(this);
};
=======

  //Write Stuff
  Heros.call(this);
}
>>>>>>> e81c6bf0ec51584e04810b1742dc0cb2ec862409

//Attaque Mage
Mage.prototype.attack = function(){
};

//Definition de l'heritage du Mage
Mage.prototype = Object.create(Heros.prototype); 
Mage.prototype.constructor = Mage;