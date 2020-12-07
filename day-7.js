const fs = require('fs');

const input = fs.readFileSync('day-7-input.txt', 'utf-8').split('\n');

// Part 1

let master_bag_map = { }

input.forEach(line => {
    let bag_rule_arr = line.split(' contain ');
    // Get rid of period at the end
    bag_rule_arr[bag_rule_arr.length - 1] = bag_rule_arr[bag_rule_arr.length - 1]
        .replace('.', "");

    let bag_color = bag_rule_arr[0].split(' bags')[0];

    let sub_bags = bag_rule_arr[1].split(',');
    //console.log(sub_bags);
    for (let i = 0; i < sub_bags.length; ++ i) {
        if (i == 0 && sub_bags[i] == 'no other bags') {
            sub_bags = [];
        } else {
            sub_bags[i] = sub_bags[i]
                .replace("bags", "")
                .replace("bag", "")
                .trim()
                // Remove number of sub-bags
                .substring(2, sub_bags[i].length);
        }
        // console.log("Subbag: " + sub_bags[i]);
    }
    console.log(sub_bags);

    //console.log(bag_rule_arr);
    // console.log(bag_color);
    // console.log(sub_bags);

    master_bag_map[bag_color] = new Set(sub_bags);

});

//console.log(master_bag_map)

let totalTransitiveShinyGoldBagCount = 0;
for (const bag of Object.keys(master_bag_map)) {
    //console.log(bag);
    //console.log(sub_bags);

    let alreadyEncounteredSet = new Set();

    let lineageHasShinyGold = false;
    
    let stack = bag != 'shiny gold' ? [bag] : [];
    while (!stack.length == 0) {
        let currentBag = stack.pop();
        alreadyEncounteredSet.add(currentBag);

        //console.log('Current bag is: ' + currentBag);

        if (currentBag == 'shiny gold') {
            lineageHasShinyGold = true;
            break;
        }

        master_bag_map[currentBag].forEach(sub_bag => {
            //console.log('sub bag is ' + sub_bag);

            if (!alreadyEncounteredSet.has(sub_bag)) {
                //console.log(`We've yet to encounter ${sub_bag}`)
                stack.push(sub_bag);
            }
        });
    }

    if (lineageHasShinyGold) {
        ++ totalTransitiveShinyGoldBagCount;
    }
}

console.log(`Total transitive shiny gold containers: ${totalTransitiveShinyGoldBagCount}`)

// Part 2

let master_bag_map_2 = { }

input.forEach(line => {
    let bag_rule_arr = line.split(' contain ');
    // Get rid of period at the end
    bag_rule_arr[bag_rule_arr.length - 1] = bag_rule_arr[bag_rule_arr.length - 1]
        .replace('.', "");

    let bag_color = bag_rule_arr[0].split(' bags')[0];

    let sub_bag_map = { }

    let sub_bags = bag_rule_arr[1].split(',');
    //console.log(sub_bags);
    for (let i = 0; i < sub_bags.length; ++ i) {
        if (i == 0 && sub_bags[i] == 'no other bags') {
            sub_bags = [];
        } else {
            sub_bags[i] = sub_bags[i]
                .replace("bags", "")
                .replace("bag", "")
                .trim();
            
            let subBagNumber = sub_bags[i].substring(0, 1);

            sub_bags[i] = sub_bags[i]
                // Remove number of sub-bags
                .substring(2, sub_bags[i].length);

            sub_bag_map[sub_bags[i]] = parseInt(subBagNumber);
        }
        // console.log("Subbag: " + sub_bags[i]);
    }
    console.log(sub_bag_map);

    //console.log(bag_rule_arr);
    // console.log(bag_color);
    // console.log(sub_bags);

    master_bag_map_2[bag_color] = sub_bag_map; //new Set(sub_bags);

});

console.log(master_bag_map_2);

let total_bag_count = 0;
function countBags(bag) {
    let totalBagsInThisBag = 1;
    for (const sub_bag_key of Object.keys(master_bag_map_2[bag])) {
        totalBagsInThisBag += master_bag_map_2[bag][sub_bag_key] * countBags(sub_bag_key);
    }

    return totalBagsInThisBag;
}

total_bag_count = countBags('shiny gold') - 1;

console.log(total_bag_count)
