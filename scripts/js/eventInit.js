function eventInit()
{
    //****Mouse****//
        //OnClick
    canvas.addEventListener("click", function(e){
		var case1=mouse.findCase(e.clientX,e.clientY);
		console.log(case1);
	});
        //MouseMove
    canvas.addEventListener("mousemove", function(e){	
    	var getPos=mouse.updatePos(e.clientX, e.clientY);
    	posX=getPos.x;
    	posY=getPos.y;
	});
}
