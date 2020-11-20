function Particle(x, y) {
	/**
	get better collision function
	add collision animation
	**/
	this.x = x;
	this.y = y;
	this.r = 50;

	this.xspeed = 10;
	this.yspeed = 10;

	this.colour = color(255, 0, 255);

	this.update = function() {
		this.x += this.xspeed;
		this.y += this.yspeed;
		if (this.x > width-this.r/2){
			this.x = width-this.r/2;
			this.xspeed = -this.xspeed;
			this.colour = color(Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255));
		}
		if (this.x < this.r/2){
			this.x = this.r/2;
			this.xspeed = -this.xspeed;
			this.colour = color(Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255));
		}
		if (this.y > height - this.r/2){
			this.y = height - this.r/2;
			this.yspeed = -this.yspeed;
			this.colour = color(Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255));
		}
		if (this.y < this.r/2){
			this.y = this.r/2;
			this.yspeed = -this.yspeed;
			this.colour = color(Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255),
							Math.floor(Math.random() * 255));
		}

	}

	this.show = function() {
		fill(this.colour);
		circle(this.x,this.y,this.r);
	}
}