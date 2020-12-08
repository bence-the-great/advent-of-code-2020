import {example, input} from "./data.js";

const program = input.split('\n');

const accumulatorValue = program => {
  let accumulator = 0;
  let instructionPointer = 0;
  let visitedInstructions = [];

  const execute = instruction => {
    const [operation, argument] = instruction.split(' ');
    switch (operation) {
      case 'jmp':
        return parseInt(argument);
      case 'acc':
        accumulator += parseInt(argument);
        return 1;
      default:
        return 1;
    }
  };

  while (!visitedInstructions.includes(instructionPointer) && instructionPointer < program.length){
    visitedInstructions.push(instructionPointer);
    instructionPointer += execute(program[instructionPointer]);
  }

  return {accumulator, infiniteLoopDetected: visitedInstructions.includes(instructionPointer)};
};

const suspiciousInstructionPointers = program
  .map((instruction, index) => {
    const [operation, argument] = instruction.split(' ');
    return ['nop', 'jmp'].includes(operation) ? index : null;
  })
  .filter(index => index !== null);

console.log(accumulatorValue(program));

suspiciousInstructionPointers.forEach(suspiciousInstructionPointer => {
  const newProgramCandidate = program.map((instruction, index) => {
    const [operation, argument] = instruction.split(' ');
    if(index === suspiciousInstructionPointer) {
      const newOperation = operation === 'jmp' ? 'nop' : 'jmp';
      return [newOperation, argument].join(' ');
    } else {
      return [operation, argument].join(' ');
    }
  });

  const {accumulator, infiniteLoopDetected} = accumulatorValue(newProgramCandidate);
  if (infiniteLoopDetected === false) {
    console.log(accumulator);
  }
});
