function eventInit(){
    //****Mouse****//
        //OnClick
    canvas.addEventListener("click", function(e){
        if(gameObjects[0][0].turn=true){
            gameObjects[0][0].onclick(e.clientX, e.clientY);
        }
        else{
            gameObjects[0][0].onclick();
        }
        endPathFinding(e);
        startPathFinding(e);
        resetClick(e);
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

function startPathFinding(e){
    if(!mouseVars.selectCase1)
    {
        mouseVars.selectCase1=mouse.findCase(e.clientX, e.clientY);
            console.log(matrix[mouseVars.selectCase1.x][mouseVars.selectCase1.y])
        mouseVars.selectCase1.x+=mapParams.viewX;
        mouseVars.selectCase1.y+=mapParams.viewY;
<<<<<<< HEAD
        if(map1["collisions"][mouseVars.selectCase1.y][mouseVars.selectCase1.x]==1)
        {
            mouseVars.selectCase1=0;
        }
        if(map1["players"][mouseVars.selectCase1.y][mouseVars.selectCase1.x]==2)
        {
            showRange=true;
        }
        console.log(mouseVars.selectCase1);
=======
>>>>>>> 689925b78fcc9c251abfe50cb95321cb0ad4c3c0
    }
}
function endPathFinding(e){
    if(mouseVars.selectCase1 && !mouseVars.selectCase2)
    {
        mouseVars.selectCase2=mouse.findCase(e.clientX, e.clientY);
        mouseVars.selectCase2.x+=mapParams.viewX;
        mouseVars.selectCase2.y+=mapParams.viewY;
    }
    
}
function resetClick(e){
<<<<<<< HEAD
    if(mouseVars.selectCase1 && mouseVars.selectCase2)
    {
        mouseVars.selectCase1=0;
        mouseVars.selectCase2=0;
    }
}

function showCharRange(case1){
/*    for(var i=1;i<=4;i++){
        for(var j=1;j<=4;j++){
                context.fillStyle="rgba(0,0,255,0.5)";
               context.fillRect((-4+i+(case1.x-mapParams.viewX))*mapParams.tileSize,(j%i+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
               
                context.fillStyle="rgba(0,255,0,0.1)";
                // console.log(j%i)
               context.fillRect((j%i)*mapParams.tileSize,(j%i)*mapParams.tileSize,65,65);
                
                //context.fillRect((i%j+case1.x-mapParams.viewX)*mapParams.tileSize,(-4+j+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
             //   context.fillRect((-(i%j)+case1.x-mapParams.viewX)*mapParams.tileSize,(-4+j+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
                // context.fillRect(((i%j)+case1.x-mapParams.viewX)*mapParams.tileSize,(j+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
            };
        };*/
        var checkPath;
        for(var i=-3;i<=3;i++)
        {
            for(var j=-3;j<=3;j++)
            {
                if(Math.abs(i)+Math.abs(j)<=3)
                {
                    var grid = new PF.Grid(17, 14, map1["collisions"]);
                    grid.setWalkableAt(0, 1, false);
                    var finder = new PF.AStarFinder();
                    var gridBackup = grid.clone();
                    checkPath = finder.findPath(mouseVars.selectCase1.x, mouseVars.selectCase1.y, i+case1.x,j+case1.y , grid);
                    grid = gridBackup;
                    if(checkPath.length<=4)
                    {
                     context.fillStyle="rgba(0,0,255,0.5)";
                     context.fillRect((i+(case1.x-mapParams.viewX))*mapParams.tileSize,(j+case1.y-mapParams.viewY)*mapParams.tileSize,65,65);
                    }
                }
            }
        }
}
=======
    //if(mouse.findCase(e.clientX, e.clientY).x ||)
}
>>>>>>> 689925b78fcc9c251abfe50cb95321cb0ad4c3c0
