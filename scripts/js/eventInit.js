function eventInit(){
    //****Mouse****//
        //OnClick
    canvas.addEventListener("click", function(e){
        if(state === "SET_TILES")
        {
            var _pos = mouse.findCase(e.clientX, e.clientY);

            console.log(_pos);

            if(currentTileType != undefined)
            {
                //Posage de la case
                currentTileType = undefined;    //On RAZ la selection
            }
        }
        else if(state === "IN_GAME")
        {
            if(gameObjects[0][0].turn){
                gameObjects[0][0].onclick(e.clientX, e.clientY);
            }
            else{
                gameObjects[1][0].onclick(e.clientX, e.clientY);
            }
            endPathFinding(e);
            doPathFinding(e);            
        }
	});
        //MouseMove pour déplacer le canvas
    canvas.addEventListener("mousemove", function(e){
        getMouseOnMap(e);
	});
}

function getMouseOnMap(e){
        var getPos=findCaseWithCamera(e.clientX, e.clientY);
        mouseVars.mapPosX=getPos.x;
        mouseVars.mapPosY=getPos.y;
}

function doPathFinding(e){
    if(!mouseVars.selectCase1)
    {
        mouseVars.selectCase1=mouse.findCase(e.clientX, e.clientY);
        mouseVars.selectCase1.x+=mapParams.viewX;
        mouseVars.selectCase1.y+=mapParams.viewY;
    }
}
function endPathFinding(e){
    if(mouseVars.selectCase1 && !mouseVars.selectCase2)
    {
        mouseVars.selectCase2=mouse.findCase(e.clientX, e.clientY);
        mouseVars.selectCase2.x+=mapParams.viewX;
        mouseVars.selectCase2.y+=mapParams.viewY;
        showRange=false;
    }
}
function resetClick(e){
    //if(mouse.findCase(e.clientX, e.clientY).x ||)
}
function showCharRange(case1,range){
    var checkPath;
    for(var i=-range;i<=range;i++)
    {
        for(var j=-range;j<=range;j++)
        {
            if(Math.abs(i)+Math.abs(j)<=range)
            {
                if(j+case1.y>=0 && j+case1.y<mapParams.nbCaseMapY)
                {
                   // console.log(i+case1.x,j+case1.y)
                    var grid = new PF.Grid(mapParams.nbCaseMapY, mapParams.nbCaseMapX, map1["collisions"]);
                    grid.setWalkableAt(0, 1, false);
                    var finder = new PF.AStarFinder();
                    var gridBackup = grid.clone();
                    checkPath = finder.findPath(case1.x, case1.y, i+case1.x,j+case1.y , grid);
                    grid = gridBackup;
                    if(checkPath.length<=range+1 && map1["collisions"][j+case1.y][i+case1.x]!=1)
                    {
                     context.fillStyle="rgba(0,0,255,0.5)";
                     context.fillRect((i+(case1.x-mapParams.viewX))*mapParams.tileSize,(j+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                }
            
            }
        }
    }
}