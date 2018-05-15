/* eslint-disable no-console */
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
let cursor = [];
let stainCount = 0;
let isStain = false;

function step(arr1, arr2) {
  return arr1.map((num, idx) => num + arr2[idx]);
}

function compareValues(arr1, arr2) {
  return arr1.every((el, idx) => el === arr2[idx]);
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

fs.readFile(input, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const allData = data.split('\n');

  const dataSetLength = allData.length;
  const gridSize = [...allData[0]].filter(entry => entry !== ' ').map(num => Number(num));
  const allMoves = [...allData[dataSetLength - 1]];
  const allStains = allData.slice(1, dataSetLength - 1).map(coord => [...coord].filter(entry => entry !== ' ').map(num => Number(num)));


  // debugging
  console.log(allData);
  console.log(`Grid size: ${gridSize}\nMoves: ${allMoves}\nStains: ${allStains}`);
  console.log(directions[allMoves[0]]);

  // 1: Make one move
  cursor = step(origin, directions[allMoves[0]]);
  console.log(cursor);

  // 2: check for stain
  isStain = allStains.every(el => compareValues(el, cursor));
  console.log('stain?:', isStain);
  if (isStain) {
    stainCount += 1;
  }

  // 3: Check skid
  cursor = checkSkid(cursor, gridSize[0], gridSize[1]);
  console.log(cursor);

  // Repeat steps 1 - 3

  // Print result
  console.log('Number of stains removed:', stainCount);
});
