function gamer(x, y, image, vx, vy){
	this.sprite = new jaws.Sprite({x: x, y: y, image: image, anchor: "bottom_left"})
	this.vx = vx
	this.vy = vy
	
	this.move = function(){
		this.vy += 0.4
		this.sprite.x += this.vx
		this.sprite.y += this.vy
		if(this.sprite.y >= 551){
			this.sprite.y = 550
			this.vy = 0
		}
	}
}

function game(){
	var viewport
	var parallax
	var player
	var bg
	
	this.setup = function(){
		viewport = new jaws.Viewport({max_x: 10000, max_y: 600})
		player = new gamer(50, 200, "img/annie.png", 0, 0)
		bg = new jaws.Sprite({x: 0, y: 600, image: "img/street.png", anchor: "bottom_left"})
		
		this.parallax = new jaws.Parallax({repeat_x: true})
        this.parallax.addLayer({image: "img/bg1.png", damping: 100})
        this.parallax.addLayer({image: "img/bg2.png", damping: 16})
        this.parallax.addLayer({image: "img/bg3.png", damping: 8})
        this.parallax.addLayer({image: "img/bg4.png", damping: 4})
        this.parallax.addLayer({image: "img/bg5.png", damping: 2})
		
	}
	this.update = function(){
			if(jaws.pressed("left"))  { this.parallax.camera_x -= 3; player.sprite.x -= 4; }
			if(jaws.pressed("right")) { this.parallax.camera_x += 3; player.sprite.x += 4; }
			else { this.parallax.camera_x += 2 }
			if(jaws.pressedWithoutRepeat("space")) { player.vy -= 10 }
			document.getElementById("text").innerHTML = jaws.game_loop.fps
			player.move()
			viewport.centerAround(player.sprite)
	}
	this.draw = function(){
		jaws.clear();
			this.parallax.draw()
			viewport.apply( function() {
				bg.draw()
				player.sprite.draw()
			});
	}
}

function intro(){
	var logo
	var bg = document.getElementById("game")

	this.setup = function(){
		logo = new jaws.Sprite({x: 214, y: 100, image: "img/logo.png"})
		bg = new jaws.Sprite({x: 0, y: 0, color: "0,0,0,0.5", width: 1080, height: 600})
	}
	this.update = function(){
		if(jaws.pressed("space")){ jaws.switchGameState(game, {fps: 60}) }
	}
	this.draw = function(){
		jaws.clear();
		bg.draw();
		logo.draw();
	}
}

jaws.onload = function() {
      jaws.assets.add("img/annie.png", "img/logo.png", "img/bg1.png", "img/bg2.png", "img/bg3.png", "img/bg4.png", "img/bg5.png", "img/street.png")
      jaws.start(intro, {fps: 60})
}