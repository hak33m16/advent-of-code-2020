const fs = require('fs');

const input = fs.readFileSync('day-12-input.txt', 'utf-8')
    .split('\n');

const instructions = []
input.forEach(instruction => {
    let action = instruction[0]
    let value = parseInt(instruction.substring(1, instruction.length))

    instructions.push({
        action: action,
        value: value
    });
})

console.log(instructions)

// Part 1

// let velocityMap = {
//     'N': [0, 1],
//     'S': [0, -1],
//     'E': [1, 0],
//     'W': [-1, 0]
// }

// let rotationMap = {
//     'L': -1,
//     'R': 1
// }

// // 0 rotation = E, 180 = W
// let rotationArr = ['E', 'S', 'W', 'N']

// let currentDir = 'E';
// let currentRotation = 0;
// let currentX = 0;
// let currentY = 0;
// instructions.forEach(instructionMapping => {
//     if (instructionMapping.action == 'L' || instructionMapping.action == 'R') {
//         let rotationSteps = (instructionMapping.value / 90) % 4;
//         currentRotation = (((currentRotation + rotationSteps * rotationMap[instructionMapping.action]) % 4) + 4) % 4;
//         currentDir = rotationArr[currentRotation]
//     } else if (instructionMapping.action == 'F') {
//         currentX += velocityMap[currentDir][0] * instructionMapping.value;
//         currentY += velocityMap[currentDir][1] * instructionMapping.value;
//     } else {
//         currentX += velocityMap[instructionMapping.action][0] * instructionMapping.value;
//         currentY += velocityMap[instructionMapping.action][1] * instructionMapping.value;
//     }
// });

// console.log()
// console.log(currentRotation)
// console.log(currentDir)

// console.log('currentX', currentX);
// console.log('currentY', currentY);
// console.log(Math.abs(currentX) + Math.abs(currentY));

//console.log((180 / 90) % 4)

// Part 2

let velocityMap = {
    'N': [0, 1],
    'S': [0, -1],
    'E': [1, 0],
    'W': [-1, 0]
}

let rotationMap = {
    'L': -1,
    'R': 1
}

function counterClockwiseRotate(rotation, x, y) {
    if (rotation == 90) {
        return [-y, x]
    } else if (rotation == 180) {
        return [-x, -y]
    } else if (rotation == 270) {
        return [y, -x]
    } 
}

function clockwiseRotate(rotation, x, y) {
    if (rotation == 90) {
        return [y, -x]
    } else if (rotation == 180) {
        return [-x, -y]
    } else if (rotation == 270) {
        return [-y, x]
    }
}

// 0 rotation = E, 180 = W
let rotationArr = ['E', 'S', 'W', 'N']

let currentWaypointDir = 'E';
let currentWaypointRotation = 0;
let currentShipX = 0;
let currentShipY = 0;
let currentWaypointX = 10;
let currentWaypointY = 1;

instructions.forEach(instructionMapping => {
    console.log(instructionMapping);

    if (instructionMapping.action == 'L' || instructionMapping.action == 'R') {
        let rotationSteps = (instructionMapping.value / 90) % 4;

        currentWaypointRotation = (((currentWaypointRotation + rotationSteps * rotationMap[instructionMapping.action]) % 4) + 4) % 4;
        currentWaypointDir = rotationArr[currentWaypointRotation]

        let rotationDegrees = instructionMapping.value % 360;

        let rotationCallback = instructionMapping.action == 'L' ?
            counterClockwiseRotate :
            clockwiseRotate;

        let newXYArr = rotationCallback(rotationDegrees, currentWaypointX, currentWaypointY);
        currentWaypointX = newXYArr[0];
        currentWaypointY = newXYArr[1];
    } else if (instructionMapping.action == 'F') {
        for (let i = 0; i < instructionMapping.value; ++ i) {
            currentShipX += currentWaypointX;
            currentShipY += currentWaypointY;
        }
    } else {
        currentWaypointX += velocityMap[instructionMapping.action][0] * instructionMapping.value;
        currentWaypointY += velocityMap[instructionMapping.action][1] * instructionMapping.value;
    }
});

console.log(`Abs together: ${Math.abs(currentShipX) + Math.abs(currentShipY)}`)
