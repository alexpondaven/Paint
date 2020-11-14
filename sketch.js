var posX = 0;
var posY = 0;

function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	textSize(40);
	text('Left click to draw lines and Right click to draw circles', 50, 50);
	
}

function draw() {
	strokeWeight(5);
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
			line(posX, posY, mouseX, mouseY);
		}
		if (mouseButton === RIGHT) {
			circle(mouseX, mouseY, 80, 80);
		}
		
	}
	
	posX = mouseX;
	posY = mouseY;
}
