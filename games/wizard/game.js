function main()
{
	document.ontouchmove = function(e) {e.preventDefault()};
	var canvas = document.getElementById("game");
	
	var graphics = new Graphics(canvas);
	var input = new Input(canvas);
	var player = new Firemage(graphics);
	//var opponent = new Firemage(graphics);
	
	var date = new Date();
	var lastTime = date.getTime();
	var delta = 0;
	
	this.gameLoop = function()
	{
		//update
		console.log(input.touched);
		if(input.touched)
		{
			player.cast_fireBall(input.endX, input.endY);
			input.touched = false;
		}
		player.update();
	
		//Draw
		
		graphics.draw(bg, 0, 0, 0, 0, 1024, 768);
		player.draw();
		
		delta = date.getTime() - lastTime;
		lastTime = date.getTime();
		
	}
	
	
	
	var bg = graphics.loadImage("img/bg.png");
	setInterval(function(){this.gameLoop()}, (1000 / 30) - delta);//30 fps
	
}


window.onload = main();