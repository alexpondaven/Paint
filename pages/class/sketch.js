//inspired by https://www.youtube.com/watch?v=vqE8DMfOajk&ab_channel=TheCodingTrain
var particles = [];
var n = 2; // number of particles

function setup() {
	for (let i = 0;i<n;i++){
		let size = 200;
		let particle = new Particle(random(window.innerWidth), // x
									random(window.innerHeight), // y
									size, // radius
									size, // mass
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
			fill(255);
			rect(p_ix, p_iy, 10, 10);
			rect(p_jx, p_jy, 10, 10);

			// Make sure particles stay at border (do not intersect)
			var move_ix = -(p_ix-p_jx)/2;
			var move_jx = (p_ix-p_jx)/2;
			var move_iy = -(p_iy-p_jy)/2;
			var move_jy = (p_iy-p_jy)/2;

			if (inside <= 0){
				particles[i].x += move_ix;
				// console.log(move_ix);
				particles[i].y += move_iy;
				particles[j].x += move_jx;
				particles[j].y += move_jy;

				if (ix>jx){
					var ivtheta = atan(ixs/iys) - PI/2 + 2*theta;
					var jvtheta = atan(jxs/jys) - PI/2 + 2*theta;
				} else {
					var ivtheta = atan(ixs/iys) - PI/2 + 2*theta;
					var jvtheta = atan(jxs/jys) - PI/2 + 2*theta;
				}
				
				particles[i].xspeed = ixs*cos(ivtheta);
				particles[i].yspeed = iys*sin(ivtheta);
				
				
				
				particles[j].xspeed = jxs*cos(jvtheta);
				particles[j].yspeed = jys*sin(jvtheta);
				//Conserving momentum
				// particles[i].xspeed = (((im-jm)/(im+jm))*ixs+(2*jm/(im+jm))*jxs)*cos(2*theta);
				// particles[i].yspeed = (((im-jm)/(im+jm))*iys+(2*jm/(im+jm))*jys)*sin(2*theta);

				// particles[j].xspeed = -((2*im/(im+jm))*ixs + ((im-jm)/(im+jm))*jxs)*cos(2*theta);
				// particles[j].yspeed = ((2*im/(im+jm))*iys + ((im-jm)/(im+jm))*jys)*sin(2*theta);
			}
			stroke(0);
			strokeWeight(5);
			line(ix, iy, 5*(ix+particles[i].xspeed), 5*(iy+particles[i].yspeed));
			strokeWeight(1);
		}
	}

}