var Tile = function(params)
{
    this.type = params.type;

    this.player = params.player;    //Quel player à déposé cette case ? (string)

    this.beginPos = {x: params.x, y: params.y}; //En case

    this.pos = {x: params.x, y: params.y};  //En case

    this.onGood = this.type.onGoodEffect;
    this.outGood = this.type.offGoodEffect;

    this.onBad = this.type.onBadEffect;
    this.outBad = this.type.offBadEffect;

    this.render = function()
    {
        context.fillStyle = "rgb(25, 250, 25)";
        context.fillRect(this.pos.x*66, this.pos.y*66, 65, 65);
    }

    this.update = function()
    {
        //Màj de la position pour le scroll
        this.pos.x = this.beginPos.x - mapParams.viewX;
        this.pos.y = this.beginPos.y - mapParams.viewY;

        // this.render();
    }
}

/*************
Algo des case spé:
    -au moment ou l'on arrive sur la case on execute la fonction on() qui change les stats chez l'unité et stock chez l'unité la case actuelle
    -au moment ou l'on bouge on execute la fonction off() de la tile qui met fin à l'effet sur l'unit et on vide la variable qui contenaist la tile chez l'unit
*************/