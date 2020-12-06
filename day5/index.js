import {example, input} from "./data.js";

const boardingPasses = input.split('\n');

const seatIDs = boardingPasses.map(boardingPass => {
  const row = parseInt(
    boardingPass
      .substr(0, 7)
      .split('')
      .map(character => character === 'F' ? '0' : '1')
      .join(''),
    2);
  const column = parseInt(
    boardingPass
      .substr(7, 3)
      .split('')
      .map(character => character === 'L' ? '0' : '1')
      .join(''),
    2);
  const seatID = row * 8 + column;

  return seatID;
}).sort((a, b) => a - b);

const mySeatID = seatIDs.find((currentSeatID, index, array) => {
  if (index === 0) {
    return false;
  } else {
    const previousSeatID = array[index - 1];
    return (currentSeatID - previousSeatID) > 1;
  }
}) - 1;

console.log(Math.max(...seatIDs));
console.log(mySeatID);
