const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'input.txt');

const directions = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

fs.readFile(input, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const allData = data.split('\n');
  console.log(allData);

  const dataSetLength = allData.length;
  const gridSize = allData[0];
  const allMoves = allData[dataSetLength - 1];
  const allStains = allData.slice(allData[1], allData[dataSetLength - 2]);
});
