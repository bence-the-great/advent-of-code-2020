import {example1, example2, input} from "./data.js";

const adapters = input.split('\n').map(number => parseInt(number)).sort((a, b) => a-b);
const deviceJoltage = Math.max(...adapters) + 3;

const oneJolts = adapters.filter((jolt, index, array) => {
  if (index > 0 && (jolt - array[index - 1]) === 1) {
    return true;
  } else {
    return jolt === 1;
  }
}).length;

const threeJolts = adapters.filter((jolt, index, array) => {
  if (index > 0 && (jolt - array[index - 1]) === 3){
    return true;
  }
}).length + 1;

const adapterCominations = [
  {
    joltage: deviceJoltage,
    value: 1
  },
  ...adapters.reverse().map(adapter => {return {joltage: adapter, value: 0}}),
  {
    joltage: 0,
    value: 0
  }
];

adapterCominations.forEach((data, index, array) => {
  const filtered = array.filter(otherData => {
    const difference = otherData.joltage - data.joltage;
    return difference > 0 && difference <= 3;
  });

  data.value += filtered.map(data => data.value).reduce((a, b) => a + b, 0);
});

console.log(oneJolts * threeJolts);
console.log(adapterCominations[adapterCominations.length - 1]);
