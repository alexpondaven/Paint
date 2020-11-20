function Particle(x, y) {
	this.x = x;
	this.y = y;

	this.xspeed = 10;
	this.yspeed = 10;

	this.update = function() {
		this.x += this.xspeed;
		this.y += this.yspeed;
		if (this.x > width){
			this.x = width;
			this.xspeed = -this.xspeed;
		}
		if (this.x < 0){
			this.x = 0;
			this.xspeed = -this.xspeed;
		}
		if (this.y > height){
			this.y = height;
			this.yspeed = -this.yspeed;
		}
		if (this.y < 0){
			this.y = 0;
			this.yspeed = -this.yspeed;
		}

	}

	this.show = function() {
		fill(255);
		circle(this.x,this.y,10);
	}
}