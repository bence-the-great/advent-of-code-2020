import {example, input} from "./data.js";

const separateBagAndContents = /^(?<bag>\w+\s\w+)\sbags\scontain\s(?<contentsString>[0-9a-zA-Z\s,]*).$/;
const separateContents = /(?<howMany>\d+)\s(?<bag>\w+\s\w+)/g;

const rules = input.split('\n');

const bags = {};
rules.forEach(rule => {
  const {bag, contentsString} = separateBagAndContents.exec(rule).groups;
  const contents = [...contentsString.matchAll(separateContents)].map(contentResult => {
    const {howMany, bag} = contentResult.groups;
    return {howMany, bag};
  });

  bags[bag] = {contentsString, contents};
});

const canContainTargetBag = (bag, target) => {
  const contents = bag.contents.map(item => item.bag);
  return contents.includes(target) || contents.filter(item => canContainTargetBag(bags[item], target)).length > 0;
};

const countBags = ({contents}) => {
  return contents
    .map(containedBag => parseInt(containedBag.howMany) * (countBags(bags[containedBag.bag]) + 1))
    .reduce((bagCount, currentValue) => bagCount + currentValue, 0);
};

console.log(Object.values(bags).filter(bag => canContainTargetBag(bag, 'shiny gold')).length);
console.log(countBags(bags['shiny gold']));
