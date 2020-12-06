const fs = require('fs');

const input = fs.readFileSync('day-2-input.txt', 'utf-8');

const data_arrays = input.split('\n')
    .filter(s => {
        // Ignore whitespace lines
        return s.trim();
    }).map(s => {
        return data_arr = s.split(' ');
    });

// Part 1

const part_1_valid_passwords = data_arrays.filter(data_arr => {
    const min_max_arr = data_arr[0].split('-');
    
    const min = parseInt(min_max_arr[0]);
    const max = parseInt(min_max_arr[1]);
    const char = data_arr[1][0];
    const password = data_arr[2];

    let charCount = 0;
    [... password].forEach(c => {
        if (c == char) {
            ++ charCount;
        }
    });
    
    return charCount >= min && charCount <= max;
});

console.log(`Part 1 valid password count: ${part_1_valid_passwords.length}`);

// Part 2

const part_2_valid_passwords = data_arrays.filter(data_arr => {
    const pos1_pos2_arr = data_arr[0].split('-');

    const pos1 = parseInt(pos1_pos2_arr[0]);
    const pos2 = parseInt(pos1_pos2_arr[1]);
    const char = data_arr[1][0];
    const password = data_arr[2];

    const onlyPos1HasChar = password[pos1 - 1] == char && password[pos2 - 1] != char;
    const onlyPos2HasChar = password[pos2 - 1] == char && password[pos1 - 1] != char;

    return onlyPos1HasChar || onlyPos2HasChar;
});

console.log(`Part 2 valid password count: ${part_2_valid_passwords.length}`);
