const fs = require("fs");

function getInput() {
  return fs
    .readFileSync("in_b.txt", { encoding: "utf8", flag: "r" })
    .split("\r\n");
}

function getMap(input) {
  const result = {};
  input.forEach((line, y) => {
    const matches = line.matchAll(/[^.]/g);
    for (const match of matches) {
      const char = match[0];
      if (result[char] === undefined) {
        result[char] = [];
      }
      result[char].push({ x: match.index, y });
    }
  });
  return result;
}

function inBounds(point, limitX, limitY) {
  return point.x >= 0 && point.y >= 0 && point.x < limitX && point.y < limitY;
}

function found(antis, anti) {
  return (
    antis.findIndex((other) => other.x === anti.x && other.y === anti.y) > -1
  );
}

function getAntis(map, limitX, limitY) {
  const antis1 = [];
  const antis2 = [];
  for (const key in map) {
    const values = map[key];
    values.forEach((valueA) => {
      values.forEach((valueB) => {
        const vector = { x: valueB.x - valueA.x, y: valueB.y - valueA.y };
        if (vector.x !== 0 || vector.y !== 0) {
          // Part 1
          const anti1 = { x: valueB.x + vector.x, y: valueB.y + vector.y };
          if (inBounds(anti1, limitX, limitY) && !found(antis1, anti1)) {
            antis1.push(anti1);
          }

          // Part 2
          let next = valueA;
          while (true) {
            const anti2 = { x: next.x + vector.x, y: next.y + vector.y };
            if (inBounds(anti2, limitX, limitY)) {
              if (!found(antis2, anti2)) {
                antis2.push(anti2);
              }
            } else {
              break;
            }
            next = anti2;
          }
        }
      });
    });
  }
  return { antis1, antis2 };
}

const input = getInput();
const map = getMap(input);
const { antis1, antis2 } = getAntis(map, input[0].length, input.length);
console.log("Result #1", antis1.length);
console.log("Result #2", antis2.length);
