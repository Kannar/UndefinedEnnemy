function eventInit(){
    //****Mouse****//
        //OnClick
    canvas.addEventListener("click", function(e){
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

    }
}

function resetClick(e){
    //if(mouse.findCase(e.clientX, e.clientY).x ||)
}