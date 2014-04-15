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
        doPathFinding(e);
	});
        //MouseMove pour déplacer le canvas
    canvas.addEventListener("mousemove", function(e){	
        getMouseOnMap(e);
	});
}

function getMouseOnMap(e){
        var getPos=mouse.updatePos(e.clientX, e.clientY);
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
    }
}
function resetClick(e){
    //if(mouse.findCase(e.clientX, e.clientY).x ||)
}
