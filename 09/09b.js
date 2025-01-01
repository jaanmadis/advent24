const fs = require("fs");

function getInput() {
  return fs.readFileSync("in_b.txt", { encoding: "utf8", flag: "r" });
}

function getList(input) {
  let fileId = 0;
  let kind = 1; // 1 is for file, -1 is for space
  let first = undefined;
  let last = undefined;
  for (let i = 0; i < input.length; i++) {
    const length = Number(input[i]);
    if (length > 0) {
      const element = {
        contentLength: length,
        fileId: kind === 1 ? fileId : undefined,
        kind: kind,
        prev: last,
        next: undefined,
      };
      if (last) {
        last.next = element;
      } else {
        first = element;
      }
      last = element;
    }

    if (kind === 1) {
      fileId++;
      kind = -1;
    } else {
      kind = 1;
    }
  }
  return { first, last };
}

function findSpaceFor(block, first) {
  let curr = first;
  while (curr) {
    // Return this space if the block fits
    if (curr.kind === -1 && curr.contentLength >= block.contentLength) {
      return curr;
    }
    // Don't look for spaces after the block itself.
    if (curr === block) {
      return undefined;
    }
    curr = curr.next;
  }
  return undefined;
}

function swapElements(a, b) {
  const afterA = a.next;
  const beforeA = a.prev;
  const afterB = b.next;
  const beforeB = b.prev;
  if (a.next === b) {
    if (beforeA) {
      beforeA.next = b;
    }
    if (afterB) {
      afterB.prev = a;
    }
    a.next = afterB;
    a.prev = b;
    b.next = a;
    b.prev = beforeA;
  } else if (a.prev === b) {
    if (afterA) {
      afterA.prev = b;
    }
    if (beforeB) {
      beforeB.next = a;
    }
    a.next = b;
    a.prev = beforeB;
    b.next = afterA;
    b.prev = a;
  } else {
    if (afterA) {
      afterA.prev = b;
    }
    if (beforeA) {
      beforeA.next = b;
    }
    if (afterB) {
      afterB.prev = a;
    }
    if (beforeB) {
      beforeB.next = a;
    }
    a.next = afterB;
    a.prev = beforeB;
    b.next = afterA;
    b.prev = beforeA;
  }
}

function mergeSpace(a) {
  if (a.kind === 1) {
    return;
  }

  const afterA = a.next;
  if (afterA && afterA.kind === -1) {
    a.contentLength = a.contentLength + afterA.contentLength;
    a.next = afterA.next;
    if (afterA.next) {
      afterA.next.prev = a;
    }
    afterA.prev = undefined;
    afterA.next = undefined;
  }

  const beforeA = a.prev;
  if (beforeA && beforeA.kind === -1) {
    a.contentLength = a.contentLength + beforeA.contentLength;
    a.prev = beforeA.prev;
    if (beforeA.prev) {
      beforeA.prev.next = a;
    }
    beforeA.prev = undefined;
    beforeA.next = undefined;
  }
}

function splitSpace(a, n) {
  if (a.kind === 1) {
    return;
  }
  const split = {
    contentLength: n,
    kind: -1,
    next: a.next,
    prev: a,
  };
  if (a.next) {
    a.next.prev = split;
  }
  a.next = split;
  a.contentLength = a.contentLength - n;
}

function processList(last) {
  let currBlock = last;
  while (currBlock) {
    if (currBlock.kind === 1) {
      let currSpace = findSpaceFor(currBlock, first);
      if (currSpace) {
        const diff = currSpace.contentLength - currBlock.contentLength;
        if (diff > 0) {
          splitSpace(currSpace, diff);
        }
        swapElements(currSpace, currBlock);
        mergeSpace(currSpace);
        currBlock = currSpace;
      }
    }
    currBlock = currBlock.prev;
  }
}

function getResult(first) {
  let curr = first;
  let disc = [];
  while (curr) {
    for (i = 0; i < curr.contentLength; i++) {
      disc.push(curr.fileId);
    }
    curr = curr.next;
  }
  let result = 0;
  for (let i = 0; i < disc.length; i++) {
    if (disc[i] !== undefined) {
      result += i * Number(disc[i]);
    }
  }
  return result;
}

const input = getInput();
const { first, last } = getList(input);
processList(last);
const result2 = getResult(first);
console.log("Result #2", result2);
