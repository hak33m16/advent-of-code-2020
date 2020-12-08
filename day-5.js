const fs = require('fs');

const input = fs.readFileSync('day-5-input.txt', 'utf-8').split('\n');

const diff_map = {
    'F': 0,
    'B': 1,
    'L': 0,
    'R': 1
}

let seat_id_set = new Set();

let max_seat_id = -1;
input.forEach(row_seat_string => {
    var multiplicand = 128;
    let row = 0;
    for (let i = 0; i < 7; ++ i) {
        multiplicand /= 2;
        row += multiplicand * diff_map[row_seat_string[i]];
    }

    const seat_starting_pos = 7;

    var multiplicand = 8;
    let seat = 0;
    for (let i = 0; i < 3; ++ i) {
        multiplicand /= 2;
        seat += multiplicand * diff_map[row_seat_string[seat_starting_pos + i]];
    }

    let seat_id = row * 8 + seat;
    seat_id_set.add(seat_id);
    if (seat_id > max_seat_id) {
        max_seat_id = seat_id;
    }
});

console.log(`Max seat ID: ${max_seat_id}`);

// Part 2

let my_seat_id = -1;
for (let potential_seat_id = 1; potential_seat_id < max_seat_id - 1; ++ potential_seat_id) {
    let lowerSeatExists = seat_id_set.has(potential_seat_id - 1);
    let upperSeatExists = seat_id_set.has(potential_seat_id + 1);
    if (!seat_id_set.has(potential_seat_id) && lowerSeatExists && upperSeatExists) {
        my_seat_id = potential_seat_id;
        break;
    }
}

console.log(`My seat ID: ${my_seat_id}`);
