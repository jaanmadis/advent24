const fs = require("fs");

function getInputAsString() {
  return fs.readFileSync("in_b.txt", { encoding: "utf8", flag: "r" });
}

let result1 = 0;
let result2 = 0;

const input = getInputAsString();
const mulMatches = [...input.matchAll(/mul\((\d+,\d+)\)/g)];
const doMatches = [...input.matchAll(/do\(\)/g)];
const dontMatches = [...input.matchAll(/don't\(\)/g)];

let doPtr = 0;
let dontPtr = 0;

let enabled = true;

mulMatches.forEach((match) => {
  const splits = match[1].split(",");
  result1 += splits[0] * splits[1];
  while (doPtr < doMatches.length && match.index > doMatches[doPtr].index) {
    doPtr++;
  }
  while (
    dontPtr < dontMatches.length &&
    match.index > dontMatches[dontPtr].index
  ) {
    dontPtr++;
  }
  enabled =
    (doMatches[doPtr - 1]?.index ?? 0) >=
    (dontMatches[dontPtr - 1]?.index ?? 0);
  if (enabled) {
    result2 += splits[0] * splits[1];
  }
});

console.log(result1);
console.log(result2);
