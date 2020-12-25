//inspired by https://www.youtube.com/watch?v=vqE8DMfOajk&ab_channel=TheCodingTrain

// elastic collisions

var particles = [];
var n = 5; // number of particles

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
		// stroke(255);
		// line(particles[i].x, particles[i].y,
		// 	(particles[i].x + 15*particles[i].xspeed), 
		// 	(particles[i].y + 15*particles[i].yspeed));
		// console.log(particles[i].xspeed);
		// stroke(0);
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
				// prevent particle clipping (going into each other)
				particles[i].x += move_ix;
				particles[i].y += move_iy;
				particles[j].x += move_jx;
				particles[j].y += move_jy;

				// compute output velocities
				//angles
				var alpha1 = atan2(jy-iy,jx-ix);
				var beta1 = atan2(iys,ixs);
				var gamma1 = beta1-alpha1;
				var alpha2 = atan2(iy-jy,ix-jx);
				var beta2 = atan2(jys,jxs);
				var gamma2 = beta2-alpha2;

				// norm of initial vectors
				u_12 = dist(0,0,ixs,iys) * cos(gamma1);
				u_11 = dist(0,0,ixs,iys) * sin(gamma1);
				u_21 = dist(0,0,jxs,jys) * cos(gamma2);
				u_22 = dist(0,0,jxs,jys) * sin(gamma2);

				// norm of out vectors
				v_12 = (u_12 * (im - jm) - (2 * jm * u_21)) / (im + jm);
				v_21 = (u_21 * (im - jm) + (2 * jm * u_12)) / (im + jm);

				// find v1 and v2
				particles[i].xspeed = u_11 * (-sin(alpha1)) + v_12 * cos(alpha1) /1.05;
				particles[i].yspeed = u_11 * cos(alpha1) + v_12 * sin(alpha1) /1.05;
				particles[j].xspeed = u_22 * (-sin(alpha2)) - v_21 * cos(alpha2) /1.05;
				particles[j].yspeed = u_22 * cos(alpha2) - v_21 * sin(alpha2) /1.05;

				// velocity equations (assuming point masses)
				// particles[i].xspeed = (ixs * (im - jm) + (2 * jm * jxs)) / (im + jm);
				// particles[i].yspeed = (iys * (im - jm) + (2 * jm * jys)) / (im + jm);
				// particles[j].xspeed = (jxs * (jm - im) + (2 * im * ixs)) / (im + jm);
				// particles[j].yspeed = (jys * (jm - im) + (2 * im * iys)) / (im + jm);

			}
		}
	}

}