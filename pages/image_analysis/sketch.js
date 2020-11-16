let img; // Declare variable 'img'

function setup() {
	createCanvas(720, 400);
	img = loadImage('https://raw.githubusercontent.com/alexpondaven/jsprojects/master/pages/image_analysis/images/lena.jpg');
}

function draw() {
	// Display image at actual size at (0,0)
	image(img,0,0)
	// Display image at (0, height/2) at half size
	image(img,0,height/2,img.width,img.height/2);
}