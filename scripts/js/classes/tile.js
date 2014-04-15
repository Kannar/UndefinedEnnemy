var Tile = function(params)
{
    this.type = params.type;

    this.player = params.player;    //Quel player à déposé cette case ?

    this.pos = {x: params.xCase, y: params.yCase};

    this.onGood = params.onGoodEffect;
    this.outGood = params.outGoodEffect;

    this.onBad = params.onBadEffect;
    this.outBad = params.outBadEffect;
}

/*************
Algo des case spé:
    -au moment ou l'on arrive sur la case on execute la fonction on() qui change les stats chez l'unité et stock chez l'unité la case actuelle
    -au moment ou l'on bouge on execute la fonction out() de la tile qui met fin à l'effet sur l'unit et on vide la variable qui contenaist la tile chez l'unit
*************/