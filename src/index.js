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

function process(arr1, arr2) {
  return arr1.map(((num, idx) => num + arr2[idx]));
}

fs.readFile(input, 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const allData = data.split('\n');
  console.log(allData);

  const dataSetLength = allData.length;
  const gridSize = allData[0];
  const allMoves = [...allData[dataSetLength - 1]];
  const allStains = allData.slice(1, dataSetLength - 2);

  console.log(`Grid size: ${gridSize}\nMoves: ${allMoves}\nStains: ${allStains}`);

  // console.log(`Debug: ${allData[dataSetLength - 2]}`);
});
