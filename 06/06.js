const fs = require("fs");

function getInput() {
  const map = fs
    .readFileSync("in_b.txt", { encoding: "utf8", flag: "r" })
    .split("\r\n");
  let x = -1;
  let y = map.findIndex((line) => {
    x = line.indexOf("^");
    return x > -1;
  });
  return { map, x, y };
}

/**
 * Next direction is always a 90 degree turn to right.
 */

const dirUp = { x: 0, y: -1 };
const dirDown = { x: 0, y: 1 };
const dirLeft = { x: -1, y: 0 };
const dirRight = { x: 1, y: 0 };

function next(dir) {
  if (dir.x === dirUp.x && dir.y === dirUp.y) {
    return dirRight;
  } else if (dir.x === dirDown.x && dir.y === dirDown.y) {
    return dirLeft;
  } else if (dir.x === dirLeft.x && dir.y === dirLeft.y) {
    return dirUp;
  } else if (dir.x === dirRight.x && dir.y === dirRight.y) {
    return dirDown;
  }
}

/**
 * For each visited cell keep an array of directions we were facing when we visited the cell.
 */

function addVisit(visits, x, y, dir) {
  const key = `${x},${y}`;
  if (visits[key]) {
    visits[key].push(dir);
  } else {
    visits[key] = [dir];
  }
}

function trace(map, x, y, dir) {
  let nextX;
  let nextY;

  /**
   * Keep track cells we visited and which direction we were facing when we visited.
   * This is to detect loops.
   */
  const visits = {};
  addVisit(visits, x, y, dir);

  while (true) {
    nextX = x + dir.x;
    nextY = y + dir.y;

    /**
     * Next step would be out of bounds, we reached the edge.
     * Return the cells we visited.
     */
    if (
      nextX < 0 ||
      nextY < 0 ||
      nextX >= map[0].length ||
      nextY >= map.length
    ) {
      return visits;

      /**
       * Next step leads to a cell we have already visited and we were facing the same direction when we visited.
       * We're in a loop.
       * Return -1.
       */
    } else if (
      visits[`${nextX},${nextY}`]?.find(
        (visitDir) => visitDir.x === dir.x && visitDir.y === dir.y
      )
    ) {
      return -1;

      /**
       * Next step leads to an obstacle.
       * Change directions, don't take a step.
       */
    } else if (map[nextY][nextX] === "#" || map[nextY][nextX] === "O") {
      dir = next(dir);

      /**
       * Next step is none of the above.
       * Take the step and record the visit.
       */
    } else {
      x = nextX;
      y = nextY;
      addVisit(visits, x, y, dir);
    }
  }
}

const { map, x, y } = getInput();

/**
 * Part 1 - trace the map and count how many unique cells were visited.
 */

const visits = trace(map, x, y, dirUp);
console.log("Result #1:", Object.keys(visits).length);

/**
 * Part 2 - create a new map for each cell we visited and place an obstacle on the cell we visited.
 * Then trace the new map and check if the new map got stuck in a loop.
 */

let loops = 0;
for (key in visits) {
  const splits = key.split(",");
  const visitX = Number(splits[0]);
  const visitY = Number(splits[1]);
  const newMap = [...map];

  /**
   * Don't try placing an obstacle on the very first cell we started from.
   */
  if (newMap[visitY][visitX] !== "^") {
    newMap[visitY] =
      newMap[visitY].substring(0, visitX) +
      "O" +
      newMap[visitY].substring(visitX + 1);
    if (trace(newMap, x, y, dirUp) === -1) {
      loops++;
    }
  }
}
console.log("Result #2:", loops);
