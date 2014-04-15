/***********************************
*   Load des images
***********************************/
function loadImages(imagesTable)
{
    var _images = {};
    var _imagesLoaded = 0;
    var _nbImages = 0;
    // var _nbCurrentProg = 0;

    //On compte le total d'images
    for(var src in imagesTable)
    {
        _nbImages = _nbImages + 1;
    }

    //On les charge
    for(var src in imagesTable)
    {
        _images[src] = new Image(); //On crée l'objet image
        _images[src].src = imagesTable[src];    //On lui donne une source

        _images[src].onload = function(){   //Une fois chargé 
            _imagesLoaded = _imagesLoaded + 1;  //On dit qu'on l'a chargé
            if(_imagesLoaded>=_nbImages){
                startGame();
                state = 'IN_GAME';
            }
        };

    }

    return _images;
}