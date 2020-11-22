var grav = 0;

function Particle(x, y, r, mass, name="", colour) {
	/**
	add collision animation
	**/
	this.name = name;
	this.x = x;
	this.y = y;
	this.r = r;

	this.mass = mass;

	this.xspeed = 6;
	this.yspeed = 5;

	this.colour = colour;

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
			this.yspeed = -this.yspeed + 3*grav;
			// this.colour = c;
		}
		if (this.y < this.r/2){ // hits top
			this.y = this.r/2;
			this.yspeed = -this.yspeed + 3*grav;
			// this.colour = c;
		}

	}

	this.show = function() {
		fill(this.colour);
		circle(this.x,this.y,this.r);
		fill(255);
		text(this.name, this.x, this.y);
	}
}