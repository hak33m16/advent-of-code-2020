const fs = require('fs');

const input = fs.readFileSync('day-9-input.txt', 'utf-8')
    .split('\n')
    .map(str => parseInt(str));

console.log(input);
console.log(input[20])

//let invalid_number = -1;

const preamble_length = 5;

// main_loop:
// for (let i = 0; i < input.length; ++ i) {
//     if (i >= preamble_length) {
//         let weCanMakeThisNumber = false;

//         let currentNumber = input[i];
//         checking_loop:
//         for (let j = 1; j <= preamble_length; ++ j) {
//             for (let k = 1; k <= preamble_length; ++ k) {
//                 //console.log("i: ", i, ", j: ", j)
//                 //console.log(`adding ${input[i - j]} with ${input[i - k]}`)
//                 //console.log(`checking if equal to ${currentNumber}`)
//                 if (j != k && (input[i - j] + input[i - k] == currentNumber)) {
//                     //console.log(`we can make ${currentNumber}`)
//                     weCanMakeThisNumber = true;
//                     break checking_loop;
//                     //console.log(currentNumber);
//                     //break main_loop;
//                 }
//             }
//         }

//         if (!weCanMakeThisNumber) {
//             invalid_number = currentNumber;
//             console.log(`we can't make ${currentNumber}`);
//             break main_loop;
//         }
//     }
// }

// Part 2

let invalid_number = 675280050;
//let invalid_number = 127;
main_loop:
for (let range_start = 0; range_start < input.length; ++ range_start) {
    for (let range_end = range_start + 1; range_end < input.length; ++ range_end) {
        //console.log(`range start: ${range_start} range end: ${range_end}`);
        let smallestNumInRange = Number.POSITIVE_INFINITY;
        let largestNumInRange = Number.NEGATIVE_INFINITY;

        let sum = 0;
        for (let i = range_start; i < range_end; ++ i) {
            sum += input[i];

            if (input[i] < smallestNumInRange) {
                smallestNumInRange = input[i];
            }

            if (input[i] > largestNumInRange) {
                largestNumInRange = input[i];
            }
        }

        if (sum == invalid_number) {
            console.log(`correct range is ${range_start} - ${range_end - 1}`);
            console.log(`encryption weakness is: ${smallestNumInRange + largestNumInRange}`);
            break main_loop;
        }
    }
}
