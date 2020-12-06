import {example, input} from "./data.js";

const passports = input.split('\n\n');

const relaxedValidator = passport => {
  const ecl = /(?<ecl>ecl:[a-zA-z0-9#]+)/.test(passport);
  const pid = /(?<pid>pid:[a-zA-z0-9#]+)/.test(passport);
  const eyr = /(?<eyr>eyr:\w+)/.test(passport);
  const hcl = /(?<hcl>hcl:[a-zA-z0-9#]+)/.test(passport);
  const byr = /(?<byr>byr:\w+)/.test(passport);
  const iyr = /(?<iyr>iyr:\w+)/.test(passport);
  const cid = /(?<cid>cid:\w+)/.test(passport);  // optional
  const hgt = /(?<hgt>hgt:\w+)/.test(passport);

  return ecl && pid && eyr && hcl && byr && iyr && hgt;
};

const strictValidator = passport => {
  const ecl = /(?<ecl>ecl:(amb|blu|brn|gry|grn|hzl|oth))(\s|$)/.exec(passport);
  const pid = /(?<pid>pid:\d{9})(\s|$)/.exec(passport);
  const eyr = /(?<eyr>eyr:(?<eyrData>\d{4}))(\s|$)/.exec(passport);
  const hcl = /(?<hcl>hcl:#[0-9a-f]{6})(\s|$)/.exec(passport);
  const byr = /(?<byr>byr:(?<byrData>\d{4}))(\s|$)/.exec(passport);
  const iyr = /(?<iyr>iyr:(?<iyrData>\d{4}))(\s|$)/.exec(passport);
  const cid = /(?<cid>cid:\w+)(\s|$)/.exec(passport);  // optional
  const hgt = /(?<hgt>hgt:(?<hgtValue>\d+)(?<hgtUnit>cm|in))(\s|$)/.exec(passport);

  if (ecl && pid && eyr && hcl && byr && iyr && hgt) {
    const hgtValue = parseInt(hgt.groups.hgtValue);
    const {hgtUnit} = hgt.groups;
    const eyrValue = parseInt(eyr.groups.eyrData);
    const byrValue = parseInt(byr.groups.byrData);
    const iyrValue = parseInt(iyr.groups.iyrData);

    const eyrValid = 2020 <= eyrValue && eyrValue <= 2030;
    const byrValid = 1920 <= byrValue && byrValue <= 2002;
    const iyrValid = 2010 <= iyrValue && iyrValue <= 2020;
    const hgtValid = hgtUnit === 'cm' ? 150 <= hgtValue && hgtValue <= 193 : 59 <= hgtValue && hgtValue <= 76;

    return eyrValid && byrValid && iyrValid && hgtValid;
  } else {
    return false;
  }
};

console.log(passports.filter(passport => relaxedValidator(passport)).length);
console.log(passports.filter(passport => strictValidator(passport)).length);
