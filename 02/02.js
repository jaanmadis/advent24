const fs = require("fs");

function getInputAsArray() {
  return fs
    .readFileSync("in_b.txt", { encoding: "utf8", flag: "r" })
    .split("\r\n");
}

function isSafe(report, withProblemDampener) {
  let sign = 0;
  let index = 0;
  while (index < report.length - 1) {
    const thisLevel = report[index];
    const nextLevel = report[index + 1];
    const diff = thisLevel - nextLevel;
    if (index === 0) {
      sign = Math.sign(diff);
    }
    if (
      Math.abs(diff) === 0 ||
      Math.abs(diff) > 3 ||
      (index > 0 && sign !== Math.sign(diff))
    ) {
      // Alter the report by removing elements and try if the report is now safe
      if (withProblemDampener) {
        let removeIndex = 0;
        while (removeIndex < report.length) {
          const alteredReport = report.filter((filterElement, filterIndex) => {
            return removeIndex !== filterIndex;
          });
          if (isSafe(alteredReport, false)) {
            return true;
          }
          removeIndex++;
        }
        return false;
      } else {
        return false;
      }
    }

    index++;
  }
  return true;
}

let result1 = 0;
let result2 = 0;

getInputAsArray().forEach((reports) => {
  const report = reports.split(/\s+/);
  if (isSafe(report, false)) {
    result1++;
  }
  if (isSafe(report, true)) {
    result2++;
  }
});

console.log(result1);
console.log(result2);
