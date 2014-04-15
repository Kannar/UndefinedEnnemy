function eventInit(){
    //****Mouse****//
        //OnClick
    canvas.addEventListener("click", function(e){
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
        if(mouseVars.selectCase1)
         drawPath();
}

function doPathFinding(e){
    if(!mouseVars.selectCase1)
    {
        mouseVars.selectCase1=mouse.findCase(e.clientX, e.clientY);
        mouseVars.selectCase1.x+=mapParams.viewX;
        mouseVars.selectCase1.y+=mapParams.viewY;
        console.log(mouseVars.selectCase1);
    }
}
function endPathFinding(e){
    if(mouseVars.selectCase1 && !mouseVars.selectCase2)
    {
        mouseVars.selectCase2=mouse.findCase(e.clientX, e.clientY);
        mouseVars.selectCase2.x+=mapParams.viewX;
        mouseVars.selectCase2.y+=mapParams.viewY;
        console.log(mouseVars.selectCase2);
    }
}
function resetClick(e){
    //if(mouse.findCase(e.clientX, e.clientY).x ||)
}