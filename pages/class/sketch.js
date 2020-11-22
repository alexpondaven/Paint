//inspired by https://www.youtube.com/watch?v=vqE8DMfOajk&ab_channel=TheCodingTrain
var particles = [];
var n = 5; // number of particles

function setup() {
	for (let i = 0;i<n;i++){
		let particle = new Particle(Math.floor(Math.random()*window.innerWidth),
									Math.floor(Math.random()*window.innerHeight),
									i);
		particles.push(particle);
	}
	
}

function draw() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	// frameRate(10);
	background(0);
	for (let i = 0;i<n;i++){
		particles[i].update();
		collide();
		particles[i].show();
	}
}
// also need to consider 2 collisions simultaneously
// implement directional collisions
function collide() { // Brute force
	// check if each radii of 2 particles touch
	for (let i=0;i<n-1;i++){
		for (let j=i+1;j<n;j++){
			var ix = particles[i].x;
			var iy = particles[i].y;
			var jx = particles[j].x;
			var jy = particles[j].y;
			var ir = particles[i].r/2;
			var jr = particles[j].r/2;
			var deltax = ix - jx;
			var deltay = iy - jy;
			var d = dist(ix, iy, jx, jy);
			var inside = d - ir - jr;
			
			// find points on each circle between centres
			var theta = atan(deltay/deltax);
			console.log(theta)
			if (ix > jx){
				var p_ix = ix - ir * cos(theta);
				var p_iy = iy - ir * sin(theta);
				var p_jx = jx + jr * cos(theta);
				var p_jy = jy + jr * sin(theta);
			} else {
				var p_ix = ix + ir * cos(theta);
				var p_iy = iy + ir * sin(theta);
				var p_jx = jx - jr * cos(theta);
				var p_jy = jy - jr * sin(theta);
			}
			
			// Draw rectangles at point on radius closest to other ball's centre
			// fill(255);
			// rect(p_ix, p_iy, 10, 10);
			// rect(p_jx, p_jy, 10, 10);

			var move_ix = -(p_ix-p_jx)/2;
			var move_jx = (p_ix-p_jx)/2;
			var move_iy = -(p_iy-p_jy)/2;
			var move_jy = (p_iy-p_jy)/2;
			if (inside <= 0){
				particles[i].x += move_ix;
				console.log(move_ix);
				particles[i].y += move_iy;
				particles[j].x += move_jx;
				particles[j].y += move_jy;

				// particles[i].xspeed *= -1;
				// particles[j].xspeed *= -1;
				// particles[i].yspeed *= -1;
				// particles[j].yspeed *= -1;
			}
		}
	}

}