const fs = require("fs");

function getInputAsArray() {
  return fs
    .readFileSync("in_b.txt", { encoding: "utf8", flag: "r" })
    .split("\r\n");
}

const lefts = [];
const rights = [];
getInputAsArray().forEach((element) => {
  const split = element.split(/\s+/);
  lefts.push(split[0]);
  rights.push(split[1]);
});
lefts.sort();
rights.sort();

const rightmap = {};
rights.forEach((right) => {
  rightmap[right] = rightmap[right] ? rightmap[right] + 1 : 1;
});

let result1 = 0;
let result2 = 0;
lefts.forEach((left, index) => {
  result1 += Math.abs(left - rights[index]);
  result2 += rightmap[left] ? left * rightmap[left] : 0;
});
console.log(result1);
console.log(result2);
