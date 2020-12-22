//inspired by https://www.youtube.com/watch?v=vqE8DMfOajk&ab_channel=TheCodingTrain
var particles = [];
var n = 10; // number of particles

function setup() {
	for (let i = 0;i<n;i++){
		let size = random(255);
		let particle = new Particle(random(window.innerWidth), // x
									random(window.innerHeight), // y
									size, // radius
									size*100, // mass
									i, // name
									color(random(255),random(255),random(255))); // colour
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
	}
	collide();
	for (let i = 0;i<n;i++){
		particles[i].show();

		// show velocity vector
		stroke(255);
		line(particles[i].x, particles[i].y,
			(particles[i].x + 15*particles[i].xspeed), 
			(particles[i].y + 15*particles[i].yspeed));
		console.log(particles[i].xspeed);
		stroke(0);
	}


}
// also need to consider 2 collisions simultaneously
// implement directional collisions
function collide() { // Brute force
	// check if each radii of 2 particles touch
	for (let i=0;i<n-1;i++){
		for (let j=i+1;j<n;j++){
			// Gather values
			var ix = particles[i].x;
			var iy = particles[i].y;
			var jx = particles[j].x;
			var jy = particles[j].y;
			var ir = particles[i].r/2;
			var jr = particles[j].r/2;
			var im = particles[i].mass;
			var jm = particles[j].mass;

			var ixs = particles[i].xspeed;
			var iys = particles[i].yspeed;
			var jxs = particles[j].xspeed;
			var jys = particles[j].yspeed;

			var deltax = ix - jx;
			var deltay = iy - jy;
			var d = dist(ix, iy, jx, jy);
			var inside = d - ir - jr;
			
			// find points on each circle between centres
			var theta = atan(deltay/deltax);
			// console.log(theta * 180/PI)
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

			p_x = ((ix * jr) + (jx * ir)) / (ir + jr);
			p_y = ((iy * jr) + (jy * ir)) / (ir + jr);

			
			// Draw rectangles at point on radius closest to other ball's centre
			// circle(p_x, p_y, 10, 10);
			// circle(p_ix, p_iy, 10, 10);
			// circle(p_jx, p_jy, 10, 10);

			// Make sure particles stay at border (do not intersect)
			var move_ix = -(p_ix-p_jx)/2;
			var move_jx = (p_ix-p_jx)/2;
			var move_iy = -(p_iy-p_jy)/2;
			var move_jy = (p_iy-p_jy)/2;

			if (inside < 0){
				particles[i].x += move_ix;
				// console.log(move_ix);
				particles[i].y += move_iy;
				particles[j].x += move_jx;
				particles[j].y += move_jy;


				particles[i].xspeed = (ixs * (im - jm) + (2 * jm * jxs)) / (im + jm);
				particles[i].yspeed = (iys * (im - jm) + (2 * jm * jys)) / (im + jm);
				particles[j].xspeed = (jxs * (jm - im) + (2 * im * ixs)) / (im + jm);
				particles[j].yspeed = (jys * (jm - im) + (2 * im * iys)) / (im + jm);

			}
		}
	}

}