/*****************************************/
// Big O Notation examples in JavaScript //
/*****************************************/
// Run node big-o.js
/****************************************/
// Run 'var b = require('./big-o.js')'
// then 'var a = new b.bigONotation(100)'
// to create a new bigONotation object
/****************************************/
// Run a.bubbleSort()

function generateArray(size) {
  var newArray = [];

  for (var i=0; i < size; i++) {
    newArray.push(Math.floor(Math.random()*1000) + 10);
  }
  return newArray;
};

function swapValues(array, index1, index2) {
  var a = array[index1],
      b = array[index2];

  array[index2] = a;
  array[index1] = b;
};

var bigONotation = function(size) {
  this.array = generateArray(size);
  this.arraySize = size;
};

// O(1)
bigONotation.prototype.addToArray = function(val) {
  this.array.push(val);
};

// O(n) - linear search
bigONotation.prototype.linearSearch = function(value) {
  var startTime = new Date();
  for (var i=0; i < this.array.length; i++) {
    if (this.array[i] == value) {
      console.log('Found at index: ' + i); 
      console.log('Linear Search took ' + (new Date() - startTime)/1000 + 'ms');
      break;
    }
  }
};

// O(n^2) - bubble sort
bigONotation.prototype.bubbleSort = function() {
  var startTime = new Date();
  while (true) {
    var swapped = false;
    for (var i=0; i < this.array.length; i++) {
      if (i < this.array.length && this.array[i] > this.array[i+1]) {
        swapValues(this.array, i, i+1);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  console.log('Bubble sort took ' + (new Date() - startTime)/1000 + 'ms');
};

// O(log n) - binary search
bigONotation.prototype.binarySearch = function(value) {
  var startTime = new Date(),
      min = 0,
      max = this.arraySize - 1,
      iterations = 0;

  while (min <= max) {
    mid = Math.ceil((max + min)/2);
    if (this.array[mid] < value) {
      min = mid + 1;
    } else if (this.array[mid] > value) {
      max = mid - 1;
    } else {
      console.log('Found match in index '+ mid);
      min = max + 1;
    }
    iterations += 1;
  }
  console.log('Binary search took ' + (new Date() - startTime) + 'ms');
  console.log('Iterations: ' + iterations);
};

// O(n log n) - quick sort
bigONotation.prototype.quickSort = function(array) {
  if (array.length <= 1) return array;

  var pivotIndex = Math.ceil(array.length/2),
      pivotValue = array.splice(pivotIndex, 1)[0],
      left = [],
      right = [];

  for (var i=0; i < array.length; i++) {
    if (array[i] < pivotValue) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return this.array = this.quickSort(left).concat([pivotValue], this.quickSort(right));
};

// quickSort + timer
bigONotation.prototype.callQuickSort = function(array) {
  var startTime = new Date(),
      resolvePromise = Promise.resolve(this.quickSort(array));

  resolvePromise.then(function(data) {
    console.log(data);
    console.log('Quick sort took ' + (new Date() - startTime)/1000 + 'ms');
  });
};

module.exports = {
  generateArray,
  bigONotation
}
