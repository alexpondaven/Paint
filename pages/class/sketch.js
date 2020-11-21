//inspired by https://www.youtube.com/watch?v=vqE8DMfOajk&ab_channel=TheCodingTrain
var particles = [];
var n = 5; // number of particles

function setup() {
	for (let i = 0;i<n;i++){
		let particle = new Particle(Math.floor(Math.random()*window.innerWidth),
									Math.floor(Math.random()*window.innerHeight));
		particles.push(particle);
	}
	
}

function draw() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(0);
	for (let i = 0;i<n;i++){
		particles[i].update();
		particles[i].show();
	}
}