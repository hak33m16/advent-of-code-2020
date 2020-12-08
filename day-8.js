const fs = require('fs');

const input = fs.readFileSync('day-8-input.txt', 'utf-8').split('\n');

let instructions = []
input.forEach(line => {
    const line_arr = line.split(' '); 
    const instruction = line_arr[0];
    
    const multiplier = line_arr[1][0] == '-' ? -1 : 1; 
    const argument = multiplier * parseInt(line_arr[1].substring(1, line_arr[1].length));

    instructions.push({
        instruction: instruction,
        argument: argument,
        counter: 0
    });
});

//console.log(instructions);

// Part 1

// let accumulator = 0;
// let instructionPointer = 0;
// function execute() {

//     console.log('executed: ', instructionPointer);

//     const currentLine = instructions[instructionPointer];
//     if (currentLine.counter > 0) {
//         console.log(accumulator);
//         return;
//     }

//     let jumped = false;
//     if (currentLine.instruction == 'nop') {
//     } else if (currentLine.instruction == 'acc') {
//         accumulator += currentLine.argument;
//     } else if (currentLine.instruction == 'jmp') {
//         instructionPointer += currentLine.argument;
//         jumped = true;
//     }
//     ++ currentLine.counter;

//     if (!jumped) {
//         ++ instructionPointer;
//     }

//     execute();
// }

// execute();

// Part 2

//console.log(instructions[instructions.length - 1])

function resetCounters() {
    instructions.forEach(line => {
        line.counter = 0;
    });
}

function putItAllOnBlackBaby(passed_instructions) {
    // console.log("Passed instructions: %o", passed_instructions);

    let currentMaxCounter = -1;
    let accumulator = 0;
    let instructionPointer = 0;
    while (instructionPointer != passed_instructions.length) {
        const currentLine = passed_instructions[instructionPointer];

        let jumped = false;
        if (currentLine.instruction == 'nop') {
        } else if (currentLine.instruction == 'acc') {
            accumulator += currentLine.argument;
        } else if (currentLine.instruction == 'jmp') {
            instructionPointer += currentLine.argument;
            jumped = true;
        }
        ++ currentLine.counter;

        if (currentLine.counter > currentMaxCounter) {
            currentMaxCounter = currentLine.counter;
            // We probably didn't fix it?
            if (currentMaxCounter > 10000) {
                return null;
            }
        }

        if (!jumped) {
            ++ instructionPointer;
        }
    }
    return accumulator;
}

let allJumpIndeces = []
let allNoOperationIndeces = []
for (let i = 0; i < instructions.length; ++ i) {
    if (instructions[i].instruction == 'jmp') {
        allJumpIndeces.push(i);
    }
    if (instructions[i].instruction == 'nop') {
        allNoOperationIndeces.push(i);
    }
}

console.log(allJumpIndeces)
console.log(allNoOperationIndeces)

function findTheMagicIndex() {
    for (const jumpIndex of allJumpIndeces) {
        // Change this jmp to a nop
        instructions[jumpIndex].instruction = 'nop';
        // console.log(instructions);
        let result = putItAllOnBlackBaby(instructions);
        if (result) {
            return result;
        }
        // Change it back
        instructions[jumpIndex].instruction = 'jmp';
        resetCounters();
    }
    for (const noOperationIndex of allNoOperationIndeces) {
        // Change this nop to a jmp
        instructions[noOperationIndex].instruction = 'jmp';
        // console.log(instructions);
        let result = putItAllOnBlackBaby(instructions);
        if (result) {
            return result;
        }
        // Change it back
        instructions[noOperationIndex].instruction = 'nop';
        resetCounters();
    }
    return null;
}

console.log(findTheMagicIndex());

// instructions[7].instruction = 'nop'
// console.log(instructions);
// console.log(putItAllOnBlackBaby(instructions));
