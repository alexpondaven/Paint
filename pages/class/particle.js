var grav = 1;

function Particle(x, y) {
	/**
	get better collision function
	add collision animation
	**/
	this.x = x;
	this.y = y;
	this.r = 50;

	this.xspeed = 6;
	this.yspeed = 0;

	this.colour = color(255, 0, 255);

	this.update = function() {
		// let c = color(Math.floor(Math.random() * 255),
		// 					Math.floor(Math.random() * 255),
		// 					Math.floor(Math.random() * 255));
		this.x += this.xspeed;
		this.y += this.yspeed;
		this.yspeed += grav;
		if (this.x > width-this.r/2){ // Hits right wall
			this.x = width-this.r/2;
			this.xspeed = -this.xspeed;
			// this.colour = c;
		}
		if (this.x < this.r/2){ // Hits left wall
			this.x = this.r/2;
			this.xspeed = -this.xspeed;
			// this.colour = c;
		}
		if (this.y > height - this.r/2){ // Hits bottom
			this.y = height - this.r/2;
			this.yspeed = -this.yspeed + 5;
			// this.colour = c;
		}
		if (this.y < this.r/2){ // hits top
			this.y = this.r/2;
			this.yspeed = -this.yspeed/2 + 5;
			// this.colour = c;
		}

	}

	this.show = function() {
		fill(this.colour);
		circle(this.x,this.y,this.r);
	}
}