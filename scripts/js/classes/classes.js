//====================================================================
//   CLASSE HEROS MERE DES HERO (ici toutes les fonctions communes) ||
//====================================================================
function Heros(){

	//Write Stuff here
};
Heros.prototype.constructor = Heros;


//Move le Hero
Heros.prototype.move = function (){
}

//Dessine le Hero
Heros.prototype.render = function(){
}

//==========================================
//              CLASSE ARCHER              ||
//==========================================
function Archer(){

  //Write Stuff
  Heros.call(this);
}

//Attaque Archer
Archer.prototype.attack = function(){
}

//Definition de l'heritage du Archer
Archer.prototype = Object.create(Heros.prototype); 
Archer.prototype.constructor = Archer;

//==========================================
//               CLASSE VOLEUR             ||
//==========================================
function Voleur(){

  //Write Stuff
  Heros.call(this);
}

//Attaque Voleur
Voleur.prototype.attack = function(){
}


//Definition de l'heritage du Voleur
Voleur.prototype = Object.create(Heros.prototype); 
Voleur.prototype.constructor = Voleur;

//==========================================
//              CLASSE GUERRIER            ||
//==========================================
function Guerrier(){

  //Write Stuff
  Heros.call(this);
}

//Attaque Guerrier
Guerrier.prototype.attack = function(){
}

//Definition de l'heritage du Guerrier
Guerrier.prototype = Object.create(Heros.prototype); 
Guerrier.prototype.constructor = Guerrier;

//==========================================
//                CLASSE MAGE              ||
//==========================================
function Mage(){

  //Write Stuff
  Heros.call(this);
}

//Attaque Mage
Mage.prototype.attack = function(){
}

//Definition de l'heritage du Mage
Mage.prototype = Object.create(Heros.prototype); 
Mage.prototype.constructor = Mage;