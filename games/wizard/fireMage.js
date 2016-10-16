function Firemage(g)
{
	this.sprite = new Sprite(g, "img/firemage.png", [2], 200, 400);
	this.fireball = new Sprite(g, "img/fire_ball.png", [0], 20, 20);
	this.fireball_vis = false;
	
	this.cast_fireBall = function(x, y)
	{
		this.fireball_vis = true;
		this.fireball.x = this.sprite.x + 50;
		this.fireball.y = this.sprite.y + 50;
	
		this.fireball.vx = 10 * ((x - this.fireball.x) / Math.pow(Math.pow(x - this.fireball.x, 2) + Math.pow(y - this.fireball.y, 2), 0.5));
		this.fireball.vy = 10 * ((y - this.fireball.y) / Math.pow(Math.pow(x - this.fireball.x, 2) + Math.pow(y - this.fireball.y, 2), 0.5));
	}
	
	this.update = function()
	{
		this.sprite.update();
		this.fireball.update();
	}
	
	this.draw = function()
	{
		this.sprite.draw();
		if(this.fireball_vis)
		{
			this.fireball.draw();
		}
	}
}