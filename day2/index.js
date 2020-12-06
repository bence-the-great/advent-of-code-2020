import {example, input} from "./data.js";


const regex = /(?<firstRule>\d+)-(?<secondRule>\d+)\s(?<character>[a-z]):\s(?<password>\w+)/;

const determineValidPasswords = (dataset, condition) => {
  let numberOfValidPasswords = 0;

  dataset.forEach(passwordRecord => {
    const data = regex.exec(passwordRecord).groups;

    if (condition(data)) {
      numberOfValidPasswords += 1;
    }
  });

  return numberOfValidPasswords;
};

const taskCondition1 = ({firstRule, secondRule, character, password}) => {
  const characterOccurances = password.split(character).length - 1;
  return firstRule <= characterOccurances && characterOccurances <= secondRule;
};

const taskCondition2 = ({firstRule, secondRule, character, password}) => {
  return (password[parseInt(firstRule) - 1] === character) ^ (password[parseInt(secondRule) - 1] === character);
};

console.log(determineValidPasswords(input, taskCondition1));
console.log(determineValidPasswords(input, taskCondition2));
