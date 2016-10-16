function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function Graphics(canvas)
{
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	
	this.loadImage = function(path)
	{
		var img = new Image();
		img.src = path;
		return img;
	}
	
	this.draw = function(img, sx, sy, x, y, width, height)
	{
		this.context.drawImage(img, sx, sy, width, height, x, y, width, height);
	}
	
	this.drawText = function(txt,x,y)
	{
		
	}
}
