const fs = require('fs');

const input = fs.readFileSync('day-3-input.txt', 'utf-8');

const map_arr = input.split('\n');
const width = map_arr[0].length;
const height = map_arr.length;

console.log(`width: ${width}, height: ${height}`)

// Part 1

console.log('Part 1');

const xdiff = 3;
const ydiff = 1;

let x = 0, y = 0, treeCounter = 0;
while (y < height - 1) {
    x += xdiff;
    y += ydiff;

    if (map_arr[y][x % width] == '#') {
        ++ treeCounter;
    }
}

console.log(`Total trees hit: ${treeCounter}`)

// Part 2

console.log('Part 2');

const diff_arr = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];

let product = 1;
diff_arr.map(arr => {
    const hit_trees = computeHitTrees(... arr);
    product *= hit_trees;

    console.log(`Slope ${arr} hit ${hit_trees} trees`);
});
console.log(product);

function computeHitTrees(xdiff, ydiff) {
    let x = 0, y = 0, treeCounter = 0;
    while (y < height - 1) {
        x += xdiff;
        y += ydiff;

        // Had to account for us surpassing the ma
        // y-value after the ydiff is added in
        if (y >= height - 1) {
            break;
        }

        if (map_arr[y][x % width] == '#') {
            ++ treeCounter;
        }
    }

    return treeCounter;
}
