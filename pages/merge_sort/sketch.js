let array = [10,40,50,20,80];
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
	let n = array.length;
	for (let i=0;i<n;i++){
		rect(i*width/n,0,width/n,array[i]);
		fill(255);
		text(array[i], (i+0.5)*width/n,array[i]+10)
	}
}

function draw() {
	let width = window.innerWidth;
	let height = window.innerHeight;
	// background(0);
	// Plot array as lines
	 // array to sort
	line(mid*width/n,0,mid*width/n,height);
	
	

}

function mergesort(X) {
	if (X.length<=1){
		return X;
	}
	let mid = Math.floor(X.length/2);
	draw()
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