import {example, input} from "./data.js";

const message = input.split('\n').map(number => parseInt(number));

const findFaultyNumber = (data, preambleLength) => data.find((number, index, array) => {
  if (index < preambleLength) {
    return false;
  }

  const sumsOfPreviousN =
    array
      .slice(index - preambleLength, index)
      .map((previousNumber, i, previousN) => {
          return (
            previousN
              .filter((num, i2) => i !== i2)
              .map(otherPreviousNumber => previousNumber + otherPreviousNumber)
          )
        }
      )
      .flat();

  return !sumsOfPreviousN.includes(number);
});

const findWeakness = (data, expectedValue) => {
  let smallestNumber, largestNumber;

  data.forEach((firstNumber, firstNumberIndex, array) => {
    array.slice(firstNumberIndex + 1).forEach((secondNumber, secondNumberIndex) => {
      const sum = array.slice(firstNumberIndex, firstNumberIndex + secondNumberIndex).reduce((a, b) => a+b, 0);
      if (sum === expectedValue && firstNumber !== expectedValue) {
        const weaknessArray = array.slice(firstNumberIndex, firstNumberIndex + secondNumberIndex);
        smallestNumber = Math.min(...weaknessArray);
        largestNumber = Math.max(...weaknessArray);
      }
    })
  });

  return smallestNumber + largestNumber;
};

const faultyNumber = findFaultyNumber(message, 25);
console.log(faultyNumber);

const weakness = findWeakness(message, faultyNumber);
console.log(weakness);
