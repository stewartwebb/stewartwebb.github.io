var running = true;
var canvas = document.getElementById("game");
var input = new Input(canvas);

canvas.addEventListener("touchstart", input.touchStart, false);
canvas.addEventListener("touchend", input.touchEnd, false);
canvas.addEventListener("mousedown", input.clickStart, false);
canvas.addEventListener("mouseup", input.clickEnd, false);