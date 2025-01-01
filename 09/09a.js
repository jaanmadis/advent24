const fs = require("fs");

function getInput() {
  return fs.readFileSync("in_b.txt", { encoding: "utf8", flag: "r" });
}

function getList(input) {
  const list = [];
  let fileId = 0;
  let kind = 1; // 1 is for file, -1 is for space

  for (let i = 0; i < input.length; i++) {
    const length = input[i];
    for (let j = 0; j < length; j++) {
      list.push(kind === 1 ? fileId : ".");
    }
    if (kind === 1) {
      fileId++;
      kind = -1;
    } else {
      kind = 1;
    }
  }
  return list;
}

function processList(list) {
  let spacePtr = 0;
  let blockPtr = list.length - 1;
  while (true) {
    while (list[spacePtr] !== ".") {
      spacePtr++;
    }
    while (list[blockPtr] === ".") {
      blockPtr--;
    }
    if (spacePtr > blockPtr) {
      break;
    }
    list[spacePtr] = list[blockPtr];
    list[blockPtr] = ".";
  }
}

function getResult(list) {
  let result = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== ".") {
      result = result + i * Number(list[i]);
    }
  }
  return result;
}

const input = getInput();
const list = getList(input);
processList(list);
const result1 = getResult(list);
console.log("Result #1", result1);
