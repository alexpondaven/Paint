let posX = 0;
let posY = 0;
let sliderR;
let sliderG;
let sliderB;

function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	textSize(40);
	text('Left click to draw lines and center click to draw circles', 50, 50);
	
	//Set up sliders
	sliderR = createSlider(0,255,0);
	sliderG = createSlider(0,255,0);
	sliderB = createSlider(0,255,0);
	sliderR.position(50,100);
	sliderG.position(50,150);
	sliderB.position(50,200);

}

function draw() {
	strokeWeight(5);
	// Get color from slider values
	let R = sliderR.value();
	let G = sliderG.value();
	let B = sliderB.value();
	let c = color(R, G, B);


	// Update slider text values
	
	fill(255);
	rect(30,55,200,200);
	fill(0);
	noStroke();
	textSize(30);
	text('R: '+R, 50, 92);
	text('G: '+G, 50, 142);
	text('B: '+B, 50, 192);


	// Draw if mouse input
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
			stroke(c);
			line(posX, posY, mouseX, mouseY);
		}
		if (mouseButton === CENTER) {
			fill(c);
			noStroke();
			circle(mouseX, mouseY, 80);
		}
		
	}
	
	posX = mouseX;
	posY = mouseY;
}
