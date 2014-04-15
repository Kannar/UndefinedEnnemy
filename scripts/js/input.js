/*******************************
*
*   Input souris
*
*******************************/
function Mouse(objects_data)   //objects_data -> tableau des objets à parcourir pour check les positions
{
    //Propriétés
    this.pos = {x: 0, y: 0};    //Position actuelle dans l'objet DOM

    /***************************
    *   Update
    ***************************/
    this.update = function()
    {
        
    }

    /***************************
    *   Methods
    ***************************/
    /*****Màj de la position de la souris à l'intérieur du canvas*****/
    var _offset = canvas.getBoundingClientRect();   //Décalage entre le canvas et le bord de l'écran        
    this.updatePos = function(x, y) //Update de la position de la souris, appelé dans le addEventListener(init)
    {
        this.pos.x = x - _offset.left;
        this.pos.y = y - _offset.top;
		
		var _caseX = Math.floor(this.pos.x/66);
        var _caseY = Math.floor(this.pos.y/66);
		return {x:_caseX,y:_caseY}
    }

    /****Trouvage de la case sur laquelle on appui****/
    // var _map = matrix;    //Set barbare pour le test
    this.findCase = function(x, y)
    {
        var _x = x - _offset.left;
        var _y = y - _offset.top;

        var _caseX = Math.floor(_x/66);
        var _caseY = Math.floor(_y/66);
		return {x:_caseX,y:_caseY}
        console.log("x: "+_caseX, " y: "+_caseY);
    }

    /****Trouvage du bouton sur lequel on click&execution du callback****/
    this.findButton = function(x, y)
    {
        var _x = x - _offset.left;
        var _y = y - _offset.top;

        for(var i = 0; i < buttons.length; i++)
        {
            for(var j = 0; j < buttons[i].length; j++)
            {
                if((_x < buttons[i][j].x + buttons[i][j].width)&&(_x > buttons[i][j].x)&&
                (_y < buttons[i][j].y + buttons[i][j].height)&&(_y > buttons[i][j].y))
                {
                    buttons[i][j].callback();
                }
            }
        }
    }

    /*****TMàj de la pos de la souris en px****/
    this.checkPosPx = function(x, y)
    {
        var _x = x - _offset.left;
        var _y = y - _offset.top;

        this.pos = {x: _x, y: _y};

        return this.pos;
    }
    
    /****Trouvage de l'objet sur lequel on clique****/
    var _targetsToLook = objects_data;
    this.findTarget = function(emplacement)    //emplacement -> coordonnée de la case dans le tableau, en nb de cases (ex: case.x = 2, case.y = 5)
    {
        for(var k = 0; k < map[i].length; k++)
        {
            //Insert code..
        }
    }
}

/****************TEST********************/
//Equivalent à la grille de la map
// var Lolilol = function(x, y, map)
// {
    // this.width = map[map.length-1].length;
    // this.height = map.length;
    // this.caseSize = 66;

    // this.color = "rgb(255,255,255)";

    // this.update = function()
    // {
        // for(var i = 0; i < map.length;i++)
        // {
            // for(var j = 0; j < map[i].length;j++)
            // {
                // context.fillStyle = this.color;
                // context.fillRect(j*this.caseSize, i*this.caseSize, this.caseSize-1, this.caseSize-1);
            // }
        // }
    // }
// }
// var lawl = new Lolilol(250, 300, matrix);

//Equivalent à un player

/****************************************
*   Inputs clavier:
*
*       => obj: objet contenant des key/callback
****************************************/
var Keyboard = function(obj)
{
    //Liste des touches suivi de leur callback
    this.keys = {
        //Exemple => 37 : myFunction()
    };

    //Lancé à l'init
    this.init = function()
    {
        //Création de l'event listener pour l'appuie d'une touche
        var self = this;
        document.addEventListener("keydown", function(event){self.playCallback(event);}, true);

        //Push des keys donnés à l'init s'il y en a
        this.keys = obj;
    }

    //Pour jouer le callback correspondant à une touche
    this.playCallback = function(event)
    {
        if(typeof this.keys[event.keyCode] != "undefined")
            this.keys[event.keyCode]();
    }

    //Pour ajouter une nouvelle touche à la liste
    this.addNewKey = function(params)
    {
        if(typeof this.keys[params.key] === "undefined")
            this.keys[params.key] = params.callback;
        else
            console.error("KEYBOARD_ERROR: key("+params.key+") already exist.");
    }

    //Pour modifier le callback d'un bouton à la volé
    this.modifyKey = function(params)
    {
        if(typeof this.keys[params.key] != "undefined")
            this.keys[params.key] = params.callback;
        else
            console.error("KEYBOARD_ERROR: key("+params.key+") doesn't exist.");
    }

    this.init();
}