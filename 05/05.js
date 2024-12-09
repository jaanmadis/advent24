const fs = require("fs");

function getInput(rules, updates) {
  const lines = fs
    .readFileSync("in_b.txt", { encoding: "utf8", flag: "r" })
    .split("\r\n");
  lines.forEach((line) => {
    if (line.indexOf("|") > -1) {
      const split = line.split("|");
      if (rules[split[0]] === undefined) {
        rules[split[0]] = [];
      }
      rules[split[0]].push(split[1]);
    } else if (line.indexOf(",") > -1) {
      updates.push(line.split(","));
    }
  });
}

function processUpdate(update, fixed, wasCorrect) {
  const page = update[0];
  const otherPages = update.slice(1);
  const pageIsCorrect = otherPages.every((otherPage) => {
    return rules[page] ? rules[page].indexOf(otherPage) > -1 : false;
  });
  if (pageIsCorrect) {
    fixed.push(page);
  } else {
    wasCorrect.value = false;
    otherPages.push(page);
  }
  if (otherPages.length > 0) {
    processUpdate(otherPages, fixed, wasCorrect);
  }
}

const rules = {};
const updates = [];
getInput(rules, updates);

let result1 = 0;
let result2 = 0;
updates.forEach((update) => {
  const fixed = [];
  const wasCorrect = { value: true };
  processUpdate(update, fixed, wasCorrect);
  if (wasCorrect.value) {
    result1 += ~~update[(update.length - 1) / 2];
  } else {
    result2 += ~~fixed[(fixed.length - 1) / 2];
  }
});
console.log(result1);
console.log(result2);
