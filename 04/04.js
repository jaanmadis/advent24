const fs = require("fs");

function getInputAsArray() {
  const result = [];
  const lines = fs
    .readFileSync("in_b.txt", { encoding: "utf8", flag: "r" })
    .split("\r\n");
  lines.forEach((line) => {
    result.push([...line]);
  });
  return result;
}

/**
 * Part 1
 */

const searchRight = [
  { x: 1, y: 0, letter: "M" },
  { x: 2, y: 0, letter: "A" },
  { x: 3, y: 0, letter: "S" },
];
const searchLeft = [
  { x: -1, y: 0, letter: "M" },
  { x: -2, y: 0, letter: "A" },
  { x: -3, y: 0, letter: "S" },
];
const searchUp = [
  { x: 0, y: -1, letter: "M" },
  { x: 0, y: -2, letter: "A" },
  { x: 0, y: -3, letter: "S" },
];
const searchDown = [
  { x: 0, y: 1, letter: "M" },
  { x: 0, y: 2, letter: "A" },
  { x: 0, y: 3, letter: "S" },
];
const searchRightUp = [
  { x: 1, y: -1, letter: "M" },
  { x: 2, y: -2, letter: "A" },
  { x: 3, y: -3, letter: "S" },
];
const searchRightDown = [
  { x: 1, y: 1, letter: "M" },
  { x: 2, y: 2, letter: "A" },
  { x: 3, y: 3, letter: "S" },
];
const searchLeftUp = [
  { x: -1, y: -1, letter: "M" },
  { x: -2, y: -2, letter: "A" },
  { x: -3, y: -3, letter: "S" },
];
const searchLeftDown = [
  { x: -1, y: 1, letter: "M" },
  { x: -2, y: 2, letter: "A" },
  { x: -3, y: 3, letter: "S" },
];
const part1Searches = [
  searchRight,
  searchLeft,
  searchUp,
  searchDown,
  searchRightUp,
  searchRightDown,
  searchLeftUp,
  searchLeftDown,
];

/**
 * Part 2
 */

/*

M M
 A
S S

M S
 A
M S

S M
 A
S M

S S
 A
M M

*/

const searchMMASS = [
  { x: -1, y: -1, letter: "M" },
  { x: 1, y: -1, letter: "M" },
  { x: -1, y: 1, letter: "S" },
  { x: 1, y: 1, letter: "S" },
];
const searchMSAMS = [
  { x: -1, y: -1, letter: "M" },
  { x: -1, y: 1, letter: "M" },
  { x: 1, y: -1, letter: "S" },
  { x: 1, y: 1, letter: "S" },
];
const searchSMASM = [
  { x: 1, y: -1, letter: "M" },
  { x: 1, y: 1, letter: "M" },
  { x: -1, y: -1, letter: "S" },
  { x: -1, y: 1, letter: "S" },
];
const searchSSAMM = [
  { x: -1, y: 1, letter: "M" },
  { x: 1, y: 1, letter: "M" },
  { x: -1, y: -1, letter: "S" },
  { x: 1, y: -1, letter: "S" },
];
const part2Searches = [searchMMASS, searchMSAMS, searchSMASM, searchSSAMM];

const input = getInputAsArray();

function search(char, searches) {
  let result = 0;
  for (let iy = 0; iy < input.length; iy++) {
    for (let ix = 0; ix < input[iy].length; ix++) {
      if (input[iy][ix] === char) {
        searches.forEach((search) => {
          let found = true;
          search.forEach((step) => {
            if (found === false) {
              return;
            }
            if (
              iy + step.y < 0 ||
              ix + step.x < 0 ||
              iy + step.y >= input.length ||
              ix + step.x >= input[iy].length ||
              input[iy + step.y][ix + step.x] !== step.letter
            ) {
              found = false;
            }
          });
          if (found) {
            result++;
          }
        });
      }
    }
  }
  return result;
}

console.log(search("X", part1Searches));
console.log(search("A", part2Searches));
