
//The code : 
const readline = require('readline');
const { fstat } = require('fs');
const { saveBoard } = require('./data-access/boardService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});


////

let x = 0; // define

function y () { // define
}

const z = function() { 
}

z([1,2, {
  a: 17,
  b: 19
}, function(a,b,c) {
  return a+b/c;
}], function(x,y,z,d,o) {});



function calcBMI(weight, height) {
  return height / weight / weight;
}

calcBMI(100);





