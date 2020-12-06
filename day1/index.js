import {input, example} from "./data.js";

const answer1 = array => {
  return array
    .map(value1 => array.map(value2 => [value1 + value2, value1 * value2]))
    .flat()
    .find(([sum, product]) => sum === 2020)
    [1];
};


const answer2 = array => {
  return array
    .map(value1 => array.map(value2 => array.map(value3 => [value1 + value2 + value3, value1 * value2 * value3])))
    .flat(2)
    .find(([sum, product]) => sum === 2020)
    [1];
};

console.log(`First answer for example: ${answer1(example)}`);
console.log(`Second answer for example: ${answer2(example)}`);
console.log(`First answer for input: ${answer1(input)}`);
console.log(`Second answer for input: ${answer2(input)}`);
