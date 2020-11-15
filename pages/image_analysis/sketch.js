let img; // Declare variable 'img'

function setup() {
	createCanvas(720, 400);
	img = loadImage('images/lena.jpg');
}

function draw() {
	// Display image at actual size at (0,0)
	image(img,0,0)
	// Display image at (0, height/2) at half size
	image(img,0,height/2,img.width/2,img.height/2);
}