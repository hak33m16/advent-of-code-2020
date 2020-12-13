const fs = require('fs');

let input = fs.readFileSync('day-11-input.txt', 'utf-8')
    .split('\n');
let seatingArray = []
input.forEach(str => {
    seatingArray.push(str.split(''));
});

//debugPrintArr(seatingArray)

// Part 1

function getAdjacentFilledSeatsCount(seatingArrOfArrs, y, x) {
    let adjacentSeatCoordsArr = []

    adjacentSeatCoordsArr.push([y, x - 1])
    adjacentSeatCoordsArr.push([y, x + 1])

    adjacentSeatCoordsArr.push([y - 1, x - 1])
    adjacentSeatCoordsArr.push([y - 1, x])
    adjacentSeatCoordsArr.push([y - 1, x + 1])

    adjacentSeatCoordsArr.push([y + 1, x - 1])
    adjacentSeatCoordsArr.push([y + 1, x])
    adjacentSeatCoordsArr.push([y + 1, x + 1])

    let adjacentFilledSeatCount = 0;
    for (const coordArr of adjacentSeatCoordsArr) {
        let xValueValid = false;
        let yValueValid = coordArr[0] >= 0 && coordArr[0] < seatingArrOfArrs.length;
        // Need to know that the y-value is valid before we can
        // check x, or we may access invalid y-index
        if (yValueValid) {
            xValueValid = coordArr[1] >= 0 && coordArr[1] < seatingArrOfArrs[coordArr[0]].length;
        }

        if (xValueValid && yValueValid) {
            if (seatingArrOfArrs[coordArr[0]][coordArr[1]] == '#') {
                ++ adjacentFilledSeatCount;
            }
        }
    }

    return adjacentFilledSeatCount;
}

function deepCopyArr(arrOfArr) {
    let newArr = []
    for (let i = 0; i < arrOfArr.length; ++ i) {
        newArr.push(arrOfArr[i].slice())
    }
    return newArr
}

function debugPrintArr(arrOfArr) {
    let arrStr = "";
    arrOfArr.forEach(line => {
        line.forEach(char => {
            arrStr += char;
        })
        arrStr += '\n';
    })
    return arrStr;
}

function stabilizing() {
    // Need to create a copy of the input arr so that
    // as we modify, we don't modify the original
    let newSeatArr = deepCopyArr(seatingArray)

    let valueChanged = false
    
    // Our decisions are based off of input, but
    // our changes get mapped to the newSeatArr
    for (let y = 0; y < seatingArray.length; ++ y) {
        for (let x = 0; x < seatingArray[y].length; ++ x) {
            let isEmptySeat = seatingArray[y][x] == 'L';
            let isOccupiedSeat = seatingArray[y][x] == '#';
            let adjacentFilledCount = getAdjacentFilledSeatsCount(seatingArray, y, x);
            if (isEmptySeat && adjacentFilledCount == 0) {
                valueChanged = true;
                newSeatArr[y][x] = '#';
            } else if (isOccupiedSeat && adjacentFilledCount >= 4) {
                valueChanged = true;
                newSeatArr[y][x] = 'L';
            }
        }
    }

    seatingArray = deepCopyArr(newSeatArr)
    return valueChanged;
}

// Stabilize until no value changes

function getPart1Answer() {
    while (stabilizing());

    let totalOccupiedSeats = 0;
    seatingArray.forEach(line => {
        line.forEach(char => {
            if (char == '#') {
                ++ totalOccupiedSeats;
            }
        })
    })

    console.log('Total occupied seats: %o', totalOccupiedSeats);
}

// getPart1Answer()

// Part 2

// Remember these are y, x multipliers...
let velocitiesArr = [
    // Northeast
    [1, 1],
    // Northwest
    [1, -1],
    // Southeast
    [-1, 1],
    // Southwest
    [-1, -1],
    // East
    [0, 1],
    // North
    [1, 0],
    // West
    [0, -1],
    // South
    [-1, 0]
]

function part2GetAdjacentFilledSeatsCount(seatingArrOfArrs, y, x) {
    let visibleSeats = 0;
    for (const velArr of velocitiesArr) {
        let currentY = y;
        let currentX = x;

        let stillValidToMove = true;
        while (stillValidToMove) {
            currentY += velArr[0];
            currentX += velArr[1];

            let xValueValid = false;
            let yValueValid = currentY >= 0 && currentY < seatingArrOfArrs.length;
            // Need to know that the y-value is valid before we can
            // check x, or we may access invalid y-index
            if (yValueValid) {
                xValueValid = currentX >= 0 && currentX < seatingArrOfArrs[currentY].length;
            }

            stillValidToMove = xValueValid && yValueValid;
            if (stillValidToMove) {
                if (seatingArrOfArrs[currentY][currentX] == '#') {
                    ++ visibleSeats;
                    // Break on finding a seat
                    break;
                } else if (seatingArrOfArrs[currentY][currentX] == 'L') {
                    // Empty seats block visible ones I guess..?
                    break;
                }
            }
        }
    }

    return visibleSeats;
}

function part2Stabilizing() {
    // Need to create a copy of the input arr so that
    // as we modify, we don't modify the original
    let newSeatArr = deepCopyArr(seatingArray)

    let valueChanged = false
    
    // Our decisions are based off of input, but
    // our changes get mapped to the newSeatArr
    for (let y = 0; y < seatingArray.length; ++ y) {
        for (let x = 0; x < seatingArray[y].length; ++ x) {
            let isEmptySeat = seatingArray[y][x] == 'L';
            let isOccupiedSeat = seatingArray[y][x] == '#';
            let adjacentFilledCount = part2GetAdjacentFilledSeatsCount(seatingArray, y, x);

            if (isEmptySeat && adjacentFilledCount == 0) {
                valueChanged = true;
                newSeatArr[y][x] = '#';
            } else if (isOccupiedSeat && adjacentFilledCount >= 5) {
                valueChanged = true;
                newSeatArr[y][x] = 'L';
            }
        }
    }

    seatingArray = deepCopyArr(newSeatArr)

    return valueChanged;
}

function getPart2Answer() {
    while (part2Stabilizing());

    let totalOccupiedSeats = 0;
    seatingArray.forEach(line => {
        line.forEach(char => {
            if (char == '#') {
                ++ totalOccupiedSeats;
            }
        })
    })

    console.log('Total occupied seats: %o', totalOccupiedSeats);
}

getPart2Answer();
