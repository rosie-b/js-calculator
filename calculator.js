var entArr = []; // array of entries to be calculated.
var entStr = ''; // string of valid entries to be pushed onto the array.
var result = 0;  // variable to hold the result value, once calculation is complete.
var overwrite = ''; // string to advise if should overwride the values on the screen

// REFACTORED - function to call elements by id
function id(x) {
	return document.getElementById(x);
}

// add numbers to the entries string and show values on the screen.
function numBtn(val) {
		if (overwrite !== 'Y') {
			entStr += val
			id('screen').value += val  
		} else {
			entArr = []
			result = 0
			entStr = val
			id('screen').value = val  
		}	
	}

// .push the numbers and operator to the entArr and clear the entries string, ready for new values.
function opBtn(val) {
		entArr.push(entStr)
		entArr.push(val)
		entStr = ''
    id('screen').value += val  
}

// clear the screen, entArr and entries string, ready for all new values.
function c() {
	entArr = []
	entStr = ''
	result = 0
	id('screen').value = ''  
}

// function to calculate the entries
function calc() {
	id('screen').value = result  
	entArr.push(entStr)  // .push the lastest entries to the entArr.
	entStr = '' // empty the entries string, awaiting new values.
	var x = Number(entArr[0]);  // convert the initial number from string to number.
	for (var i = 1; i < entArr.length; i++) {  // loop over the remaining elements in the string.
		var y = Number(entArr[i+1]) // convert the next number from string to number and continue until reach an operator.
		var op = entArr[i];  // when get to operator, just put that straight into the entArr.
		
		// perform the calculations
		if (op === '+') {result = x += y;} 
		else if (op === '-') {result = x -= y;}
		else if (op === '*') {result = x *= y;} 
		else if (op === '/') {result = x /= y;}
		i++;
		}
		id('screen').value = result  // update screen to show result of calculation. // UPDATED
		entArr.push(result)  // result now becomes the new initial number to start subsequent calculations from.
	}

	// event listener to check if screen values and entArr need to be overwritten
// i.e. last action was evaluate, next button pushed is a number value. So new calculation to commence.
document.addEventListener('click',check);

// REFACTORED - function to check if should overwrite value and begin new calculation
function check() {
	var lastEntry = entArr.slice(-1)[0]
	var options = ['+', '-', '/', '*', 'undefined']
	if (options.indexOf(lastEntry) +1) {overwrite = ''}
	else if (entStr !== '') {overwrite = ''}
	else {overwrite = 'Y'}
}