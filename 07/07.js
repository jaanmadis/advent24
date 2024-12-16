const fs = require("fs");

function getInput() {
  const result = [];
  const lines = fs
    .readFileSync("in_b.txt", { encoding: "utf8", flag: "r" })
    .split("\r\n");
  lines.forEach((line) => {
    const splits = line.split(":");
    result.push({
      test: Number(splits[0]),
      nums: splits[1]
        .trim()
        .split(" ")
        .map((value) => Number(value)),
    });
  });
  return result;
}

function powersOfX(n, x) {
  const result = [];
  const limit = x ** n;
  for (let i = 0; i < limit; i++) {
    const binaryString = i.toString(x).padStart(n, "0");
    result.push(binaryString);
  }
  return result;
}

function process(input, x) {
  input.forEach((item) => {
    item.opsList = powersOfX(item.nums.length - 1, x);
    item.results = [];
    item.matches = false;
    item.opsList.forEach((ops) => {
      let result = item.nums[0];
      for (let i = 0; i < ops.length; i++) {
        result =
          ops[i] === "0"
            ? result + item.nums[i + 1]
            : ops[i] === "1"
            ? result * item.nums[i + 1]
            : Number(`${result}${item.nums[i + 1]}`);
      }
      item.results.push(result);
      if (result === item.test) {
        item.matches = true;
      }
    });
  });
}

const input1 = getInput();
process(input1, 2);
console.log(
  "Result #1",
  input1.reduce((acc, curr) => (curr.matches ? acc + curr.test : acc), 0)
);

const input2 = getInput();
process(input2, 3);
console.log(
  "Result #2",
  input2.reduce((acc, curr) => (curr.matches ? acc + curr.test : acc), 0)
);
