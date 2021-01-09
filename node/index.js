const counterObject = require("./myscript.js");

console.log(counterObject.getCounter());
counterObject.incrementCounter();
console.log(counterObject.getCounter());

const newObj = require("./myscript.js");

console.log(newObj.getCounter());
