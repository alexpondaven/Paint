let array = [10,40,50,20,80];
let n = array.length;
let all_array = [];
let s_array = mergesort(array);

console.log(array);
console.log(s_array);

function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	// Draw original array
	background(0);
	merge = new merge(array);
	
	for (let i=0;i<n;i++){
		rect(i*width/n,0,width/n,array[i]);
		fill(255);
		text(array[i], (i+0.5)*width/n,array[i]+10)
	}
}

var d=0;

function draw(mid) {
	let width = window.innerWidth;
	let height = window.innerHeight;
	// background(0);
	// Plot array as lines
	// array to sort
	merge.update();
	merge.show();
	
	// could try brute force method first
}

function merge(X) { //??
	this.X = X;

	this.update = function() {

	}
}

// function merge_show(mid) {
// 	stroke(255,0,0);
// 	line(mid*width/n,0,mid*width/n,height);
// }

function mergesort(X) {
	if (X.length<=1){
		return X;
	}
	let mid = Math.floor(X.length/2);
	d=mid;
	let L = mergesort(X.slice(0,mid));
	let R = mergesort(X.slice(mid,X.length));
	let out = [];
	let i=0;
	let j=0;
	while (i<L.length || j<R.length){
		if (i==L.length){ // if L finished, append rest of R
			out.push(R[j]);
			j++;
		} else if (j==R.length){ // if R finished, append rest of L
			out.push(L[i]);
			i++;
		} else { // compare values of L and R and append lowest one
			if (L[i] < R[j]){
				out.push(L[i]);
				i++;
			} else {
				out.push(R[j]);
				j++;
			}
		}
	}
	console.log(out);
	return out;
}