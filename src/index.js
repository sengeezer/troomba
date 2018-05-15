/* eslint-disable no-console, no-restricted-syntax, no-plusplus, no-await-in-loop */
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'input.txt');

const directions = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

const origin = [0, 0];
let cursor = origin;
let stainCount = 0;

async function step(arr1, arr2) {
  const stepped = await arr1.map((num, idx) => num + arr2[idx]);
  return stepped;
}

async function compareValues(arr1, arr2) {
  const comp = await arr1.every((el, idx) => el === arr2[idx]);

  if (comp) {
    stainCount += 1;
    console.log('Stain found!');
  }
}

function checkSkid(arr, max, min) {
  return arr.map((num) => {
    switch (num) {
      case num > max:
        return max;
      case num < min:
        return min;
      default:
        return num;
    }
  });
}

function operate(allData) {
  const dataSetLength = allData.length;
  const gridSize = [...allData[0]].filter(entry => entry !== ' ').map(num => Number(num));
  const allMoves = [...allData[dataSetLength - 1]];
  const allStains = allData.slice(1, dataSetLength - 1).map(coord => [...coord].filter(entry => entry !== ' ').map(num => Number(num)));

  console.log(`Grid size: ${gridSize}\nMoves: ${allMoves}\nStains: ${allStains}`);

  async function processMoves(element) {
    console.log('Position:', cursor);
    console.log('Going:', element);
    const steppedCursor = await step(cursor, directions[element]);
    const skiddedCursor = await checkSkid(steppedCursor, gridSize[0], gridSize[1]);
    const itsStain = await allStains.forEach(elm => compareValues(elm, skiddedCursor));

    // TODO: Find way of linting itsStain
    if (itsStain) {
      // console.log(itsStain);
    }

    cursor = skiddedCursor;
  }

  // Async forEach
  // Credit: Anton Lavrenov<https://gist.github.com/Atinux/fd2bcce63e44a7d3addddc166ce93fb2>
  const asyncForEach = async (arr, cb) => {
    for (let i = 0; i < arr.length; i++) {
      await cb(arr[i], i, arr);
    }
  };

  const start = async () => {
    await asyncForEach(allMoves, async (element) => {
      await processMoves(element);
    });

    console.log('Position:', cursor);
    console.log('Number of stains eliminated:', stainCount);
  };

  start();
}

fs.readFile(input, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  operate(data.split('\n'));
});
