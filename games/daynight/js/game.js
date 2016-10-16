function main(){
	var time = "day";
	var fadeStep = 0;
	var fadeGrad1 = [];
	var fadeGrad2 = [];
	var grad1 = "#5ba6db";
	var grad2 = "#b0cae1";
	var ground;
	var stars;
	var parallax;
	var dark;
	
	this.setup = function(){
		// Stars and Ground elements of the scene
		dark = new jaws.Sprite({x: 0, y: 0, image: "img/dark.png", alpha: 0})
		stars = new jaws.Sprite({x: 0, y: 0, image: "img/stars.png", alpha: 0})
		ground = new jaws.Sprite({x: 0, y: 0, image: "img/ground.png"});
		
		// Setting up clouds parallax effects
		this.parallax = new jaws.Parallax({repeat_x: true})
        this.parallax.addLayer({image: "img/cloud1.png", damping: 10})
        this.parallax.addLayer({image: "img/cloud2.png", damping: 16})
        this.parallax.addLayer({image: "img/cloud3.png", damping: 8})
	}
	this.update = function(){
		
		// Parallax Scrolling Update logic
		if(jaws.pressed("left"))  { this.parallax.camera_x -= 10; }
		if(jaws.pressed("right"))  { this.parallax.camera_x += 10; }
		else { this.parallax.camera_x += 20 }
		
		
		// Day/Night Cycle logic
		if(jaws.pressedWithoutRepeat('space')){ 
			if(time == "day"){ 
				// Generating gradients for switching to night
				fadeGrad1 = gradient("#5ba6db", "#5ba6db", 120);
				fadeGrad2 = gradient("#b0cae1", "#f48c06", 120);
				fadeGrad1 = fadeGrad1.concat(gradient("#5ba6db", "#04061a", 120));
				fadeGrad2 = fadeGrad2.concat(gradient("#f48c06", "#f48c06", 120));
				fadeGrad1 = fadeGrad1.concat(gradient("#04061a", "#04061a", 120));
				fadeGrad2 = fadeGrad2.concat(gradient("#f48c06", "#1e3578", 120));
				time = "night";
			}
			else{
				// Generating gradients for switching to day
				fadeGrad1 = gradient("#04061a", "#5ba6db", 360);
				fadeGrad2 = gradient("#1e3578", "#214368", 90);
				fadeGrad2 = fadeGrad2.concat(gradient("#214368", "#f48c06", 150));
				fadeGrad2 = fadeGrad2.concat(gradient("#f48c06", "#f48c06", 120));
				fadeGrad1 = fadeGrad1.concat(gradient("#5ba6db", "#5ba6db", 120));
				fadeGrad2 = fadeGrad2.concat(gradient("#f48c06", "#b0cae1", 120));
				time = "day";
			}
		}
		
		if(fadeGrad1.length > 0){
			// Set gradient for background
			if(fadeGrad1.length > fadeStep){
				grad1 = clone(fadeGrad1[fadeStep]);
				grad2 = clone(fadeGrad2[fadeStep]);
				fadeStep += 1;
			}
			else{
				fadeStep = 0;
				fadeGrad1 = [];
				fadeGrad2 = [];
				
			}
			// Fade in stars from night to day etc.
			if(time == "day" && fadeStep < 240 && fadeStep != 0){
				stars.alpha = (1-((fadeStep) * (1/240)));
				dark.alpha = (1-(fadeStep * (1/240)));
			}
			if(time == "night" && fadeStep > 200){
				stars.alpha = ((fadeStep - 200) * (1/130));
				dark.alpha = ((fadeStep - 200) * (1/130));
			}
		}
		
	}
	this.draw = function(){
		jaws.clear();
		
		// Background Gradient Drawn
		var gradient = jaws.context.createLinearGradient(0,0,1,768);
	    gradient.addColorStop(0.3, grad1);
	    gradient.addColorStop(1, grad2);
	    jaws.fill(gradient);
	   
	    //Clouds Drawn
		this.parallax.draw()
	    
		//Other Elements Drawn
		stars.draw();
	    ground.draw();
	    dark.draw();
	}
}

jaws.onload = function() {
	jaws.assets.add("img/ground.png", "img/cloud1.png", "img/cloud2.png", "img/cloud3.png", "img/stars.png", "img/dark.png", "img/torch.png");
    jaws.start(main, {fps: 30})
}