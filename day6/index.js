import {example, input} from "./data.js";

const groups = input.split('\n\n');

const sumOfAnyoneAnsweredYes = groups
  .map(answers => new Set(answers.replaceAll('\n', '')).size)
  .reduce((a, b) => a + b);

const sumOfEveryoneAnsweredYes = groups.map(answers => {
  const individualAnswers = answers.split('\n');

  return individualAnswers.reduce((previousValue, currentValue) => [...previousValue].filter(character => currentValue.includes(character))).length;
}).reduce((a, b) => a + b);

console.log(sumOfAnyoneAnsweredYes);
console.log(sumOfEveryoneAnsweredYes);
