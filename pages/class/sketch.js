//inspired by https://www.youtube.com/watch?v=vqE8DMfOajk&ab_channel=TheCodingTrain
var particle;

function setup() {
	
	particle = new Particle(100,100);
	
}

function draw() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(0);
	particle.update();
	particle.show();
}