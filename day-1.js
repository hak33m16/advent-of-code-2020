const fs = require('fs');

const input = fs.readFileSync('day-1-input.txt', 'utf-8')
    .split('\n')
    .filter(s => {
        // Ignore whitespace lines
        return s.trim();
    }).map(s => {
        return parseInt(s);
    });

//----------------//
// Part One
//

console.log('Part One -- First Attempt')

part_one:
for (let i = 0; i < input.length; ++ i) {
    for (let j = 0; j < input.length; ++ j) {
        if (i != j && input[i] + input[j] == 2020) {
            console.log(`${input[i]} + ${input[j]} = 2020`);
            console.log(`${input[i]} * ${input[j]} = ${input[i] * input[j]}`);
            break part_one;
        }
    }
}

//----------------//
// Part Two
//

console.log('Part Two -- First Attempt')

part_two:
for (let i = 0; i < input.length; ++ i) {
    for (let j = 0; j < input.length; ++ j) {
        for (let k = 0; k < input.length; ++ k) {
            if (i != j && j != k && i != k &&
                input[i] + input[j] + input[k] == 2020) {
                console.log(`${input[i]} + ${input[j]} + ${input[k]} = 2020`);
                console.log(`${input[i]} * ${input[j]} * ${input[k]} = ${input[i] * input[j] * input[k]}`);
                break part_two;
            }
        }
    }
}

//----------------//
// Part One -- Second Attempt
//

console.log('Part One -- Second Attempt')

const input_set = new Set(input);

// addend [a] + addend [b] = sum [c]
// minuend [c] - subtrahend [a] = difference [b]
// https://www.ilearn.com/main/assets/img/resources/math_topics/what-is-subtraction1.png
const minuend = 2020;

// Note: I don't think this would work for the case that our
// two numbers are 1010. We'd need to store a map in that case
// to allow for duplicate values. (Unless the default Set object
// allows for duplicates?)
for (const potential_subtrahend of input_set) {
    const difference = minuend - potential_subtrahend;

    if (input_set.has(difference)) {
        console.log(`${potential_subtrahend} + ${difference} = 2020`)
        console.log(`${potential_subtrahend} * ${difference} = ${potential_subtrahend * difference}`)
        break;
    }
}
