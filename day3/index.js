import {example, input} from "./data.js";


const TREE = '#';
const matrix = input.split('\n');
const rowWidth = matrix[0].length

const conditionSlope0 = (row, rowIndex) => {
  return row[rowIndex % rowWidth] === TREE;
};
const conditionSlope1 = (row, rowIndex) => {
  return row[rowIndex * 3 % rowWidth] === TREE;
};
const conditionSlope2 = (row, rowIndex) => {
  return row[rowIndex * 5 % rowWidth] === TREE;
};
const conditionSlope3 = (row, rowIndex) => {
  return row[rowIndex * 7 % rowWidth] === TREE;
};
const conditionSlope4 = (row, rowIndex) => {
  return (row[(rowIndex / 2) % rowWidth] === TREE) && (rowIndex % 2 === 0);
};

const slopes = [
  {numberOfTrees: 0, condition: conditionSlope0},
  {numberOfTrees: 0, condition: conditionSlope1},
  {numberOfTrees: 0, condition: conditionSlope2},
  {numberOfTrees: 0, condition: conditionSlope3},
  {numberOfTrees: 0, condition: conditionSlope4},
];

matrix.forEach((row, rowIndex) => {
  slopes.forEach(({numberOfTrees, condition}, index) => {
    if(condition(row, rowIndex)) {
      slopes[index].numberOfTrees += 1;
    }
  })
});

console.log(slopes.map(({numberOfTrees}, i) => `${i+1}. slope: ${numberOfTrees}`));
console.log(slopes.map(({numberOfTrees}) => numberOfTrees).reduce((a, b) => a * b));
