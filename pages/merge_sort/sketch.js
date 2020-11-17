let array = [10,40,50,20,80];

function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
}

function draw() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	background(0);
	// Plot array as lines
	 // array to sort
	let n = array.length;
	for (let i=0;i<n;i++){
		rect(i*width/n,0,width/n,array[i]);
		fill(255);
		text(array[i], (i+0.5)*width/n,array[i]+10)
	}
	

}

// function merge_sort(X) {
// 	if (X.length<=1){
// 		return X;
// 	}
// 	let mid = Math.floor(X.length/2);
// 	let L = mergesort(X.slice())
// }