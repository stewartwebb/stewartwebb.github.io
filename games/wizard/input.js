function Input(canvas)
{
	this.canvas = canvas;
	this.touched = false;
	this.touching = false;
	
	this.startX;
	this.startY;
	this.endX;
	this.endY;
	
	this.touchobj;
	
	this.allX = [];
	this.allY = [];
	
	this.offsetX = function(x){
		var offsetX = 0
		if(that.canvas.offsetParent)
		{
			while(that.canvas == that.canvas.offsetParent)
			{
				offsetX += that.canvas.offsetLeft;
			}
		}
		
		return x - offsetX;
	}
	
	this.offsetY = function(y){
		var offsetY = 0
		if(that.canvas.offsetParent)
		{
			while(that.canvas == that.canvas.offsetParent)
			{
				offsetY += that.canvas.offsetTop;
			}
		}
		
		return y - offsetY;
	}

	var that = this;
	this.canvas.addEventListener("touchstart", function(e)
	{	
		that.allX = [];
		that.allY = [];
		that.touching = true;
		that.touchobj = e.changedTouches[0];
		that.startX = parseInt(that.touchobj.clientX); // Save starting X
		that.startY = parseInt(that.touchobj.clientY);
		
		that.allX.push(that.offsetX(parseInt(that.touchobj.clientX))); // Add X to all X array
		that.allY.push(that.offsetY(parseInt(that.touchobj.clientY)));
		
		e.preventDefault();
	}, false);
	
	this.canvas.addEventListener("touchmove", function(e)
	{
		that.touchobj = e.changedTouches[0];
		that.endX = that.offsetX(that.touchobj.clientX);
		that.endY = that.offsetY(that.touchobj.clientY);
		
		that.allX.push(that.offsetX(parseInt(that.touchobj.clientX))); // Add X to all X array
		that.allY.push(that.offsetY(parseInt(that.touchobj.clientY)));
	}, false);
	
	this.canvas.addEventListener("touchend", function(e){that.touched = true; that.touching = false; e.preventDefault();}, false);
	
	this.canvas.addEventListener("mousedown", function(e)
	{
		that.allX = [];
		that.allY = [];
		that.touching = true;

		that.startX = that.offsetX(e.pageX);
		that.startY = that.offsetY(e.pageY);
	}, false);
	
	this.canvas.addEventListener("mousemove", function(e){
		if(that.touching){
			
			that.allX.push(that.offsetX(e.pageX));
			that.allY.push(that.offsetY(e.pageY));
		}
	}, false);
	
	this.canvas.addEventListener("mouseup", function(e)
	{
		that.touching = false;
		that.touched = true;
		
		that.endX = that.offsetX(e.pageX);
		that.endY = that.offsetY(e.pageY);
		that.allX.push(that.offsetX(e.pageX));
		that.allY.push(that.offsetY(e.pageY));
		
		for(var i = 0; i < that.allX.length; i++){
			console.log(that.allX[i]);
		}

	}, false);
	
}



