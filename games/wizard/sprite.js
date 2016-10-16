function Sprite(graphics, spritesheet, frames, width, height)
{
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.width = width;
	this.height = height;
	this.g = graphics;
	this.ss = this.g.loadImage(spritesheet);
	
	this.currentAnimation = 0;
	this.currentFrame = 0;
	this.frames = frames;
	this.counter = 0;
	
}

Sprite.prototype.update = function()
{
	this.x += this.vx;
	this.y += this.vy;
	
	this.counter++;
	if(this.counter > 20)
	{
		this.currentFrame++
		this.counter =0;
	}
	
	if(this.currentFrame > this.frames[this.currentAnimation])
	{
		this.currentFrame = 0;
	}
	
}

Sprite.prototype.draw = function()
{
	this.g.draw(this.ss, this.currentFrame * this.width, this.currentAnimation * this.height, this.x, this.y, this.width, this.height);
}

Sprite.prototype.walk = function(vx, vy)
{
	this.vx = vx;
	this.vy = vy;
}

Sprite.prototype.cast = function()
{
}
